import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Shapes from "./Shapes";
import Timer from "./Timer";

const Game = ({ route }) => {
  const { params } = route;

  return <Shapes params={params} />;
};

export default Game;
