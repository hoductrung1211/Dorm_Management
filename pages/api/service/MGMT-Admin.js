import axios from"axios"
import authHeader from '../admin-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/owner/";


const listAdmins=()=>{
    return axios.get(API_URL + "admins",
    {
        headers: authHeader()
    }
    )
}
const listRoles=()=>{
    return axios.get(API_URL + "roles",
    {
        headers: authHeader()
    }
    )
}

const createAccount=(info)=>{
    return axios.post(API_URL + "register-account", info, 
    {
        headers: authHeader()
    }
    )
}

const deleteAccount=(id)=>{
    return axios.delete(API_URL + "delete-account/"+ id,
    {
        headers: authHeader()
    }
    )
}

const MGMTService={
    listAdmins,
    listRoles,
    createAccount,
    deleteAccount
}

export default MGMTService