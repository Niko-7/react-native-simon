import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const GameChoice = ({ navigation }) => {
  return (
    <View style={styles.gameChoiceContainer}>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('MenuSinglePlayer')}
          >
            Single Player
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            color="blue"
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '50%'
  },
  buttons: {
    margin: 5
  }
});

export default GameChoice;
