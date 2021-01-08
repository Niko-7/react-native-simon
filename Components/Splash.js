import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';

import { firebase } from '../src/firebaseConfig';

const Splash = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);

  const handleLoginPress = () => {
    if (email.length < 1 && password.length < 1) {
      setEmptyEmail(true);
      setEmptyPassword(true);
    } else if (email.length > 0 && password.length < 1) {
      setEmptyEmail(false);
      setEmptyPassword(true);
    } else if (email.length < 1 && password.length > 0) {
      setEmptyEmail(true);
      setEmptyPassword(false);
    } else {
      setEmptyEmail(false);
      setEmptyPassword(false);

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          const uid = res.user.uid;
          const userRef = firebase.firestore().collection('users');

          userRef
            .doc(uid)
            .get()
            .then((document) => {
              if (!document.exists) {
                alert('Incorrect login details.\nPlease try again.');
                return;
              }

              const user = document.data();
              navigation.navigate('GameChoice', { user });
            });
        })
        .catch((err) => {
          // console.error(err);
          alert('Incorrect login details. \n Please try again.');
          // alert(err);
        });
    }
  };

  return (
    <View style={styles.splashContainer}>
      <View style={styles.loginItems}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          dense={true}
        />
        <HelperText type="error" visible={emptyEmail}>
          Please enter your email
        </HelperText>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          maxLength={20}
          dense={true}
          secureTextEntry={true}
        />
        <HelperText type="error" visible={emptyPassword}>
          Please enter a password
        </HelperText>
        <View style={styles.buttons}>
          <Button mode="contained" color="blue" onPress={handleLoginPress}>
            Login
          </Button>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            color="blue"
            onPress={() => navigation.navigate('Signup', { email })}
          >
            Signup
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'center',
    marginBottom: 10,
  },
  loginItems: {
    width: '50%',
  },
  buttons: {
    margin: 5,
  },
});

export default Splash;
