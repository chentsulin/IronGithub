/**
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


class UserScreen extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.object,
      viewer: PropTypes.shape({
        avatarURL: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        followers: PropTypes.shape({
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
        following: PropTypes.shape({
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      }),
    }).isRequired,
  };

  render() {
    const { loading, error, viewer } = this.props.data;
    if (loading || error) return null;
    return (
      <Grid>
        <Row size={65} style={styles.profile}>
          <Image
            style={styles.avatar}
            source={{ uri: viewer.avatarURL }}
          />
          <Text style={[styles.textCenter, styles.login]}>
            {viewer.login}
          </Text>
          <Text style={[styles.textCenter, styles.name]}>
            {viewer.name}
          </Text>
        </Row>
        <Row size={35}>
          <Col>
            <Text style={[styles.textCenter, styles.followText]}>
              <Text style={styles.followNumber}>{viewer.followers.totalCount}</Text> Followers
            </Text>
          </Col>
          <Col>
            <Text style={[styles.textCenter, styles.followText]}>
              <Text style={styles.followNumber}>{viewer.following.totalCount}</Text> Following
            </Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: 'center',
  },
  profile: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatar: {
    marginTop: 90,
    marginBottom: 50,
    width: 220,
    height: 220,
    borderRadius: 20,
  },
  login: {
    flex: 3,
    fontSize: 28,
    lineHeight: 28,
  },
  name: {
    flex: 2,
    fontSize: 22,
    lineHeight: 22,
  },
  followText: {
    fontSize: 20,
  },
  followNumber: {
    fontSize: 30,
    color: '#EA7A4C',
  },
});

const query = gql`query {
  viewer {
    avatarURL
    login
    name
    followers {
      totalCount
    }
    following {
      totalCount
    }
  }
}`;


export default graphql(query)(UserScreen);
