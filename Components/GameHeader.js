import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const GameHeader = ({ startGame }) => {
  const [score, setScore] = useState(0);
  return (
    <View style={styles.headerContainer}>
      <View styles={styles.scoreContainer}>
        <Text style={styles.score}>CURRENT HIGH SCORE: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1
  },
  scoreContainer: {
    flex: 1
  },
  score: {
    fontSize: 30,
    color: 'black'
  }
});

export default GameHeader;
