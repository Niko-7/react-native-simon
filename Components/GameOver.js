import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect, useState } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const GameOver = ({
  navigation,
  route: {
    params: { roomId, user, currentScore },
  },
}) => {
  const [usersArray, setUsersArray] = useState([]);

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
          usersRef.get().then((querySnapshot) => {
            const currentUsers = [];
            querySnapshot.forEach((person) => {
              currentUsers.push(person.data());
            });
            setUsersArray(currentUsers);
          });
        }
      });
    });

    const players = [];

    const checkGameOver = roomRef.onSnapshot((querySnapshot) => {
      usersRef.get().then((doc) => {
        doc.forEach((person) => {
          players.push(person.data());
        });
      });
      if (players.length === querySnapshot.data().gameOvers) {
        usersRef
          .orderBy('score', 'desc')
          .limit(1)
          .get()
          .then((users) => {
            let winner;
            users.forEach((winnerData) => {
              winner = winnerData.data();
            });
            checkGameOver();
            trackStatus();

            Alert.alert(
              'Argument settled!',
              `${winner.username} is the winner!!\nFighting for ${winner.argument}`,
              [
                {
                  text: 'OK',
                  onPress: () => {
                    console.log(user);
                    if (user.isHost) {
                      roomRef
                        .delete()
                        .then(() => {
                          console.log('room deleted.');
                        })
                        .catch((err) => {
                          console.error('Error removing document: ', error);
                        });
                    }

                    navigation.navigate('GameChoice', { extraData: user });
                  },
                },
              ],
              { cancelable: false }
            );
          });
      }
    });
  }, []);

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
