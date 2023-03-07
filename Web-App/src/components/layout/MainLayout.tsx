import React, { useContext, useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
// import { EBottomTab, navigationContext } from "../../hooks/navigation";
// import { BottomTab } from "./BottomNavigation";
// import { TopNavigation } from "./TopNavigation";
// import { SideBar } from "./SideBar";
import { Layout } from "@ui-kitten/components";

export const MainLayout = ({ children }) => {
  //   const navigation = useContext(navigationContext);

  return (
    <Layout style={styles.mainLayout} nativeID="mainLayout">
      <Layout style={styles.mainScreen}>
        {/* <TopNavigation /> */}

        <View style={styles.viewPoint} nativeID="content">
          {children}
        </View>

        {/* <BottomTab /> */}
      </Layout>

      {/* {navigation.state.isShowSideBar && <SideBar />} */}
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
    flexDirection: "column",
    height: "100%",
  },
  viewPoint: {
    flexShrink: 1,
    height: Dimensions.get("window").height - 66 - 52,
  },
});
