import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { joinRoom, createRoom } from "./NetworkFuncs";

const MenuMultiplayer = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [argument, setArgument] = useState("");
  const [roomCode, setRoomCode] = useState("");

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.multiplayerContainer}>
        {/* <View style={styles.imgCont}> */}
        <Image
          style={styles.img}
          source={require("../assets/ARGULYMPICS.png")}
        />
        {/* </View> */}

        <View style={styles.inputs}>
          <View style={styles.argumentInput}>
            <Text style={styles.inputText}>What are you fighting for?!</Text>
            <TextInput
              style={styles.textInputBox}
              onChangeText={(text) => setArgument(text)}
              placeholder="Input Argument"
              // dense={true}
            />
          </View>

          <View style={styles.createGame}>
            <Text style={styles.inputText}>Starting An Argument?</Text>
            <View style={styles.button}>
              <Button
                mode="contained"
                color="blue"
                onPress={() => createRoom(user, argument, navigation)}
              >
                Create a Room
              </Button>
            </View>
          </View>

          <View style={styles.joinRoom}>
            <Text style={styles.inputText}>Joining An Argument?</Text>
            <TextInput
              style={styles.textInputBox}
              onChangeText={(text) => setRoomCode(text)}
              placeholder="Enter room code"
              // dense={true}
            />
            <View style={styles.button}>
              <Button
                mode="contained"
                color="blue"
                onPress={() => joinRoom(roomCode, user, argument, navigation)}
              >
                Join a Room
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  multiplayerContainer: {
    flex: 1,
    backgroundColor: "#bde0fe",
    alignItems: "center",
  },

  img: {
    flex: 2,
    width: "90%",
    resizeMode: "center",
  },

  inputs: {
    marginTop: 8,
    marginBottom: 30,
    flex: 3,
    justifyContent: "center",
    width: "60%",
  },

  argumentInput: {
    flex: 1,
  },
  joinRoom: {
    flex: 1,
  },
  createGame: {
    flex: 1,
  },

  button: {
    margin: 5,
  },
  inputText: {
    fontFamily: "Graduate",
    fontSize: 18,
    textAlign: "center",
  },
});

export default MenuMultiplayer;
