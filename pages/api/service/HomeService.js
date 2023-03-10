import axios from"axios"
import authHeader from './AuthHeader';
const API_URL = "http://localhost:8080/api/";



const getListTypeRoom=()=> {
    return axios.get(API_URL + 'loaiktx/', { 
      headers: authHeader() 
      
    });
  }
const getListRoomByTypeID=(id)=>{
  console.log(API_URL+"student/loaiktx/"+id)
  return axios.get(API_URL+"student/loaiktx/"+id,{
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