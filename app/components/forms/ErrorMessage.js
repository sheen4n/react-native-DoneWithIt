import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../Text';

const ErrorMessage = ({ error, visible }) => {
  if (error && visible) return <Text style={styles.error}>{error}</Text>;

  return null;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
