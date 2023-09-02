import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";
const LogoCard = ({ mailes, NoBack, Farm }) => {
  const navigation = useNavigation();
  return (
    <>
      {!NoBack && (
        <TouchableOpacity
          style={styles.arrowBox}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" color={Colors.Main} size={scale(20)} />
        </TouchableOpacity>
      )}

      <View
        style={[
          GlobalStyle.Row,
          {
            justifyContent: "space-between",
            paddingHorizontal: mailes ? moderateScale(15) : moderateScale(10),
          },
        ]}
      >
        <View style={styles.ImageBox}>
          <Image
            style={GlobalStyle.Image}
            source={require("../../assets/image/logo.png")}
          />
        </View>
        <View>
          <Text style={styles.Heading}>Tailored Insights</Text>
          <Text style={styles.HeadingTwo}>Field Intelligence</Text>
          {mailes && (
            <Text
              style={[
                GlobalStyle.Heading,
                {
                  fontSize: scale(14),
                },
              ]}
            >
              Within 10 Miles of {`\n`} Lebanon PA
            </Text>
          )}
          {Farm && (
            <Text
              style={[
                GlobalStyle.Heading,
                {
                  fontSize: scale(18),
                  fontFamily: Font.Inter600,
                },
              ]}
            >
              For <Text style={{ color: Colors.Main }}>Farmina</Text>
            </Text>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: scale(100),
    aspectRatio: 1 / 1,
  },
  arrowBox: {
    marginHorizontal: scale(20),
    borderRadius: scale(5),
    borderWidth: scale(1),
    borderColor: Colors.Main,
    width: scale(30),
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(10),
  },
  Heading: {
    fontSize: scale(22),
    color: Colors.Sky,
    textAlign: "center",
    fontFamily: Font.Inter600,
  },
  HeadingTwo: {
    textAlign: "center",
    color: Colors.Main,
    fontSize: scale(16),
    // fontFamily: Font.Inter600,
    fontStyle: "italic",
  },
});
export default LogoCard;
