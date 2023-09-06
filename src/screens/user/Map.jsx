import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { IS_SIGN_IN, SIGN_IN } from "../../redux/reducer/Holder";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import CustomInput from "../../components/CustomInput";
import AnimatedDropDown from "../../components/AnimatedDropDown";
import BottomText from "../../components/Card/BottomText";
import RNLocation from "react-native-location";
import Loading from "../../components/Modal/Loading";
import { Logout } from "../../redux/actions/AuthActions";
import { BaseUrl } from "../../utils/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Map = ({ navigation }) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("address");
  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
    },
  });
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(300);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAddress = (latestLocation) => {
    const apiKey = "AIzaSyDkHZhc1UElZ2N-wumI7kqQokBoiME1JIQ";
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latestLocation.latitude},${latestLocation.longitude}&key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const address = json.results[0].formatted_address;
        console.log("address", address);
        reset({
          location: address,
        });
        setAddress(address);
      })
      .catch((error) => console.error("getAddressFromCoordinates =>", error));
  };

  useEffect(() => {
    RNLocation.getLatestLocation().then(async (latestLocation) => {
      console.log("====================================");
      console.log("latestLocation", latestLocation);
      console.log("====================================");
      setLocation({
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
      });

      fetchAddress(latestLocation);
    });
  },[]);

  const onChangeRadius = async (radius) => {
    try {
      let base_url = `${BaseUrl}mapping/invoice-outlet-location`;

      const data = await AsyncStorage.getItem("user_details");
      const userData = JSON.parse(data);
console.log("radius ==>",radius);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let vendoridlo = 0;
      let vendoridhi = 9999999;
      let customeridlo = 0;
      let customeridhi = 9999999;

      switch (userData.type) {
        case "C":
          customeridlo = userData.id;
          customeridhi = userData.id;
        case "V":
          vendoridlo = userData.id;
          vendoridhi = userData.id;
        default:
          break;
      }
      // {
      //   "customeridlo": 0,
      //   "customeridhi": 20000,
      //   "vendoridlo": 0,
      //   "vendoridhi": 20000,
      //   "enddate": "2023-11-19",
      //   "startDate": "2023-11-19",
      //   "radius": 5000,
      //   "elat": 45,
      //   "elong": 45
      // }
      var raw = JSON.stringify({
        customeridlo: customeridlo,
        customeridhi: customeridhi,
        vendoridlo: vendoridlo,
        vendoridhi: vendoridhi,
        radius: radius,
        // elat: location.latitude,
        // elong: location.longitude,
        elat: 45,
        elong: 45,
        enddate: "2023-11-19",
        startDate: "2023-11-19",
      });
console.log("raw ==>",raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(base_url, requestOptions);

      const responseData = await response.json();
      console.log("responseData", responseData);
      if (responseData.statusCode == 0) {
        console.log("responseData ====>", responseData);
        setShops(responseData.responseContent)
      } else {
        if (responseData.statusDescription == "NO_RECORD_FOUND") {
          Toast.show("NO RECORD FOUND");
        }
      }
    } catch (error) {
      console.log("catch error login ", error);

      // setTimeout(() => {
      //   setErrorModal(false);
      // }, 2000);
      alert("Error");
    }
  };

  const LogOut = () => {
    dispatch(Logout(setLoading));
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
          defaultValue={address}
          placeholder="Enter a location"
        />
      </View>
      <View style={GlobalStyle.verticalSpace} />
      <AnimatedDropDown
        options={Radius}
        setRadius={setRadius}
        onChangeRadius={onChangeRadius}
      />
      <CustomButton
        title="SHOW RESULTS"
        containerStyle={{
          borderRadius: scale(15),
          marginTop: verticalScale(10),
        }}
        onPress={() => navigation.navigate("filter", {radius : radius, address : address, location : location})}
      />

      <View style={styles.MapBox}>
        {location == null ? (
          <>
            <ActivityIndicator />
          </>
        ) : (
          <MapComponent
            location={location}
            fetchAddress={fetchAddress}
            radius={radius.value}
            setLocation={setLocation}
            shops={shops}
          />
        )}
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
      <Loading isVisible={loading} />
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
