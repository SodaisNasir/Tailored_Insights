import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const UserNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View>
      <Text>UserNavigator</Text>
    </View>
  )
}

export default UserNavigator

const styles = StyleSheet.create({})





// const UserNavigator = () => {
//
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         initialRouteName="home"
//         screenOptions={{
//           tabBarHideOnKeyboard: true,
//           tabBarShowLabel: false,
//           headerShown: false,
//         }}>
//         <Tab.Screen
//           name="dashboard"
//           component={AllDashboard}
//           options={{
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/home.png')}
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/homedeactive.png')}
//                   />
//                 </View>
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="AllPic"
//           component={AllPic}
//           options={{
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/photo.png')}
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/photodeactive.png')}
//                   />
//                 </View>
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="AllStream"
//           component={AllStream}
//           options={{
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/line.png')}
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/linedeactive.png')}
//                   />
//                 </View>
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="AllVlog"
//           component={AllVlog}
//           options={{
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/video.png')}
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/videodeactive.png')}
//                   />
//                 </View>
//               ),
//           }}
//         />
//         <Tab.Screen
//           name="AllSetting"
//           component={AllSetting}
//           options={{
//             tabBarIcon: ({focused}) =>
//               focused ? (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/settings.png')}
//                   />
//                 </View>
//               ) : (
//                 <View style={styles.ImageBox}>
//                   <Image
//                     style={styles.Image}
//                     source={require('../assets/image/settingsdeactive.png')}
//                   />
//                 </View>
//               ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };
// const styles = StyleSheet.create({
//   Image: {
//     width: scale(23),
//     height: scale(23),
//     resizeMode: 'contain',
//   },
//   ImageBox: {
//     shadowColor: '#fff',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 100,

//     backgroundColor: '#3D4663',
//   },
// });
// export default UserNavigator;

// const Stack = createNativeStackNavigator();

// function AllDashboard() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="userdashboard">
//       <Stack.Screen
//         name="userdashboard"
//         component={Dashboard}
//         options={{animation: 'slide_from_left'}}
//       />
//       <Stack.Screen
//         name="Search"
//         component={Search}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="Alert"
//         component={Alert}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="SearchScreen"
//         component={SearchScreen}
//         options={{animation: 'flip'}}
//       />

//       <Stack.Screen
//         name="PopularSong"
//         component={PopularSong}
//         options={{animation: 'flip'}}
//       />

//       <Stack.Screen
//         name="PlayAll"
//         component={PlayAll}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="Music"
//         component={Music}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="SingleVideo"
//         component={SingleVideo}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="Genre"
//         component={Genre}
//         options={{animation: 'flip'}}
//       />

//       <Stack.Screen
//         name="AllVideos"
//         component={AllVideos}
//         options={{animation: 'slide_from_right'}}
//       />
//     </Stack.Navigator>
//   );
// }

// function AllPic() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="PictureSection">
//       <Stack.Screen
//         name="PictureSection"
//         component={PictureSection}
//         options={{animation: 'slide_from_left'}}
//       />
//       <Stack.Screen
//         name="PlayAll"
//         component={PlayAll}
//         options={{animation: 'fade'}}
//       />
//     </Stack.Navigator>
//   );
// }

// function AllStream() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="LiveStreams">
//       <Stack.Screen
//         name="LiveStreams"
//         component={LiveStreams}
//         options={{animation: 'slide_from_right'}}
//       />
//       <Stack.Screen
//         name="AllVideos"
//         component={AllVideos}
//         options={{animation: 'slide_from_right'}}
//       />
//       <Stack.Screen
//         name="AllStreams"
//         component={AllStreams}
//         options={{animation: 'slide_from_right'}}
//       />
//       <Stack.Screen
//         name="PlayAll"
//         component={PlayAll}
//         options={{animation: 'fade'}}
//       />
//     </Stack.Navigator>
//   );
// }

// function AllVlog() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="VlogSection">
//       <Stack.Screen
//         name="VlogSection"
//         component={VlogSection}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="PlayAll"
//         component={PlayAll}
//         options={{animation: 'fade'}}
//       />
//     </Stack.Navigator>
//   );
// }

// function AllSetting() {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="Setting">
//       <Stack.Screen
//         name="Setting"
//         component={Setting}
//         options={{animation: 'slide_from_left'}}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={Profile}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="LeaderBoard"
//         component={LeaderBoard}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="ChangePassword"
//         component={ChangePassword}
//         options={{animation: 'flip'}}
//       />
//       <Stack.Screen
//         name="TermsAndConditions"
//         component={TermsAndConditions}
//         options={{animation: 'flip'}}
//       />
//     </Stack.Navigator>
//   );
// }
