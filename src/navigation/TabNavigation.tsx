import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import UserListScreen from '../screen/UserListScreen';
import FavoritesScreen from '../screen/FavoritesScreen';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Users"
        component={UserListScreen}
        options={{ tabBarIcon: () => <Text>👥</Text> }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarIcon: () => <Text>❤️</Text> }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;