import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://mrd.butagrup.az/api',
    headers:{
        Accept: 'application/json',
        'X-STATIC-TOKEN':'6rsu1cpu5efg4nvf'
    }
})

export default axiosInstance;