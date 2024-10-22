import { RxCross2 } from "react-icons/rx";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database"
export default function AssignTo() {
    const { aid } = useParams();
    const assignments = db.assignments;
    const assignment = assignments.find((assignment) => assignment._id === aid);
    return (
        <div className="row">
        <label className="col-sm-2 col-form-label text-end">Assign</label>
        <div className= "col-sm-10">
        <div className="border rounded-3 px-3 py-3">
            <label htmlFor="wd-everyone" className= "mb-1"><strong>Assign to</strong></label>
            <div id="wd-everyone" className="border rounded-3">
            <button className="btn d-flex align-items-center bg-secondary pe-3 my-2 ms-2">
                Everyone
                <RxCross2 className="ps-3 fs-2" style={{ bottom: "1px" }}/>
                </button>
            </div> <br/>
            <label htmlFor="wd-due" className= "mb-1"><strong>Due</strong></label>
            <div id="wd-everyone" className="border rounded-3">
                <div className="d-flex align-items-center">
                <p className="flex-grow-1 my-2 ms-2">{assignment ? assignment.due : ""}</p>
            <button className="btn d-flex align-items-center bg-secondary">
                <FaRegCalendarAlt style={{ bottom: "1px" }}/>
                </button>
                </div>
            </div>
            <div className="row my-3">
                <div className="col">
                <label htmlFor="wd-due" className= "mb-1"><strong>Available From</strong></label>
            <div id="wd-everyone" className="border rounded-3 me-2">
                <div className="d-flex align-items-center">
                <p className="flex-grow-1 my-2 ms-2">{assignment ? assignment.assigned : ""}</p>
            <button className="btn d-flex align-items-center bg-secondary">
                <FaRegCalendarAlt style={{ bottom: "1px" }}/>
                </button>
                </div>
                </div>
            </div>
            <div className="col">
            <label htmlFor="wd-due" className= "mb-1"><strong>Until</strong></label>
            <div id="wd-everyone" className="border rounded-3">
                <div className="d-flex align-items-center">
                <p className="flex-grow-1 my-2 ms-2">{assignment ? assignment.until : ""}</p>
            <button className="btn d-flex align-items-center bg-secondary">
                <FaRegCalendarAlt style={{ bottom: "1px" }}/>
                </button>
                </div>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    )
}