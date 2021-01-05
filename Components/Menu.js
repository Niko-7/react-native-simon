import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const Menu = () => {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Simon Says</Text>
      </View>
      <TextInput
        style={styles.usernameInput}
        onChangeText={(text) => setUsername(text)}
        placeholder="What is your name?"
      />
      <Button title="Next" style={styles.nextButton} />
      <View style={styles.menuFooter} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    // backgroundColor: 'red',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  menuTitleContainer: {
    // backgroundColor: 'yellow',
    flex: 5,
    justifyContent: 'center'
  },
  menuTitle: {
    fontSize: 'larger',
    textDecorationLine: 'underline'
  },
  usernameInput: {
    // backgroundColor: 'green',
    textAlign: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    fontSize: 'large',
    padding: 0
  },
  nextButton: { margin: 1 },
  menuFooter: {
    // backgroundColor: 'black',
    flex: 5
  }
});

export default Menu;
