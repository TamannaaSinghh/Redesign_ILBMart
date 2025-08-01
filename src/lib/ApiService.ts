import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config/config";

const BASE_URL = config.BASE_URL;

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

interface ErrorResponse {
  message: string;
  status?: number;
  data?: any;
}

const getToken = async (): Promise<string> => {
  const authData = await localStorage.getItem("authorization");
  let token = "";
  if (authData) {
    const authJson = JSON.parse(authData);
    token = authJson.token;
  }
  return token;
};

export const apiRequest = async <T = any>(
  endpoint: string,
  method: string = "GET",
  body: any = null,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      data: body,
    };

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("API request failed:", axiosError.response || axiosError);
    
    if (axiosError.response) {
      throw {
        message: axiosError.response.data?.message || "API request failed",
        status: axiosError.response.status,
        data: axiosError.response.data,
      };
    }
    throw { message: (error as Error).message || "Unknown API error" };
  }
};

export const apiRequestPost = async <T = any>(
  endpoint: string,
  body: any,
  isMultipart: boolean = false
): Promise<T> => {
  try {
    const token = await getToken();
    const headers: Record<string, string> = {
      ...(isMultipart ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response: AxiosResponse<T> = await axios.post(
      `${BASE_URL}${endpoint}`,
      body,
      { headers }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("API request failed:", axiosError.response || axiosError);
    throw axiosError.response?.data || { message: "Request failed" };
  }
};

export const apiRequestGet = async <T = any>(
  endpoint: string,
  queryParams: Record<string, any> = {}
): Promise<T> => {
  try {
    const token = await getToken();
    const response: AxiosResponse<T> = await axios.get(
      `${BASE_URL}${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        params: queryParams,
      }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("API request failed:", axiosError.response || axiosError);
    throw axiosError.response?.data || { message: "Request failed" };
  }
};

export const apiRequestPostWithoutToken = async <T = any>(
  endpoint: string,
  body: any
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.post(
      `${BASE_URL}${endpoint}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ErrorResponse>;
    console.error("API request failed:", axiosError.response || axiosError);
    throw axiosError.response?.data || { message: "Request failed" };
  }
};
export const apiRequestDelete = async (url: string, headers: HeadersInit = {}) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status} ${response.statusText}`);
    }

    return await response.json(); // or response.text() if your API returns no content
  } catch (error) {
    console.error('Delete request failed:', error);
    throw error;
  }
};

export const apiRequestPut = async (url: string, data?: any) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to PUT data");
  }

  return await res.json();
};



