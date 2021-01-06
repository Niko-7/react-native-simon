import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Timer = ({ gameover }) => {
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);

  function startTimer() {
    setIsActive(true);
  }

  function reset() {
    setSeconds(3);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        if (isActive && seconds === 0) {
          reset();
          gameover();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text>{seconds}s</Text>
      <View style={styles.row}>
        {/* <Button
          title="Start"
          onPress={() => startTimer()}
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
});
