import axios from 'axios';
import qs from 'qs';
import { BASE_API_URL } from '../config';
import { Platform } from 'react-native';
import { sendAuthenicatedRequest } from './base';

export const getListPassenger = async () => {
  return (await sendAuthenicatedRequest('/Info/Passenger/GetPassengers', 'GET', null)).data;
};

export const getListDriver = async () => {
  return (await sendAuthenicatedRequest('/Info/Driver/GetDrivers', 'GET', null)).data;
};

export const getListTrip = async () => {
  return (await sendAuthenicatedRequest('/Trip/Trip/GetTrips', 'GET', null)).data;
};

export const getPrice = async (distance) => {
  return (await sendAuthenicatedRequest('Trip/TripRequest/CalculatePrice?distance=' + distance, 'GET', null)).data;
};

export const sendTripRequest = async ({ PassengerId, StaffId, RequestStatus, PassengerNote, Distance, Destination, LatDesAddr, LongDesAddr, StartAddress, LatStartAddr, LongStartAddr, PassengerPhone, Price, VehicleType }) => {
  // const data = qs.stringify();
  const data = {
    PassengerId: PassengerId,
    StaffId: StaffId,
    RequestStatus: RequestStatus,
    PassengerNote: PassengerNote,
    Distance: Distance,
    Destination: Destination,
    LatDesAddr: LatDesAddr,
    LongDesAddr: LongDesAddr,
    StartAddress: StartAddress,
    LatStartAddr: LatStartAddr,
    LongStartAddr: LongStartAddr,
    PassengerPhone: PassengerPhone,
    Price: Price,
    VehicleType: VehicleType
  };
  console.log(data)
  return (await sendAuthenicatedRequest('/Trip/TripRequest/SendRequest', 'POST', data, null)).data;
};
