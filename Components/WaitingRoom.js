import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = ({
  route: {
    params: { user }
  }
}) => {
  const [users, setUsers] = useState([user, user, user]);
  const gamesRef = firebase.firestore().collection('multiplayerGames');

  useEffect(() => {
    console.log(user);
    gamesRef
      .add({
        createdAt: new Date().toISOString(),
        gameIsActive: false,
        host: user,
        players: [user],
        playersFinishedLevel: [],
        winner: null
      })
      .then(function (docRef) {
        firebase
          .firestore()
          .collection('multiplayerGames')
          .doc(docRef.id)
          .onSnapshot(function (doc) {
            console.log('Current data: ', doc.data());
          });
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
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
