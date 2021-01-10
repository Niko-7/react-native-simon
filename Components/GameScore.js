import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GameScore = ({ score }) => {
  return (
    <View style={styles.gameScoreContainer}>
      <View styles={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameScoreContainer: {
    flex: 1
  },
  scoreContainer: {
    flex: 1,
    marginBottom: 10
  },
  score: {
    fontSize: 30,
    color: 'black'
  }
});

export default GameScore;
