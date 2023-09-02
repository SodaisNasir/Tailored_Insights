import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';
import { scale, verticalScale } from 'react-native-size-matters';
import { Font } from '../utils/font';
import { Colors } from '../utils/Colors';
import { GlobalStyle } from '../Constants/GlobalStyle';
const CustomButton = props => {
  return (
    <Pressable
      android_ripple={GlobalStyle.WhiteRippe}
      onPress={props.onPress}
      style={[styles.containerStyle, props.containerStyle]}>
      <Text style={[styles.font, props.textStyle]}>{props.title}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    marginTop: verticalScale(5),
    alignSelf: 'center',
    backgroundColor: Colors.Main,
    height: verticalScale(47),
    flexDirection: 'row',
    overflow: 'hidden',
  },

  font: {
    color: Colors.White,
    fontSize: scale(16),
    fontFamily: Font.Inter600,
  },
});
