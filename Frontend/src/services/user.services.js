import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;


const genNewUserOtp = ({email})=>{
  return axios.post(`${url}/user/n-otp`,{email})
}

const userSignUp = (data) => {
  return axios.post(`${url}/user/signup`, data);
};

const userLogin = (data) => {
  return axios.post(`${url}/user/login`, data);
};

const generateOtp = (email) => {
  return axios.post(`${url}/user/otp`, { email });
};

const verifyOtp = ({email,otp}) => {
  return axios.post(`${url}/user/verify-otp`, {email,otp});
};
const changePassword = ({email,newPassword}) => {
  return axios.post(`${url}/user/reset-p`, {email,newPassword});
};
const uploadProfilePic = (data) => {
  return axios.post(`${url}/user/upload-pic`,data);
};
const  getProfilePic = ({id}) => {
  return axios.post(`${url}/user/get-pic`,{id})
};
const  updateUserProfile = (data) => {
  return axios.post(`${url}/user/c-program`,data)
};

export { userSignUp, userLogin, generateOtp, verifyOtp, changePassword, uploadProfilePic, getProfilePic, genNewUserOtp, updateUserProfile};
