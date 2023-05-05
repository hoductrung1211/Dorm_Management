import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/";

const getListStudentInDorm=(pageSize, sortBy, typeSort, gender)=>{
    return axios.get(API_URL+"student",{
        params:{
            pageSize: pageSize,
            sortBy: sortBy,
            typeSort: typeSort,
            gender: gender
        }}
    // ,{
    //   headers: authHeader() 
    // }
    )
}
const getListStudentSearch=(username, name)=>{
    return axios.get(API_URL+"student/search",{
        params:{
            username: username,
            name: name,
        }}
    // ,{
    //   headers: authHeader() 
    // }
    )
}

const syncStudents=() =>{
    return axios.get(API_URL+"student/add-students",
     // ,{
    //   headers: authHeader() 
    // }
    )
}

const MGMTService={
    getListStudentInDorm,
    getListStudentSearch,
    syncStudents

}

export default MGMTService