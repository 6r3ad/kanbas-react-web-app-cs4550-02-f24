import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLL_API = `${REMOTE_SERVER}/api/enroll`
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getEnrollments = async ( userId : string ) => {
    const { data } = await axiosWithCredentials.get(`${ENROLL_API}/${userId}`);
    return data;
  }; 

export const toggleEnroll = async ( userId : string, courseId: any) => {
    const { data } = await axiosWithCredentials.put(`${ENROLL_API}/toggleEnroll/${userId}/${courseId}`);
    return data;
}
