import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Splash from './Components/Splash';
import GameChoice from './Components/GameChoice';
import MenuSinglePlayer from './Components/MenuSinglePlayer';
import MenuMultiplayer from './Components/MenuMultiplayer';
import Signup from './Components/Signup';
import Game from './Components/Game';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="MenuSinglePlayer"
            component={MenuSinglePlayer}
            options={{ title: 'Argulympics' }}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ title: 'Argulympics' }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Argulympics' }}
          />
          <Stack.Screen
            name="GameChoice"
            component={GameChoice}
            options={{ title: 'Argulympics' }}
          />
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
