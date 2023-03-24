import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  Layout,
  Text,
  Input,
  ListItem,
  List,
} from "@ui-kitten/components";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getListPassenger } from "../../services/getapi";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
const AvartarIcon = (props) => (
  <Icon {...props} style={styles.icon} name="user-circle" color="#000000" />
);
const GreenIcon = (props) => (
  <Icon {...props} style={styles.icon} name="dot-circle" color="#62EE20" />
);
const RedIcon = (props) => (
  <Icon {...props} style={styles.icon} name="dot-circle" color="#EE4520" />
);
const StarIcon = (props) => (
  <Icon {...props} style={styles.icon} name="star" color="#EDCB1C" />
);
export const Customers = (props) => {
  const navigate = useNavigate();
  const [distance, setDistance] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const center = {
    lat: 10.75552665046525,
    lng: 106.66452829325283,
  };
  const origin = {
    lat: 10.75552665046525,
    lng: 106.66452829325283,
  };
  const destination = {
    lat: 17.75552665046525,
    lng: 106.66452829325283,
  };
  const [directionsResponse, setDirectionsResponse] = React.useState(null);

  useEffect(() => {
    calculateRoute();
  }, [origin, destination]);

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
    setDistance(results.routes[0].legs[0].distance.text);
    console.log(distance);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  const [map, setMap] = React.useState(/** @type google.maps.Map */ null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDvk1gd475Wq8f4U3hy8sXXLKk2dqK_g1g",
    libraries: ["places"],
  });

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "80%",
      }}
    >
      <View
        style={{
          justifyContent: "flex-start",
          width: "100%",
          paddingLeft: 20,
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 25 }} category="s1">
          Trip Infomation
        </Text>
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingVertical: 20,
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Text style={{ fontSize: 20, paddingVertical: 5 }}>
          Mã chuyến đi: 4aafaf-afafa-afafaf
        </Text>
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
          <AvartarIcon></AvartarIcon>
          <Text>Driver: Name</Text>
        </View>
        <View style={{ flexDirection: "row", paddingVertical: 5 }}>
          <AvartarIcon></AvartarIcon>
          <Text>Customer: Name</Text>
        </View>
        <Text style={{ paddingVertical: 20, fontSize: 20 }}>
          Tổng phải trả: {"       "}20.000đ
        </Text>
      </View>
      <View style={{ width: "60%", height: "30%" }}>
        {!isLoaded && <Text>loading....</Text>}
        {isLoaded && (
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
        )}
      </View>
      <View
        style={{
          paddingLeft: 20,
          paddingVertical: 20,
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingRight: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>GrabBike</Text>
          <Text style={{ fontSize: 20 }}>2.1Km - 7 mins</Text>
        </View>
        <View
          style={{
            paddingVertical: 5,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
            paddingRight: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <GreenIcon></GreenIcon>
            <View style={{ paddingLeft: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 16 }}>Three O'Clock</Text>
              <Text style={{ fontSize: 14 }}>1:35PM</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 5,
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "column",
            paddingRight: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <RedIcon></RedIcon>
            <View style={{ paddingLeft: 10, flexDirection: "column" }}>
              <Text style={{ fontSize: 16 }}>Bệnh viện ĐH Y Dược</Text>
              <Text style={{ fontSize: 14 }}>1:55PM</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 5,
            width: "100%",
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingRight: 20,
          }}
        >
          <Text style={{ fontSize: 20 }}>Đánh giá chuyến đi</Text>
          <View style={{ paddingHorizontal: 20 }}></View>
          <Text style={{ fontSize: 20 }}>4 </Text>
          <StarIcon></StarIcon>
        </View>
      </View>
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

export default Customers;
