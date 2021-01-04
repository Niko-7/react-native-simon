import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Shapes = ({ screenSize }) => {
  const handlePress = (color) => {
    console.log(color);
  };

  const getRandomPanel = () => {
    const panels = ['red', 'yellow', 'blue', 'green'];
    return panels[parseInt(Math.random() * panels.length)];
  };

  const sequence = [getRandomPanel()];
  let sequenceToGuess = [...sequence];

  return (
    <View style={styles.rowContainer}>
      <View style={styles.topRow}>
        <Text
          nativeID='red'
          style={styles.redSeg}
          onPress={() => handlePress('red')}
        />
        <Text
          nativeID='yellow'
          style={styles.yellowSeg}
          onPress={() => handlePress('yellow')}
        />
      </View>
      <View style={styles.bottomRow}>
        <Text
          nativeID='blue'
          style={styles.blueSeg}
          onPress={() => handlePress('blue')}
        />
        <Text
          nativeID='green'
          style={styles.greenSeg}
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
    width: 150,
    height: 150,
    backgroundColor: 'red',
    borderTopLeftRadius: 150,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  yellowSeg: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
    borderTopRightRadius: 150,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  blueSeg: {
    width: 150,
    height: 150,
    backgroundColor: 'blue',
    borderBottomLeftRadius: 150,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  greenSeg: {
    width: 150,
    height: 150,
    backgroundColor: 'green',
    borderBottomRightRadius: 150,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 3,
  },
});

export default Shapes;
