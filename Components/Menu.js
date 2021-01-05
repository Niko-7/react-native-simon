import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Keyboard } from 'react-native';

const Menu = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [purpose, setPurpose] = useState('');
  const [menuView, setMenuView] = useState('username');
  const [emptyField, setEmptyField] = useState('false');

  const handleUsernameNext = () => {
    if (username.length > 0) {
      setEmptyField(false);
      setMenuView('purpose');
    } else {
      setEmptyField(true);
    }
  };

  const handleUsernameBack = () => {
    setMenuView('start');
  };
  const handlePurposeBack = () => {
    setMenuView('username');
  };

  return (
    <View style={styles.menuContainer}>
      {menuView === 'username' && (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setUsername(text)}
            placeholder="What is your name?"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            required
          />
          <Button
            title="Next"
            style={styles.nextButton}
            onPress={handleUsernameNext}
          />
          <Button title="Back" onPress={handleUsernameBack} />
        </View>
      )}
      {menuView === 'purpose' && (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPurpose(text)}
            placeholder="What are you playing for?"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            required
          />
          <Button
            title="Play"
            style={styles.nextButton}
            onPress={() => navigation.navigate('Shapes')}
          />
          <Button
            title="Back"
            style={styles.backButton}
            onPress={handlePurposeBack}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  textInput: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    fontSize: 'large',
    padding: 0
  },
  nextButton: { margin: 5 },
  backButton: { marginTop: 5 }
});

export default Menu;
