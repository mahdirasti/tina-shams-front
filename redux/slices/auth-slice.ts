// redux/slices/authSlice.ts
import axiosInstance, { FetchDataType } from "@/app/lib/axios";
import { AuthenticateType } from "@/types/authenticate";
import { UserType } from "@/types/user";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  access_token: null | string;
  refresh_token: null | string;
  user: UserType | null;
  is_loading: boolean;
};

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  user: null,
  is_loading: false,
};

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<
        FetchDataType<{ tokens: { accessToken: string; refreshToken: string } }>
      >("/auth/refresh-token", {
        refreshToken,
      });
      const data = response.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export type LoginParams = {
  access_token: string;
  refresh_token: string;
};

export const loginHandler = createAsyncThunk(
  "auth/login",
  async (
    { code, mobile }: { code: string; mobile: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post<
        FetchDataType<AuthenticateType>
      >("/auth/code", {
        code,
        mobile,
      });
      const data = response.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserHandler = createAsyncThunk(
  "auth/update-user",
  async (
    payload: Omit<Partial<UserType>, "id" | "mobile">,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch<FetchDataType<UserType>>(
        "/users/me",
        payload
      );

      const data = response.data.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthenticateType>) => {
      const { accessToken, refreshToken } = action.payload.tokens;
      state.access_token = accessToken;
      state.refresh_token = refreshToken;
    },
    clearCredentials: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.is_loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        const { accessToken, refreshToken } = action.payload.tokens;

        state.access_token = accessToken;
        state.refresh_token = refreshToken;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.access_token = null;
        state.refresh_token = null;
        state.user = null;
      }),
      builder
        .addCase(
          loginHandler.fulfilled,
          (state, action: PayloadAction<AuthenticateType>) => {
            const { accessToken, refreshToken } = action.payload.tokens;
            const user = action.payload.user;
            state.access_token = accessToken;
            state.refresh_token = refreshToken;
            state.user = user;
          }
        )
        .addCase(loginHandler.rejected, (state) => {
          state.access_token = null;
          state.refresh_token = null;
          state.user = null;
        }),
      builder.addCase(updateUserHandler.pending, (state, action) => {
        state.is_loading = true;
      });
    builder.addCase(updateUserHandler.fulfilled, (state, action) => {
      state.user = action.payload;
      state.is_loading = false;
    });
    builder.addCase(updateUserHandler.rejected, (state, action) => {
      state.is_loading = false;
    });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
