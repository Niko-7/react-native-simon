import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = ({
  navigation,
  route: {
    params: { user, code, roomId }
  }
}) => {
  const [users, setUsers] = useState([]);
  const [host, setHost] = useState('');
  // const [difficulty, setDifficulty] = useState('');
  // const [betweenTime, setBetweenTime] = useState(null);
  // const [flashTime, setFlashTime] = useState(null);

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
    usersRef.onSnapshot((querySnapshot) => {
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
    roomRef.onSnapshot((querySnapshot) => {
      if (querySnapshot.data().gameIsActive) {
        navigation.navigate('Game', {
          users,
          user,
          roomId,
          isMultiplayer: true,
          difficulty: 'normal',
          flashTime: 300,
          betweenTime: 250
        });
      }
    });
  }, []);

  const handleReady = () => {
    // if (users.length > 1) {
    roomRef.update({ gameIsActive: true });
  };

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
              <Paragraph>Fighting for {user.argument}</Paragraph>
            </Card.Content>
          </Card>
        );
      })}

      {user.username === host ? (
        // difficulty ? (
        <Button onPress={handleReady}>Start</Button>
      ) : (
        // ) :
        //   (
        //     <View>
        //       <View style={styles.button}>
        //         <Button
        //           mode="contained"
        //           color="blue"
        //           onPress={() => {
        //             setBetweenTime(250);
        //             setFlashTime(800);
        //             setDifficulty('easy');
        //           }}
        //         >
        //           Easy
        //         </Button>
        //       </View>
        //       <View style={styles.button}>
        //         <Button
        //           mode="contained"
        //           color="blue"
        //           onPress={() => {
        //             setBetweenTime(250);
        //             setFlashTime(300);
        //             setDifficulty('normal');
        //           }}
        //         >
        //           Normal
        //         </Button>
        //       </View>
        //       <View style={styles.button}>
        //         <Button
        //           mode="contained"
        //           color="blue"
        //           onPress={() => {
        //             setBetweenTime(250);
        //             setFlashTime(100);
        //             setDifficulty('hard');
        //           }}
        //         >
        //           Hard
        //         </Button>
        //       </View>
        //     </View>
        //   )
        // )
        // :
        <Text>Waiting for host to start game...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default WaitingRoom;
