import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { Colors } from "../../utils/Colors";
import { GlobalStyle } from "../../Constants/GlobalStyle";

const { width, height } = Dimensions.get("window");
const Splash = () => {
  return (
    <View style={styles.Container}>
      <StatusBar
        translucent
        backgroundColor={Colors.Non}
        barStyle="dark-content"
      />
      <View style={styles.ImageBox}>
        <Image
          style={GlobalStyle.Image}
          source={require("../../assets/image/logo.png")}
        />
      </View>
      <View style={{ marginTop: "20%" }}>
        <ActivityIndicator size={scale(50)} color={Colors.Black} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ImageBox: {
    width: width / 1.2,
    height: height / 2,
  },
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;
