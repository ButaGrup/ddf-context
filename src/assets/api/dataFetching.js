import axios from 'axios';

export const fetchData = async (baseUrl) =>{
    const response = await axios.get(`https://api.ddf.az/api/${baseUrl}` , {
        mode: 'cors',     
        headers:{
            'Content-Type' : 'application/json'
        }
    });
    const {data} = response;
    return data;
}