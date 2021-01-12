import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Text,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import { useEffect, useState } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const GameOver = ({
  navigation,
  route: {
    params: { roomId, user, currentScore },
  },
}) => {
  const [users, setUsers] = useState([]);
  const [usersObj, setUsersObj] = useState({});

  const usersRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId)
    .collection('users');

  useEffect(() => {
    usersRef.doc(user.username).update({ gameOver: true });
    usersRef.get().then((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((user) => {
        const username = user.data().username;
        const gameOver = user.data().gameOver;
        const score = user.data().score;

        currentUsers.push(user.data());
        setUsersObj({ ...usersObj, [username]: { gameOver, score } });
      });
      setUsers(currentUsers);
    });
    usersRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((user) => {
        const currentUsers = [];
        if (user.data().gameOver) {
          console.log('player died');
          currentUsers.push(user.data());
        }
      });
    });
  }, []);
  return (
    <View>
      <Text>GAME OVER</Text>
      {users.map((user) => {
        return (
          <Card key={user.userId}>
            <Card.Content>
              <Title>{user.username}</Title>
              <Paragraph>Fighting for {user.argument}</Paragraph>
              {console.log(usersObj)}
              {usersObj[user.username].gameOver ? (
                <Text>
                  {user.username}: {currentScore}
                </Text>
              ) : (
                <Text>{user.username} is still playing...</Text>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
};

export default GameOver;
