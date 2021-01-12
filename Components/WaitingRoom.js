import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = ({
  route: {
    params: { user, roomCode, isHost, roomId },
  },
}) => {
  const [users, setUsers] = useState([]);

  const roomsRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId)
    .collection('users');

  useEffect(() => {
    // roomsRef.get().then(function (querySnapshot) {
    //   querySnapshot.forEach(function (doc) {
    //     console.log(doc.data());
    //   });
    // });

    roomsRef.onSnapshot((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((user) => {
        currentUsers.push(user.data());
      });
      console.log(currentUsers);
      setUsers(currentUsers);
    });
  }, []);

  const handleReady = () => {};
  return (
    <View>
      {console.log(users, 'current users')}
      <View>{roomCode}</View>
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
