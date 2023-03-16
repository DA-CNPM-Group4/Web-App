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
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getListPassenger, getListTrip } from "../../services/getapi";

export const Customers = (props) => {
  const navigate = useNavigate();
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
  const [name, setName] = React.useState(status.name);
  const [email, setEmail] = React.useState(status.email);
  const [phone, setPhone] = React.useState(status.phone);
  const [address, setAddress] = React.useState(status.address);

  useEffect(() => {
    setName(status.name);
    setEmail(status.email);
    setPhone(status.phone), setAddress(status.address);
  }, [status]);

  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const rootData = useQuery("dlumens", () => getListPassenger());
  const root = useQuery("dens", () => getListTrip());

  useEffect(() => {
    console.log(rootData.data);
  }, [rootData.isFetched, rootData.isFetching]);

  useEffect(() => {
    console.log("OK");
    console.log(root.data);
  }, [root.isFetched, root.isFetching]);

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
          setStatus({
            name: item.name,
            email: item.email,
            phone: item.phone,
            address: "DH KHTN TP HCM",
          });
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>{item.name}</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>{item.phone}</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>{item.email}</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>Trường ĐH KHTN TPHCM</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>Male</Text>
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
              Customers
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
                <Text>NAME</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>PHONE</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>EMAIL</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>HOME</Text>
              </View>
              <View
                style={{
                  width: "20%",
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>GENDER</Text>
              </View>
            </View>
            {rootData.isSuccess &&
              rootData.data?.status &&
              rootData.data?.data?.length > 0}
            {data.length > 0 && (
              <List
                style={{
                  maxHeight: "100%",
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
        <View
          style={{
            width: "100%",
            flexShrink: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: 30,
          }}
        >
          <View
            style={{
              width: "70%",
              flexShrink: 1,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                paddingVertical: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Button
                  style={{ height: 40 }}
                  appearance="ghost"
                  accessoryLeft={BackIcon}
                  onPress={() => {
                    setInfo(false);
                  }}
                ></Button>
                <Text style={{ fontSize: 25 }} category="s1">
                  View Profile
                </Text>
              </View>
              <View style={{ borderWidth: 1, width: 100, height: 100 }}>
                <Text style={{ fontSize: 25 }} category="s1">
                  Image
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ paddingVertical: 5, fontSize: 20 }} category="s1">
                Name
              </Text>
              <View
                style={{
                  borderColor: "#858585",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    borderWidth: 0,
                    backgroundColor: "#FFFFFF",
                  }}
                  placeholder="Name....."
                  value={name}
                  onChangeText={(nextValue) => setName(nextValue)}
                ></Input>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ paddingVertical: 5, fontSize: 20 }} category="s1">
                Email
              </Text>
              <View
                style={{
                  borderColor: "#858585",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    borderWidth: 0,
                    backgroundColor: "#FFFFFF",
                  }}
                  placeholder="Email....."
                  value={email}
                  accessoryRight={CheckIcon}
                  onChangeText={(nextValue) => setEmail(nextValue)}
                ></Input>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ paddingVertical: 5, fontSize: 20 }} category="s1">
                Contact Number
              </Text>
              <View
                style={{
                  borderColor: "#858585",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    borderWidth: 0,
                    backgroundColor: "#FFFFFF",
                  }}
                  placeholder="Contact number....."
                  value={phone}
                  onChangeText={(nextValue) => setPhone(nextValue)}
                ></Input>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Text style={{ paddingVertical: 5, fontSize: 20 }} category="s1">
                Address
              </Text>
              <View
                style={{
                  borderColor: "#858585",
                  borderWidth: 1,
                  paddingHorizontal: 2,
                  paddingVertical: 2,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    borderWidth: 0,
                    backgroundColor: "#FFFFFF",
                  }}
                  placeholder="Address....."
                  value={address}
                  onChangeText={(nextValue) => setAddress(nextValue)}
                ></Input>
              </View>
            </View>
          </View>
        </View>
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
