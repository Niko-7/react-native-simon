import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import GameHighScore from './GameHighScore';
import Shapes from './Shapes';
import Timer from './Timer';
import { firebase } from '../src/firebaseConfig';

const Game = ({ route }) => {
  const { params } = route;
  const { difficulty } = params;
  const { username, id } = params.user;
  const [panels, setPanels] = useState(['red', 'purple', 'blue', 'green']);
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [highScore, setHighScore] = useState();
  const [currentScore, setCurrentScore] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const scoreRef = firebase.firestore().collection('scores').doc(id);

  // On game load, will pull users high score from db and setHighScore
  useEffect(() => {
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
  }, []);

  //Will Give You A Random Colour Panel
  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    return panel;
  };

  const handleStartPress = () => {
    setIsPlaying(true);
    setIsTimerActive(true);
    setSequence([getRandomPanel()]);
  };

  function startTimer() {
    setIsTimerActive(true);
  }

  let clonedSequence = [...sequence];

  //Game Logic Increment Sequence Every Round
  const gameplay = (panelPressed) => {
    // Clone sequence to not mutate the sequence
    // let clonedSequence = [...sequence];
    // Get the first entry in clonedSequence array
    let expectedPanel = clonedSequence.shift();

    // If the pressed panel is the first panel in the array...
    // Gameplay is invoked again with the NEW first panel
    if (expectedPanel === panelPressed) {
      if (clonedSequence.length === 0) {
        // once all the panels have been pressed...
        // stop and resets the timer
        setIsTimerActive(false);
        setCurrentScore(calculatePoints());
        resetSeconds();

        //start new round
        setTimeout(() => {
          // add new panel to sequence array
          setSequence([...sequence, getRandomPanel()]);
          // resets the timer and start it counting again with delay
        }, 1000);
      }

      // wrong panel is pressed...
    } else if (expectedPanel !== panelPressed) {
      // end game and resetSeconds timer
      gameover();
      resetSeconds();
    }
  };

  const calculatePoints = () => {
    if (difficulty === 'easy') {
      return sequence.length;
    } else if (difficulty === 'normal') {
      return 2 * sequence.length;
    } else if (difficulty === 'hard') {
      return 3 * sequence.length;
    }
  };

  // Sets timer for next round
  const resetSeconds = () => {
    setSeconds((sequence.length + 1) * 2);
  };

  const gameover = () => {
    setIsTimerActive(false);
    alert(`GAME OVER \n You Scored ${currentScore} points 🎖`);
    setIsPlaying(false);
    if (highScore < currentScore) {
      setHighScore(currentScore);
      return scoreRef
        .update({
          highScore: currentScore
        })
        .catch(function (error) {
          console.error('Error updating document: ', error);
        });
    }
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.headerContainer}>
        <GameHighScore
          isPlaying={isPlaying}
          currentScore={currentScore}
          highScore={highScore}
        />
      </View>
      <View styles={styles.buttonContainer}>
        {!isPlaying && (
          <Button onPress={handleStartPress} mode="contained" color="blue">
            start
          </Button>
        )}
      </View>
      <View style={styles.timerContainer}>
        <Timer
          isTimerActive={isTimerActive}
          sequence={sequence}
          seconds={seconds}
          setSeconds={setSeconds}
          gameover={gameover}
        />
      </View>
      <View style={styles.shapesContainer}>
        <Shapes
          gameplay={gameplay}
          gameover={gameover}
          startTimer={startTimer}
          isPlaying={isPlaying}
          sequence={sequence}
          getRandomPanel={getRandomPanel}
          setSequence={setSequence}
          params={params}
        />
        <Text style={{ textAlign: 'center' }}>Logged in as {username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1
  },
  timerContainer: {
    flex: 1
  },
  shapesContainer: {
    flex: 7
  }
});

export default Game;
