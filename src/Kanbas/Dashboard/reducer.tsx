import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
name: "enrollments",
initialState,
reducers: {
    
    enroll: (state, { payload: { currentUser, courseId } } ) => {
        const newEnrollment: any = {
            _id: state.enrollments.length + 1,
            user: currentUser._id,
            course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (state, { payload: { courseId }}) => {
        state.enrollments = state.enrollments.filter(
            (e: any) => e.course !== courseId);
    },
}
});
export const { enroll, unenroll } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
