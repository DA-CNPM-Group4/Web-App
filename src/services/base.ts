import axios, { Method } from 'axios';
import { BASE_API_URL } from '../config';



export const sendAuthenicatedRequest = async (url: string, method: Method, data: any, responseType = 'json') => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, 
    'X-Api-Key':'ApplicationKey',
    //Authorization: `Bearer ${getAccessToken()}`,
  };

  

  return await axios.request({
    url: `${BASE_API_URL}/api${url}`,
    method,
    data,
    headers,
    responseType: responseType as any,
  });
};

