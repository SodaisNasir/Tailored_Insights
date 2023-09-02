import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import { Colors } from "../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import CustomButton from "../../components/CustomButton";
import { Font } from "../../utils/font";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import Success from "../../components/Modal/Success";
import Error from "../../components/Modal/Error";
import CustomLotti from "../../components/Modal/CustomLotti";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { useDispatch, useSelector } from "react-redux";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import LogoCard from "../../components/Card/LogoCard";

const windowHeight = Dimensions.get("screen").height;
const CELL_COUNT = 4;
const Otp = ({ route, navigation }) => {
  // const { type, data, saveImage, user_id } = route.params;
  const dispatch = useDispatch();
  // const OTP = useSelector((state) => state.otp);
  const OTP = 1234;

  const [time, setTime] = useState(10);
  const [otpResent, setOtpResent] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const WaitOTP = () => {
    setOtpResent(true);
    setTimeout(() => {
      setOtpResent(false);
    }, 2300);
  };

  const resendType = "resendType";

  const ResendOTP = () => {
    // if (type == 'forgot') {
    //   dispatch(verify_email_before_password(data, resendType, setTime));
    // } else if (type == 'signup') {
    //   dispatch(verify_email_before_registration(data, resendType, setTime));
    // }
    console.log("ResendOTP");
  };

  const Submit = () => {
    if (value == OTP) {
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        // navigation.navigate("AccountType", {
        //   data: data,
        //   saveImage: saveImage,
        // });
        navigation.navigate("reset");
      }, 2000);
    } else {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogoCard />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Reset Your Password</Text>
          <Text style={styles.Search}>
            Send code via email please enter the code {OTP}
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <View style={[GlobalStyle.Row, { justifyContent: "flex-end" }]}>
            <CustomButton
              title="Confirm"
              onPress={Submit}
              containerStyle={[
                GlobalStyle.CustomButtonRestyle,
                styles.containerStyle,
              ]}
              textStyle={{ color: Colors.ThemeBlue, fontSize: scale(13) }}
            />
          </View>
        </View>
        <>
          <View style={{ height: windowHeight * 0.25 }} />

          {time == 0 ? (
            <TouchableOpacity
              onPress={ResendOTP}
              style={[styles.containerStyle, styles.OptBox]}
            >
              <Text style={styles.Text}>Press to Resend Your OPT</Text>
            </TouchableOpacity>
          ) : (
            <Pressable
              onPress={WaitOTP}
              style={[styles.containerStyle, styles.OptBox]}
            >
              <Text style={styles.Text}>You can Reset Your OTP in {time}</Text>
            </Pressable>
          )}
        </>
        <CustomLotti
          isVisible={otpResent}
          source={require("../../assets/lotti/otp.json")}
          Title="Your OPT has alrady been send"
        />
        <Success
          isVisible={successModal}
          onClose={() => setSuccessModal(false)}
          message={"Thanks for OPT"}
        />
        <Error
          isVisible={errorModal}
          onClose={() => setErrorModal(false)}
          message={"Your OTP is not correct"}
        />
      </ScrollView>
      <ConnectionModal />
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
    borderColor: Colors.Main,
    width: "30%",
    height: verticalScale(40),
    borderWidth: scale(1),
  },
  Text: {
    color: Colors.Black,
    fontFamily: Font.Inter500,
  },
  codeFieldRoot: { marginVertical: verticalScale(10) },
  cell: {
    width: scale(60),
    height: scale(60),
    fontSize: scale(24),
    borderWidth: scale(1.5),
    borderRadius: scale(9),
    borderColor: Colors.Main,
    textAlign: "center",
    color: Colors.Black,
    fontFamily: Font.Inter400,
    textAlignVertical: "center",
  },
  OptBox: {
    width: "70%",
    marginTop: 0,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
  },
});
export default Otp;
