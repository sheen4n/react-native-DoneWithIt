import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ListItemDeleteAction = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name='trash-can'
          size={35}
          color={colors.white}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ListItemDeleteAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    height: '100%',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
