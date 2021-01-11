import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const GameHighScore = ({ highScore, currentScore, isPlaying, id }) => {
  return (
    <View style={styles.headerContainer}>
      <View styles={styles.scoreContainer}>
        <Text style={styles.highScore}>🎖{highScore}</Text>
        {isPlaying && <Text style={styles.score}>{currentScore} points</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  scoreContainer: {
    flex: 1
  },
  highScore: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black'
  },
  score: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  }
});

export default GameHighScore;
