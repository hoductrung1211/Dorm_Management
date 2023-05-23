import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/manage/term/";


const listTerm=()=>{
    return axios.get(API_URL,
        {
            headers: authHeader()
        }
        )
}

const updateTerm=async(id, term)=>{
    const response = await axios.put(API_URL + "update/"+ id, term,
    {
        headers: authHeader()
    }
    )
    return response
}

const createTerm=async(term)=>{
    const response = await axios.post(API_URL + "add", term,
    {
        headers: authHeader()
    }
    )
    return response
}

const deleteTerm=(id)=>{
    return axios.delete(API_URL+ "delete/" +id,
    {
        headers: authHeader()
    }
    )
}

const searchTerm=(id)=>{
    return axios.get(API_URL + "search/",
    {
        params:{
            id: id
        },
        headers: authHeader()
    }
    )
}

const MGMTService={
    listTerm,
    updateTerm,
    createTerm,
    deleteTerm,
    searchTerm
}

export default MGMTService