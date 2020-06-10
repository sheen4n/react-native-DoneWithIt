import { AsyncStorage } from 'react-native';
import moment from 'moment';

const prefix = 'cache';
const EXPIRY_IN_MINUTES = 5;

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, 'minutes') > EXPIRY_IN_MINUTES;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    // Violates Command Query Separation (CQS) But is ok
    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }

    return item;
  } catch (error) {
    console.log(error);
  }
};

export default {
  get,
  store,
};
