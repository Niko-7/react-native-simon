import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

import { joinRoom, createRoom } from './NetworkFuncs';

const MenuMultiplayer = ({
  navigation,
  route: {
    params: { user },
  },
}) => {
  const [argument, setArgument] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const generateRoomCode = () => {
    let result = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 4; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  };

  const code = generateRoomCode();

  return (
    <View style={styles.menuMultiplayerContainer}>
      <View>
        <View style={styles.argumentInput}>
          <Text>What are you fighting for?!</Text>
          <TextInput
            onChangeText={(text) => setArgument(text)}
            placeholder="Input Argument"
          />
        </View>
        <View style={styles.joinRoom}>
          <Text>Joining An Argument?</Text>
          <TextInput
            onChangeText={(text) => setRoomCode(text)}
            placeholder="Enter room code"
            dense={true}
          />
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() => joinRoom(roomCode, user, argument, navigation)}
            >
              Join a Room
            </Button>
          </View>
        </View>
        <Text>Starting An Argument?</Text>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => createRoom(code, user, argument, navigation)}
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
  argumentInput: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    margin: 5,
    flex: 1,
  },
  joinRoom: {
    height: 100,
  },
});

export default MenuMultiplayer;
