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
import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { IS_SIGN_IN, PRODUCTS, SIGN_IN } from "../../redux/reducer/Holder";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import CustomInput from "../../components/CustomInput";
import AnimatedDropDown from "../../components/AnimatedDropDown";
import BottomText from "../../components/Card/BottomText";
import RNLocation from "react-native-location";
import Loading from "../../components/Modal/Loading";
import { Logout } from "../../redux/actions/AuthActions";
import { BaseUrl } from "../../utils/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { useFocusEffect } from "@react-navigation/native";

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
  const [radius, setRadius] = useState({value:30});
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.userData);
  const [currentDate, setCurrentDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [data, setData] = useState([]);

  const [tableHead, setTableHead] = useState([]);

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

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
      );

      var raw = JSON.stringify({
        customeridlo: 0,
        customeridhi: 20000,
        vendoridlo: 0,
        vendoridhi: 20000,
        enddate: currentDate,
        startDate: startDate,
        radius: radius.value,
        elat: location.latitude,
        elong: location.longitude,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${BaseUrl}mapping/invoice-dtls`,
        requestOptions
      );
      const responseData = await response.json();
      if (responseData.statusCode == "0") {
        dispatch({
          type: PRODUCTS,
          payload: responseData.responseContent,
        });
        console.log("====================================");
        console.log(
          "responseData.responseContent",
          responseData.responseContent
        );
        console.log("====================================");
        setLoading(false);
      } else {
        Toast.show("NO RECORD FOUND");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("====================================");
      console.log("ERRROR IN DTLS ===>", error);
      console.log("====================================");
    }
  };

  function getCurrentDateInYYYYMMDD() {
    const currentDate = new Date();
  
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
  
   setCurrentDate(`${year}-${month}-${day}`);
   setStartDate(`${year-1}-${month}-${day}`);
  }

  useEffect(() => {
    RNLocation.configure({
      
    })
    RNLocation.getLatestLocation().then(async (latestLocation) => {
      console.log("====================================");
      console.log("latestLocation", latestLocation);
      console.log("====================================");
      await AsyncStorage.setItem(
        "location",
        JSON.stringify({
          latitude: latestLocation.latitude,
          longitude: latestLocation.longitude,
        })
      );
      setLocation({
        latitude: latestLocation.latitude,
        longitude: latestLocation.longitude,
      });
      fetchProductsData();
      fetchAddress(latestLocation);
      
    });
    getCurrentDateInYYYYMMDD()
  }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     setData([]);
  //     setTableHead([]);
  //   },[])
  // );

  const onChangeRadius = async (radius) => {

    try {
      let base_url = `${BaseUrl}mapping/invoice-outlet-location`;

      const data = await AsyncStorage.getItem("user_details");
      const userData = JSON.parse(data);
     
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
          console.log("CASE C");
        case "V":
          vendoridlo = userData.id;
          vendoridhi = userData.id;
          console.log("CASE V");
        default:
          break;
      }
      var raw = JSON.stringify({
        customeridlo: 0,
        customeridhi: 20000,
        vendoridlo: 0,
        vendoridhi: 20000,
        enddate: currentDate,
        startDate: startDate,
        radius: radius.value,
        elat: location.latitude,
        elong: location.longitude,
      });

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
        setShops(responseData.responseContent);
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

  const OnShowTables = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );

    let listType;
    if (user.type == "V") {
      if (user.status.trim() == "Y") {
        listType = "Outlet";
      } else {
        listType = "Category";
      }
    } else if (user.type == "C") {
      listType = "Outlet";
    } else if (user.type == "Z") {
      listType = "CustomerType";
    }
    var raw = JSON.stringify({
      listType: listType,
      enddate: currentDate,
        startDate: startDate,
      demandingPage: "Y",
      pageNumber: 1,
      pageSize: 10,
      radius: radius.value,
      elat: location.latitude,
      elong: location.longitude,
    });


    console.log("HIS IS MY RAW ==>", raw);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/mapping/invoicePageDataByListType`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode == "0") {
          // const keys = Object.keys(result.responseContent[0]);
          // console.log("keys ====>", keys);
          // setTableHead(keys);
          const q1Array = [];
          const q2Array = [];
          const q3Array = [];
          const q4Array = [];
          let arr = [];
          for (const item of result.responseContent) {
            q1Array.push([item.product, item.qty, `$${item.q1}`]);
            q2Array.push([item.product, item.qty, `$${item.q2}`]);
            q3Array.push([item.product, item.qty, `$${item.q3}`]);
            q4Array.push([item.product, item.qty, `$${item.q4}`]);
          }
          // result.responseContent.forEach((item) => {
          //   let values = [];
          //   Object.keys(item).forEach((key) => {
          //     values = [...values, item[key]];
          //     // console.log("EXTRACTED VALUES ===>", values);
          //   });
          //   arr = [...arr, values];
          //   setData((prevData) => [...prevData, values]);
          // });
          setLoading(false);
          navigation.navigate("full_table", {
            radius: radius.value,
            address: address,
            location: location,
            tableData: [q1Array, q2Array, q3Array, q4Array],
            listType: listType,
            recordLength: result.totalRecord,
          });
        } else {
          Toast.show("No data found");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        Toast.show("Network Error, Please Try again");
      });
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
        onPress={OnShowTables}
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
