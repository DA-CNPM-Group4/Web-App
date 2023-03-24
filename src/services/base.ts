import axios, { Method } from 'axios';
import { BASE_API_URL } from '../config';

export const sendAuthenicatedRequest = async (url: string, method: Method, data: any, responseType='json') => {
  const headers = {
    'Content-Type': 'application/json',
    //Authorization: `Bearer ${getAccessToken()}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  };

  return await axios.request({
    url: `${BASE_API_URL}/api${url}`,
    method,
    data,
    headers,
    responseType: responseType as any,
  });
};
