import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Shapes = () => {
  const [canClick, setCanClick] = useState(true);
  const [flashCol, setFlashCol] = useState('');
  const [sequence, setSequence] = useState([]);

  const handlePress = (color) => {
    console.log(color);
  };

  useEffect(() => {
    getRandomPanel();
    console.log(sequence);
    for (let colour of sequence) flash(colour);
    // sequence.forEach((seq) => flash(seq));
  }, []);

  const getRandomPanel = () => {
    const panels = ['red', 'yellow', 'blue', 'green'];
    const panel = panels[parseInt(Math.random() * panels.length)];
    setSequence(['red', 'red', 'red', 'red']);
    // setSequence([...sequence, panel]);
    // setSequence([panel, ...sequence]);
    // console.log(sequence[0], 'in panel');
    return panel;
  };

  const flash = (flashy) => {
    setFlashCol(flashy);
    // console.log('red flash');
    setTimeout(() => {
      setFlashCol();
      // console.log('flash off');
      setTimeout(() => {}, 250);
    }, 1000);
  };

  // const sequence = [getRandomPanel()];
  let sequenceToGuess = [sequence];

  // const gameplay = (sequence) => {
  //   for (let panel of sequence) {
  //     flash(panel);
  //   }
  // };
  // gameplay();

  return (
    <View style={styles.rowContainer}>
      <View style={styles.topRow}>
        <Text
          nativeID='red'
          style={
            flashCol === 'red'
              ? [styles.redFlash, styles.seg]
              : [styles.redSeg, styles.seg]
          }
          onPress={() => handlePress('red')}
        />
        <Text
          nativeID='yellow'
          style={
            flashCol === 'yellow'
              ? [styles.yellowFlash, styles.seg]
              : [styles.yellowSeg, styles.seg]
          }
          onPress={() => handlePress('yellow')}
        />
      </View>
      <View style={styles.bottomRow}>
        <Text
          nativeID='blue'
          style={
            flashCol === 'blue'
              ? [styles.blueFlash, styles.seg]
              : [styles.blueSeg, styles.seg]
          }
          onPress={() => handlePress('blue')}
        />
        <Text
          nativeID='green'
          style={
            flashCol === 'green'
              ? [styles.greenFlash, styles.seg]
              : [styles.greenSeg, styles.seg]
          }
          onPress={() => handlePress('green')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  yellowSeg: {
    backgroundColor: 'yellow',
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
  yellowFlash: {
    backgroundColor: 'white',
    borderTopRightRadius: 150,
  },
  greenFlash: {
    backgroundColor: 'white',
    borderBottomRightRadius: 150,
  },
});

export default Shapes;
