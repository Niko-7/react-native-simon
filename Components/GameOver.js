import React from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { Text, Card, Title, Paragraph } from "react-native-paper";
import { useEffect, useState } from "react/cjs/react.development";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase } from "../src/firebaseConfig";

const GameOver = ({
  navigation,
  route: {
    params: { roomId, user, currentScore },
  },
}) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [usersArray, setUsersArray] = useState([]);
  const [imageUrl, setImageUrl] = useState();

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

  const usersRef = firebase
    .firestore()
    .collection("multiplayerGames")
    .doc(roomId)
    .collection("users");

  const roomRef = firebase
    .firestore()
    .collection("multiplayerGames")
    .doc(roomId);

  useEffect(() => {
    usersRef.doc(user.username).update({ gameOver: true, score: currentScore });
    roomRef.update({ gameOvers: firebase.firestore.FieldValue.increment(1) });

    usersRef.get().then((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((person) => {
        currentUsers.push(person.data());
      });
      setUsersArray(currentUsers);
    });

    const trackStatus = usersRef.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((person) => {
        if (person.data().gameOver) {
          usersRef.get().then((querySnapshot) => {
            const currentUsers = [];
            querySnapshot.forEach((person) => {
              currentUsers.push(person.data());
            });
            setUsersArray(currentUsers);
          });
        }
      });
    });

    const players = [];

    const checkGameOver = roomRef.onSnapshot((querySnapshot) => {
      usersRef.get().then((doc) => {
        doc.forEach((person) => {
          players.push(person.data());
        });
      });
      if (players.length === querySnapshot.data().gameOvers) {
        usersRef
          .orderBy("score", "desc")
          .limit(1)
          .get()
          .then((users) => {
            let winner;
            users.forEach((winnerData) => {
              winner = winnerData.data();
            });
            checkGameOver();
            trackStatus();

            Alert.alert(
              "Argument settled!",
              `${winner.username} is the winner!!\nFighting for ${winner.argument}`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    console.log(user);
                    if (user.isHost) {
                      roomRef
                        .delete()
                        .then(() => {
                          console.log("room deleted.");
                        })
                        .catch((err) => {
                          console.error("Error removing document: ", error);
                        });
                    }

                    navigation.navigate("GameChoice", { extraData: user });
                  },
                },
              ],
              { cancelable: false }
            );
          });
      }
    });
    getAndLoadHttpUrl(user);
  }, []);

  const sortedArray = usersArray.sort((a, b) => {
    return b.score - a.score;
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.headerCont}>
          <Image
            style={styles.img}
            source={require("../assets/ARGULYMPICS.png")}
          />
          <View style={styles.titleCont}>
            <Text style={styles.pageTitleText}>GAME OVER</Text>
          </View>
        </View>
        <View style={styles.waitingTable}>
          {sortedArray.map((person) => {
            return (
              <Card key={person.userId} style={styles.card}>
                <Card.Content>
                  <View style={styles.cardImage}>
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: imageUrl,
                      }}
                    />
                  </View>
                  <View style={styles.cardText}>
                    <Title style={styles.hostTitle}>{person.username}</Title>

                    {person.gameOver ? (
                      <Text style={styles.highScore}>
                        Score: {person.score}
                      </Text>
                    ) : (
                      <Text style={styles.highScore}>
                        {person.username} is still playing...
                      </Text>
                    )}
                    <Text numberOfLines={1} style={styles.arguText}>
                      Fighting for {person.argument}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
        </View>
      </View>
    );
  }
};

export default GameOver;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#bde0fe",
  },

  // HEADER SECTION

  headerCont: {
    flex: 2,
    justifyContent: "center",
  },
  img: {
    flex: 3,
    width: "100%",
    resizeMode: "center",
  },
  titleCont: {
    flex: 1,
  },
  pageTitleText: {
    fontFamily: "Graduate",
    textAlign: "center",
    fontSize: 30,
  },
  roomCodeCont: {
    flex: 1,
  },
  roomCodeText: {
    fontFamily: "Graduate",
    textAlign: "center",
    fontSize: 25,
  },

  participantsCont: {
    flex: 1,
  },
  participantsText: {
    fontFamily: "Graduate",
    fontSize: 20,
  },

  // TABLE SECTION

  waitingTable: {
    flex: 3,
    justifyContent: "flex-start",
    textAlign: "center",
  },

  waitingText: {
    paddingTop: 12,
    textAlign: "center",
    fontFamily: "Graduate",
    fontSize: 25,
  },

  // User Card

  card: {
    borderColor: "#ED2E18",
    borderWidth: 2,
    backgroundColor: "#F7A919",
    paddingBottom: 0.2,
    flexDirection: "row",
    height: 100,
  },

  // flex horizontal

  cardImage: {
    flex: 1,
  },
  cardText: {
    top: -4.5,
    marginLeft: 75,
    flex: 4,
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
  },

  cardTitle: {
    fontFamily: "Graduate",
    textTransform: "uppercase",
  },
  hostTitle: {
    fontFamily: "Graduate",
  },
  highScore: {
    fontFamily: "Graduate",
  },
  arguText: {
    fontFamily: "Graduate",
  },
  avatar: {
    width: 50,
    height: 50,
  },
});
