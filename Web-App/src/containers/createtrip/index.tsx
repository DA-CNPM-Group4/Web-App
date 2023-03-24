import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  Layout,
  Text,
  Input,
  ButtonGroup,
  Card,
} from "@ui-kitten/components";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import { StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { getPrice, sendTripRequest } from "../../services/getapi";

const BackIcon = (props) => (
  <Icon {...props} style={styles.icon} name="arrow-left" color="#000000" />
);
const MotorIcon = (props) => (
  <Icon {...props} style={styles.icon} name="motorcycle" color="#0AA62D" />
);
const CarIcon = (props) => (
  <Icon {...props} style={styles.icon} name="car" color="#0AA62D" />
);

export const CreateTrip = (props) => {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDvk1gd475Wq8f4U3hy8sXXLKk2dqK_g1g",
    libraries: ["places"],
  });

  const [map, setMap] = React.useState(/** @type google.maps.Map */ null);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);
  const [distance, setDistance] = React.useState(1.2);
  const [duration, setDuration] = React.useState("");
  const [next, setNext] = React.useState(false);
  const [searchOriginResult, setSearchOriginResult] = React.useState<any>();
  const [searchDestinationResult, setSearchDestinationResult] =
    React.useState<any>();

  const [origin, setOrigin] = React.useState(null);
  const [originName, setOriginName] = React.useState("");
  const [destination, setDestination] = React.useState(null);
  const [destinationName, setDestinationName] = React.useState("");

  const [prices, setPrices] = React.useState<any>();

  useEffect(() => {
    getPrice(distance).then((prices) => setPrices(prices));
  }, [distance]);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  const originRef = React.useRef<any>();
  const destiantionRef = React.useRef<any>();

  function onLoad(autocomplete) {
    setSearchOriginResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchOriginResult != null) {
      //variable to store the result
      const place = searchOriginResult?.getPlace();
      setOrigin({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });

      setOriginName(place.name);
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }

  function onDestinationLoad(autocomplete) {
    setSearchDestinationResult(autocomplete);
  }

  function onDestinationPlaceChanged() {
    if (searchDestinationResult != null) {
      //variable to store the result
      const place = searchDestinationResult?.getPlace();

      setDestination({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
      setDestinationName(place.name);
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }
  useEffect(() => {
    setOrigin({ lat: 10.75552665046525, lng: 106.66452829325283 });
    setDestination({ lat: 10.75552665046525, lng: 106.66452829325283 });
  }, []);

  async function calculateRoute() {
    if (origin === null || destination === null) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log(results);
    setDirectionsResponse(results);
    setDistance(parseFloat(results.routes[0].legs[0].distance.text));
    console.log(distance);
    setDuration(results.routes[0].legs[0].duration.text);
    setNext(true);
  }

  async function requestTrip() {
    await sendTripRequest({
      PassengerId: "00000000-0000-0000-0000-000000000000",
      StaffId: "b8d6041a-d2c9-4f01-bb4e-08db24a348e4",
      RequestStatus: "FindingDriver",
      PassengerNote: "Identity",
      Distance: distance,
      Destination: destinationName,
      LatDesAddr: destination?.lat,
      LongDesAddr: destination?.lng,
      StartAddress: originName,
      LatStartAddr: origin?.lat,
      LongStartAddr: origin?.lng,
      PassengerPhone: "01239916133",
      Price: 20000,
      VehicleType: "Motorbike",
    }).then((IS) => {
      console.log(IS);
      navigate("/");
    });
  }

  const center = {
    lat: 10.75552665046525,
    lng: 106.66452829325283,
  };

  if (!isLoaded) return <Text>loading....</Text>;
  else
    return (
      <Layout
        style={{ flex: 1, width: "100%", height: "100%", flexDirection: "row" }}
      >
        <View style={{ width: "20%" }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 20,
              paddingTop: 10,
            }}
          >
            <Button appearance="ghost" accessoryLeft={BackIcon}></Button>
            <Text
              style={{ width: "100%", flexShrink: 1, fontSize: 25 }}
              category="s1"
            >
              Book a trip
            </Text>
          </View>
          <Text style={{ fontSize: 16, paddingBottom: 20 }} category="s1">
            Where do you want to go?
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              borderRadius: 5,
              borderWidth: 20,
              borderColor: "#FFFFFF",
            }}
          >
            <View
              style={{
                width: "100%",
                flexShrink: 1,
                paddingVertical: 10,
              }}
            >
              <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                <Input placeholder="Your current location" ref={originRef} />
              </Autocomplete>
            </View>
            <View style={{ width: "100%", flexShrink: 1, paddingVertical: 10 }}>
              <Autocomplete
                onPlaceChanged={onDestinationPlaceChanged}
                onLoad={onDestinationLoad}
              >
                <Input
                  placeholder="Search for a destination"
                  ref={destiantionRef}
                />
              </Autocomplete>
            </View>
            {!next && (
              <View style={{ paddingVertical: 10 }}>
                <Button
                  style={{ width: "100%", flexShrink: 1, height: 30 }}
                  onPress={() => calculateRoute()}
                >
                  Next
                </Button>
              </View>
            )}
            {next && (
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingVertical: 10,
                }}
              >
                <Card
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    paddingLeft: -24,
                    paddingRight: -24,
                  }}
                  appearance="ghost"
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button appearance="ghost" accessoryLeft={MotorIcon}>
                      Motobike
                    </Button>
                    <Text>{prices?.data?.motorbike}</Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingLeft: 20 }}>
                    <Text style={{ fontSize: 11 }}>
                      {distance}-{duration}
                    </Text>
                  </View>
                </Card>

                <Card
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    paddingLeft: -24,
                    paddingRight: -24,
                  }}
                  appearance="ghost"
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button appearance="ghost" accessoryLeft={CarIcon}>
                      Car
                    </Button>
                    <Text>{prices?.data?.car4S}</Text>
                  </View>
                  <View style={{ flexDirection: "row", paddingLeft: 20 }}>
                    <Text style={{ fontSize: 11 }}>
                      {distance}-{duration}
                    </Text>
                  </View>
                </Card>
              </View>
            )}
            {next && (
              <View style={{ paddingVertical: 10 }}>
                <Button
                  style={{
                    width: "100%",
                    flexShrink: 1,
                    height: 30,
                  }}
                  onPress={() => requestTrip()}
                >
                  Send Request
                </Button>
              </View>
            )}
          </View>
        </View>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          {directionsResponse && (
            <DirectionsRenderer
              options={{
                directions: directionsResponse,
              }}
              onLoad={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onLoad directionsRenderer: ",
                  directionsRenderer
                );
              }}
              // optional
              onUnmount={(directionsRenderer) => {
                console.log(
                  "DirectionsRenderer onUnmount directionsRenderer: ",
                  directionsRenderer
                );
              }}
            />
          )}
        </GoogleMap>
      </Layout>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    paddingLeft: 3,
    paddingRight: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateTrip;
