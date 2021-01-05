import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Shapes = () => {
  const [panels, setPanels] = useState(["red", "yellow", "blue", "green"]);
  const [canClick, setCanClick] = useState(false);
  const [flashCol, setFlashCol] = useState("");

  const [sequence, setSequence] = useState(["red", "red"]);

  const getRandomPanel = () => {
    const panel = panels[parseInt(Math.random() * panels.length)];
    // setSequence(["red", "red", "red", "red"]);
    return panel;
  };

  const flash = (flashy) => {
    return new Promise((resolve, reject) => {
      setFlashCol(flashy);

      console.log(flashy, "colour");
      console.log("flash on");

      setTimeout(() => {
        setFlashCol();

        console.log("flash off");
        resolve();
        setTimeout(() => {}, 250);
      }, 1000);
    });
  };

  // const startFlashing = () => {
  //   sequence.forEach((flashy) => flash(flashy));
  // };

  // async await expects a promise
  const startFlashing = async () => {
    // canClick = false;
    for (const panel of sequence) {
      await flash(panel);
    }
    // canClick = true;
  };

  const handlePress = (color) => {
    console.log(color);
  };

  useEffect(() => {
    // getRandomPanel();
    console.log(sequence, "<---- SEQUENCE");
    startFlashing();
  }, [sequence]);

  return (
    <View style={styles.rowContainer}>
      <View style={styles.topRow}>
        <Text
          nativeID="red"
          style={
            flashCol === "red"
              ? [styles.redFlash, styles.seg]
              : [styles.redSeg, styles.seg]
          }
          onPress={() => handlePress("red")}
        />
        <Text
          nativeID="yellow"
          style={
            flashCol === "yellow"
              ? [styles.yellowFlash, styles.seg]
              : [styles.yellowSeg, styles.seg]
          }
          onPress={() => handlePress("yellow")}
        />
      </View>
      <View style={styles.bottomRow}>
        <Text
          nativeID="blue"
          style={
            flashCol === "blue"
              ? [styles.blueFlash, styles.seg]
              : [styles.blueSeg, styles.seg]
          }
          onPress={() => handlePress("blue")}
        />
        <Text
          nativeID="green"
          style={
            flashCol === "green"
              ? [styles.greenFlash, styles.seg]
              : [styles.greenSeg, styles.seg]
          }
          onPress={() => handlePress("green")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
