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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="GameChoice" component={GameChoice} />
          <Stack.Screen name="MenuSinglePlayer" component={MenuSinglePlayer} />
          <Stack.Screen name="MenuMultiplayer" component={MenuMultiplayer} />
          <Stack.Screen name="Shapes" component={Shapes} />
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
