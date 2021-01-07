import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ gameover, isActive, seconds, setSeconds }) => {
  // --> Possible states <--

  useEffect(() => {
    let interval = null;

    // If timer is actively counting down
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        gameover();
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text>{seconds}s</Text>
      <View style={styles.row}></View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
