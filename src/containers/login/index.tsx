import React, { useContext, useEffect, useRef } from "react";
import { Button, Layout, Text, Input } from "@ui-kitten/components";
import { useNavigate } from "react-router-native";

import { StyleSheet, View } from "react-native";
import { useMutation } from "react-query";
import { authContext } from "../../hooks/authentication";
import {
  ForgotPassword,
  ForgotPasswordOTP,
} from "../../services/authentication";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [OTP, setOTP] = React.useState("");
  const [forgotpass, setForgotPass] = React.useState(false);
  const [forgotpassOTP, setForgotPassOTP] = React.useState(false);
  const auth = useContext(authContext);

  const loginMutation = useMutation(
    (data: { phone?: string; email?: string; password?: string }) => {
      return auth.signIn({
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
    }
  );

  const onClickLogin = async () => {
    return await loginMutation.mutate({ phone, email, password });
  };

  const onClickForgot = async () => {
    await ForgotPassword({ email: email }).then((data) => console.log(data));
    setForgotPassOTP(true);
    // console.log(ForgotPassword);
  };

  const onClickComplete = async () => {
    await ForgotPasswordOTP({ email: email, npwd: password, OTP: OTP });
    setForgotPass(false);
    setForgotPassOTP(false);
    console.log("ForgotPassword");
  };

  useEffect(() => {
    if (loginMutation.isSuccess && auth.user?.accountId) {
      navigate("/");
    }
  }, [loginMutation.isSuccess, auth.user]);

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "30%",
        }}
      >
        {!forgotpass && (
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={styles.column}>
              <Text style={{ fontSize: 30 }}>Web App</Text>
              <Text style={styles.text}>
                Vui lòng đăng nhập bằng tài khoản được cấp để tiếp tục
              </Text>
            </View>
            {/* {loginMutation.isSuccess && loginMutation.data.status === "error" && (
            <Text style={styles.text} status="danger">
              {loginMutation.data.message}
            </Text>
          )} */}
            <Input
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={(nextValue) => setPhone(nextValue)}
            />
            <Input
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Input
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />
            <View style={styles.rowRight}>
              <Text
                style={styles.textRight}
                onPress={() => setForgotPass(true)}
              >
                Quên mật khẩu?
              </Text>
            </View>
            <Layout
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 15,
                paddingRight: 15,
                width: "100%",
              }}
            >
              <Button style={styles.button} onPress={() => onClickLogin()}>
                Đăng nhập
              </Button>
              {/* <Text style={styles.text}>Hoặc</Text>
              <View style={styles.loginGoogle}>
                <Button style={styles.buttonorther}>
                  Đăng nhập với Google
                </Button>
                <View
                  nativeID="loginWithGoogle"
                  ref={loginGoogleButtonRef}
                  style={styles.loginGoogleButton}
                ></View>
              </View> */}
            </Layout>
          </View>
        )}
        {forgotpass && !forgotpassOTP && (
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={styles.column}>
              <Text style={{ fontSize: 30 }}>Web App</Text>
              <Text style={styles.text}>
                Nhập tên tài khoản để khôi phục mật khẩu
              </Text>
            </View>
            {/* {forgotPassMutation.isSuccess &&
            forgotPassMutation.data.status === "error" && (
              <Text style={styles.text} status="danger">
                {forgotPassMutation.data.message}
              </Text>
            )} */}
            <Input
              style={styles.inputforgot}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />
            <Layout
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 15,
                paddingRight: 15,
                width: "100%",
              }}
            >
              <Button style={styles.button} onPress={() => onClickForgot()}>
                Gửi yêu cầu
              </Button>
            </Layout>
          </View>
        )}
        {forgotpass && forgotpassOTP && (
          <View style={{ alignItems: "center", width: "100%" }}>
            <View style={styles.column}>
              <Text style={{ fontSize: 30 }}>Web App</Text>
              <Text style={styles.text}>
                Nhập tên tài khoản để khôi phục mật khẩu
              </Text>
            </View>
            {/* {forgotPassMutation.isSuccess &&
            forgotPassMutation.data.status === "error" && (
              <Text style={styles.text} status="danger">
                {forgotPassMutation.data.message}
              </Text>
            )} */}
            <Input
              style={styles.inputforgot}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={(nextValue) => setEmail(nextValue)}
            />

            <Input
              style={styles.input}
              placeholder="OTP"
              value={OTP}
              secureTextEntry={true}
              onChangeText={(nextValue) => setOTP(nextValue)}
            />

            <Input
              style={styles.input}
              placeholder="New Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(nextValue) => setPassword(nextValue)}
            />
            <Layout
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 15,
                paddingRight: 15,
                width: "100%",
              }}
            >
              <Button style={styles.button} onPress={() => onClickComplete()}>
                Gửi yêu cầu
              </Button>
            </Layout>
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
  image: {
    width: "100%",
    height: 50,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
  },
  rowRight: {
    display: "flex",
    width: "100%",
  },
  text: {
    margin: 2,
  },
  textRight: {
    justifyContent: "flex-end",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    textAlign: "right",
    color: "#636e72",
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 4,
    width: "100%",
  },
  inputforgot: {
    paddingLeft: 15,
    paddingRight: 15,
    marginVertical: 4,
    paddingBottom: 10,
    width: "100%",
  },
  button: {
    marginVertical: 4,
    borderRadius: 48,
    width: "100%",
    backgroundColor: "#5b5fc7",
    borderColor: "#5b5fc7",
  },
  buttonorther: {
    marginVertical: 4,
    borderRadius: 48,
    width: "100%",
    backgroundColor: "#dc3545",
    borderColor: "#dc3545",
  },
  loginGoogle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginGoogleButton: {
    position: "absolute",
    opacity: 0,
  },
});

export default Login;
