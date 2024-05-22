import { authAPI } from "@lib/API/api";
import { authType, usersDataType } from "@lib/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    tokenIsValid: null,
    isPending: true,
    googleUrl: null,
  } as authType,
  reducers: {
    setUser(state, action: PayloadAction<usersDataType>) {
      state.usersData = action.payload;
    },
    setCaptchaUrl(state, action: PayloadAction<string>) {
      state.captchaUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      signIn.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      signIn.fulfilled,
      (state: authType, action: PayloadAction<usersDataType>) => {
        state.isAuth = true;
        state.usersData = action.payload;
        state.isPending = false;
      }
    );
    builder.addCase(
      signUp.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      signUp.fulfilled,
      (state: authType, action: PayloadAction<usersDataType>) => {
        state.isAuth = true;
        state.usersData = action.payload;
        state.isPending = false;
      }
    );
    builder.addCase(
      logout.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      logout.fulfilled,
      (state: authType, action: PayloadAction) => {
        state.isAuth = false;
        state.isPending = false;
      }
    );
    builder.addCase(
      getAuthUserData.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      getAuthUserData.fulfilled,
      (state: authType, action: PayloadAction<usersDataType>) => {
        state.usersData = action.payload;
        state.isAuth = true;
        state.isPending = false;
      }
    );
    builder.addCase(
      checkVerifyToken.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      checkVerifyToken.fulfilled,
      (state: authType, action: PayloadAction<boolean>) => {
        state.tokenIsValid = action.payload;
        state.isPending = false;
      }
    );
    builder.addCase(
      googleSignIn.pending,
      (state: authType, action: PayloadAction) => {
        state.isPending = true;
      }
    );
    builder.addCase(
      googleSignIn.fulfilled,
      (state: authType, action: PayloadAction<{ url: string }>) => {
        state.isPending = false;
        state.googleUrl = action.payload.url;
      }
    );
  },
});

export const { setUser, setCaptchaUrl } = authSlice.actions;

export const getAuthUserData = createAsyncThunk(
  "auth/getAuthUserData",
  async () => {
    const data: usersDataType = await authAPI.getUsersData();
    return data;
  }
);

export const checkVerifyToken = createAsyncThunk(
  "auth/verify-token",
  async (payload: { token: string }) => {
    const data = await authAPI.verifyToken(payload.token);
    return data.status === 200;
  }
);

export const signIn = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const data: usersDataType = await authAPI.login({ email, password });
    return data;
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
    const data: usersDataType = await authAPI.register({
      firstName,
      email,
      password,
    });
    return data;
  }
);

export const googleSignIn = createAsyncThunk("auth/googleSignIn", async () => {
  const data = await authAPI.googleSignIn();
  if (data.status === 200) {
    return data.data;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authAPI.logout();
});

export const sendRequestToChangePassword = createAsyncThunk(
  "auth/requestChangePassword",
  async (payload: { email: string }) => {
    const data = await authAPI.requestResetPassword(payload.email);
    if (data.status === 200) {
      return data.data;
    }
  }
);

export const resetPasswordSystem = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { token: string; newPassword: string }) => {
    const data = await authAPI.resetPassword(
      payload.token,
      payload.newPassword
    );
    if (data.status === 200) {
      return data.data;
    }
  }
);

export default authSlice.reducer;
