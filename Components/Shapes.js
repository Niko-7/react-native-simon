import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Timer from './Timer';
import { Button } from 'react-native-paper';

const Shapes = ({ route }) => {
  const [panels, setPanels] = useState(['red', 'purple', 'blue', 'green']);
  const [canClick, setCanClick] = useState(false);
  const [flashCol, setFlashCol] = useState('');
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState(route.params.difficulty);
  const [flashTime, setFlashTime] = useState(route.params.flashTime);
  const [betweenTime, setBetweenTime] = useState(route.params.betweenTime);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  //Will Give You A Random Colour Panel
  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    return panel;
  };

  //Will Flash A Single Colour Panel
  //Change Timeouts For Difficulty Levels
  const flash = (flashy) => {
    return new Promise((resolve, reject) => {
      setCanClick(false);
      setFlashCol(flashy);
      setTimeout(() => {
        setFlashCol('');
        setTimeout(() => {
          resolve();
          setCanClick(true);
        }, betweenTime);
      }, flashTime);
    });
  };

  // async await expects a promise
  //Send The Sequence Of Colour To Flash
  const startFlashing = async () => {
    for (const panel of sequence) {
      await flash(panel);
    }
    //start timer
    startTimer();
  };

  function startTimer() {
    setIsActive(true);
  }

  function reset() {
    setSeconds(sequence.length * 2);
  }

  // handlePress calls
  // const handlePress = (colour) => {
  //   gameplay(colour);
  // };

  const gameover = () => {
    setIsActive(false);
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

  let clonedSequence = [...sequence];

  //Game Logic Increment Sequence Every Round
  const gameplay = (panelPressed) => {
    // Clone sequence to not mutate the sequence
    // let clonedSequence = [...sequence];

    // Get the first entry in clonedSequence array
    const expectedPanel = clonedSequence.shift();

    if (expectedPanel === panelPressed) {
      if (clonedSequence.length === 0) {
        setIsActive(false);
        reset();
        //start new round
        setTimeout(() => {
          setSequence([...sequence, getRandomPanel()]);
          // reset the timer and start it counting again
        }, 1000);
      }
    } else if (expectedPanel !== panelPressed) {
      // end game and set score
      gameover();
      reset();
    }
  };

  useEffect(() => {
    isPlaying && startFlashing();
  }, [sequence, score]);

  return (
    <View style={styles.pageContainer}>
      {console.log('cloned Sequence --->', clonedSequence)}
      <View style={styles.header}>
        <Text style={styles.title}>{`CURRENT HIGH SCORE: ${score}`}</Text>
        <View styles={styles.startButton}>
          <Button
            style={styles.button}
            onPress={() => {
              setIsPlaying(true);
              setSequence([getRandomPanel()]);
              setSeconds(3);
            }}
            mode="contained"
            color="blue"
          >
            start
          </Button>
        </View>
        <View style={styles.timer}>
          <Timer
            gameover={gameover}
            startTimer={startTimer}
            isActive={isActive}
            setIsActive={setIsActive}
            sequenceLength={sequence.length}
            setSeconds={setSeconds}
            seconds={seconds}
          />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={canClick ? null : true}
            onPress={() => gameplay('red')}
          >
            <Text
              nativeID="red"
              style={
                flashCol === 'red'
                  ? [styles.redFlash, styles.seg]
                  : [styles.redSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={canClick ? null : true}
            onPress={() => gameplay('purple')}
          >
            <Text
              nativeID="purple"
              style={
                flashCol === 'purple'
                  ? [styles.purpleFlash, styles.seg]
                  : [styles.purpleSeg, styles.seg]
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            disabled={canClick ? null : true}
            activeOpacity={0.5}
            onPress={() => gameplay('blue')}
          >
            <Text
              nativeID="blue"
              style={
                flashCol === 'blue'
                  ? [styles.blueFlash, styles.seg]
                  : [styles.blueSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={canClick ? null : true}
            activeOpacity={0.5}
            onPress={() => gameplay('green')}
          >
            <Text
              nativeID="green"
              style={
                flashCol === 'green'
                  ? [styles.greenFlash, styles.seg]
                  : [styles.greenSeg, styles.seg]
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        mode="contained"
        color="blue"
        onPress={() => {
          reset();
          setIsActive(!isActive);
        }}
      >
        Reset
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    marginTop: 150,
  },
  startButton: {
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 30,
    color: 'black',
  },
  timer: {
    flex: 1,
  },
  rowContainer: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
  },
  redSeg: {
    backgroundColor: 'red',
    borderTopLeftRadius: 150,
  },
  purpleSeg: {
    backgroundColor: 'purple',
    borderTopRightRadius: 150,
  },
  blueSeg: {
    backgroundColor: 'blue',
    borderBottomLeftRadius: 150,
  },
  greenSeg: {
    backgroundColor: 'green',
    borderBottomRightRadius: 150,
  },
  seg: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  redFlash: {
    backgroundColor: 'white',
    borderTopLeftRadius: 150,
  },
  blueFlash: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 150,
  },
  purpleFlash: {
    backgroundColor: 'white',
    borderTopRightRadius: 150,
  },
  greenFlash: {
    backgroundColor: 'white',
    borderBottomRightRadius: 150,
  },
  buttons: {
    marginTop: 20,
    marginBottom: 60,
  },
});

export default Shapes;
