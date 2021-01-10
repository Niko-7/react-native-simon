import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const MenuMultiplayer = ({ navigation }) => {
  const [roomCode, setRoomCode] = useState(null);
  return (
    <View style={styles.menuMultiplayerContainer}>
      <View>
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
              onPress={() => navigation.navigate('Shapes', { roomCode })}
            >
              Join a Room
            </Button>
          </View>
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('WaitingRoom')}
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
    alignItems: 'center'
  },
  button: {
    margin: 5
  },
  joinRoom: {
    height: 100
  }
});

export default MenuMultiplayer;
