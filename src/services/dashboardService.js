
import apiClient from "./apiClient";

export const getScannerDashboard = async () => {
  const response =
    await apiClient.get(
      "/dashboard/scanner-dashboard"
    );

  return response.data;
};

export const getDashboard = async () => {
    const response = await apiClient.get("/dashboard/dashboard");

    return response.data;
};