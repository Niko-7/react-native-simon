import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Leaderboard from 'react-native-leaderboard';
import { firebase } from '../src/firebaseConfig';

const LeaderBoard = () => {
  const [userDb, setUserData] = useState([]);
  const [scoreDb, setScoreData] = useState([]);
  const [allData, setAllData] = useState([]);

  //Connects score data collection and user data collection by their id and returns a single object with the data
  const fullData = scoreDb.map((score) => ({
    ...score,
    ...userDb.find((user) => user.id === score.id),
  }));

  useEffect(() => {
    //sets users data by username and id
    const names = firebase
      .firestore()
      .collection('users')
      .get()
      .then((snap) => {
        const userData = [];
        snap.forEach((doc) => {
          userData.push({
            userName: doc.data().username,
            id: doc.data().id,
          });
        });
        setUserData(userData);
      });
    //sets scores data by score and id
    const scores = firebase
      .firestore()
      .collection('scores')
      .get()
      .then((snap) => {
        const scoreData = [];
        snap.forEach((doc) => {
          scoreData.push({
            highScore: doc.data().highScore,
            id: doc.data().id,
          });
        });
        scoreData.forEach((score) => {});
        setScoreData(scoreData);
      });
  }, []);

  useEffect(() => {
    //sets the joined user/score data when the userDb and scoreDb have updated
    setAllData(fullData);
  }, [userDb, scoreDb]);

  return (
    <View>
      <View style={styles.textView}>
        <Text style={styles.text}>🏆 Leaderboard 🏆</Text>
      </View>
      <Leaderboard data={fullData} sortBy='highScore' labelBy='userName' />
    </View>
  );
};

const styles = StyleSheet.create({
  textView: {
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
});

export default LeaderBoard;
