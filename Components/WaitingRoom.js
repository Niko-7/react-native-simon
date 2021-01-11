import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useEffect } from "react/cjs/react.development";
import { firebase } from "../src/firebaseConfig";

const WaitingRoom = ({
  route: {
    params: { user, roomCode, isHost },
  },
}) => {
  const [users, setUsers] = useState([user, user, user]);
  const [hostRoomCode, setHostRoomCode] = useState("");

  const roomsRef = firebase.firestore().collection("multiplayerGames");

  const generateRoomCode = () => {
    let result = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < 4; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  };

  useEffect(() => {
    if (isHost) {
      const code = generateRoomCode();
      setHostRoomCode(code);
      roomsRef
        .add({
          roomCode: code,
          createdAt: new Date().toISOString(),
          gameIsActive: false,
          host: user,
          players: [user],
          playersGameOver: [],
          winner: null,
        })
        .then(function (docRef) {
          firebase
            .firestore()
            .collection("multiplayerGames")
            .doc(docRef.id)
            .onSnapshot(function (doc) {
              console.log("Current data: ", doc.data());
            });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    } else {
      setHostRoomCode(roomCode);
    }
  }, []);

  const handleReady = () => {};
  return (
    <View>
      {users.map((user) => {
        return (
          <Card>
            <Card.Content>
              <Title>{user.username}</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
          </Card>
        );
      })}
      <Button onPress={handleReady}>Ready</Button>
      {/* <Button>Start Game</Button> */}
    </View>
  );
};

export default WaitingRoom;
