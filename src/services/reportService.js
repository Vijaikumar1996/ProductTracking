import apiClient from "./apiClient";

export const getMisReport = async (filters) => {
    const response = await apiClient.post(
        "/report/mis-report",
        filters
    );

    return response.data;
};