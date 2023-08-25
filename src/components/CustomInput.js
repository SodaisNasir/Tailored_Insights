import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
const CustomInput = forwardRef((props, ref) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });
  return (
    <View style={[styles.smallbox, props.style, props.Hello]}>
      {props.FontAwesome ? (
        <FontAwesome
          name={props.FontAwesome_Name}
          size={props.size}
          color={Colors.Black}
        />
      ) : null}
      {props.MaterialIcons ? (
        <MaterialIcons
          name={props.MaterialIcons_Name}
          size={props.size}
          color={Colors.Main}
        />
      ) : null}
      {props.Fontisto ? (
        <Fontisto
          name={props.Fontisto_Name}
          size={props.size}
          color={Colors.Black}
        />
      ) : null}
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
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        textAlignVertical={props.textAlignVertical}
        pattern={props.pattern}
        label={props.label}
        placeholderStyle={props.placeholderStyle}
        fontSize={props.fontSize}
        maxLength={props.maxLength}
        cursorColor={Colors.Main}
        keyboardAppearance='dark'
        selectionColor={Colors.Main}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: '100%',
    height: '100%',
    color: Colors.Black,
    fontFamily: Font.Inter500,
    paddingHorizontal: moderateScale(20),
  },
  smallbox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(20),
    width: '100%',
    paddingHorizontal: moderateScale(20),
    height: verticalScale(50),
    backgroundColor: 'transparent',
    borderWidth: scale(1),
    borderColor: Colors.White,
    borderRadius: scale(20),
  },
});
export default CustomInput;
