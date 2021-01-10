import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { firebase } from '../src/firebaseConfig';

const GameChoice = (props) => {
  const logoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const user = props.extraData;
  return (
    <View style={styles.userInfo}>
      <View style={styles.userNameMsg}>
        <Text style={styles.userNameSize}>Welcome {user.username}</Text>
        <Button mode="contained" color="blue" onPress={logoutPress}>
          log out
        </Button>
      </View>
      <View style={styles.gameChoiceContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('MenuSinglePlayer', { user })}
          >
            Single Player
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('MenuMultiplayer', { user })}
          >
            Multiplayer
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameChoiceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '50%'
  },
  buttons: {
    margin: 5
  },
  userNameSize: {
    fontSize: 25
  },
  userNameMsg: {
    alignItems: 'center'
  },
  userInfo: {
    flex: 1,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    marginTop: 50
  }
});

export default GameChoice;
