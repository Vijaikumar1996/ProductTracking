import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import { queryClient } from "../../queryClient"; // Import the queryClient to clear queries on logout


const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userDetails");
  queryClient.clear(); // Clear all cached queries on logout to prevent stale data access
};

// Restore token & user on app load
const token = localStorage.getItem("token");

let user = null;
let validToken = null;

if (token) {
  try {
    const decoded = jwtDecode(token);

    // Check token expiry
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      throw new Error("Token expired");
    }

    const userDetails = JSON.parse(
      localStorage.getItem("userDetails") || "{}"
    );

    user = {
      ...decoded,
      ...userDetails,
    };

    validToken = token;

    console.log("Restored user from token:", user);
  } catch (err) {
    console.error("Invalid or expired token");
    clearAuthData();
  }
}

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);

      console.log("Login Response:", response);

      const token = response.data.accessToken;

      const userDetails = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        roles: response.data.roles,
      };

      localStorage.setItem("token", token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify(userDetails)
      );

      const decoded = jwtDecode(token);

      return {
        token,
        user: {
          ...decoded,
          ...userDetails,
        },
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token: validToken,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;

      clearAuthData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;