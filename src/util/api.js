import axios from "axios";
import CONSTANTS from "./constants";

const token = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_USER_DATA_KEY))?.token;

const api = axios.create({  
    baseURL: CONSTANTS.BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : { Accept: 'application/json' },
    }
 });

 api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_USER_DATA_KEY))?.token;
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  });

 export default api

// import axios from 'axios';

// const token =  JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_USER_DATA_KEY))?.token;
// console.log("Token => \n", token);

// const api = axios.create({
//     baseURL: CONSTANTS.BASE_URL,
//     headers: token ? { Accept: 'application/json', Authorization: 'Bearer ' + token } : { Accept: 'application/json' }
// });

// export default api;