import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import { scale } from "react-native-size-matters";
import { Font } from "../../utils/font";

const BottomText = () => {
  return <Text style={styles.title}>© 2023 Zeigler's Distributor, Inc.</Text>;
};

export default BottomText;

const styles = StyleSheet.create({
  title: {
    color: Colors.Grey,
    fontSize: scale(12),
    fontFamily: Font.Inter400,
    textAlign: "center",
  },
});
