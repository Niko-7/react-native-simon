import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = ({ gameover, isActive, seconds, setSeconds }) => {
  // --> Possible states <--

  useEffect(() => {
    let timeLeft = null;
    // console.log("isActive", isActive);
    // If timer is actively counting down
    if (isActive) {
      // interval is a variable - setSeconds runs once

      timeLeft = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        console.log("timer gameover");
        // gameover and stop the setInterval
        gameover();
        clearInterval(timeLeft);
      }
    }
    // returns the function - stops the setInterval.
    return () => clearInterval(timeLeft);
  }, [isActive, seconds]);

  return (
    <View>
      <Text>{seconds}s</Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
