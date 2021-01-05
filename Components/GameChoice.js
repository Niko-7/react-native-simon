import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const GameChoice = () => {
  return (
    <View style={styles.gameChoiceContainer}>
      <Button style={styles.button} title="Single Player" />
      <Button style={styles.button} title="Multiplayer" />
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
  button: {
    minWidth: 500
  }
});

export default GameChoice;
