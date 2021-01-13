import React, { useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase, firebaseConfig } from "../src/firebaseConfig";

const Signup = ({ route, navigation, setUser }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordsMismatch, setPasswordsMismatch] = useState(false);

  const handlePress = () => {
    if (email.length < 1 && password.length < 1 && username.length < 1) {
      setEmptyEmail(true);
      setEmptyPassword(true);
      setEmptyUsername(true);
    } else if (email.length < 1 && password.length < 1 && username.length > 0) {
      setEmptyEmail(true);
      setEmptyPassword(true);
      setEmptyUsername(false);
    } else if (email.length < 1 && password.length > 0 && username.length < 1) {
      setEmptyEmail(true);
      setEmptyPassword(false);
      setEmptyUsername(true);
    } else if (email.length < 1 && password.length > 0 && username.length > 0) {
      setEmptyEmail(true);
      setEmptyPassword(false);
      setEmptyUsername(false);
    } else if (email.length > 0 && password.length < 1 && username.length < 1) {
      setEmptyEmail(false);
      setEmptyPassword(true);
      setEmptyUsername(true);
    } else if (email.length > 0 && password.length < 1 && username.length > 0) {
      setEmptyEmail(false);
      setEmptyPassword(true);
      setEmptyUsername(false);
    } else if (email.length > 0 && password.length > 0 && username.length < 1) {
      setEmptyEmail(false);
      setEmptyPassword(false);
      setEmptyUsername(true);
    } else if (confirmPassword !== password) {
      setPasswordsMismatch(true);
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);
      setEmptyUsername(false);
      setPasswordsMismatch(false);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          const userData = {
            id: uid,
            email,
            username,
            createdAt: new Date().toISOString(),
            decision: "None",
            firstName: "",
            lastName: "",
            userImg: `no-profile-image.png`,
          };

          const scoresData = {
            id: uid,
            createdAt: new Date().toISOString(),
            highScore: 0,
          };

          const usersRef = firebase.firestore().collection("users");
          const scoresRef = firebase.firestore().collection("scores");

          usersRef
            .doc(uid)
            .set(userData)
            .then(() => {
              scoresRef.doc(uid).set(scoresData);
            })
            .then(() => {
              setUser(userData);
              navigation.navigate("GameChoice", { user: userData });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.signupContainer}>
        <Image
          style={styles.img}
          source={require("../assets/ARGULYMPICS.png")}
        />
        <Text style={styles.subtitle}>Sign Up!</Text>
        <View style={styles.signupItems}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            dense={true}
          />
          <HelperText type="error" visible={emptyUsername}>
            Enter a username
          </HelperText>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="Email"
            dense={true}
          />
          <HelperText type="error" visible={emptyEmail}>
            Please enter your email
          </HelperText>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            dense={true}
            secureTextEntry={true}
          />
          <HelperText type="error" visible={emptyPassword}>
            Enter a password
          </HelperText>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder="Repeat Password"
            dense={true}
            secureTextEntry={true}
          />
          <HelperText type="error" visible={passwordsMismatch}>
            Passwords do not match
          </HelperText>
          <View style={styles.buttons}>
            <Button mode="contained" color="blue" onPress={handlePress}>
              Sign Up
            </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  signupContainer: {
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
  subtitle: {
    fontFamily: "Graduate",
    fontSize: 32,
    marginBottom: 20,
  },
  signupItems: {
    flex: 1,
    width: "50%",
  },
  buttons: {
    marginTop: 5,
    borderRadius: 20,
  },
});

export default Signup;
