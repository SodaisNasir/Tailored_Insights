import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { moderateScale, scale } from "react-native-size-matters";

const LogoCard = () => {
  return (
    <View
      style={[
        GlobalStyle.Row,
        {
          justifyContent: "space-between",
          paddingHorizontal: moderateScale(10),
        },
      ]}
    >
      <View style={styles.ImageBox}>
        <Image
          style={GlobalStyle.Image}
          source={require("../../assets/image/logo.png")}
        />
      </View>
      <Text
        style={[
          GlobalStyle.Heading,
          {
            fontSize: scale(22),
          },
        ]}
      >
        Tailored insights
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: scale(100),
    aspectRatio: 1 / 1,
  },
});
export default LogoCard;
