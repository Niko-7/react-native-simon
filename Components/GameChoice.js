import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase } from "../src/firebaseConfig";
import "firebase/storage";
import GameHighScore from "./GameHighScore";
import AvatarModals from "./Avatars";

const GameChoice = ({ setUser, extraData, navigation }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [highScore, setHighScore] = useState();
  const [user, setupUser] = useState(extraData);
  const scoreRef = firebase.firestore().collection("scores").doc(extraData.id);

  useEffect(() => {
    // Pulls high score for user
    scoreRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const data = doc.data();
          setHighScore(data.highScore);
        } else {
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    // attempts to load image
    getAndLoadHttpUrl();
  }, [user]);

  const getAndLoadHttpUrl = async () => {
    firebase
      .storage()
      .ref(`/${user.userImg}`) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  };
  // const user = extraData;

  const updateAvatar = (newImg) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.id)
      .update({ userImg: newImg });

    firebase
      .firestore()
      .collection("users")
      .doc(user.id)
      .get()
      .then((user) => {
        setupUser(user.data());
      });
  };

  const logoutPress = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.gameChoice}>
        <View style={styles.imgCont}>
          <Image
            style={styles.img}
            source={require("../assets/Argulympics-no-logo.png")}
          />
        </View>
        <View style={styles.userNameMsg}>
          <Text style={styles.text}>Welcome, {user.username}!</Text>
          <GameHighScore
            isPlaying={false}
            currentScore={null}
            highScore={highScore}
          />
          <Image style={styles.avatar} source={{ uri: imageUrl }} />
          <View style={styles.avatarChange}>
            <AvatarModals updateAvatar={updateAvatar} />
          </View>
        </View>

        <View style={styles.gameChoiceContainer}>
          <Text style={styles.text}>How would you like to argue?</Text>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode="contained"
              color="black"
              onPress={() => navigation.navigate("MenuSinglePlayer", { user })}
            >
              Single Player
            </Button>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode="contained"
              color="yellow"
              onPress={() => navigation.navigate("MenuMultiplayer", { user })}
            >
              Multiplayer
            </Button>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode="contained"
              color="green"
              onPress={() => navigation.navigate("LeaderBoard", { user })}
            >
              LeaderBoard
            </Button>
            <Button
              icon="logout"
              mode="contained"
              color="red"
              onPress={logoutPress}
            >
              log out
            </Button>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  gameChoice: {
    flex: 1,
    backgroundColor: "#bde0fe",
    justifyContent: "center",
  },
  imgCont: {
    flex: 1,
  },
  userNameMsg: {
    flex: 3,
    alignItems: "center",
    paddingBottom: 2,
  },
  gameChoiceContainer: {
    flex: 3,
    justifyContent: "flex-end",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "50%",
  },
  buttons: {
    margin: 5,
  },
  avatarChange: {
    flex: 1,
  },

  img: {
    // flex: 1,
    width: "100%",
    resizeMode: "center",
    // marginBottom: 0,
  },
  text: {
    // flex: 3,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Graduate",
    marginBottom: 3,
  },

  avatar: {
    width: 170,
    height: 170,
    marginBottom: 10,
    marginTop: 45,
  },
  logOutBtn: {
    flexDirection: "row-reverse",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GameChoice;
