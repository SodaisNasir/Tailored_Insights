import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from '../screens/authentication/Login';
// import SignUp from '../screens/authentication/SignUp';
import FindAccount from '../screens/authentication/FindAccount';
import Reset from '../screens/authentication/Reset';
import Otp from '../screens/authentication/Otp';
// import TermsAndConditions from '../screens/common/SettingFolder/TermsAndConditions';
// import AccountType from '../screens/authentication/AccountType';

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
        {/* <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AccountType" component={AccountType} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
