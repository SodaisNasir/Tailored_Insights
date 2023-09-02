import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import LogoCard from "../../components/Card/LogoCard";
import {
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { Access, ChooseContact, Money, WhatAreYou } from "../../Constants/Data";
import { Colors } from "../../utils/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomInput from "../../components/CustomInput";
import Validation from "../../components/Validation";
import { EmailRegix } from "../../utils/url";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import Admin_selectValue from "../../components/Card/Admin_selectValue";
import BottomText from "../../components/Card/BottomText";
const ContactAdmin = ({ navigation }) => {
  const [CheckSelected, setCheckSelected] = useState("");
  const handleCheck = (item) => {
    setCheckSelected(item.id);
  };

  const [WhatAreYouSelected, setWhatAreYouSelected] = useState("");
  const handleWhatAreYou = (item) => {
    setWhatAreYouSelected(item.id);
  };

  const [MoneySelected, setMoneySelected] = useState("");
  const handleMoney = (item) => {
    setMoneySelected(item.id);
  };
  const [AccessSelected, setAccessSelected] = useState("");
  const handleAccess = (item) => {
    setAccessSelected(item.id);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogoCard NoBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Padding}>
          <Text style={[GlobalStyle.Heading, { fontSize: scale(18) }]}>
            Admin
          </Text>
          <CustomInput
            FontAwesome5
            FontAwesome5_Name="user-alt"
            size={scale(20)}
            control={control}
            keyboardType="number-pad"
            name="id"
            rules={{
              required: "*User id is required",
            }}
            placeholder="Least 2 digit of account ID"
          />
          {errors.id && <Validation title={errors.id.message} />}

          <View style={GlobalStyle.verticalSpace} />
          {ChooseContact?.map((item) => (
            <Admin_selectValue
              Restyle={{ alignSelf: "center" }}
              key={item.id}
              onPress={() => handleCheck(item)}
              focus={CheckSelected == item.id}
              data={item}
            />
          ))}
          <CustomButton
            containerStyle={{ marginTop: verticalScale(10) }}
            title="Submit"
          />
          <View style={GlobalStyle.verticalSpace} />
          <View style={GlobalStyle.verticalSpace} />
          <View style={[GlobalStyle.Padding, styles.PopupBox]}>
            <View
              style={[GlobalStyle.Row, { justifyContent: "space-between" }]}
            >
              {WhatAreYou?.map((item) => (
                <Admin_selectValue
                  key={item.id}
                  onPress={() => handleWhatAreYou(item)}
                  focus={WhatAreYouSelected == item.id}
                  data={item}
                />
              ))}
            </View>
            <CustomInput
              FontAwesome5
              FontAwesome5_Name="user-alt"
              size={scale(20)}
              control={control}
              keyboardType="number-pad"
              name="Popup_id"
              rules={{
                required: "*User id is required",
              }}
              placeholder="Account ID"
            />
            <View style={GlobalStyle.verticalSpace} />
            <View style={GlobalStyle.verticalSpace} />
            <View
              style={[GlobalStyle.Row, { justifyContent: "space-between" }]}
            >
              <View>
                {Money?.map((item) => (
                  <Admin_selectValue
                    key={item.id}
                    onPress={() => handleMoney(item)}
                    focus={MoneySelected == item.id}
                    data={item}
                  />
                ))}
              </View>
              <View>
                {Access?.map((item) => (
                  <Admin_selectValue
                    key={item.id}
                    onPress={() => handleAccess(item)}
                    focus={AccessSelected == item.id}
                    data={item}
                  />
                ))}
              </View>
            </View>

            <View
              style={[GlobalStyle.Row, { justifyContent: "space-between" }]}
            >
              <CustomButton
                title="Upload"
                // onPress={() => navigation.navigate("login")}
                containerStyle={styles.containerStyle}
                textStyle={styles.textStyle}
              />
              <CustomButton
                containerStyle={[styles.containerStyle, styles.Cancel]}
                textStyle={[styles.textStyle, { color: Colors.Black }]}
                title="Cancel"
                onPress={() => navigation.navigate("login")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <ConnectionModal />
      <BottomText />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  PopupBox: {
    borderWidth: scale(1),
    borderRadius: scale(20),
    borderColor: Colors.Black,
    paddingVertical: moderateVerticalScale(15),
  },
  containerStyle: {
    flex: 0.47,
    borderRadius: scale(10),
    height: verticalScale(40),
    marginTop: verticalScale(20),
  },
  textStyle: {
    fontSize: scale(15),
  },
  Cancel: {
    backgroundColor: "#E0E0E0",
    borderColor: Colors.Non,
  },
});

export default ContactAdmin;
