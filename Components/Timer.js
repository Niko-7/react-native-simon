import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Timer = () => {
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);

  function startGame() {
    console.log(isActive, "isactive");
    setIsActive(true);
  }

  function reset() {
    setSeconds(10);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (isActive && seconds === 0) {
          reset();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.app}>
      <View style={styles.time}>
        <Text>{seconds}s</Text>
      </View>
      <View style={styles.row}>
        {/* <Button
          style={[styles.button, styles.buttonPrimary]}
          title="Start"
          onPress={() => startGame()}
        ></Button>
        <Button
          style={styles.button}
          onPress={() => reset()}
          title="Reset"
        ></Button> */}
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  app: {},
  time: {},
  row: {},
  button: {},
  buttonPrimary: {},
});
