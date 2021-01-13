import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Text,
  Button,
  Card,
  Title,
  Paragraph
} from 'react-native-paper';
import { useEffect, useState } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const GameOver = ({
  navigation,
  route: {
    params: { roomId, user, currentScore }
  }
}) => {
  const [usersArray, setUsersArray] = useState([]);
  const [gameOvers, setGameOvers] = useState(0);

  const usersRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId)
    .collection('users');

  useEffect(() => {
    usersRef.doc(user.username).update({ gameOver: true, score: currentScore });

    usersRef.get().then((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((person) => {
        currentUsers.push(person.data());
      });
      setUsersArray(currentUsers);
    });

    usersRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((person) => {
        if (person.data().gameOver) {
          usersRef
            .get()
            .then((querySnapshot) => {
              const currentUsers = [];
              querySnapshot.forEach((person) => {
                currentUsers.push(person.data());
              });
              setUsersArray(currentUsers);
            })
            .then(() => {
              const isEndGame = usersArray.every((user) => {
                return user.gameOver === true;
              });
              if (isEndGame) {
                alert('All players have died');
              }
            });
        }
      });
    });
  }, []);

  // const endGame = async function () {
  //   return await usersArray.every((user) => {
  //     // console.log(user.username, user.gameOver);
  //     return user.gameOver === true;
  //   });
  // };
  // console.log(endGame, 'endGame');
  // if (endGame) {
  //   console.log('in endGame');
  // alert('All players have died');
  // }

  const sortedArray = usersArray.sort((a, b) => {
    return b.score - a.score;
  });

  return (
    <View>
      <Text>GAME OVER</Text>

      {sortedArray.map((person) => {
        return (
          <Card key={person.userId}>
            <Card.Content>
              <Title>{person.username}</Title>
              <Paragraph>Fighting for {person.argument}</Paragraph>
              {person.gameOver ? (
                <Text>
                  {person.username}: {person.score}
                </Text>
              ) : (
                <Text>{person.username} is still playing...</Text>
              )}
            </Card.Content>
          </Card>
        );
      })}
    </View>
  );
};

export default GameOver;
