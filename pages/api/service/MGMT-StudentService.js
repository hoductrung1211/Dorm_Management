import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/";

const getListStudentInDorm=(pageSize, sortBy, typeSort)=>{
    return axios.get(API_URL+"student",{
        params:{
            pageSize: pageSize,
            sortBy: sortBy,
            typeSort: typeSort
        }}
    // ,{
    //   headers: authHeader() 
    // }
    )
}

const MGMTService={
    getListStudentInDorm,

}

export default MGMTService