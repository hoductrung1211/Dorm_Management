import axios from"axios"
import authHeader from '../student-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/student/";



const getListTypeRoom=()=> {
    return axios.get(API_URL + 'room-type', { 
      headers: authHeader() 
    });
  }
const getListRoomByTypeID=(id)=>{
  return axios.get(API_URL+"room-type/"+id,{
    headers: authHeader() 
  })
}

const StudentService={
    getListTypeRoom,
    getListRoomByTypeID,
    // getStudentBoard,
    // getAdminBoard
  }
  
  export default StudentService;