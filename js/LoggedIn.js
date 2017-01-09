/**
 * @flow
 */
import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import UserScreen from './UserScreen';


const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});

/* eslint-disable no-param-reassign */
networkInterface.use([
  {
    async applyMiddleware(req, next) {
      // Create the header object if needed.
      if (!req.options.headers) {
        req.options.headers = {};
      }

      const token = await AsyncStorage.getItem('@IronGithub:access_token');
      if (token) {
        req.options.headers.authorization = `Bearer ${JSON.parse(token).access_token}`;
      }
      next();
    },
  },
]);
/* eslint-enable no-param-reassign */

const client = new ApolloClient({
  networkInterface,
});


export default class LoggedIn extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <UserScreen />
      </ApolloProvider>
    );
  }
}
