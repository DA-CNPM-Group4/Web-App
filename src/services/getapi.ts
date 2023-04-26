import axios from 'axios';
import qs from 'qs';
import { BASE_API_URL } from '../config';
import { Platform } from 'react-native';
import { sendAuthenicatedRequest, sendAuthenicatedRequest1 } from './base';

export const getListPassenger = async () => {
  return (await sendAuthenicatedRequest('/Info/Passenger/GetPassengers', 'GET', null)).data;
};

export const getListDriver = async () => {
  return (await sendAuthenicatedRequest('/Info/Driver/GetDrivers', 'GET', null)).data;
};

export const getListTrip = async () => {
  return (await sendAuthenicatedRequest('/Trip/Trip/GetTrips', 'GET', null)).data;
};

export const getListTripbyDriver = async ({ id , page}) => {
   const data = JSON.stringify({
     driverId: id,
     pageSize: 18,
     pageNum: page,
   });
  console.log(data);
  return (await sendAuthenicatedRequest(`/Trip/Trip/GetDriverTripPageing`, 'POST', data)).data;
};

export const getTotalListTripbyDriver = async ({ id }) => {
   const data = JSON.stringify({
     driverId: id,
     pageSize: 18,
   });
  console.log(data);
  return (await sendAuthenicatedRequest(`/Trip/Trip/GetDriverTripTotalPages`, 'POST', data)).data;
};


export const getListTripbyCustomer = async ({ id, page }) => {
  const data = JSON.stringify({
    passengerId: id,
    pageSize: 18,
    pageNum: page,
  });

  console.log(data);
  return (await sendAuthenicatedRequest(`/Trip/Trip/GetPassengersTripPaging`, 'POST',data)).data;
};

export const getTotalListTripbyCustomer = async ({ id }) => {
  const data = JSON.stringify({
    passengerId: id,
    pageSize: 18,
  });

  console.log(data);
  return (await sendAuthenicatedRequest(`/Trip/Trip/GetPassengersTripTotalPages`, 'POST',data)).data;
};

export const getPrice = async (distance) => {
  return (await sendAuthenicatedRequest('/Trip/TripRequest/CalculatePrice?distance=' + distance, 'GET', null)).data;
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
