import React, { useContext, useEffect, useRef } from "react";
import { Button, Layout, Text, Input } from "@ui-kitten/components";
import { useNavigate } from "react-router-native";

import { StyleSheet, View } from "react-native";
import { useMutation } from "react-query";

export const CreateTrip = (props) => {
  const navigate = useNavigate();

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Text>Driver</Text>
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

export default CreateTrip;
