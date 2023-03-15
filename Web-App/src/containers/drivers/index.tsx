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
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
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
          Drivers
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
        {data.length > 0 && (
          <List
            style={{
              maxHeight: "100%",
              width: "100%",
            }}
            data={data}
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
});

export default Customers;
