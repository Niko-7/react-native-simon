import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Keyboard } from 'react-native';

const Menu = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [purpose, setPurpose] = useState('');
  const [menuView, setMenuView] = useState('username');
  const [emptyField, setEmptyField] = useState('false');

  const handleLoginPress = () => {
    if (email.length > 0 && password.length > 0) {
      setEmptyField(false);
      navigation.navigate('GameChoice');
    } else {
      setEmptyField(true);
    }
  };

  return (
    <View style={styles.menuContainer}>
      {menuView === 'username' && (
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
            placeholder="Enter your email"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            required
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            maxLength={20}
            onBlur={Keyboard.dismiss}
            required
          />
          <Button
            title="Login"
            style={styles.loginButton}
            onPress={handleLoginPress}
          />
        </View>
      )}
      {/* {menuView === 'purpose' && (
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
            style={styles.loginButton}
            onPress={() => navigation.navigate('Shapes')}
          />
        </View>
      )} */}
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
