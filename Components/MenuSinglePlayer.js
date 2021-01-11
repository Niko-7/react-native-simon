import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const MenuSinglePlayer = ({ route, navigation }) => {
  const { user } = route.params;
  return (
    <View style={styles.menuSinglePlayerContainer}>
      <Text>Select Difficulty</Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() =>
              navigation.navigate('Game', {
                difficulty: 'easy',
                betweenTime: 250,
                flashTime: 800,
                user
              })
            }
          >
            Easy
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() =>
              navigation.navigate('Game', {
                difficulty: 'normal',
                betweenTime: 250,
                flashTime: 300,
                user
              })
            }
          >
            Normal
          </Button>
        </View>
        <View style={styles.button}>
          <Button
            mode="contained"
            color="blue"
            onPress={() =>
              navigation.navigate('Game', {
                difficulty: 'hard',
                betweenTime: 250,
                flashTime: 100,
                user
              })
            }
          >
            Hard
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuSinglePlayerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsContainer: {
    width: '50%'
  },
  button: {
    margin: 5
  }
});

export default MenuSinglePlayer;
