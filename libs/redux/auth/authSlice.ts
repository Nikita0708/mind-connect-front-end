import { authAPI } from "@libs/API/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    captchaUrl: null,
    usersData: {} as {
      email: string;
      firstName: string;
      lastName: string;
      number: number;
      image: string;
    },
  },
  reducers: {
    setUser(state, action) {
      state.usersData = action.payload;
    },
    setCaptchaUrl(state, action) {
      state.captchaUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuth = true;
      state.usersData = action.payload;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuth = true;
      state.usersData = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
    });
    builder.addCase(getAuthUserData.fulfilled, (state, action) => {
      state.usersData = action.payload;
      state.isAuth = true;
    });
  },
});

export const { setUser, setCaptchaUrl } = authSlice.actions;

export const getAuthUserData = createAsyncThunk(
  "auth/getAuthUserData",
  async () => {
    const data = await authAPI.getUsersData();
    console.log(data);
    return data;
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    return await authAPI.login({ email, password });
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async ({
    firstName,
    email,
    password,
  }: {
    firstName: string;
    email: string;
    password: string;
  }) => {
    return await authAPI.register({ firstName, email, password });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authAPI.logout();
});

export default authSlice.reducer;
