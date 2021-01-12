import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const MenuSinglePlayer = ({ route, navigation }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const { user } = route.params;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.menuSinglePlayerContainer}>
        <Image
          style={styles.img}
          source={require("../assets/ARGULYMPICS.png")}
        />
        <Text style={styles.subtitle}>Select Difficulty</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() =>
                navigation.navigate("Game", {
                  difficulty: "easy",
                  betweenTime: 250,
                  flashTime: 800,
                  user,
                })
              }
            >
              Easy
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() =>
                navigation.navigate("Game", {
                  difficulty: "normal",
                  betweenTime: 250,
                  flashTime: 300,
                  user,
                })
              }
            >
              Normal
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              mode="contained"
              color="blue"
              onPress={() =>
                navigation.navigate("Game", {
                  difficulty: "hard",
                  betweenTime: 250,
                  flashTime: 100,
                  user,
                })
              }
            >
              Hard
            </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  menuSinglePlayerContainer: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#bde0fe",
  },
  img: {
    flex: 1,
    width: "90%",
    resizeMode: "center",
    marginBottom: 0,
  },
  subtitle: {
    fontFamily: "Graduate",
    fontSize: 32,
    marginBottom: 30,
  },
  buttonsContainer: {
    flex: 1,
    width: "50%",
  },
  button: {
    margin: 5,
  },
});

export default MenuSinglePlayer;
