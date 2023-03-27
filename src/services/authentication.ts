import axios from 'axios';
import qs from 'qs';
import { BASE_API_URL } from '../config';
import { Platform } from 'react-native';
import { sendAuthenicatedRequest } from './base';

export const login = async ({ phone, email, password }) => {

  const data = JSON.stringify({
    email: email,
    phone: phone,
    password: password,
    role: "Staff",
  });

  return await sendAuthenicatedRequest('/Authentication/Login', 'POST',data);
};

export const getInfoUser = async ({accountId}) => {

  const data = JSON.stringify({
    accountId: accountId
  });

  return await sendAuthenicatedRequest('/Info/Staff/GetStaffInfoById', 'POST',data);
};


export const updateInfoUser = async ({accountId,identityNumber,Phone,Email,Name,Gender,Address}) => {

  const data = JSON.stringify({
    AccountId:accountId,
    IdentityNumber:identityNumber,
    Phone:Phone,
    Email:Email,
    Name:Name,
    Gender:Gender,
    Address:Address
  });

  return await sendAuthenicatedRequest('/Info/Staff/UpdateInfo', 'POST',data);
};

export const getInfoPassenger = async ({accountId}) => {

  const data = JSON.stringify({
    accountId:accountId,
  });

  return await sendAuthenicatedRequest('/Info/Passenger/GetPassengerInfoById', 'POST',data);
};

export const getInfoDriver = async ({accountId}) => {

  const data = JSON.stringify({
    accountId:accountId,
  });

  return await sendAuthenicatedRequest('/Info/Driver/GetDriverInfoById', 'POST',data);
};

