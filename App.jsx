import React, { useEffect, useState } from "react";
import AuthNavigator from "./src/navigation/AuthNavigator";
import UserNavigator from "./src/navigation/UserNavigator";
import { useDispatch, useSelector } from "react-redux";
import Splash from "./src/screens/authentication/Splash";
import AdminNavigator from "./src/navigation/AdminNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SIGN_IN } from "./src/redux/reducer/Holder";

const App = () => {
  const [loading, setLoading] = useState(true);
  const SignIn = useSelector((state) => state.userData);

const dispatch = useDispatch();

  const checkLoginStatus = async () => {
    const data = await AsyncStorage.getItem("user_details");
    const user_details = JSON.parse(data);
    if (user_details != null) {
      dispatch({
        type: SIGN_IN,
        payload: user_details,
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <>
          {SignIn == null ? (
            <AuthNavigator />
          ) : // && SignIn?.id?.slice(-2) != "00"
          SignIn != null ? (
            <UserNavigator />
          ) : (
            <AdminNavigator />
          )}
        </>
      )}
    </>
  );
};

export default App;
