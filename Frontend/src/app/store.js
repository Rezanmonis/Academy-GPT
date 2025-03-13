import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import teacherReducer from "../features/teacherSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    teacher: teacherReducer
  },
});

export default store;
