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
  console.log(response.data);
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


const getCurrentUser=()=> {
  return JSON.parse(localStorage.getItem('user'));;
}


const AuthService={
  login,
  logout,
  register,
  getCurrentUser
}
export default  AuthService;