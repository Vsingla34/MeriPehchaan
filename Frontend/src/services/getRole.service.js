import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL;

const getVolunteers = ()=>{
  try {
     return axios.get(`${url}/g-v-da`)
  } catch (error) {
    console.log(error)
  }
}


export {getVolunteers}