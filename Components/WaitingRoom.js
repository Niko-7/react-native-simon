import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = ({
  route: {
    params: { user, code, roomId },
  },
}) => {
  const [users, setUsers] = useState([]);

  const roomsRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId)
    .collection('users');

  useEffect(() => {
    roomsRef.onSnapshot((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((user) => {
        if (user.data().isHost) {
          currentUsers.unshift(user.data());
        } else {
          currentUsers.push(user.data());
        }
      });
      setUsers(currentUsers);
    });
  }, []);

  const handleReady = () => {};
  return (
    <View>
      <View>
        <Text>ROOM CODE: {code}</Text>
      </View>
      {users.map((user) => {
        return (
          <Card key={user.userId}>
            <Card.Content>
              <Title>{user.username}</Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
          </Card>
        );
      })}
      <Button onPress={handleReady}>Start</Button>
      {/* <Button>Start Game</Button> */}
    </View>
  );
};

export default WaitingRoom;
