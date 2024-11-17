import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
name: "enrollments",
initialState,
reducers: {
    
    enroll: (state, { payload: { currentUser, course } } ) => {
        const newEnrollment: any = {
            _id: state.enrollments.length + 1,
            user: currentUser._id,
            course: course._id,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: enrollmentId }) => {
        state.enrollments = state.enrollments.filter(
            (e: any) => e._id !== enrollmentId);
    },
}
});
export const { enroll, unenroll } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
