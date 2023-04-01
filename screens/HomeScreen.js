import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Home Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  
  heading: {
    fontSize: 22,
    textAlign: 'center'
  }
});
