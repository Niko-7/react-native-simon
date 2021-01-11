import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = ({
  route: {
    params: { user, roomCode, isHost, id },
  },
}) => {
  const [users, setUsers] = useState([user]);

  const roomsRef = firebase.firestore().collection('multiplayerGames');

  useEffect(() => {
    roomsRef
      .doc(id)
      .collection('users')
      .onSnapshot(function (doc) {
        console.log(doc);
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }, []);

  const handleReady = () => {};
  return (
    <View>
      <View>{roomCode}</View>
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
