import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import Shapes from './Components/Shapes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Splash from './Components/Splash';
import GameChoice from './Components/GameChoice';
import MenuSinglePlayer from './Components/MenuSinglePlayer';
import MenuMultiplayer from './Components/MenuMultiplayer';
import Signup from './Components/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              title: '',
              headerStyle: {
                height: 0
              }
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: '',
              headerStyle: {
                height: 0
              },
              headerTintColor: '#ffffff'
            }}
          />
          <Stack.Screen
            name="GameChoice"
            component={GameChoice}
            options={{
              title: '',
              headerStyle: {
                height: 0
              },
              headerTintColor: '#ffffff'
            }}
          />
          <Stack.Screen
            name="MenuSinglePlayer"
            component={MenuSinglePlayer}
            options={{
              title: '',
              headerStyle: {
                height: 0
              },
              headerTintColor: '#ffffff'
            }}
          />
          <Stack.Screen
            name="MenuMultiplayer"
            component={MenuMultiplayer}
            options={{
              title: '',
              headerStyle: {
                height: 0
              },
              headerTintColor: '#ffffff'
            }}
          />
          <Stack.Screen
            name="Shapes"
            component={Shapes}
            options={{
              title: '',
              headerStyle: {
                height: 0
              },
              headerTintColor: '#ffffff'
            }}
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
