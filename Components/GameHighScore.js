import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const GameHighScore = ({ highScore = 0, currentScore, isPlaying, id }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.headerContainer}>
        <View styles={styles.scoreContainer}>
          <Text style={styles.highScore}>🎖 High score: {highScore} 🎖</Text>
          {isPlaying && (
            <Text style={styles.score}>
              Current score: {currentScore} points
            </Text>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: "column",
  },
  scoreContainer: {
    flex: 1,
  },
  highScore: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    marginBottom: 10,
    fontFamily: "Graduate",
  },
  score: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    fontFamily: "Graduate",
  },
});

export default GameHighScore;
