import axios from"axios"
const API_URL = "http://localhost:8080/api/admin/";

const login=(username, password)=>{
    return axios
      .post(API_URL + "signin", {
        username,
        password
      });
    
}

const verify= async(username, password, OTP)=>{
    const response = await axios.post(API_URL+"two-factor-auth",{
      username,
      password,
      OTP
    })
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
}

const AdminAuthService={
    login,
    verify,
}

export default AdminAuthService
