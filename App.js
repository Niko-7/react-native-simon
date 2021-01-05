import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Menu from './Components/Menu';
import Shapes from './Components/Shapes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: 'Simon Says' }}
        />
        <Stack.Screen name="Shapes" component={Shapes} />
      </Stack.Navigator>
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
