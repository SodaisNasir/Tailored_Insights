import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";
import { scale, verticalScale } from "react-native-size-matters";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import Error from "../../components/Modal/Error";
import Loading from "../../components/Modal/Loading";
import { useDispatch } from "react-redux";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import Netinfo from "@react-native-community/netinfo";
import Validation from "../../components/Validation";
import LogoCard from "../../components/Card/LogoCard";
import { EmailRegix } from "../../utils/url";

const FindAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const [index, setIndex] = useState(100);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = Netinfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate("otp");
  };
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogoCard />
      <View style={styles.MainBox}>
        <Text style={styles.Find}>Find Your Account</Text>
        <Text style={styles.Search}>
          Please enter your email address to search for your account.
        </Text>
        <CustomInput
          onFocus={() => {
            setIndex(1);
          }}
          style={{
            borderColor: index === 1 ? Colors.Main : Colors.border,
          }}
          MaterialIcons
          MaterialIcons_Name="email"
          size={scale(21)}
          control={control}
          keyboardType="email-address"
          name="email"
          rules={{
            required: "*Email is required",
            pattern: {
              value: EmailRegix,
              message: "Email is not valid",
            },
          }}
          placeholder="Email Address"
          fontSize={scale(16)}
        />
        {errors.email && <Validation title={errors.email.message} />}
        <View style={[GlobalStyle.Row, { justifyContent: "flex-end" }]}>
          <CustomButton
            onPress={() => navigation.navigate("login")}
            title="Cancel"
            containerStyle={[
              GlobalStyle.CustomButtonRestyle,
              styles.containerStyle,
            ]}
            textStyle={{ color: Colors.Black, fontSize: scale(14) }}
          />
          <CustomButton
            onPress={handleSubmit(onSubmit)}
            title="Search"
            containerStyle={[
              GlobalStyle.CustomButtonRestyle,
              styles.containerStyle,
            ]}
            textStyle={{ color: Colors.Black, fontSize: scale(13) }}
          />
        </View>
      </View>

      <Error isVisible={isEmailExist} message={"This email does not exists"} />
      <Loading isVisible={loading} />
      <ConnectionModal isVisible={!isConnected} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Find: {
    color: Colors.Main,
    fontFamily: Font.Inter500,
    fontSize: scale(30),
    textAlign: "center",
  },
  Search: {
    color: Colors.Grey,
    fontFamily: Font.Inter500,
    fontSize: scale(16),
    textAlign: "center",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  MainBox: {
    marginTop: "25%",
    marginBottom: "10%",
    marginHorizontal: scale(20),
  },
  containerStyle: {
    backgroundColor: Colors.White,
    borderColor: Colors.ThemeBlue,
    width: "30%",
    height: verticalScale(40),
    marginLeft: scale(10),
  },
});

export default FindAccount;
