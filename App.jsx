import React, { useState } from "react";
import AuthNavigator from "./src/navigation/AuthNavigator";
import UserNavigator from "./src/navigation/UserNavigator";
import { useSelector } from "react-redux";
import Splash from "./src/screens/authentication/Splash";
import AdminNavigator from "./src/navigation/AdminNavigator";

const App = () => {
  const [loading, setLoading] = useState(true);
  const SignIn = useSelector((state) => state.userData);



  setTimeout(() => {
    setLoading(false);
  }, 3000);
  console.log(SignIn);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <>
          {SignIn == null ? (
            <AuthNavigator />
            // && SignIn?.id?.slice(-2) != "00"
          ) : SignIn != null   ? (
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
