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
import Icon1 from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import {
  getListDriver,
  getListPassenger,
  getListTrip,
  getListTripbyCustomer,
} from "../../services/getapi";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import { authContext } from "../../hooks/authentication";
import { getInfoDriver, getInfoPassenger } from "../../services/authentication";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { API_Key } from "../../config";

const AvartarIcon = (props) => (
  <Icon {...props} style={styles.icon} name="user-circle" color="#000000" />
);
const GreenIcon = (props) => (
  <Icon1 {...props} style={styles.icon1} name="locate-sharp" color="#62EE20" />
);
const RedIcon = (props) => (
  <Icon1
    {...props}
    style={styles.icon1}
    name="location-sharp"
    color="#EE4520"
  />
);
const StarIcon = (props) => (
  <Icon {...props} style={styles.icon1} name="star" color="#EDCB1C" />
);

export const Customers = (props) => {
  const navigate = useNavigate();
  const auth = useContext(authContext);

  const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://doancnpmnhom4-6bc5e-default-rtdb.firebaseio.com",
  };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database);
  const OnClickTrip = (tripId) => {
    if (tripId === "") return;
    get(child(dbRef, `trips/${tripId}`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          if (snapshot.val()?.TripStatus === "PickingUpCus") {
            let driver = null;
            await OnClickDriver(snapshot.val()?.DriverId).then(
              (newData) => (driver = newData)
            );

            console.log("driver" + driver);
            if (driver === null) {
              console.log("Driver no active");
              return;
            } else {
              setOrigin({
                lat: driver.lat,
                lng: driver.long,
              });
              console.log({
                lat: driver.lat,
                lng: driver.long,
              });
              setDestination({
                lat: destinationb.lat,
                lng: destinationb.lng,
              });
              console.log({
                lat: destinationb.lat,
                lng: destinationb.lng,
              });
            }
            return;
          } else if (snapshot.val()?.TripStatus === "OnTheWay") {
            let driver = null;
            await OnClickDriver(snapshot.val()?.DriverId).then(
              (newData) => (driver = newData)
            );

            console.log("driver" + driver);
            if (driver === null) {
              console.log("Driver no active");
              return;
            } else {
              setOrigin({
                lat: originb.lat,
                lng: originb.lng,
              });
              setDestination({
                lat: driver.lat,
                lng: driver.long,
              });
              console.log({
                lat: driver.lat,
                lng: driver.long,
              });
              console.log({
                lat: originb.lat,
                lng: originb.lng,
              });
            }
            return;
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const OnClickDriver = async (driverId) => {
    let result = null;
    await get(child(dbRef, `drivers/${driverId}/location`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          result = snapshot.val();
        } else {
          console.log("Driver null");
          result = null;
        }
      })
      .catch((error) => {
        console.error(error);
        result = null;
      });
    return result;
  };

  const [distance, setDistance] = React.useState("");
  const [tripId, setTripId] = React.useState("");
  const [duration, setDuration] = React.useState("");

  const center = {
    lat: 10.75552665046525,
    lng: 106.66452829325283,
  };
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [originb, setOriginb] = React.useState(null);
  const [destinationb, setDestinationb] = React.useState(null);
  const [directionsResponse, setDirectionsResponse] = React.useState(null);

  useEffect(() => {
    if (directionsResponse === null) return;
    console.log(directionsResponse);
  }, [directionsResponse]);
  useEffect(() => {
    if (origin === null || destination === null) return;
    console.log(origin);

    console.log(destination);
    calculateRoute();
    const interval = setInterval(() => {
      OnClickTrip(tripId);
    }, 20 * 1000);
    return () => clearInterval(interval);
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
  }

  const [map, setMap] = React.useState(/** @type google.maps.Map */ null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_Key,
    libraries: ["places"],
  });

  const [info, setInfo] = React.useState(false);
  const BackIcon = (props) => (
    <Icon {...props} style={styles.icon} name="arrow-left" color="#000000" />
  );
  const CheckIcon = (props) => (
    <Icon {...props} style={styles.icon} name="check-square" color="#23B000" />
  );
  const [Dname, setDName] = React.useState("");
  const [vehicleType, setvehicleType] = React.useState("Motorbike");
  const [Passengers, setP] = React.useState<any>(null);
  const [Drivers, setD] = React.useState<any>(null);

  useEffect(() => {
    getListPassenger().then((data) => {
      setP(data.data);
    });
    getListDriver().then((data) => {
      setD(data.data);
    });
  }, []);
  const [Cname, setCName] = React.useState("");
  const [startAdd, setStartAdd] = React.useState("");
  const [EndAdd, setEndAdd] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [trip, setTrip] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const rootData = useQuery(["", "/", auth.id], () =>
    getListTripbyCustomer({ id: auth.id })
  );
  const [rootDataProcess, setRootDataProcess] = React.useState<any>(null);

  useEffect(() => {
    if (rootDataProcess === null) return;
    console.log(rootDataProcess);
    setFlag(true);
  }, [rootDataProcess]);

  useEffect(() => {
    if (rootData === null) return;
    setFlag(false);
    const data = rootData.data?.data?.map((item, index, map) => {
      const customer = Passengers?.find(
        (p) => p.accountId === item.passengerId
      );
      const driver = Drivers?.find((d) => d.accountId === item.driverId);
      if (customer != undefined) {
        item.PassengerName = customer?.name;
      } else item.PassengerName = "No Name";
      if (driver != undefined) {
        item.DriverName = driver?.name;
      } else item.DriverName = "No Name";
      return item;
    });
    setRootDataProcess(data);
  }, [rootData.isFetched, rootData.isFetching, Passengers, Drivers]);

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
          setDName(item?.DriverName);
          setCName(item?.PassengerName);
          setvehicleType(item?.vehicleType);
          setDistance(item?.distance?.toFixed(2));
          setStartAdd(item?.startAddress);
          setEndAdd(item?.destination);
          setPrice(item?.price);
          setTrip(item?.tripId);
          setInfo(true);
          setOriginb({
            lat: item?.latStartAddr,
            lng: item?.longStartAddr,
          });
          setDestinationb({
            lat: item?.latDesAddr,
            lng: item?.longDesAddr,
          });
          setOrigin({
            lat: item?.latStartAddr,
            lng: item?.longStartAddr,
          });
          setDestination({
            lat: item?.latDesAddr,
            lng: item?.longDesAddr,
          });
          setTripId(item?.tripId);
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
              {item?.DriverName}
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
              {item?.PassengerName}
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
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
              }}
            >
              {item?.distance?.toFixed(2)}
              {" km"}
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
            {rootData.isSuccess && flag && rootData.data?.data?.length > 0 && (
              <List
                style={{
                  maxHeight: "100%",
                  flexShrink: 1,
                  width: "100%",
                }}
                data={rootDataProcess}
                renderItem={renderItem}
              />
            )}
            {rootData.isSuccess && flag && rootData.data?.data?.length <= 0 && (
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
            width: "100%",
            paddingLeft: 20,
            paddingVertical: 20,
            paddingRight: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              width: "40%",
              paddingRight: 5,
              flexDirection: "column",
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
                  setTripId("");
                  setOrigin(null);
                  setDestination(null);
                  setOriginb(null);
                  setDestinationb(null);
                  setInfo(false);
                  setDirectionsResponse(null);
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
                TripId: {trip}
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
                Total payable: {price}
                {" vnđ"}
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
              <View
                style={{
                  paddingVertical: 5,
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  paddingRight: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>{vehicleType}</Text>
                <Text style={{ fontSize: 20 }}>{distance} km</Text>
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
                  <View
                    style={{
                      width: "100%",
                      paddingLeft: 10,
                      flexDirection: "column",
                    }}
                  >
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
                  <View
                    style={{
                      width: "100%",
                      paddingLeft: 10,
                      flexDirection: "column",
                    }}
                  >
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
                  alignItems: "center",
                  flexDirection: "row",
                  paddingRight: 20,
                }}
              >
                <Text style={{ fontSize: 20 }}>Trip review:</Text>
                <View style={{ paddingHorizontal: 5 }}></View>
                <Text style={{ fontSize: 20 }}>4 </Text>
                <StarIcon></StarIcon>
              </View>
            </View>
          </View>
          <View style={{ width: "70%", height: "80%" }}>
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
  icon2: {
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon1: {
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Customers;
