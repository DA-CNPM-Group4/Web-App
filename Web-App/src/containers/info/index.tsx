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
export const Customers = (props) => {
  const navigate = useNavigate();

  const data = [{ a: 1 }];

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
            <Text style={{ fontSize: 13 }}>Huỳnh Lợi chuẩn</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>0123456789</Text>
          </View>
          <View
            style={{
              width: "20%",
              paddingVertical: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>loichuanhuynh@gmail.com</Text>
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
          alignItems: "flex-start",
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
          <Text style={{ paddingVertical: 5 }}>Name</Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ width: "100%" }}>Huynh Loi Chuan</Text>
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
          <Text style={{ paddingVertical: 5 }}>Email</Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ width: "100%" }}>loichuanhuynh@gmail.com</Text>
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
          <Text style={{ paddingVertical: 5 }}>Contact Number</Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ width: "100%" }}>01234656789</Text>
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
          <Text style={{ paddingVertical: 5 }}>Address</Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ width: "100%" }}>DH KHTN TPHCM</Text>
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
          <Text style={{ paddingVertical: 5 }}>Password</Text>
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              width: "100%",
            }}
          >
            <Text style={{ width: "100%" }}>123466</Text>
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
