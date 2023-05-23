import axios from"axios"
import authHeader from "./AuthHeader"

const URL= "http://localhost:8080/api/admin/authority"

const Authorities=()=>{
    
    return axios.get(URL,{
        headers : authHeader()
    })
//     const user = JSON.parse(localStorage.getItem('user'));
//   if (user && user.token ) {
//     return user.roles[0]
//   } else {
//     return [];
//   }
}

export default Authorities