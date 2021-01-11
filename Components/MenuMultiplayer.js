import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

import { firebase } from '../src/firebaseConfig';

const MenuMultiplayer = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  const [roomCode, setRoomCode] = useState(null);
  const [argument, setArgument] = useState(user.decision);

  const db = firebase.firestore();

  const handleSubmit = (roomCode) => {
    db.collection('multiplayerGames')
      .where('roomCode', '==', roomCode)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection('multiplayerGames')
            .doc(roomCode)
            .collection('users')
            .doc(user.username)
            .set({
              username: user.username,
              userId: user.id,
              userImg: user.userImg,
              score: 0,
              argument: argument,
              isHost: false,
            });
          navigation.navigate('WaitingRoom', { user, roomCode });
        } else {
          alert({ error: 'Room does not exist!' });
        }
      });
  };

  return (
    <View style={styles.menuMultiplayerContainer}>
      <View>
        <View>
          <Text>Argument: {argument}</Text>
        </View>
        <View style={styles.joinRoom}>
          <TextInput
            onChangeText={(text) => setRoomCode(text)}
            placeholder="Enter room code"
            dense={true}
          />
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() => handleSubmit(roomCode)}
            >
              Join a Room
            </Button>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('WaitingRoom', { user })}
          >
            Create a Room
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuMultiplayerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 5,
  },
  joinRoom: {
    height: 100,
  },
});

export default MenuMultiplayer;
