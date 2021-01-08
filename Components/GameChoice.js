import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const GameChoice = ({ route, navigation }) => {
  return (
    <View style={styles.userInfo}>
      <View style={styles.userNameMsg}>
        <Text style={styles.userNameSize}>
          Welcome {route.params.user.username}
        </Text>
      </View>
      {/* <View>{console.log(route.params.user)}</View> */}
      <View style={styles.gameChoiceContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode='contained'
            color='blue'
            onPress={() => navigation.navigate('MenuSinglePlayer')}
          >
            Single Player
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode='contained'
            color='blue'
            onPress={() => navigation.navigate('MenuMultiplayer')}
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
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '50%',
  },
  buttons: {
    margin: 5,
  },
  userNameSize: {
    fontSize: 25,
  },
  userNameMsg: {
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default GameChoice;
