import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL;

const sendMsg = (data)=>{
    return axios.post(`${url}/contact`,data)
}

export {sendMsg}