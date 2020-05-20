import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Text from './Text';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MenuItem = ({ text, icon, color, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
      <View style={styles.container}>
        <View style={[styles.icon, { backgroundColor: colors[color] }]}>
          <MaterialCommunityIcons size={35} name={icon} color={colors.white} />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
  },
});
