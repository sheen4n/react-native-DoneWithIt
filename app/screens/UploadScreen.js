import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import LottieView from 'lottie-react-native';

import colors from '../config/colors';

export default function UploadScreen({ progress = 0, visible = false, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <ProgressBar progress={progress} width={200} color={colors.primary} height={15} />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require('../assets/animations/done.json')}
            style={styles.animation}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
