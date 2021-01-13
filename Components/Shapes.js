import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Shapes = ({ params, gameplay, startTimer, isPlaying, sequence }) => {
  const [canClick, setCanClick] = useState(false);
  const [flashCol, setFlashCol] = useState("");
  const [flashTime, setFlashTime] = useState(params.flashTime);
  const [betweenTime, setBetweenTime] = useState(params.betweenTime);

  useEffect(() => {
    // setSequence([getRandomPanel()]);
    isPlaying && startFlashing();
  }, [isPlaying, sequence]);

  //Will Flash A Single Colour Panel
  //Change Timeouts For Difficulty Levels
  const flash = (panel) => {
    return new Promise((resolve, reject) => {
      setCanClick(false);
      setFlashCol(panel);
      setTimeout(() => {
        setFlashCol("");
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

  return (
    <View style={styles.shapesContainer}>
      <View style={styles.rowContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={canClick ? null : true}
            onPress={() => gameplay("red")}
          >
            <Text
              nativeID="red"
              style={
                flashCol === "red"
                  ? [styles.redFlash, styles.seg]
                  : [styles.redSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            disabled={canClick ? null : true}
            onPress={() => gameplay("yellow")}
          >
            <Text
              nativeID="yellow"
              style={
                flashCol === "yellow"
                  ? [styles.yellowFlash, styles.seg]
                  : [styles.yellowSeg, styles.seg]
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            disabled={canClick ? null : true}
            activeOpacity={0.5}
            onPress={() => gameplay("blue")}
          >
            <Text
              nativeID="blue"
              style={
                flashCol === "blue"
                  ? [styles.blueFlash, styles.seg]
                  : [styles.blueSeg, styles.seg]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={canClick ? null : true}
            activeOpacity={0.5}
            onPress={() => gameplay("green")}
          >
            <Text
              nativeID="green"
              style={
                flashCol === "green"
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
  shapesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  bottomRow: {
    flex: 1,
    flexDirection: "row",
  },
  redSeg: {
    backgroundColor: "red",
    borderTopLeftRadius: 150,
  },
  yellowSeg: {
    backgroundColor: "yellow",
    borderTopRightRadius: 150,
  },
  blueSeg: {
    backgroundColor: "blue",
    borderBottomLeftRadius: 150,
  },
  greenSeg: {
    backgroundColor: "green",
    borderBottomRightRadius: 150,
  },
  seg: {
    width: 150,
    height: 150,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 3,
  },
  redFlash: {
    backgroundColor: "white",
    borderTopLeftRadius: 150,
  },
  blueFlash: {
    backgroundColor: "white",
    borderBottomLeftRadius: 150,
  },
  yellowFlash: {
    backgroundColor: "white",
    borderTopRightRadius: 150,
  },
  greenFlash: {
    backgroundColor: "white",
    borderBottomRightRadius: 150,
  },
});

export default Shapes;
