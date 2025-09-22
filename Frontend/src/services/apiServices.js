import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, buildUrl } from "./config";

// Base API URL (set this according to your backend)
const BASE = BASE_URL;

console.log("BASE_URL===>", BASE_URL);

const apiService = async ({
  method = "GET",
  endpoint,
  data = null,
  params = null,
  headers = {},
}) => {
  const authToken = sessionStorage.getItem("token");

  if (!authToken) {
    toast.error("Authentication token missing!");
    return { error: "No token available" };
  }

  // Detect if FormData is used
  const isFormData = data instanceof FormData;

  try {
    const response = await axios({
      method,
      url: buildUrl(endpoint),
      data,
      params,
      headers: {
        Authorization: `Bearer ${authToken}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    let errorMessage = "Something went wrong. Please try again.";

    if (error?.response) {
      const { status, data } = error.response;

      if (status === 400) {
        errorMessage = data?.non_field_errors?.[0] || "Bad request.";
      } else if (status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (status === 403) {
        errorMessage = "You do not have permission to perform this action.";
      } else if (status === 404) {
        errorMessage = "Resource not found.";
      } else if (status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(data?.message || errorMessage);
    } else {
      toast.error(errorMessage);
    }

    return { error: errorMessage };
  }
};


export const apiNonAuthService = async ({
  method = "GET",
  endpoint,
  data = null,
  params = null,
}) => {
  // Retrieve authentication token
  const authToken = sessionStorage.getItem("token");

  try {
    const response = await axios({
      method,
      url: buildUrl(endpoint),
      data,
      params,
    });

    return response.data; // Return successful response data
  } catch (error) {
    console.error("API Error:", error);

    let errorMessage = "Something went wrong. Please try again.";

    if (error?.response) {
      const { status, data } = error.response;

      if (status === 400) {
        errorMessage = data?.non_field_errors?.[0] || "Bad request.";
      } else if (status === 401) {
        errorMessage = "Unauthorized. Please log in again.";
      } else if (status === 403) {
        errorMessage = "You do not have permission to perform this action.";
      } else if (status === 404) {
        errorMessage = "Resource not found.";
      } else if (status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }
    }

    toast.error(error?.response?.data?.message);
    return { error: errorMessage };
  }
};

export default apiService;
