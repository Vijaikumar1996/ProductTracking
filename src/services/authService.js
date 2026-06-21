import apiClient from "./apiClient";

export const loginApi = (credentials) => {
    return apiClient.post("/Auth/login", credentials);
};

export const logoutApi = () => {
    return apiClient.post("/Logout");
};

export const changePasswordApi = async (payload) => {
    console.log("Change Password Payload:", payload);
    const response = await apiClient.post("/ChangePassword", payload);
    return response.data;
};