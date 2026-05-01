import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigation from './TabNavigation';
import UserDetailsScreen from '../screen/UserDetailsScreen';
import { RootStackParamList } from '../types/navigations';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UserDetailScreen"
                    component={UserDetailsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;