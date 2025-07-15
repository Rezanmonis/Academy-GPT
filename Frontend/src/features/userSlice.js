import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return null;

    try {
      // Step 1: Fetch user profile
      const profileResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userId = profileResponse.data?.id;
      if (!userId) return null;

      // Step 2: Fetch detailed user data
      const userResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/users/me/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        ...userResponse.data,
        id: userResponse.data.id,
        username: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
        first_name: userResponse.data.first_name,
        last_name: userResponse.data.last_name,
        email: userResponse.data.email,
        profile_picture:
          userResponse.data.profile_picture || "/default-avatar.png",
        is_teacher: userResponse.data.is_teacher,
        is_student: userResponse.data.is_student,
        teacher_id: userResponse.data.is_teacher
          ? userResponse.data.teacher_id
          : null,
        dob: userResponse.data.dob,
        languages: userResponse.data.languages,
        phone: userResponse.data.phone,
        address: userResponse.data.address,
        education: userResponse.data.education,
        goal: userResponse.data.goal,
        skill: userResponse.data.skill,
        basic_information: userResponse.data.basic_information || "",
        created_at: userResponse.data.created_at,
        updated_at: userResponse.data.updated_at,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch user data");
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.clear();
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("userData", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions
export const { logout, updateUser } = userSlice.actions;

// Export Reducer
export default userSlice.reducer;
