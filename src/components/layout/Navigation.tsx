import {
  Divider,
  Menu,
  MenuGroup,
  MenuItem,
  Button,
  IndexPath,
  Text,
  Layout,
} from "@ui-kitten/components";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import FAI1con from "react-native-vector-icons/FontAwesome";
import MFeatherIcon from "react-native-vector-icons/Feather";
// import { authContext } from "../../hooks/authentication";
import { useNavigate } from "react-router-native";
import { authContext } from "../../hooks/authentication";

const HomeIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="home" color="#000000" />
);
const LogOutIcon = (props) => (
  <MFeatherIcon {...props} style={styles.icon} name="log-out" color="#000000" />
);

const ListIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="list-alt" color="#000000" />
);
const AvartarIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="user-circle" color="#000000" />
);
const FileIcon = (props) => (
  <FAIcon
    {...props}
    style={styles.icon}
    name="file-signature"
    color="#000000"
  />
);
const ClipboardIcon = (props) => (
  <FAIcon
    {...props}
    style={styles.icon}
    name="clipboard-check"
    color="#000000"
  />
);
const NewspaperIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="newspaper" color="#000000" />
);
const TerminalIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="terminal" color="#000000" />
);
const EyeIcon = (props) => (
  <FAIcon {...props} style={styles.icon} name="eye" color="#000000" />
);
const SettingsIcon = (props) => (
  <MFeatherIcon
    {...props}
    style={styles.icon}
    name="settings"
    color="#000000"
  />
);

export const Navigation = () => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  return (
    <Layout style={styles.layoutMenuBar}>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={styles.MenuItem}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Text style={{ fontSize: 25 }}>Web App</Text>
          </View>

          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Overview"
            accessoryLeft={HomeIcon}
            // onPressIn={}
          />
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="List trip"
            accessoryLeft={ListIcon}
            onPressIn={() => navigate("/")}
          />
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Book a trip"
            accessoryLeft={AvartarIcon}
            onPressIn={() => navigate("/create")}
          />
        </View>
        <View style={styles.MenuItem}>
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Customers"
            accessoryLeft={AvartarIcon}
            onPressIn={() => navigate("/customers")}
          />
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Drivers"
            accessoryLeft={AvartarIcon}
            onPressIn={() => navigate("/drivers")}
          />
          {/* <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Connected accounts"
            accessoryLeft={ClipboardIcon}
            // onPressIn={}
          /> */}
        </View>
        <View style={styles.MenuItem}>
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Setting"
            accessoryLeft={SettingsIcon}
            onPressIn={() => {
              navigate("/info");
            }}
          />
          <MenuItem
            style={{ backgroundColor: "#F6F8F9" }}
            title="Sign out"
            accessoryLeft={LogOutIcon}
            onPressIn={() => {
              auth.signOut();
              navigate("/");
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutMenuBar: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexShrink: 1,
    backgroundColor: "#F6F8F9",
  },
  MenuItem: {
    backgroundColor: "#F6F8F9",
  },
  image: {
    width: "70%",
    height: 50,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  icon: {
    paddingLeft: 3,
    paddingRight: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
