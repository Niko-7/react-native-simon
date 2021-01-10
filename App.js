import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './Components/Login';
import GameChoice from './Components/GameChoice';
import MenuSinglePlayer from './Components/MenuSinglePlayer';
import MenuMultiplayer from './Components/MenuMultiplayer';
import Signup from './Components/Signup';
import Game from './Components/Game';
import WaitingRoom from './Components/WaitingRoom';
import { firebase } from './src/firebaseConfig';

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="GameChoice" options={{ title: 'Argulympics' }}>
              {(props) => <GameChoice extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: 'Argulympics' }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ title: 'Argulympics' }}
              />
              <Stack.Screen
                name="MenuSinglePlayer"
                component={MenuSinglePlayer}
                options={{ title: 'Argulympics' }}
              />
            </>
          )}
          <Stack.Screen
            name="MenuMultiplayer"
            component={MenuMultiplayer}
            options={{ title: 'Argulympics' }}
          />
          <Stack.Screen
            name="Game"
            component={Game}
            options={{ title: 'Argulympics' }}
          />
          <Stack.Screen
            name="WaitingRoom"
            component={WaitingRoom}
            options={{ title: 'Argulympics' }}
          />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
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
