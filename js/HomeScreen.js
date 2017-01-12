/**
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      backgroundColor: '#EA7A4C',
      tintColor: '#fff',
    },
  };

  render() {
    console.log('印一點東西出來');
    return (
      <View style={styles.container}>
        <Text style={styles.body}>IronGithub</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    fontSize: 36,
    color: '#EA7A4C',
  },
});
