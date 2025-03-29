import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Helper function to retrieve authentication token
const getToken = () => {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    Cookies.get("token") ||
    null
  );
};

// ✅ **Fetch Teacher Data API**
export const fetchTeacherData = createAsyncThunk(
  "teacher/fetchTeacherData",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch user profile to extract teacher ID
      const userResponse = await axios.get(
        "https://academy-gpt-backend.onrender.com/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const teacherId =
        userResponse.data?.data?.data?.teacher_id ||
        userResponse.data?.data?.teacher_id ||
        userResponse.data?.teacher_id;

      if (!teacherId) {
        throw new Error("No teacher ID found in user profile");
      }

      // Fetch teacher profile using the teacher ID
      const teacherResponse = await axios.get(
        `https://academy-gpt-backend.onrender.com/teachers/${teacherId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const teacherData = teacherResponse.data;

      return {
        ...userResponse.data,
        id: userResponse.data.id,
        email: userResponse.data.email || "",
        first_name: userResponse.data.first_name || "",
        last_name: userResponse.data.last_name || "",
        username: `${userResponse.data.first_name || ""} ${
          userResponse.data.last_name || ""
        }`.trim(),
        profile_picture:
          userResponse.data.profile_picture || "/default-avatar.png",
        teacher_profile: {
          id: teacherData.id,
          description: teacherData.description || "",
          work_experience: teacherData.work_experience || "",
          address: teacherData.address || "",
          policy: teacherData.policy || "",
          lesson_subject: teacherData.lesson_subject || "",
          IBAN: teacherData.IBAN || "",
          skill: teacherData.skill || [],
          language: teacherData.language || [],
          education: teacherData.education || [],
          policies: teacherData.policies || "",
          schedule: teacherData.schedule || "",
          subject: teacherData.subject || "",
          phone: teacherData.phone || "",
          basic_info: teacherData.basic_info || "",
          user: teacherData.user, // Reference to the user ID
        },
      };
    } catch (error) {
      console.log("errir", error);
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  }
);

// ✅ **Teacher Slice**
const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    isFetched: false, // ✅ **Flag to prevent continuous API calls**
  },
  reducers: {
    logout: (state) => {
      Object.assign(state, {
        teacher: null,
        isAuthenticated: false,
        isFetched: false, // ✅ Reset fetch status on logout
        loading: false,
        error: null,
      });
      localStorage.clear();
      sessionStorage.clear();
      Cookies.remove("token");
    },

    // ✅ **Update Teacher Profile Locally**
    updateTeacher: (state, action) => {
      if (state.teacher) {
        state.teacher = {
          ...state.teacher,
          ...action.payload,
        };
        localStorage.setItem("userData", JSON.stringify(state.teacher));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherData.fulfilled, (state, action) => {
        state.teacher = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.isFetched = true; // ✅ **Mark data as fetched**
      })
      .addCase(fetchTeacherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "An error occurred" };
      });
  },
});

// ✅ **Export Actions & Reducer**
export const { logout, updateTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;
