import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../utils/Colors";
const LogoCard = ({ mailes, NoBack }) => {
  const navigation = useNavigation();
  return (
    <>
      {NoBack ? null : (
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
});
export default LogoCard;
