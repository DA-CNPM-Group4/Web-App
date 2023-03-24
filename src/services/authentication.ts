import axios from 'axios';
import qs from 'qs';
import { BASE_API_URL } from '../config';
import { Platform } from 'react-native';
import { sendAuthenicatedRequest } from './base';

export const login = async ({ email,phone, password }) => {
  const data = qs.stringify({
    email: email,
    phone: phone,
    password: password,
    role: "Staff",
  });

  return await sendAuthenicatedRequest('/Authentication/Login', 'POST', null);
};
