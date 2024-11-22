import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrollments: [],
};
const enrollmentsSlice = createSlice({
name: "enrollments",
initialState,
reducers: {
    getEnrollments: (state, action) => {
        state.enrollments = action.payload;
    },
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
export const { getEnrollments, enroll, unenroll } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
