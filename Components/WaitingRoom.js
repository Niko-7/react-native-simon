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
  const [host, setHost] = useState('');

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
          setHost(user.data().username);
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
              <Title>
                {user.isHost && <Title>Host: </Title>}
                {user.username}
              </Title>
              <Paragraph>Card content</Paragraph>
            </Card.Content>
          </Card>
        );
      })}
      {console.log(user)}
      {user.username === host ? (
        <Button onPress={handleReady}>Start</Button>
      ) : (
        <Text>Waiting for host to start game...</Text>
      )}
      {/* <Button>Start Game</Button> */}
    </View>
  );
};

export default WaitingRoom;
