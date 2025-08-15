import {
  clearCredentials,
  refreshAccessToken,
} from "@/redux/slices/auth-slice";
import { resetStoreAction, store } from "@/redux/store";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";
import { _VARZ } from "../const/_varz";
import { clearUserToken } from "../actions/auth";

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
    if (typeof window !== "undefined") {
      const state = store.getState();

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
    const originalRequest = error.config || {};
    const state = store.getState();
    const refreshToken = state?.authReducer?.refresh_token;

    // If the error is due to an expired access token
    if (error?.response?.status === 401 && !axiosRetry) {
      axiosRetry = true;

      try {
        if (refreshToken) {
          const res = await store.dispatch(refreshAccessToken(refreshToken));
          const newAccessToken = (res as any)?.payload?.tokens?.accessToken as
            | string
            | undefined;

          if (newAccessToken) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            axiosRetry = false;
            return axiosInstance(originalRequest);
          }
        }
        // No refresh token or missing new token → logout
        store.dispatch(clearCredentials());
        store.dispatch(resetStoreAction());
        clearUserToken();
      } catch (err) {
        // Refresh flow failed → logout
        store.dispatch(resetStoreAction());
        return Promise.reject(err);
      } finally {
        axiosRetry = false;
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

export const setDefaultLocale = (locale: string) => {
  axiosInstance.defaults.headers.common["lang"] = locale;
};

export default axiosInstance;
