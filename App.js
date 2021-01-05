import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Menu from './Components/Menu';
import Shapes from './Components/Shapes';

export default function App() {
  return (
    <View style={styles.container}>
      <Menu />
      {/* <Shapes /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
