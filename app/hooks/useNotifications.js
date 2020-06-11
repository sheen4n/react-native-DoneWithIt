import { useEffect } from 'react';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import expoPushTokensApi from '../api/expoPushTokens';
import logger from '../utility/logger';

export default useNotifications = (notificationListener) => {
  const registerForPushNotifications = async () => {
    try {
      const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!granted) return;
      const token = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token);
    } catch (error) {
      logger.log(new Error('error getting a push notification token' + error));
    }
  };

  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);
};
