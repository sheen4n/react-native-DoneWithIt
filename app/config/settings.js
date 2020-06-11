import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'https://donewithit-backend.herokuapp.com/api',
  },
  staging: {
    apiUrl: 'https://donewithit-backend.herokuapp.com/api',
  },
  production: {
    apiUrl: 'https://donewithit-backend.herokuapp.com/api',
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'staging') return settings.staging;
  return settings.production;
};

export default getCurrentSettings();
