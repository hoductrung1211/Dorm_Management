import axios from"axios"
const API_URL = "http://localhost:8080/api/auth/";

    // login
const login=async (username, password)=>{
  const response = await axios
    .post(API_URL + "signin", {
      username,
      password
    });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  
  return response.data;
}
//   log out
const logout=()=> {
  localStorage.removeItem("user");
}
// Sign up
const register=(username, password)=>{
  return axios.post(API_URL + "signup", {
    username,
    password
  });
}
const verify=(username, password, OTP)=>{
  return axios.post(API_URL+"two-factor-auth",{
    username,
    password,
    OTP
  })
}

const resendOtp=(username)=>{
  return axios.get(API_URL+'resend-otp/'+username)
}





const AuthService={
  login,
  logout,
  register,
  verify,
  resendOtp,
}
export default  AuthService;