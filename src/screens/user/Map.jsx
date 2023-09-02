import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import LogoCard from "../../components/Card/LogoCard";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";
import { Controller, useForm } from "react-hook-form";
import { MapRadious, Radius, coordinates } from "../../Constants/Data";
import CustomButton from "../../components/CustomButton";
import MapComponent from "../../components/MapComponent.jsx";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { IS_SIGN_IN } from "../../redux/reducer/Holder";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import CustomInput from "../../components/CustomInput";
import AnimatedDropDown from "../../components/AnimatedDropDown";
import BottomText from "../../components/Card/BottomText";
const Map = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: "",
  });

  const LogOut = () => {
    dispatch({ type: IS_SIGN_IN, payload: null });
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <LogoCard NoBack />
      {/* <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}> */}
      <View style={GlobalStyle.Padding}>
        <CustomInput
          Entypo
          Entypo_Name="location-pin"
          size={scale(22)}
          control={control}
          name="location"
          // rules={{
          //   required: "*User id is required",
          // }}
          placeholder="Enter a location"
        />
      </View>
      <View style={GlobalStyle.verticalSpace} />
      <AnimatedDropDown options={Radius} />
      <CustomButton
        title="SHOW RESULTS"
        containerStyle={{
          borderRadius: scale(15),
          marginTop: verticalScale(10),
        }}
        onPress={() => navigation.navigate("filter")}
      />

      <View style={styles.MapBox}>
        <MapComponent item={coordinates} />
      </View>
      <View style={styles.LogoutBox}>
        <Ionicons
          onPress={LogOut}
          name="log-out"
          color={Colors.Main}
          size={scale(25)}
        />
      </View>
      {/* </ScrollView> */}
      <ConnectionModal />
      <BottomText />
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  box: {
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: Colors.Black,
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(20),
  },
  smallBox: {
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: Colors.Black,
    width: scale(50),
    aspectRatio: 1 / 1,
    marginRight: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: Colors.Black,
    fontSize: scale(15),
    fontFamily: Font.Inter500,
  },
  MapBox: {
    height: "55%",
    marginVertical: verticalScale(15),
    borderRadius: scale(14),
    marginBottom: verticalScale(20),
    overflow: "hidden",
    marginHorizontal: verticalScale(20),
  },
  LogoutBox: {
    borderRadius: scale(100),
    elevation: 3,
    position: "absolute",
    bottom: scale(20),
    right: scale(20),
    backgroundColor: Colors.White,
    padding: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
});
