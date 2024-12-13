import { refreshAccessToken } from "@/redux/slices/auth-slice";
import { resetStoreAction, store } from "@/redux/store";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";
import { _VARZ } from "../const/_varz";

export type Pagination<T, Z = any> = {
  data: {
    filters?: Z;
    items: T[];
    meta: {
      hasNextPage: boolean;
      hasPrevPage: boolean;
      page: number;
      perPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
};

export type FetchDataType<T> = {
  data: T;
  messages: string;
  statusCode: number;
};

export type NormalFetchType<T> = {
  data: T;
};

export type FetchPaginatedDataType<T> = {
  items: T[];
  _meta: {
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  };
  _links: {
    first: { href: string };
    last: { href: string };
    self: { href: string };
  };
};

let axiosRetry = false;

// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();

    if (typeof window !== "undefined") {
      const accessToken = state?.authReducer?.access_token;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to refresh access token if needed
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();
    const refreshToken = state?.authReducer?.refresh_token;

    // If the error is due to an expired access token
    if (error?.response?.status === 401 && !axiosRetry && refreshToken) {
      axiosRetry = true;

      if (!refreshToken) {
        store.dispatch(resetStoreAction());
        return Promise.reject(error);
      }

      try {
        const res = await store.dispatch(refreshAccessToken(refreshToken));

        const newAccessToken = (res.payload as any)?.tokens
          ?.accessToken as string;

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        //User refresh token wasn't valid
        store.dispatch(resetStoreAction());
        //Redirect user to logout
        // window.location.href = _VARZ.signOutApiPage;

        return Promise.reject(err);
      }
    }

    const errorData = error?.response?.data;

    if (
      errorData?.message &&
      Array.isArray(errorData?.message) &&
      typeof window !== "undefined"
    ) {
      for (let error of errorData.message) {
        toast.error(error);
      }
      return Promise.reject(error);
    }

    if (
      typeof window !== "undefined" &&
      errorData?.["message"] &&
      typeof errorData["message"] === "string"
    ) {
      //Means we have error string as detail
      toast.error(errorData["message"]);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
