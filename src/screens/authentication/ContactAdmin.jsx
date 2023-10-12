import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
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
import { BaseUrl, EmailRegix } from "../../utils/url";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import Admin_selectValue from "../../components/Card/Admin_selectValue";
import BottomText from "../../components/Card/BottomText";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import { Logout } from "../../redux/actions/AuthActions";

const ContactAdmin = ({ navigation }) => {
  const [CheckSelected, setCheckSelected] = useState("");
  const [formOneError, setFormOneError] = useState(false);
  const [formTwoError, setFormTwoError] = useState(false);
  const [buttonLoader1, setButtonLoader1] = useState(false);
  const [buttonLoader2, setButtonLoader2] = useState(false);
  const [fillFirst, setFillFirst] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [fillMoney, setFillMoney] = useState(false);
  const [fillLast, setFillLast] = useState(false);

  const user = useSelector((state) => state.userData);
  console.log("USERRR ==>",user);
  const handleCheck = (item) => {
    setCheckSelected(item.id);
  };

  const onSubmit = () => {
    if (watch("Popup_id") == "") {
      setFormTwoError(true);
      setTimeout(() => {
        setFormTwoError(false);
      }, 2000);
    } else if (MoneySelected == "") {
      setFillLast(true);
      setTimeout(() => {
        setFillLast(false);
      }, 2000);
    } else if (AccessSelected == "") {
      setFillMoney(true);
      setTimeout(() => {
        setFillMoney(false);
      }, 2000);
    } else {
      console.log("API IS HITTIN");
      updateAccess({
        id: watch("Popup_id"),
      });
    }
  };

  const [WhatAreYouSelected, setWhatAreYouSelected] = useState("");
  const handleWhatAreYou = (item) => {
    setWhatAreYouSelected(item.id);
  };

  const [MoneySelected, setMoneySelected] = useState("");
  const handleMoney = (item) => {
    setMoneySelected(item.value);
    
  };

  const [AccessSelected, setAccessSelected] = useState("");
  const handleAccess = (item) => {
    setAccessSelected(item.value);
  };
  const UpdateTrialAndExipry = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );
    const currentDate = new Date();

    if (MoneySelected === "T") {
      // Add 7 days to the current date
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (MoneySelected === "P") {
      // Add 90 days to the current date
      currentDate.setDate(currentDate.getDate() + 90);
    }

    // Format the date as yyyy-mm-dd
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    var raw = JSON.stringify({
      userId: data.id,
      trial: MoneySelected,
      uid: data.id,
      prefix: "",
      suffix: "",
      expirydate: formattedDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}user/updateTrailAndExpiry`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusDescription == "SUCCESS") {
          Toast.show("Successfully Updated");
        } else {
          Toast.show(result.statusDescription);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Toast.show("Network Request Failed");
      });
  };

const dispatch = useDispatch();
  const LogOut = () => {
    dispatch(Logout(setButtonLoader2));
  };
  const updateAccess = (data) => {
    const pref = data.id.charAt(0);
    const pureId = data.id.split(pref)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1");

    var raw = JSON.stringify({
      id: pureId[1],
      name: "",
      fullAccess: AccessSelected,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}vendor/updateFullAccess`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusDescription == "SUCCESS") {
          // UpdateTrialAndExipry(data);
          Toast.show("Successfully Updated");
        } else {
          Toast.show(result.statusDescription);
        }
      })
      .catch((error) => {
        console.log("error", error);
        Toast.show("Network Request Failed");
      });
  };
  const updateStatusAndPassword = (data) => {
    console.log("MY DATA IN API ==>", data);
    setButtonLoader1(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );

    var raw = JSON.stringify({
      userId: data.userID,
      password: data.password,
      newpassword: data.newPassword,
      status: data.status,
      uid: data.uid,
      prefix: "",
      suffix: "",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}user/updateStatusAndPassword`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusDescription == "SUCCESS") {
          setButtonLoader1(false);
          Toast.show("Successfully Updated");
        } else {
          setButtonLoader1(false);
          Toast.show(result.statusDescription);
        }
      })
      .catch((error) => {
        setButtonLoader1(false);
        console.log("error", error);
        Toast.show("Network Request Failed");
      });
  };

  const onSubmitFirstForm = () => {
    if (CheckSelected == "") {
      setFillFirst(true);
      setTimeout(() => {
        setFillFirst(false);
      }, 2000);
    } else {
      if (watch("id")) {
        console.log("WATCH ID ==>", watch("id"));
        const id = watch("id");
        // const prefix = id.charAt(0);
        const password = `${id}PW`;
        let newPassword;
        let status;
        if (CheckSelected == 1) {
          newPassword = `${id}PWD`;
          status = "Y";
        } else {
          newPassword = password;
          status = "N";
        }

        updateStatusAndPassword({
          userId: id,
          password: password,
          newPassword: newPassword,
          status: status,
          uid: id,
        });
      } else {
        setFormOneError(true);
        setTimeout(() => {
          setFormOneError(false);
        }, 2000);
      }
    }

    console.log("HELLOW");
    // updateAccess(data);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogoCard NoBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.Padding}>
          <Text style={[GlobalStyle.Heading, { fontSize: scale(18) }]}>
            Admin Center
          </Text>
          <Text
            style={[
              GlobalStyle.Heading,
              { fontSize: scale(15), color: Colors.Grey },
            ]}
          >
            {`Manage your accounts (${user.authorizedAccount})`}
          </Text>
          <CustomInput
            FontAwesome5
            FontAwesome5_Name="user-alt"
            size={scale(20)}
            control={control}
            keyboardType="default"
            name="id"
            rules={{
              required: "*User id is required",
            }}
            placeholder="Account ID"
          />
          {formOneError && <Validation title={"*User id is required"} />}

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
          {fillFirst && (
            <Validation
              restyle={{ textAlign: "center", marginTop: verticalScale(5) }}
              title={"*please fill this first"}
            />
          )}

          {!buttonLoader1 ? (
            <CustomButton
              onPress={onSubmitFirstForm}
              containerStyle={{ marginTop: verticalScale(10) }}
              title="Submit"
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: scale(10),
              }}
            >
              <ActivityIndicator size={"large"} color={Colors.Main} />
            </View>
          )}
          <View style={GlobalStyle.verticalSpace} />
          <View style={GlobalStyle.verticalSpace} />
          {user.type == "V" && (
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
                keyboardType="default"
                name="Popup_id"
                // rules={{
                //   required: "*User id is required",
                // }}
                placeholder="Account ID"
              />
              {formTwoError && <Validation title={"*User id is required"} />}
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
                      focus={MoneySelected == item.value}
                      data={item}
                    />
                  ))}
                </View>

                <View>
                  {Access?.map((item) => (
                    <Admin_selectValue
                      key={item.id}
                      onPress={() => handleAccess(item)}
                      focus={AccessSelected == item.value}
                      data={item}
                    />
                  ))}
                </View>
              </View>

              {fillMoney && (
                <Validation
                  restyle={{
                    alignSelf: "flex-start",
                  }}
                  title={"please select one"}
                />
              )}

              {fillLast && (
                <Validation
                  restyle={{
                    alignSelf: "flex-end",
                  }}
                  title={"*please select one"}
                />
              )}
              <View
                style={[GlobalStyle.Row, { justifyContent: "space-between" }]}
              >
                {!buttonLoader2 ? (
                  <>
                    <CustomButton
                      title="Update"
                      onPress={onSubmit}
                      containerStyle={styles.containerStyle}
                      textStyle={styles.textStyle}
                    />
                    <CustomButton
                      containerStyle={[styles.containerStyle, styles.Cancel]}
                      textStyle={[styles.textStyle, { color: Colors.Black }]}
                      title="Logout"
                      onPress={LogOut}
                    />
                  </>
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginVertical: scale(10),
                      width: "100%",
                    }}
                  >
                    <ActivityIndicator size={"large"} color={Colors.Main} />
                  </View>
                )}
              </View>
            </View>
          )}
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
