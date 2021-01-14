import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { useEffect } from "react/cjs/react.development";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { firebase } from "../src/firebaseConfig";

const WaitingRoom = ({
  navigation,
  route: {
    params: { user, code, roomId },
  },
}) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require("../assets/fonts/Graduate-Regular.ttf"),
  });

  const [users, setUsers] = useState([]);
  const [host, setHost] = useState("");
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
    const showUsers = usersRef.onSnapshot((querySnapshot) => {
      const currentUsers = [];
      querySnapshot.forEach((user) => {
        if (user.data().isHost) {
          currentUsers.unshift(user.data());
          setHost(user.data().username);
        } else {
          currentUsers.push(user.data());
        }
      });
      setUsers(currentUsers);
    });
    getAndLoadHttpUrl(user);
    const loadingRoom = roomRef.onSnapshot((querySnapshot) => {
      if (querySnapshot.data().gameIsActive) {
        showUsers();
        loadingRoom();
        navigation.navigate("Game", {
          users,
          user,
          roomId,
          isMultiplayer: true,
          difficulty: "normal",
          flashTime: 300,
          betweenTime: 250,
        });
      }
    });
  }, []);

  const handleReady = () => {
    // if (users.length > 1) {
    roomRef.update({ gameIsActive: true });
  };
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
            <Text style={styles.pageTitleText}> Get Ready to Argue! </Text>
          </View>
          <View style={styles.roomCodeCont}>
            <Text style={styles.roomCodeText}> ROOM CODE: {code} </Text>
          </View>
          <View style={styles.participantsCont}>
            <Text style={styles.participantsText}> Participants: </Text>
          </View>
        </View>
        <View style={styles.waitingTable}>
          {users.map((user) => {
            console.log(user);
            return (
              <Card key={user.userId} style={styles.card}>
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
                    <Title style={styles.cardTitle}>
                      {user.isHost && (
                        <Title style={styles.hostTitle}> Host: </Title>
                      )}
                      {user.username}
                    </Title>
                    <Paragraph style={styles.highScore}>
                      Current High Score: {user.score}
                    </Paragraph>
                    <Text numberOfLines={1} style={styles.arguText}>
                      Fighting for: {user.argument}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            );
          })}
          {user.username === host ? (
            <Button onPress={handleReady}> Start </Button>
          ) : (
            // ) :
            //   (
            //     <View>
            //       <View style={styles.button}>
            //         <Button
            //           mode="contained"
            //           color="blue"
            //           onPress={() => {
            //             setBetweenTime(250);
            //             setFlashTime(800);
            //             setDifficulty('easy');
            //           }}
            //         >
            //           Easy
            //         </Button>
            //       </View>
            //       <View style={styles.button}>
            //         <Button
            //           mode="contained"
            //           color="blue"
            //           onPress={() => {
            //             setBetweenTime(250);
            //             setFlashTime(300);
            //             setDifficulty('normal');
            //           }}
            //         >
            //           Normal
            //         </Button>
            //       </View>
            //       <View style={styles.button}>
            //         <Button
            //           mode="contained"
            //           color="blue"
            //           onPress={() => {
            //             setBetweenTime(250);
            //             setFlashTime(100);
            //             setDifficulty('hard');
            //           }}
            //         >
            //           Hard
            //         </Button>
            //       </View>
            //     </View>
            //   )
            // )
            // :
            <Text style={styles.waitingText}>
              Waiting for host to start game...
            </Text>
          )}
        </View>
      </View>
    );
  }
};

export default WaitingRoom;

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
