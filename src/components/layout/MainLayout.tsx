import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
// import { EBottomTab, navigationContext } from "../../hooks/navigation";
// import { BottomTab } from "./BottomNavigation";
// import { TopNavigation } from "./TopNavigation";
// import { SideBar } from "./SideBar";
import { Layout } from "@ui-kitten/components";
import { Navigation } from "./navigation";

export const MainLayout = ({ children }) => {
  return (
    <Layout style={styles.mainLayout} nativeID="mainLayout">
      <Layout style={styles.mainScreen}>
        <Navigation />
        <View style={styles.viewPoint} nativeID="content">
          {children}
        </View>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    flexDirection: "column",
    height: "100vh",
  },
  mainScreen: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
  },
  viewPoint: {
    flexShrink: 1,
    width: "100%",
    height: Dimensions.get("window").height,
  },
});
