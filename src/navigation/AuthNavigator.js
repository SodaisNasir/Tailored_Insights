import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/authentication/Login';
import FindAccount from '../screens/authentication/FindAccount';
import Reset from '../screens/authentication/Reset';
import Otp from '../screens/authentication/Otp';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="otp" component={Otp} />
        <Stack.Screen name="FindAccount" component={FindAccount} />
        <Stack.Screen name="reset" component={Reset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
