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

import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getListPassenger } from "../services/getapi";
import Icon from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Feather";

const BackIcon = (props) => (
  <Icon {...props} style={styles.icon} name="arrow-left" color="#000000" />
);
const EditIcon = (props) => (
  <Icon {...props} style={styles.icon} name="edit" color="#000000" />
);
const NotiIcon = (props) => (
  <Icon {...props} style={styles.icon} name="bell" color="#000000" />
);
const LockIcon = (props) => (
  <Icon {...props} style={styles.icon} name="lock" color="#000000" />
);
const SettingIcon = (props) => (
  <Icon2 {...props} style={styles.icon} name="settings" color="#000000" />
);
const QuestionIcon = (props) => (
  <Icon {...props} style={styles.icon} name="question" color="#000000" />
);
const CheckIcon = (props) => (
  <Icon {...props} style={styles.icon} name="check-square" color="#23B000" />
);
export const Customers = (props) => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState({
    name: "Huynh Loi Chuan",
    email: "loichuanhuynh@gmail.com",
    phone: "0123456789",
    address: "DH KHTN TP HCM",
    password: "0123456",
  });

  const [name, setName] = React.useState(status.name);
  const [email, setEmail] = React.useState(status.email);
  const [phone, setPhone] = React.useState(status.phone);
  const [address, setAddress] = React.useState(status.address);
  const [password, setPassword] = React.useState(status.password);

  return (
    <Layout
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
      }}
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
            style={{ width: "100%", flexShrink: 1, fontSize: 20 }}
            category="s1"
          >
            Setting
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <Button appearance="ghost" status="basic" accessoryLeft={EditIcon}>
            Edit Profile
          </Button>
          <Button appearance="ghost" status="basic" accessoryLeft={NotiIcon}>
            Notification
          </Button>
          <Button appearance="ghost" status="basic" accessoryLeft={LockIcon}>
            Security
          </Button>
          <Button appearance="ghost" status="basic" accessoryLeft={SettingIcon}>
            Appearance
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            accessoryLeft={QuestionIcon}
          >
            Help
          </Button>
        </View>
      </View>
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
            <Text style={{ fontSize: 25 }} category="s1">
              Edit Profile
            </Text>
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
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              paddingHorizontal: 20,
              paddingBottom: 10,
            }}
          >
            <Text style={{ paddingVertical: 5, fontSize: 20 }} category="s1">
              Password
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
                placeholder="Password....."
                value={password}
                accessoryRight={CheckIcon}
                onChangeText={(nextValue) => setPassword(nextValue)}
              ></Input>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 10,
            }}
          >
            <View style={{ paddingRight: 5 }}>
              <Button appearance="outline">Cancel</Button>
            </View>
            <View style={{ paddingLeft: 5 }}>
              <Button style={{ paddingRight: 5 }}>Save</Button>
            </View>
          </View>
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
