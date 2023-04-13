import axios from"axios"
import authHeader from '../student-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/student/";



const getListTypeRoom=()=> {
    return axios.get(API_URL + 'room-type', { 
      headers: authHeader() 
    });
  }
const getListRoomDetailsById=(id)=>{
  return axios.get(API_URL+"room-details/"+id,{
    headers: authHeader() 
  })
}
const getTypeRoom=(id)=>{
  return axios.get(API_URL + 'room-type/'+id, { 
    headers: authHeader() 
  });
}





const getStudentDetails=()=>{
  return axios.get(API_URL + 'info', { 
    headers: authHeader() 
  });
}
const StudentService={
    getListTypeRoom,
    getListRoomDetailsById,
    getTypeRoom,
    getStudentDetails,
    // getStudentBoard,
    // getAdminBoard
  }
  
  export default StudentService;