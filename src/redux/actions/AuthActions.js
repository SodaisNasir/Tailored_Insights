import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OTP, REGISTER, SIGN_IN, TOKEN, USER_DETAILS } from "../reducer/Holder";
import Toast from "react-native-simple-toast";

import { BaseUrl } from "../../utils/url";

// export const sign_in = (email, password) => {
//   return async dispatch => {
//     try {
//       await AsyncStorage.setItem('user_details', email);
//       await dispatch({type: USER_DETAILS, payload: email});
//       console.log('Login Success fully!');
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// };





export const login = (data, setLoading, setShowPasswordTime) => {
  return async (dispatch) => {
    setLoading(true);
    const Data = await AsyncStorage.getItem("onesignaltoken");
    try {
      let base_url = `${BaseUrl}user/findByInputParameter`;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(data);
      var raw = JSON.stringify({
        id: data.id,
        currentPassword: data.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        `${BaseUrl}user/findByInputParameter`,
        requestOptions
      );

      const responseData = await response.json();
      console.log("responseData", responseData);
      if (responseData.statusCode == 0) {
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(
          `${BaseUrl}user/validatePeriod`,
          requestOptions
        );
        const validationResponseData = await response.json();
        switch (responseData.responseContent[0].trial.trim()) {
          case "T":
            if (validationResponseData.responseContent[0].validatePeriod <= 0) {
              setLoading(false);
              Toast.show("Trial Period is Over");
            } else {
              setLoading(false);
              await AsyncStorage.setItem(
                "user_details",
                JSON.stringify(responseData.responseContent[0])
              );

              dispatch({
                type: SIGN_IN,
                payload: responseData.responseContent[0],
              });
              Toast.show("successfully login");
            }
          case "C":
            setLoading(false);
            Toast.show("User Subscription need renewal");

          case "P         ":
            if (validationResponseData.responseContent[0].validatePeriod < 7) {
              setLoading(false);
              setShowPasswordTime(true)
              Toast.show(
                `Password expires in ${validationResponseData.responseContent[0].validatePeriod} days`
              );
              await AsyncStorage.setItem(
                "password",
                JSON.stringify(data)
              );
              dispatch({
                type: PASSWORD,
                payload: data,
              });
            } else {
              setLoading(false);
              await AsyncStorage.setItem(
                "user_details",
                JSON.stringify(responseData.responseContent[0])
              );

              dispatch({
                type: SIGN_IN,
                payload: responseData.responseContent[0],
              });
              Toast.show("successfully login");
            }
          default:
            setLoading(false);
            await AsyncStorage.setItem(
              "user_details",
              JSON.stringify(responseData.responseContent[0])
            );

            dispatch({
              type: SIGN_IN,
              payload: responseData.responseContent[0],
            });
            Toast.show("successfully login");
        }
      } else {
        if (responseData.statusDescription == "NO_RECORD_FOUND") {
          Toast.show("NO RECORD FOUND");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("catch error login ", error);
      setLoading(false);

    }
  };
};

export const googleSignin = (navigation, OS, setLoad) => {
  return async (dispatch) => {
    try {
      GoogleSignin.configure({
        webClientId:
          Platform.OS == "android"
            ? "786806587743-sqmrhl9rjq5s9u5chjlg6tdref287rpg.apps.googleusercontent.com"
            : "786806587743-2u950vhs3ced12v490vefc87qvnuloh6.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)

        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const socialObj = {
        email: userInfo.user.email ? userInfo.user.email : "",
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        picUrl: userInfo.user.photo,
        uID: userInfo.user.id,
        user_name: userInfo.user.name,
      };

      dispatch(social_signin(socialObj, navigation, OS, setLoad));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("You cancelled the sign in.");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Google sign In operation is in process");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services not available");
      } else {
        console.log(
          "Something unknown went wrong with Google sign in. " + error.message
        );
      }
    }
  };
};
const social_signin = (data, navigation, OS, setLoad) => {
  setLoad(true);

  return async (dispatch) => {
    try {
      let base_url = `${BaseUrl}social-id`;
      let myData = new FormData();

      const device_token = await AsyncStorage.getItem("onesignaltoken");

      myData.append("social_id", data.uID);
      myData.append("device", OS);
      myData.append("device_token", device_token);

      console.log("device_token ==>", device_token, "data.uID ==>", data.uID);
      const TokenData = await AsyncStorage.getItem("token");
      const Token = JSON.parse(TokenData);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}`);
      const response = await fetch(base_url, {
        body: myData,
        method: "POST",
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        await AsyncStorage.setItem(
          "user_details",
          JSON.stringify(responseData.success.data)
        );
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(responseData.success.token)
        );
        Toast.show("successfully login");
        setLoad(false);
        dispatch({ type: USER_DETAILS, payload: responseData.success.data });
        dispatch({ type: TOKEN, payload: responseData.success.token });
      } else {
        navigation.navigate("SignUp", {
          social: "social",
          socialData: data,
        });
        setLoad(false);
      }
    } catch (error) {
      console.log("social_SignIn catch error", error);
      setLoad(false);
    }
  };
};

export const verify_email_before_registration = (
  data,
  type,
  navigation,
  saveImage,
  setIsEmailExist,
  setLoading,
  OS
) => {
  console.log("saveImage", saveImage);

  if (type == "signup") {
    setLoading(true);
  }
  return async (dispatch) => {
    const Data = await AsyncStorage.getItem("onesignaltoken");
    try {
      let base_url = `${BaseUrl}verify_email_before_register`;
      let myData = new FormData();

      myData.append("email", data.email);
      myData.append("phone_number", data.phone_number);
      myData.append("password", data.confirm_password);
      myData.append("name", data.name);
      myData.append("image", saveImage);
      myData.append("device", OS);
      myData.append("device_token", Data);

      const response = await fetch(base_url, {
        body: myData,
        method: "POST",
      });

      const responseData = await response.json();
      console.log("sign up", responseData);
      if (responseData.success.status === 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });

        if (type == "signup") {
          setLoading(false);
          navigation.navigate("OTP", {
            type: type,
            data: data,
            saveImage: saveImage,
          });
        }
      } else {
        console.log(
          "else error verify_email_before_registration",
          responseData.success.message
        );
        if (type == "signup") {
          setLoading(false);
          setIsEmailExist(true);
          setTimeout(() => {
            setIsEmailExist(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.log("verify_email_before_registration catch error -->", error);
      setLoading(false);
    }
  };
};

export const register = (
  data,
  select,
  setIsArtist,
  setIsListener,
  setLoading,
  saveImage,
  socialData,
  OS
) => {
  setLoading(true);
  return async (dispatch) => {
    const Data = await AsyncStorage.getItem("onesignaltoken");
    let base_url = `${BaseUrl}register`;
    let myData = new FormData();
    myData.append("name", data?.name ? data?.name : socialData?.user_name);
    myData.append("role_id", select);
    myData.append("email", data.email);
    myData.append("phone_number", data?.phone_number);
    myData.append("password", data?.confirm_password);
    myData.append("image", saveImage);
    myData.append("device", OS);
    myData.append("device_token", Data);
    {
      socialData?.uID && myData.append("social_id", socialData?.uID);
    }

    try {
      const response = await fetch(base_url, {
        method: "POST",
        body: myData,
      });

      const responseData = await response.json();
      if (responseData?.success?.status == 200) {
        dispatch({ type: REGISTER, payload: responseData.success.data });

        setLoading(false);
        if (select == 1) {
          setIsListener(true);
          setTimeout(() => {
            setIsListener(false);
            dispatch({
              type: USER_DETAILS,
              payload: responseData.success.data,
            });
          }, 1500);
          await AsyncStorage.setItem(
            "user_details",
            JSON.stringify(responseData.success.data)
          );
        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
            dispatch({
              type: USER_DETAILS,
              payload: responseData.success.data,
            });
          }, 1500);
          await AsyncStorage.setItem(
            "user_details",
            JSON.stringify(responseData.success.data)
          );
        }
      } else {
        Toast.show("something went wrong social");
        setLoading(false);
      }
    } catch (error) {
      console.log("catch error in register", error);

      setLoading(false);
    }
  };
};

export const verify_email_before_password = (
  data,
  type,
  navigation,
  setIsEmailExist,
  setLoading
) => {
  if (type == "forgot") {
    setLoading(true);
  }
  return async (dispatch) => {
    try {
      let base_url = `${BaseUrl}verifyemail`;
      let myData = new FormData();

      myData.append("email", data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: "POST",
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });

        if (type == "forgot") {
          setLoading(false);

          navigation.navigate("OTP", {
            type: type,
            data: data,
            user_id: responseData.success.id,
          });
        }
      } else {
        Toast.show("something went wrong");
        if (type == "forgot") {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("verify_email_before_password catch error -->", error);
      setLoading(false);
      setIsEmailExist(true);
      setTimeout(() => {
        setIsEmailExist(false);
      }, 2000);
    }
  };
};

export const update_password = async (
  data,
  setPasswordChange,
  navigation,
  user_id,
  setLoading
) => {
  setLoading(true);

  try {
    let base_url = `${BaseUrl}resetpassword/${user_id}`;
    let myData = new FormData();

    myData.append("password", data.confirm_password);

    const response = await fetch(base_url, {
      method: "POST",
      body: myData,
    });
    console.log("response", response);
    const responseData = await response.json();
    console.log("responseData", responseData);

    if (responseData.success.status === 200) {
      setLoading(false);
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.navigate("SignIn");
      }, 2000);
    } else {
      Toast.show("something went wrong");
      setLoading(false);
    }
  } catch (error) {
    console.log("update_password error -->", error);
    setLoading(false);
  }
};

export const Delete_Account = () => {
  return async (dispatch) => {
    const Data = await AsyncStorage.getItem("user_details");
    const userDetails = JSON.parse(Data);

    let base_url = `${BaseUrl}account-delete/${userDetails.id}`;
    try {
      const Data = await AsyncStorage.getItem("token");
      const Token = JSON.parse(Data);

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${Token}`);

      const response = await fetch(base_url, {
        method: "POST",
        // body: myData,
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        await AsyncStorage.removeItem("user_details");
        dispatch({ type: USER_DETAILS, payload: null });
        Toast.show("Account is Successfully deleted");
      } else {
        Toast.show("something went wrong");
      }
    } catch (error) {
      console.log("catch error in Delete_Account", error);
    }
  };
};

export const Logout = (setLoad) => {
  return async (dispatch) => {
    try {
      setLoad(true);

      await AsyncStorage.removeItem("user_details");
      dispatch({ type: SIGN_IN, payload: null });
      setLoad(false);
      Toast.show("Successfully Logout");
    } catch (error) {
      console.log("error", error);
    }
  };
};
