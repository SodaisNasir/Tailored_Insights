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
      disabled={props.disabled}
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
    borderRadius: scale(100),
    marginTop: verticalScale(5),
    alignSelf: 'center',
    backgroundColor: Colors.Main,
    height: verticalScale(52),
    borderWidth: scale(1),
    borderColor: Colors.Grey,
    flexDirection: 'row',
    overflow: 'hidden',
  },

  font: {
    color: Colors.White,
    fontSize: scale(20),
    textTransform: 'capitalize',
    fontFamily: Font.Inter600,
  },
});
