import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { HiOutlinePlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function AssignmentsControls() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    return (
        <div className="d-flex align-items-center mt-4">
            <div className="position-relative flex-grow-1 me-5">
                <SearchBar />
            </div>
            {currentUser.role === "FACULTY" ?
                (<>
                    <button id="wd-group" className="btn btn-lg btn-secondary rounded-1 me-1 float-end">
                        <HiOutlinePlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group</button>
                    <Link to={new Date().getTime().toString()}><button id="wd-Assignment" className="btn btn-lg btn-danger rounded-1 me-1 float-end">
                        <HiOutlinePlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment</button></Link>
                </>) : null}
        </div>

    )
}