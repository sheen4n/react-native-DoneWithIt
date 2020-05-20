import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Icon = ({
  name,
  backgroundColor = '#000',
  iconColor = '#fff',
  size = 40,
}) => {
  return (
    <View
      style={[
        styles.icon,
        { backgroundColor, width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <MaterialCommunityIcons size={size * 0.5} name={name} color={iconColor} />
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
