import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-paper';

import { firebase } from '../src/firebaseConfig';
import 'firebase/storage';
import GameHighScore from './GameHighScore';

const GameChoice = ({ setUser, extraData, navigation }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [highScore, setHighScore] = useState();
  const scoreRef = firebase.firestore().collection('scores').doc(extraData.id);

  useEffect(() => {
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

  const getAndLoadHttpUrl = async () => {
    firebase
      .storage()
      .ref('/' + 'no-profile-image.png') //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  };

  const user = extraData;

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
  return (
    <View style={styles.userInfo}>
      {console.log(user)}
      <View style={styles.userNameMsg}>
        <Text style={styles.userNameSize}>Welcome {user.username}</Text>
        <GameHighScore
          isPlaying={false}
          currentScore={null}
          highScore={highScore}
        />
        <Image style={styles.avatar} source={{ uri: imageUrl }} />
        <Button mode="contained" color="blue" onPress={logoutPress}>
          log out
        </Button>
      </View>
      <View style={styles.gameChoiceContainer}>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('MenuSinglePlayer', { user })}
          >
            Single Player
          </Button>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            style={styles.buttons}
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('MenuMultiplayer', { user })}
          >
            Multiplayer
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameChoiceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '50%'
  },
  buttons: {
    margin: 5
  },
  userNameSize: {
    fontSize: 25
  },
  userNameMsg: {
    alignItems: 'center'
  },
  userInfo: {
    flex: 1,
    // justifyContent: 'flex-start',
    justifyContent: 'center',
    marginTop: 50
  },
  avatar: {
    width: 200,
    height: 200,
    marginBottom: 10
  }
});

export default GameChoice;
