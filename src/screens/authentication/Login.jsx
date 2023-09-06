import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
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
import LogoCard from "../../components/Card/LogoCard";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import BottomText from "../../components/Card/BottomText";
import Loading from "../../components/Modal/Loading";
import { login } from "../../redux/actions/AuthActions";
import RNLocation from "react-native-location";
import Reset from "./Reset";

const Login = ({ navigation }) => {
  const [index, setIndex] = useState(100);
  const [ShowPasswordTime, setShowPasswordTime] = useState(false);

  const dispatch = useDispatch();
  const { height } = Dimensions.get("screen");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    dispatch(login(data, setLoading, setShowPasswordTime));
  };

  useEffect(() => {
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
      },
    }).then((granted) => {
      if (!granted) {
        alert("Loaction Permission is Required");
      }
    });
  });

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.ImageBox, styles.MainContainer]}>
          <Image
            style={GlobalStyle.Image}
            source={require("../../assets/image/logo.png")}
          />
        </View>
        <View style={styles.MainContainer}>
          <Text style={styles.Heading}>Tailored Insights</Text>
          <Text style={styles.HeadingTwo}>Field Intelligence</Text>
        </View>
        <View
          style={[
            styles.MainContainer,
            { paddingHorizontal: moderateScale(15) },
          ]}
        >
          <CustomInput
            onFocus={() => {
              setIndex(0);
            }}
            style={{
              borderColor: index === 0 ? Colors.Main : Colors.border,
            }}
            fontSize={scale(16)}
            FontAwesome5
            FontAwesome5_Name="user-alt"
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="id"
            rules={{
              required: "*User id is required",
            }}
            placeholder="User ID"
          />
          {errors.id && <Validation title={errors.id.message} />}
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
            style={[
              GlobalStyle.InputHeading,
              {
                textAlign: "center",
                paddingHorizontal: moderateScale(15),
              },
            ]}
          >
            To reset your Password, please contact your administrator
          </Text>
          {/* <Text
          onPress={() => navigation.navigate("contact_admin")}
          style={[
            GlobalStyle.InputHeading,
            {
              textAlign: "center",
              color: Colors.red,
              marginTop: verticalScale(7),
            },
          ]}
        >
          Contact Your Admin
        </Text> */}
          <CustomButton
            containerStyle={styles.MainContainer}
            onPress={handleSubmit(onSubmit)}
            title="Sign In"
          />
        </View>
        <View style={{ height: height * 0.25 }} />
        <BottomText />
      </ScrollView>
      <ConnectionModal />
      <Loading isVisible={loading} />
      <Reset
        visible={ShowPasswordTime}
        onClose={() => setShowPasswordTime(false)}
      >
        <PasswordInput
          control={control}
          name="new_password"
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
          placeholder="New Password"
          maxLength={16}
          fontSize={scale(16)}
          placeholderTextColor={"#32323266"}
        />
        {errors.new_password && (
          <Validation title={errors.new_password.message} />
        )}
      </Reset>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    marginTop: "6%",
  },
  Heading: {
    textAlign: "center",
    color: Colors.Sky,
    fontSize: scale(22),
    fontFamily: Font.Inter600,
  },
  HeadingTwo: {
    textAlign: "center",
    color: Colors.Main,
    fontSize: scale(18),
    // fontFamily: Font.Inter600,
    fontStyle: "italic",
  },
  ImageBox: {
    width: scale(100),
    aspectRatio: 1 / 1,
    alignSelf: "center",
  },
});

export default Login;
