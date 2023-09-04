import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/authentication/Login';
import FindAccount from '../screens/authentication/FindAccount';
import Reset from '../screens/authentication/Reset';
import Otp from '../screens/authentication/Otp';
import ContactAdmin from '../screens/authentication/ContactAdmin.jsx';

const AdminNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="contact_admin" component={ContactAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AdminNavigator;
