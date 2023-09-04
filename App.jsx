import React, { useState } from "react";
import AuthNavigator from "./src/navigation/AuthNavigator";
import UserNavigator from "./src/navigation/UserNavigator";
import { useSelector } from "react-redux";
import Splash from "./src/screens/authentication/Splash";

const App = () => {
  const [loading, setLoading] = useState(true);
  const SignIn = useSelector((state) => state.userDetails);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <>
          {SignIn == null && <AuthNavigator />}
          {SignIn != null && <UserNavigator />}
        </>
      )}
    </>
  );
};

export default App;
