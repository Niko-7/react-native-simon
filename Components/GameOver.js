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
  const [usersArray, setUsersArray] = useState([]);
  // const [gameOvers, setGameOvers] = useState([]);

  const usersRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId)
    .collection('users');

  const roomRef = firebase
    .firestore()
    .collection('multiplayerGames')
    .doc(roomId);

  useEffect(() => {
    console.log(usersArray);
    usersRef.doc(user.username).update({ gameOver: true, score: currentScore });
    roomRef.update({ gameOvers: firebase.firestore.FieldValue.increment(1) });

    usersRef.get().then((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((person) => {
        currentUsers.push(person.data());
      });
      setUsersArray(currentUsers);
    });

    const trackStatus = usersRef.onSnapshot((querySnapshot) => {
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
              usersRef
                .where('gameOver', '==', true)
                .get()
                .then((querySnapshot) => {
                  let gameOverUsers = 0;
                  querySnapshot.forEach(() => {
                    gameOverUsers++;
                  });
                  // setGameOvers(gameOverUsers);
                })
                .then(() => {
                  // console.log(gameOvers.length, 'gameOvers');
                  console.log(usersArray.length, 'usersArray');

                  // if (gameOvers.length === usersArray.length) {
                  //   alert('All players have died');
                  // }
                });
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
