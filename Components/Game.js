import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import GameHeader from './GameHeader';
import Shapes from './Shapes';
import Timer from './Timer';

const Game = ({ route }) => {
  const { difficulty } = route.params;
  const { params } = route;
  const [panels, setPanels] = useState(['red', 'purple', 'blue', 'green']);
  const [sequence, setSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(3);

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

  function resetSeconds() {
    setSeconds(sequence.length * 2);
  }

  const gameover = () => {
    setIsTimerActive(false);
    if (difficulty === 'easy') {
      const finalScore = sequence.length - 1;
      alert(`GAME OVER \n You Scored ${finalScore} points 🎖`);
      setScore(finalScore);
      setIsPlaying(false);
    } else if (difficulty === 'normal') {
      const finalScore = 2 * sequence.length - 2;
      alert(`GAME OVER \n You Scored ${finalScore} points 🎖`);
      setScore(finalScore);
      setIsPlaying(false);
    } else if (difficulty === 'hard') {
      const finalScore = 3 * sequence.length - 3;
      alert(`GAME OVER \n You Scored ${finalScore} points 🎖`);
      setScore(finalScore);
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.headerContainer}>
        <GameHeader score={score} />
      </View>
      <View styles={styles.buttonContainer}>
        <Button onPress={handleStartPress} mode="contained" color="blue">
          start
        </Button>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
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
