import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import GameHeader from './GameHeader';
import Shapes from './Shapes';
import Timer from './Timer';

const Game = ({ route }) => {
  const { params } = route;
  const [panels, setPanels] = useState(['red', 'purple', 'blue', 'green']);
  //Will Give You A Random Colour Panel
  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    return panel;
  };
  const [sequence, setSequence] = useState([getRandomPanel()]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleStartPress = () => {
    setIsPlaying(true);
    setIsTimerActive(true);
  };

  function startTimer() {
    setIsTimerActive(true);
  }

  // let clonedSequence = [...sequence];

  //Game Logic Increment Sequence Every Round
  const gameplay = (panelPressed) => {
    // Clone sequence to not mutate the sequence
    let clonedSequence = [...sequence];
    console.log(clonedSequence, 'clonedSequence');
    console.log(panelPressed, 'panel pressed');
    // Get the first entry in clonedSequence array
    let expectedPanel = clonedSequence[0];
    clonedSequence.shift();

    console.log(expectedPanel, 'expectedpanel');

    // If the pressed panel is the first panel in the array...
    // Gameplay is invoked again with the NEW first panel
    if (expectedPanel === panelPressed) {
      if (clonedSequence.length === 0) {
        // once all the panels have been pressed...
        // stop and reset the timer
        setIsTimerActive(false);
        reset();

        //start new round
        setTimeout(() => {
          // add new panel to sequence array
          setSequence([...sequence, getRandomPanel()]);
          // reset the timer and start it counting again with delay
        }, 1000);
      }

      // wrong panel is pressed...
    } else if (expectedPanel !== panelPressed) {
      console.log('shapes gameover');
      // end game and reset timer
      gameover();

      reset();
    }
  };

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
      {console.log('render')}
      <View style={styles.headerContainer}>
        <GameHeader />
      </View>
      <View styles={styles.buttonContainer}>
        <Button onPress={handleStartPress} mode="contained" color="blue">
          start
        </Button>
      </View>
      <View style={styles.timerContainer}>
        <Timer isTimerActive={isTimerActive} />
      </View>
      <View style={styles.shapesContainer}>
        <Shapes
          gameplay={gameplay}
          gameover={gameover}
          startTimer={startTimer}
          isPlaying={isPlaying}
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
