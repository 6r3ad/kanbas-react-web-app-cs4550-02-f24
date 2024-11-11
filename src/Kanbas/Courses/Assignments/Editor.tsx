import AssignTo from "./AssignToEditor";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch(); 


  let newAssignment = false;
  if (!assignments.some((assignment: any)=> assignment._id === aid)) {
    newAssignment = true;
  }
  const currentAssignment = assignments.find((assignment: any) => assignment._id === aid);

  const [assignment, setAssignment] = useState(currentAssignment);
  return (
    <div id="wd-assignments-editor" className="mt-4" >
      <label htmlFor="wd-name" className="form-label">Assignment Name</label> <br />
      { newAssignment ? (
        <input id="wd-description" className="form-control mb-10"
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />) : 
        <input id="wd-description" className="form-control mb-10" defaultValue={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} /> }<br />
      <label htmlFor="wd-description" className="form-label">Description</label> <br />
      { newAssignment ? (
        <input id="wd-description" className="form-control mb-10"
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />) : 
        <input id="wd-description" className="form-control mb-10" defaultValue={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} /> }
      <br />
      <div className="mb-3 row">
        <label htmlFor="points" className="col-sm-2 col-form-label text-end">Points</label>
        <div className="col-sm-10">
      { newAssignment ? (
          <input type="number" className="form-control" id="points"
          onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />) :
          <input type="number" className="form-control" id="points" defaultValue={assignment.points}
          onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />}
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="assignmentGroup" className="col-sm-2 col-form-label text-end">Assignment Group</label>
        <div className="col-sm-10">
          <select className="form-select px-3" id="assignmentGroup">
            <option value="assignments">ASSIGNMENTS</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="displayGrade" className="col-sm-2 col-form-label text-end">Display Grade as</label>
        <div className="col-sm-10">
          <select className="form-select" id="displayGrade">
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label text-end">Submission Type</label>
        <div className="col-sm-10">
          <div className="border px-3 rounded-3">
            <select className="form-select mt-3 mb-3" id="wd-submission-type">
              <option value="online">Online</option>
            </select>
            <div className="mb-3">
              <h6><strong>Online Entry Options</strong></h6>
              <div className="form-check">
                <input id="wd-text-entry" className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                  Text Entry
                </label>
              </div>
              <div className="form-check">
                <input id="wd-website-url" className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                  Website URL
                </label>
              </div>
              <div className="form-check">
                <input id="wd-media-recordings" className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                  Media Recordings
                </label>
              </div>
              <div className="form-check">
                <input id="wd-file-uploads" className="form-check-input" type="checkbox" />
                <label className="form-check-label">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AssignTo setAssignment={setAssignment} assignment={assignment} newAssignment={newAssignment}/>
      <div className="text-end mt-5">
        <Link to={`/Kanbas/Courses/${cid}/Assignments/`}>
          <button type="button" className="btn btn-secondary me-2">Cancel</button>

          <button type="submit" className="btn btn-danger"
          onClick={() => { newAssignment ? dispatch(addAssignment( {...assignment, course: cid} )) : 
          dispatch(updateAssignment( assignment ))}}>Save</button>
        </Link>
      </div>
    </div>
  );
}
