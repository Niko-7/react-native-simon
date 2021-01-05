import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Splash = ({ navigation }) => {
  return (
    <View style={styles.splashContainer}>
      <Button title="Login" onPress={() => navigation.navigate('Menu')} />
      <Button title="Signup" />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default Splash;
