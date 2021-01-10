import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';
import { firebase } from '../src/firebaseConfig';

const WaitingRoom = () => {
  const [users, setUsers] = useState();
  const gamesRef = firebase.firestore().collection('multiplayerGames');

  useEffect(() => {
    //   gamesRef.add
    // console.log(firebase.auth().currentUser);
  }, []);
  return (
    <View>
      <Text>Waiting Room</Text>
    </View>
  );
};

export default WaitingRoom;
