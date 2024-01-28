import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from './axios';

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {}
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = !!action.payload.localToken;
    },
    logoutAuth: (state, action) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.fulfilled, (state, action) => {
      console.log("Fulfilled", action.payload)
      if (action.payload.code === "success") {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      }
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("Fulfilled", action.payload)
      if (action.payload.code === "login_success") {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setAuth, logoutAuth } = authSlice.actions;

export default authSlice.reducer;
