import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { Colors } from "../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import Fontisto from "react-native-vector-icons/Fontisto";

const Admin_selectValue = ({ focus, onPress, data, center, Restyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[GlobalStyle.Row, Restyle, { marginTop: verticalScale(3) }]}
    >
      <Fontisto
        name={focus ? "radio-btn-active" : "radio-btn-passive"}
        color={Colors.Grey}
        size={scale(20)}
      />
      <Text
        style={[
          GlobalStyle.Heading,
          {
            marginHorizontal: scale(5),
            color: "#36779A",
          },
        ]}
      >
        {data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Admin_selectValue;

const styles = StyleSheet.create({});
