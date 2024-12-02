import { useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import * as client from "./client"

export default function DeleteAssignment({ dialogTitle, assignmentId }:
    { dialogTitle: string; assignmentId: string; }) {
        const dispatch = useDispatch(); 
        const removeAssignment = async () => {
          await client.deleteAssignment(assignmentId);
          dispatch(deleteAssignment(assignmentId));
        } 
      return (
        <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <p>Delete this assignment?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  No </button>
                <button onClick={() => removeAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Yes </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    