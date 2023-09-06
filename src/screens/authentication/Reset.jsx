import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import CustomButton from "../../components/CustomButton";
import { useForm } from "react-hook-form";
import PasswordInput from "../../components/PasswordInput";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import Error from "../../components/Modal/Error";
import CustomLotti from "../../components/Modal/CustomLotti";
import Loading from "../../components/Modal/Loading";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import Validation from "../../components/Validation";
import LogoCard from "../../components/Card/LogoCard";
import Modal from "react-native-modal";

const Reset = ({ visible, onClose,children }) => {
  // const { user_id } = route.params;
  // console.log("user_id", user_id);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const type = "auth";
  const onSubmit = (data) => {
    if (data.password == data.confirm_password) {
      // update_password(
      //   data,
      //   setPasswordChange,
      //   navigation,
      //   user_id,
      //   setLoading,
      //   type
      // );
    } else {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <Modal
        isVisible={visible}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        style={[styles.modal]}
      >
        <View style={styles.MainBox}>
          <Text style={styles.Find}>Change your password</Text>
          {children}
         
          <View
            style={[
              GlobalStyle.Row,
              { justifyContent: "space-evenly", width: "100%" },
            ]}
          >
            <CustomButton
              title="Confirm"
              containerStyle={styles.CustomButtonRestyle}
            />
            <CustomButton
              title="Cancel"
              containerStyle={[
                styles.CustomButtonRestyle,
                { backgroundColor: Colors.red },
              ]}
              onPress={onClose}
            />
          </View>
        </View>
      </Modal>
      <Error
        isVisible={errorModal}
        onClose={() => setErrorModal(false)}
        message={"Password is not matched"}
      />
      <CustomLotti
        isVisible={passwordChange}
        source={require("../../assets/lotti/passwordchange.json")}
        Title="Password has been changed"
        TextRestyle={{ color: Colors.ThemeBlue }}
      />
      <Loading isVisible={loading} />
      <ConnectionModal />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Find: {
    color: Colors.Main,
    fontFamily: Font.Inter500,
    fontSize: scale(23),
  },
  CustomButtonRestyle: {
    backgroundColor: Colors.Green,
    marginTop: verticalScale(10),
    width: "35%",
  },
  MainBox: {
    backgroundColor: Colors.White,
    borderRadius: scale(10),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(10),
  },
});

export default Reset;
