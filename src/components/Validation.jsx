import { Text, StyleSheet } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { Font } from "../utils/font";

const Validation = ({ restyle, title }) => {
  return <Text style={[styles.error, restyle]}>{title} </Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: scale(11.5),
    marginLeft: scale(5),
    fontFamily: Font.Inter500,
  },
});

export default Validation;
