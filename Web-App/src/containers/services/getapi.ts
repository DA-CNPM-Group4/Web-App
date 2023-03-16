import axios from 'axios';
import qs from 'qs';
import { BASE_API_URL } from '../../config';
import { Platform } from 'react-native';
import { sendAuthenicatedRequest } from './base';

export const getListPassenger = async () => {
  return (await sendAuthenicatedRequest('/Info/Passenger/GetPassengers', 'GET', null)).data;
};

export const getListDriver = async () => {
  return (await sendAuthenicatedRequest('/Info/Driver/GetDrivers', 'GET', null)).data;
};
