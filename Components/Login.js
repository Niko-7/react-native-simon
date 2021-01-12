import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase } from "../src/firebaseConfig";

const Login = ({ navigation }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleLoginPress = () => {
    if (email.length < 1 && password.length < 1) {
      setEmptyEmail(true);
      setEmptyPassword(true);
    } else if (email.length > 0 && password.length < 1) {
      setEmptyEmail(false);
      setEmptyPassword(true);
    } else if (email.length < 1 && password.length > 0) {
      setEmptyEmail(true);
      setEmptyPassword(false);
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          const userRef = firebase.firestore().collection("users");

          userRef
            .doc(uid)
            .get()
            .then((document) => {
              if (!document.exists) {
                alert("Incorrect login details.\nPlease try again.");
                return;
              }

              const user = document.data();
              navigation.navigate("GameChoice", { user });
            });
        })
        .catch((err) => {
          // console.error(err);
          alert("Incorrect login details. \n Please try again.");
          // alert(err);
        });
    }
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.loginContainer}>
        <Image
          style={styles.img}
          source={require("../assets/ARGULYMPICS.png")}
        />
        <Text style={styles.subtitle}>Settle the score!</Text>
        <View style={styles.loginItems}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            dense={true}
          />
          <HelperText type="error" visible={emptyEmail}>
            Please enter your email
          </HelperText>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            maxLength={20}
            dense={true}
            secureTextEntry={true}
          />
          <HelperText type="error" visible={emptyPassword}>
            Please enter a password
          </HelperText>
          <View style={styles.buttons}>
            <Button
              style={styles.button}
              mode="contained"
              color="blue"
              onPress={handleLoginPress}
            >
              Login
            </Button>
          </View>
          <View
            style={{
              margin: 20,
              borderBottomColor: "grey",
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.buttons}>
            <Button
              mode="outlined"
              color="green"
              onPress={() => navigation.navigate("Signup", { email })}
            >
              Signup
            </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bde0fe",
  },
  img: {
    flex: 1,
    width: "90%",
    resizeMode: "center",
    marginBottom: 0,
  },
  textInput: {
    textAlign: "center",
    marginBottom: 10,
  },
  loginItems: {
    width: "50%",
  },
  buttons: {
    margin: 5,
  },

  subtitle: {
    fontFamily: "Graduate",
    fontSize: 32,
    marginBottom: 30,
  },
});

export default Login;
