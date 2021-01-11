import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { firebase } from "../src/firebaseConfig";

const MenuMultiplayer = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  const [argument, setArgument] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const db = firebase.firestore();

  const joinRoom = (roomCode) => {
    db.collection("multiplayerGames")
      .where("roomCode", "==", roomCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection("multiplayerGames")
            .doc(roomCode)
            .collection("users")
            .doc(user.username)
            .set({
              username: user.username,
              userId: user.id,
              userImg: user.userImg,
              score: 0,
              argument: argument,
              isHost: false,
            });
          navigation.navigate("WaitingRoom", { user, roomCode });
        } else {
          alert({ error: "Room does not exist!" });
        }
      });
  };

  const createRoom = () => {
    if (argument.length > 0) {
      navigation.navigate("WaitingRoom", {
        argument,
        isHost: true,
        user,
      });
    }
  };

  return (
    <View style={styles.menuMultiplayerContainer}>
      <View>
        <View style={styles.argumentInput}>
          <Text>What are you fighting for?!</Text>
          <TextInput
            onChangeText={(text) => setArgument(text)}
            placeholder="Input Argument"
          />
        </View>
        <View style={styles.joinRoom}>
          <Text>Joining An Argument?</Text>
          <TextInput
            onChangeText={(text) => setRoomCode(text)}
            placeholder="Enter room code"
            dense={true}
          />
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() => joinRoom(roomCode)}
            >
              Join a Room
            </Button>
          </View>
        </View>
        <Text>Starting An Argument?</Text>
        <View style={styles.button}>
          <Button mode="contained" color="blue" onPress={() => createRoom()}>
            Create a Room
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuMultiplayerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  argumentInput: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    margin: 5,
    flex: 1,
  },
  joinRoom: {
    height: 100,
  },
});

export default MenuMultiplayer;
