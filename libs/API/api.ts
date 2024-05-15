import axios from "axios";

const instance = axios.create({
  baseURL: "https://mindconnect-vebk.onrender.com/api/",
});

export const authAPI = {
  // googleSignIn(data: any) {
  //     return instance.post("api/auth/googlesignin", data)
  // },
  async login(data: { email: string; password: string }) {
    const Response = await instance.post("auth/signin", data);
    localStorage.setItem("token", Response.data.token);
    return Response.data.user;
  },
  async register(data: { firstName: string; email: string; password: string }) {
    const Response = await axios.post("auth/signup", {
      ...data,
    });
    localStorage.setItem("token", Response.data.token);
    return Response.data.user;
  },
  async logout() {
    const Response = await axios.post("auth/logout");
    return Response.data;
  },
  async getUsersData() {
    const Response = await axios.get("auth/current", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return Response.data;
  },
};
