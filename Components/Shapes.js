import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const Shapes = () => {
  const [panels, setPanels] = useState(['red', 'purple', 'blue', 'green']);
  const [canClick, setCanClick] = useState(false);
  const [flashCol, setFlashCol] = useState('');
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //Will Give You A Random Colour Panel
  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    return panel;
  };

  //Will Flash A Single Colour Panel
  //Change Timeouts For Difficulty Levels
  const flash = (flashy) => {
    return new Promise((resolve, reject) => {
      setFlashCol(flashy);
      setTimeout(() => {
        console.log('setTimeout 1');
        setFlashCol('');
        setTimeout(() => {
          console.log('setTimeout 2');
          resolve();
        }, 250);
      }, 750);
    });
  };

  // async await expects a promise
  //Send The Sequence Of Colour To Flash
  const startFlashing = async () => {
    for (const panel of sequence) {
      await flash(panel);
    }
  };

  const handlePress = (colour) => {
    console.log(colour);
    gameplay(colour);
  };

  let clonedSequence = [...sequence];
  //Game Logic Increment Sequence Every Round
  const gameplay = (panelPressed) => {
    const expectedPanel = clonedSequence.shift();
    if (expectedPanel === panelPressed) {
      if (clonedSequence.length === 0) {
        //start new round

        // betweenRounds();
        setTimeout(() => {
          setSequence([...sequence, getRandomPanel()]);
          // startFlashing();
        }, 1000);
      }
    } else {
      // end game
      const finalScore = sequence.length - 1;
      alert(`GAME OVER \n You Scored ${finalScore} points 🎖`);
      setScore(finalScore);
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    isPlaying && startFlashing();
  }, [sequence, score]);

  return (
    <View nativeID='body'>
      <Text style={styles.title}>{`CURRENT HIGH SCORE: ${score}`}</Text>

      <Button
        style={styles.button}
        title='start'
        onPress={() => {
          setIsPlaying(true);
          setSequence([getRandomPanel()]);
        }}
      />
      <View style={styles.rowContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handlePress('red')}
          >
            <Text
              nativeID='red'
              style={
                flashCol === 'red'
                  ? [styles.redFlash, styles.seg]
                  : [styles.redSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handlePress('purple')}
          >
            <Text
              nativeID='purple'
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
            activeOpacity={0.5}
            onPress={() => handlePress('blue')}
          >
            <Text
              nativeID='blue'
              style={
                flashCol === 'blue'
                  ? [styles.blueFlash, styles.seg]
                  : [styles.blueSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handlePress('green')}
          >
            <Text
              nativeID='green'
              style={
                flashCol === 'green'
                  ? [styles.greenFlash, styles.seg]
                  : [styles.greenSeg, styles.seg]
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 150,
    fontSize: 30,
    color: 'black',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  button: {
    marginBottom: 60,
  },
});

export default Shapes;
