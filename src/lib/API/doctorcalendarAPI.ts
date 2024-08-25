import baseAPI from "./api";

export const doctorcalendarAPI = {
  async getAvailableDates(data: { doctorId: string; query: string }) {
    console.log(data.doctorId);
    const Response = await baseAPI.get(
      `/user/calendar/${data.doctorId}${data.query}`
    );
    return Response.data;
  },
  async addAvailableDate(data: { date: string; time: string }) {
    const Response = await baseAPI.post("/user/calendar", {
      ...data,
    });
    return Response.data;
  },
  async deleteAvailableDate(data: { calendarId: string; timeSlotId: string }) {
    const Response = await baseAPI.delete(
      `/user/calendar/${data.calendarId}/${data.timeSlotId}`
    );
    return Response.data;
  },
};
