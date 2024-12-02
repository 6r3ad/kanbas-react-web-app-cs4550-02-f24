import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enroll, unenroll, getEnrollments } from "./reducer";
import * as enrollClient from "./client";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client"

export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrollments, setEnrollments] = useState([]);
  const fetchEnroll = async () => {
    const enrollments = await enrollClient.getEnrollments(currentUser._id as string);
      dispatch(getEnrollments(enrollments));
      setEnrollments(enrollments);
    };
    useEffect(() => {
      fetchEnroll();
    }, []);

  const [allCourses, setAllCourses] = useState(true);
  const [dynamicCourses, setDynamicCourses] = useState(courses);
  const toggleCourses = async () => {
    setAllCourses(!allCourses);
    if (allCourses) {
      let enrolledCourses = await courseClient.fetchAllCourses();
      setDynamicCourses(enrolledCourses);
    } 
    else {
      let enrolledCourses = await userClient.findMyCourses();
      setDynamicCourses(enrolledCourses);
    }
  }

  const toggleEnrolled = async (courseId: any) => {
   await enrollClient.toggleEnroll(currentUser._id, courseId);
   dispatch(getEnrollments(enrollments));
   setEnrollments(enrollments);
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" ? (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5><br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
        </>) : <button className="btn btn-primary float-end" id="wd-enrollments-click" onClick={toggleCourses}> Enrollments </button>}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {dynamicCourses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <img src="/images/reactjs.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {course.name}</h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description}</p>
                  <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${course._id}/Home`}>
                    <button className="btn btn-primary"> Go </button>
                  </Link>
                
                {currentUser.role === "FACULTY" ? (
                  <>
                    <button onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>
                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button></>) : 
                    <button className={`btn float-end ${enrollments.some((anyCourse: any) => anyCourse.course === course._id) ? "btn-danger" : "btn-primary"}`} 
                    id="wd-enrollments-click" onClick={() => toggleEnrolled(course._id)}>
                  {enrollments.some((anyCourse: any) => anyCourse.course === course._id) ? "Unenroll" : "Enroll"}</button>}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
