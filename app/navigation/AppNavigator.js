import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

import ListingEditScreen from '../screens/ListingEditScreen';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton';
import routes from './routes';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.medium,
    }}
  >
    <Tab.Screen
      name={routes.FEED}
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name={routes.LISTING_EDIT}
      component={ListingEditScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton onPress={() => navigation.navigate(routes.LISTING_EDIT)} />
        ),
      })}
    />
    <Tab.Screen
      name={routes.ACCOUNT}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account' size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);
