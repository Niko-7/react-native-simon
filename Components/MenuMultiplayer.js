import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const MenuMultiplayer = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  const [argument, setArgument] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const joinRoom = () => {
    if (roomCode.length > 0 && argument.length > 0) {
      navigation.navigate("WaitingRoom", {
        roomCode,
        argument,
        isHost: false,
        user,
      });
    }
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
            <Button mode="contained" color="blue" onPress={() => joinRoom()}>
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
