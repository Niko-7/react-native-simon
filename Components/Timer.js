import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const Timer = ({
  gameover,
  isTimerActive,
  sequence,
  seconds = 3,
  setSeconds,
}) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  // --> Possible states <--
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    let timeLeft = null;
    // If timer is actively counting down
    if (isTimerActive) {
      // interval is a variable - setSecondsLeft runs once
      timeLeft = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);

      if (secondsLeft === 0) {
        // gameover and stop the setInterval
        gameover();
        clearInterval(timeLeft);
      }
    }
    // returns the function - stops the setInterval.
    return () => clearInterval(timeLeft);
  }, [isTimerActive, secondsLeft]);

  useEffect(() => {
    setSecondsLeft(seconds);
  }, [seconds]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={styles.timerText}>{secondsLeft}s</Text>
      </View>
    );
  }
};

export default Timer;

const styles = StyleSheet.create({
  timerText: {
    fontFamily: "Graduate",
    fontSize: 50,
  },
});
