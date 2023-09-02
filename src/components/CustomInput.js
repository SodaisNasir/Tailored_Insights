import React, { forwardRef } from 'react'
import { useController } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Colors } from '../utils/Colors';
import { Font } from '../utils/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
const CustomInput = forwardRef((props, ref) => {
  const { field } = useController({
    control: props.control,
    defaultValue: props.defaultValue || '',
    name: props.name,
    rules: props.rules,
  });
  return (
    <View style={[styles.MainBox, props.style, props.Hello]}>
      {props.FontAwesome && (
        <FontAwesome
          name={props.FontAwesome_Name}
          size={props.size}
          color={Colors.Black}
        />
      )}
      {props.MaterialIcons && (
        <MaterialIcons
          name={props.MaterialIcons_Name}
          size={props.size}
          color={Colors.Main}
        />
      )}
      {props.Fontisto && (
        <Fontisto
          name={props.Fontisto_Name}
          size={props.size}
          color={Colors.Main}
        />
      )}
      {props.Octicons && (
        <Octicons
          name={props.Octicons_Name}
          size={props.size}
          color={Colors.Main}
        />
      )}
      {props.FontAwesome5 && (
        <FontAwesome5
          name={props.FontAwesome5_Name}
          size={props.size}
          color={Colors.Main}
        />
      )}
      {props.Entypo && (
        <Entypo
          name={props.Entypo_Name}
          size={props.size}
          color={Colors.Main}
        />
      )}
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
    paddingHorizontal: moderateScale(8),
    fontSize: scale(14),
  },
  MainBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: verticalScale(20),
    width: '100%',
    paddingHorizontal: moderateScale(15),
    height: verticalScale(46),
    borderWidth: scale(1),
    borderColor: Colors.Main,
    borderRadius: scale(12),
  },
});
export default CustomInput;
