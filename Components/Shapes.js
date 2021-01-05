import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

const Shapes = () => {
  const [panels, setPanels] = useState(['red', 'yellow', 'blue', 'green']);
  const [canClick, setCanClick] = useState(false);
  const [flashCol, setFlashCol] = useState('');
  const [sequence, setSequence] = useState(['red']);

  //Will Give You A Random Colour Panel
  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    return panel;
  };

  //Will Flash A Single Colour Panel
  const flash = (flashy) => {
    return new Promise((resolve, reject) => {
      setFlashCol(flashy);
      setTimeout(() => {
        setFlashCol();
        setTimeout(() => {
          resolve();
        }, 250);
      }, 800);
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

  const gameplay = (panelPressed) => {
    // console.log(panelPressed, 'panel click');
    // if (!canClick) return;
    const clonedSequence = [...sequence];
    // console.log(clonedSequence, 'clone 46');
    const expectedPanel = clonedSequence.shift();
    if (expectedPanel === panelPressed) {
      // console.log(clonedSequence, 'clone');
      if (clonedSequence.length === 0) {
        //start new round
        setSequence([...sequence, getRandomPanel()]);
        startFlashing();
      }
    } else {
      // end game
      alert('GAME OVER');
    }
  };

  useEffect(() => {
    startFlashing();
  }, [sequence]);

  return (
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
          onPress={() => handlePress('yellow')}
        >
          <Text
            nativeID='yellow'
            style={
              flashCol === 'yellow'
                ? [styles.yellowFlash, styles.seg]
                : [styles.yellowSeg, styles.seg]
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
