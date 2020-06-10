import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import Text from './Text';
import colors from '../config/colors';
import Constants from 'expo-constants';

export default function OfflineNotice() {
  const netInfo = useNetInfo();
  const { type, isInternetReachable } = netInfo;

  if (type !== 'unknown' && isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});
