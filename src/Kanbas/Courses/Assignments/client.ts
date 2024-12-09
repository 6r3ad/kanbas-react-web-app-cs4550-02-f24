import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ASSIGN_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });


export const fetchAllAssignments = async () => {
    const { data } = await axiosWithCredentials.get(ASSIGN_API);
    return data;
}

export const updateAssignment = async (assignment : any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGN_API}/${assignment._id}`, assignment);
    return data;
}

export const createAssignment = async () => {
    const { data } = await axiosWithCredentials.post(ASSIGN_API);
    return data;
}

export const deleteAssignment = async (assignmentId : any) => {
    const { data } = await axiosWithCredentials.delete(`${ASSIGN_API}/${assignmentId}`);
    return data;
}