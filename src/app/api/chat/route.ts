import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant, who can support a person in difficult situations. You are a psychologist. If user asks for emergency help, say go to https://mindconnect.vercel.app/fast-connect and add additional information on how to improve the situation immediately.",
        },
        ...messages,
      ],
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error.message ||
          "An error occurred while processing your request."
      );
    }

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: unknown) {
    console.error("Error in API route:", error);

    // Check if the error is an instance of Error before accessing error.message
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
