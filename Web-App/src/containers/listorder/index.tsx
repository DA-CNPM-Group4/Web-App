import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  Layout,
  Text,
  Input,
  ListItem,
  List,
} from "@ui-kitten/components";
import { Navigate, useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getListPassenger, getListTrip } from "../../services/getapi";
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
    googleMapsApiKey: "AIzaSyBwqWNFnAkDOuVip4NZ0vJPpxVAaRqUx6g",
    libraries: ["places"],
  });
  const [status, setStatus] = React.useState({
    name: "Huynh Loi Chuan",
    email: "loichuanhuynh@gmail.com",
    phone: "0123456789",
    address: "DH KHTN TP HCM",
  });

  const [info, setInfo] = React.useState(false);
  const BackIcon = (props) => (
    <Icon {...props} style={styles.icon} name="arrow-left" color="#000000" />
  );
  const CheckIcon = (props) => (
    <Icon {...props} style={styles.icon} name="check-square" color="#23B000" />
  );
  const [Dname, setDName] = React.useState("");
  const [Cname, setCName] = React.useState("");
  const [startAdd, setStartAdd] = React.useState("");
  const [EndAdd, setEndAdd] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [trip, setTrip] = React.useState("");

  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const rootData = useQuery("", () => getListTrip());

  useEffect(() => {
    console.log(rootData.data);
  }, [rootData.isFetched, rootData.isFetching]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        style={{
          width: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        onPress={() => {
          setDName(item?.driverId);
          setCName(item?.passengerId);
          setDistance(item?.distance);
          setStartAdd(item?.startAddress);
          setEndAdd(item?.destination);
          setPrice(item?.price);
          setTrip(item?.tripId);
          setInfo(true);
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            borderTopColor: "#E5E9EB",
            borderTopWidth: 1,
            borderBottomColor: "#E5E9EB",
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 13, width: "100%" }}>
              {item?.driverId}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 13, width: "100%" }}>
              {item?.passengerId}
            </Text>
          </View>
          <View
            style={{
              width: "15%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>{item?.tripStatus}</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 13, width: "100%" }}>
              {item?.startAddress}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 13, width: "100%" }}>
              {item?.destination}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              paddingVertical: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text numberOfLines={1} style={{ fontSize: 13, width: "100%" }}>
              {item?.distance}
            </Text>
          </View>
        </View>
      </ListItem>
    );
  };

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {!info && (
        <View style={{ width: "100%" }}>
          <View
            style={{
              justifyContent: "flex-start",
              width: "100%",
              paddingLeft: 20,
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 25 }} category="s1">
              List Trip
            </Text>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              width: "100%",
              paddingLeft: 20,
              paddingVertical: 20,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                borderTopColor: "#E5E9EB",
                borderTopWidth: 1,
                borderBottomColor: "#E5E9EB",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text> DRIVER NAME</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>CUSTOMER NAME</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>STATE</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>START ADDRESS</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>END ADDRESS</Text>
              </View>
              <View
                style={{
                  width: "10%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>DISTANCE</Text>
              </View>
            </View>
            {rootData.isSuccess &&
              rootData.data?.status &&
              rootData.data?.data?.length > 0}
            {data.length > 0 && (
              <List
                style={{
                  maxHeight: "100%",
                  flexShrink: 1,
                  width: "100%",
                }}
                data={rootData.data?.data}
                renderItem={renderItem}
              />
            )}
            {data.length <= 0 && (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Danh Sách Trống</Text>
              </View>
            )}
          </View>
        </View>
      )}
      {info && (
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
              flexDirection: "row",
            }}
          >
            <Button
              appearance="ghost"
              accessoryLeft={BackIcon}
              onPress={() => {
                setInfo(false);
              }}
            ></Button>
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
              Mã chuyến đi: {trip}
            </Text>
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
              <AvartarIcon></AvartarIcon>
              <Text>Driver: {Dname}</Text>
            </View>
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
              <AvartarIcon></AvartarIcon>
              <Text>Customer: {Cname}</Text>
            </View>
            <Text style={{ paddingVertical: 20, fontSize: 20 }}>
              Tổng phải trả: {"       "}
              {price}
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
              <Text style={{ fontSize: 20 }}>{distance} - 7 mins</Text>
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
                  <Text style={{ fontSize: 16 }}>{startAdd}</Text>
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
                  <Text style={{ fontSize: 16 }}>{EndAdd}</Text>
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
      )}
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
