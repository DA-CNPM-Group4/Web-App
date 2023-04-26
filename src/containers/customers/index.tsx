import React, { useContext, useEffect, useRef } from "react";
import {
  Button,
  Layout,
  Text,
  Input,
  ListItem,
  List,
  OverflowMenu,
} from "@ui-kitten/components";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { getListPassenger, getListTrip } from "../../services/getapi";
import { authContext } from "../../hooks/authentication";

export const Customers = (props) => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const [status, setStatus] = React.useState({
    name: "Huynh Loi Chuan",
    email: "loichuanhuynh@gmail.com",
    phone: "0123456789",
    address: "DH KHTN TP HCM",
  });
  const StepBackwardIcon = (props) => (
    <Icon
      {...props}
      style={styles.icon1}
      name="step-backward"
      color="#000000"
    />
  );

  const LeftIcon = (props) => (
    <Icon {...props} style={styles.icon1} name="chevron-left" color="#000000" />
  );
  const StepForwarIcon = (props) => (
    <Icon {...props} style={styles.icon1} name="step-forward" color="#000000" />
  );
  const RightIcon = (props) => (
    <Icon
      {...props}
      style={styles.icon1}
      name="chevron-right"
      color="#000000"
    />
  );

  const AvartarIcon = (props) => (
    <Icon {...props} style={styles.icon2} name="user-circle" color="#000000" />
  );
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
    setPhone(status.phone);
    setAddress(status.address);
  }, [status]);

  const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const rootData = useQuery("customers", () => getListPassenger());

  const [page, setpage] = React.useState(1);
  const [totalpage, settotalpage] = React.useState(1);

  const leftPage = () => {
    if (page > 1) setpage(page - 1);
  };

  const leftMaxPage = () => {
    if (page > 1) setpage(1);
  };

  const rightPage = () => {
    if (page < totalpage) setpage(page + 1);
  };

  const rightMaxPage = () => {
    if (page < totalpage) setpage(totalpage);
  };

  useEffect(() => {
    if (rootData === null) return;
    console.log(rootData.data);
    const temp: number = rootData.data?.data?.length / 18;
    const temp1 = parseInt(temp.toString());
    if (temp > temp1) settotalpage(temp1 + 1);
    else settotalpage(temp1);
  }, [rootData.isFetched, rootData.isFetching]);

  const renderItem = ({ item, index }) => {
    if (0 + (page - 1) * 18 <= index && index < page * 18)
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
              address: "Truong DH KHTN",
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
              <Text style={{ fontSize: 13 }}>{"Truong DH KHTN"}</Text>
            </View>
            <View
              style={{
                width: "20%",
                paddingVertical: 5,
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 1,
              }}
            >
              <Text style={{ fontSize: 13 }}>
                {item.gender ? "Male" : "Female"}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 5,
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 1,
              }}
            >
              <Button
                size="tiny"
                appearance="ghost"
                status="basic"
                onPress={() => {
                  auth.SetID({ id: item.accountId });
                  navigate("/listtripbycustomer");
                }}
              >
                ...
              </Button>
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
        height: "100%",
        flexShrink: 1,
      }}
    >
      {!info && (
        <View style={{ width: "100%", height: "100%", flexShrink: 1 }}>
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
              height: "100%",
              flexShrink: 1,
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
            {rootData.isSuccess && rootData.data?.data?.length > 0 && (
              <List
                style={{
                  maxHeight: "100%",
                  width: "100%",
                  flexShrink: 1,
                }}
                data={rootData.data?.data}
                renderItem={renderItem}
              />
            )}
            {rootData.isSuccess && rootData.data?.data?.length > 0 && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 20,
                }}
              >
                <Button
                  appearance="ghost"
                  size="small"
                  accessoryLeft={StepBackwardIcon}
                  onPress={() => {
                    leftMaxPage();
                  }}
                ></Button>
                <Button
                  appearance="ghost"
                  size="small"
                  accessoryLeft={LeftIcon}
                  onPress={() => {
                    leftPage();
                  }}
                ></Button>
                {page === 1 && totalpage > 2 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      status={"primary"}
                      appearance="outline"
                      size="small"
                    >
                      1
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(2);
                      }}
                    >
                      2
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                  </View>
                ) : totalpage === 3 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      status={page === 1 ? "primary" : "basic"}
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        if (page != 1) setpage(1);
                      }}
                    >
                      1
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status={page === 2 ? "primary" : "basic"}
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        if (page != 2) setpage(2);
                      }}
                    >
                      2
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status={page === 3 ? "primary" : "basic"}
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        if (page != 3) setpage(3);
                      }}
                    >
                      3
                    </Button>
                  </View>
                ) : page > 2 && totalpage - page >= 2 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(page - 1);
                      }}
                    >
                      {page - 1}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button status="primary" appearance="outline" size="small">
                      {page}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(page + 1);
                      }}
                    >
                      {page + 1}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                  </View>
                ) : page === 2 && totalpage - page > 2 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(1);
                      }}
                    >
                      1
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button status="primary" appearance="outline" size="small">
                      2
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(3);
                      }}
                    >
                      3
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                  </View>
                ) : page === 1 && totalpage === 1 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button status="primary" appearance="outline" size="small">
                      1
                    </Button>
                  </View>
                ) : page <= 2 && totalpage === 2 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      status={page === 1 ? "primary" : "basic"}
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        if (page != 1) setpage(1);
                      }}
                    >
                      1
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status={page === 2 ? "primary" : "basic"}
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        if (page != 2) setpage(2);
                      }}
                    >
                      2
                    </Button>
                  </View>
                ) : page === totalpage && totalpage > 3 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(page - 1);
                      }}
                    >
                      {page - 1}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button status="primary" appearance="outline" size="small">
                      {page}
                    </Button>
                  </View>
                ) : page > 2 && totalpage - page === 1 ? (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(page - 1);
                      }}
                    >
                      {page - 1}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button status="primary" appearance="outline" size="small">
                      {page}
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      status="basic"
                      appearance="outline"
                      size="small"
                      onPress={() => {
                        setpage(page + 1);
                      }}
                    >
                      {page + 1}
                    </Button>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button status="basic" appearance="outline" size="small">
                      2
                    </Button>
                    <View style={{ paddingHorizontal: 5 }}></View>
                    <Button
                      style={{ width: 40.91 }}
                      status="basic"
                      appearance="outline"
                      size="small"
                    >
                      ...
                    </Button>
                  </View>
                )}
                <Button
                  appearance="ghost"
                  size="small"
                  accessoryLeft={RightIcon}
                  onPress={() => {
                    rightPage();
                  }}
                ></Button>
                <Button
                  appearance="ghost"
                  size="small"
                  accessoryLeft={StepForwarIcon}
                  onPress={() => {
                    rightMaxPage();
                  }}
                ></Button>
              </View>
            )}
            {rootData.isSuccess && rootData.data?.data?.length <= 0 && (
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
              <View
                style={{
                  width: 100,
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AvartarIcon></AvartarIcon>
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
  icon2: {
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
  icon1: {
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Customers;
