import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/Colors";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import Validation from "../../components/Validation";
import PasswordInput from "../../components/PasswordInput";
import CustomButton from "../../components/CustomButton";
import { Font } from "../../utils/font";
import { IS_SIGN_IN } from "../../redux/reducer/Holder";
import { useDispatch } from "react-redux";
import { EmailRegix } from "../../utils/url";
import LogoCard from "../../components/Card/LogoCard";

const Login = ({ navigation }) => {
  const [index, setIndex] = useState(100);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const onSubmit = (data) => {
    dispatch({ type: IS_SIGN_IN, payload: data.email });
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <LogoCard />
      <View style={styles.MainContainer}>
        <Text style={[GlobalStyle.Heading, { fontSize: scale(25) }]}>
          Welcome Back
        </Text>
      </View>
      <View
        style={[styles.MainContainer, { paddingHorizontal: moderateScale(15) }]}
      >
        <CustomInput
          onFocus={() => {
            setIndex(0);
          }}
          style={{
            borderColor: index === 0 ? Colors.Main : Colors.border,
          }}
          fontSize={scale(16)}
          MaterialIcons
          size={scale(20)}
          MaterialIcons_Name="email"
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
        />
        {errors.email && <Validation title={errors.email.message} />}
        <PasswordInput
          onFocus={() => {
            setIndex(1);
          }}
          style={{
            borderColor: index === 1 ? Colors.Main : Colors.border,
          }}
          fontSize={scale(16)}
          name="password"
          control={control}
          rules={{
            required: "*Password is required",
            minLength: {
              value: 8,
              message: "*Password too short (minimum length is 8)",
            },
            maxLength: {
              value: 16,
              message: "*Password too long (maximum length is 16)",
            },
          }}
          placeholder="Password"
          maxLength={20}
          placeholderTextColor={"#32323266"}
        />
        {errors.password && <Validation title={errors.password.message} />}
        <Text
          onPress={() => navigation.navigate("FindAccount")}
          style={[GlobalStyle.InputHeading, { textAlign: "center" }]}
        >
          Forget Password?
        </Text>
        <CustomButton
          containerStyle={styles.MainContainer}
          onPress={handleSubmit(onSubmit)}
          title="Log In"
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    marginTop: "6%",
  },
});

export default Login;
