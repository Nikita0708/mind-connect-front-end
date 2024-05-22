import { usersDataType } from "@lib/types";
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://mindconnect-vebk.onrender.com/api/",
});

export const authAPI = {
  async googleSignIn() {
    const Response = await instance.get("auth/googlesignin");
    return {
      status: Response.status,
      data: Response.data,
    };
  },
  async getGoogleUsersData(code: string) {
    const Response = await instance.get(`auth/getgoogleuserdata?code=${code}`);
    localStorage.setItem("token", Response.data.accessToken);
    return {
      data: Response.data.user,
      status: Response.status,
    };
  },
  async login(data: {
    email: string;
    password: string;
  }): Promise<usersDataType> {
    const Response = await instance.post("auth/signin", data);
    localStorage.setItem("token", Response.data.token);
    return Response.data.user;
  },
  async register(data: {
    firstName: string;
    email: string;
    password: string;
  }): Promise<usersDataType> {
    const Response = await instance.post("auth/signup", {
      ...data,
    });
    localStorage.setItem("token", Response.data.token);
    return Response.data.user;
  },
  async logout() {
    const Response = await instance.post("auth/logout");
    return Response.data;
  },
  async getUsersData(): Promise<usersDataType> {
    const Response = await instance.get("auth/current");
    localStorage.setItem("token", Response.data.token);
    return Response.data.user;
  },

  async requestResetPassword(email: string) {
    const Response = await instance.post("auth/request-password-reset", {
      email,
    });
    return {
      status: Response.status,
      data: Response.data,
    };
  },

  async resetPassword(token: string, newPassword: string) {
    const Response = await instance.post(`auth/reset-password/${token}`, {
      newPassword,
    });
    return {
      status: Response.status,
      data: Response.data,
    };
  },

  async verifyToken(token: string) {
    const Response = await instance.get(`auth/verify-token/${token}`);
    return {
      data: Response.data,
      status: Response.status,
    };
  },
};
