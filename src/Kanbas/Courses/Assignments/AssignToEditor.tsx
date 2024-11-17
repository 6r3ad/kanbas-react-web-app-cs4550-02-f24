import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateAssignment } from "./reducer";
import { useState } from "react";
export default function AssignTo({ setAssignment, assignment, newAssignment }: { setAssignment: (updatedAssignment: any) => void, assignment: any, newAssignment: any }) {
    const { aid } = useParams();
    const dispatch = useDispatch();
    
    return (
        <div className="row">
            <label className="col-sm-2 col-form-label text-end">Assign</label>
            <div className="col-sm-10">
                <div className="border rounded-3 px-3 py-3">
                    <label htmlFor="wd-everyone" className="mb-1"><strong>Assign to</strong></label>
                    <div id="wd-everyone" className="border rounded-3">
                        <button className="btn d-flex align-items-center bg-secondary pe-3 my-2 ms-2">
                            Everyone
                            <RxCross2 className="ps-3 fs-2" style={{ bottom: "1px" }} />
                        </button>
                    </div> <br />
                    <label htmlFor="wd-due" className="mb-1"><strong>Due</strong></label>
                    <div id="wd-everyone" className="border rounded-3">
                        { newAssignment ? (
                            <input id="wd-due" className="form-control mb-10"
                                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />) :
                            <input id="wd-due" className="form-control mb-10" defaultValue={assignment.due}
                            onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} /> }
                    </div>
                    <div className="row my-3">
                        <div className="col">
                            <label htmlFor="wd-available-from" className="mb-1"><strong>Available From</strong></label>
                            <div id="wd-everyone" className="border rounded-3 me-2">
                            { newAssignment ? (
                            <input id="wd-available-from" className="form-control mb-10"
                            onChange={(e) => setAssignment({ ...assignment, assigned: e.target.value })} />) :
                            <input id="wd-available-from" className="form-control mb-10" defaultValue={assignment.assigned}
                            onChange={(e) => setAssignment({ ...assignment, assigned: e.target.value })} /> }
                            </div>
                        </div>
                        <div className="col">
                            <label htmlFor="wd-until" className="mb-1"><strong>Until</strong></label>
                            <div id="wd-everyone" className="border rounded-3">
                            { newAssignment ? (
                            <input id="wd-until" className="form-control mb-10"
                            onChange={(e) => setAssignment({ ...assignment, until: e.target.value })} />) :
                            <input id="wd-until" className="form-control mb-10" defaultValue={assignment.until}
                            onChange={(e) => setAssignment({ ...assignment, until: e.target.value })} /> }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
