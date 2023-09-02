import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from '../screens/user/Map'
import Filter from '../screens/user/Filter'
import FullTable from '../screens/user/FullTable'

const UserNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="map">
        <Stack.Screen
          name="map"
          component={Map}
          options={{ animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="filter"
          component={Filter}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="full_table"
          component={FullTable}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default UserNavigator