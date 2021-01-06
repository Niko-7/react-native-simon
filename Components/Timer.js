import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Timer = ({ gameover, isActive, setSeconds, seconds }) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (isActive && seconds === 0) {
          gameover();
        }
      }, 1000);
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

const styles = StyleSheet.create({
  app: {},
  time: {},
  row: {},
});
