import React, { forwardRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

const PasswordInput = forwardRef((props, ref) => {
  const [password, setPassword] = useState(true)

  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });

  return (
    <View style={[styles.MainBox, props.style, props.Hello]}>
      <Fontisto
        name={'unlocked'}
        size={scale(20)}
        color={Colors.Main}
      />
      <TextInput
        onFocus={props.onFocus}
        textContentType={props.textContentType}
        value={field.value}
        ref={ref}
        onChangeText={field.onChange}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.placeholderTextColor}
        style={[styles.InputStyles, props.Gapp, props.restyle]}
        secureTextEntry={password}
        keyboardType={'default'}
        textAlignVertical={props.textAlignVertical}
        pattern={props.pattern}
        label={props.label}
        placeholderStyle={props.placeholderStyle}
        maxLength={props.maxLength}
      />
      <Entypo onPress={() => setPassword(!password)} name={password ? 'eye' : 'eye-with-line'} color={Colors.Ash} size={scale(17)} />
    </View>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '80%',
    height: '100%',
    color: Colors.Black,
    fontFamily: Font.Inter500,
    paddingHorizontal: moderateScale(15),
    fontSize: scale(14)
  },
  MainBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(20),
    width: '100%',
    paddingHorizontal: moderateScale(20),
    height: verticalScale(46),

    borderWidth: scale(1),
    borderRadius: scale(12),
  },
});
export default PasswordInput;


