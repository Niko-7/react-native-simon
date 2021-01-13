import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { firebase } from '../src/firebaseConfig';
import 'firebase/storage';
import GameHighScore from './GameHighScore';
import AvatarModals from './Avatars';

const GameChoice = ({ setUser, extraData, navigation, route, params }) => {
  let [fontsLoaded, error] = Font.useFonts({
    Graduate: require('../assets/fonts/Graduate-Regular.ttf'),
  });
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [highScore, setHighScore] = useState();
  const scoreRef = firebase.firestore().collection('scores').doc(extraData.id);

  useEffect(() => {
    console.log(user);
    // Pulls high score for user
    scoreRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const data = doc.data();
          setHighScore(data.highScore);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    // attempts to load image
    getAndLoadHttpUrl();
  }, []);

  useEffect(() => {}, []);

  const getAndLoadHttpUrl = async () => {
    firebase
      .storage()
      .ref(extraData.userImg) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  };
  const user = extraData;

  const updateAvatar = (newImg) => {
    firebase
      .firestore()
      .collection('user')
      .doc(user.id)
      .update({ userImg: newImg });
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
          <Image style={styles.img} source={{ uri: imageUrl }} />
        </View>
        <View style={styles.userNameMsg}>
          <Text style={styles.text}>Welcome, {user.username}!</Text>
          <GameHighScore
            isPlaying={false}
            currentScore={null}
            highScore={highScore}
          />
          <Image style={styles.avatar} source={{ uri: setImageUrl }} />
          <AvatarModals updateAvatar={updateAvatar} />
        </View>

        <View style={styles.gameChoiceContainer}>
          <Text style={styles.text}>How would you like to argue?</Text>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode='contained'
              color='blue'
              onPress={() => navigation.navigate('MenuSinglePlayer', { user })}
            >
              Single Player
            </Button>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode='contained'
              color='blue'
              onPress={() => navigation.navigate('MenuMultiplayer', { user })}
            >
              Multiplayer
            </Button>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.buttons}
              mode='contained'
              color='blue'
              onPress={() => navigation.navigate('LeaderBoard', { user })}
            >
              LeaderBoard
            </Button>
          </View>
          <Text onPress={logoutPress} style={styles.footerLink}>
            Log Out
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  logOutBtn: {
    flexDirection: 'row-reverse',
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gameChoiceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '50%',
  },
  buttons: {
    margin: 5,
  },
  imgCont: {
    alignItems: 'center',
  },
  img: {
    // flex: 1,
    width: '90%',
    resizeMode: 'center',
    // marginBottom: 0,
  },
  text: {
    // flex: 3,
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Graduate',
  },
  userNameMsg: {
    alignItems: 'center',
    paddingBottom: 2,
  },
  gameChoice: {
    flex: 1,
    backgroundColor: '#bde0fe',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 45,
  },
});

export default GameChoice;
