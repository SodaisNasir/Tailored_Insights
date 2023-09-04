import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OTP, REGISTER, SIGN_IN, TOKEN, USER_DETAILS } from '../reducer/Holder';
import Toast from 'react-native-simple-toast';


import { BaseUrl } from '../../utils/url';

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

export const login = (data, setErrorModal, setLoading,) => {
  return async dispatch => {
    setLoading(true);
    const Data = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${BaseUrl}user/findByInputParameter`;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "id": "ZSales00",
        "currentPassword": "ZSI000PW"
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(base_url, requestOptions);

      const responseData = await response.json();
      console.log('====================================');
      console.log(responseData);
      console.log('====================================');
      if (responseData.statusCode == 0) {
        dispatch({ type: SIGN_IN, payload: responseData.responseContent[0] })
        setLoading(false);
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.responseContent[0]),
        );


        Toast.show('successfully login');
        dispatch({ type: USER_DETAILS, payload: responseData.success.data });
        dispatch({ type: TOKEN, payload: responseData.success.token });
      } else {
        Toast.show('something went wrong');
        alert("NO account found")
        setLoading(false);
      }
    } catch (error) {
      console.log('catch error login ', error);
      // setLoading(false);
      // setErrorModal(true);
      // setTimeout(() => {
      //   setErrorModal(false);
      // }, 2000);
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
  OS,
) => {
  console.log('saveImage', saveImage);

  if (type == 'signup') {
    setLoading(true);
  }
  return async dispatch => {
    const Data = await AsyncStorage.getItem('onesignaltoken');
    try {
      let base_url = `${BaseUrl}verify_email_before_register`;
      let myData = new FormData();

      myData.append('email', data.email);
      myData.append('phone_number', data.phone_number);
      myData.append('password', data.confirm_password);
      myData.append('name', data.name);
      myData.append('image', saveImage);
      myData.append('device', OS);
      myData.append('device_token', Data);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      console.log('sign up', responseData);
      if (responseData.success.status === 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });

        if (type == 'signup') {
          setLoading(false);
          navigation.navigate('OTP', {
            type: type,
            data: data,
            saveImage: saveImage,
          });
        }
      } else {
        console.log(
          'else error verify_email_before_registration',
          responseData.success.message,
        );
        if (type == 'signup') {
          setLoading(false);
          setIsEmailExist(true);
          setTimeout(() => {
            setIsEmailExist(false);
          }, 2000);
        }
      }
    } catch (error) {
      console.log('verify_email_before_registration catch error -->', error);
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
  OS,
) => {
  setLoading(true);
  return async dispatch => {
    const Data = await AsyncStorage.getItem('onesignaltoken');
    let base_url = `${BaseUrl}register`;
    let myData = new FormData();
    myData.append('name', data?.name ? data?.name : socialData?.user_name);
    myData.append('role_id', select);
    myData.append('email', data.email);
    myData.append('phone_number', data?.phone_number);
    myData.append('password', data?.confirm_password);
    myData.append('image', saveImage);
    myData.append('device', OS);
    myData.append('device_token', Data);
    {
      socialData?.uID && myData.append('social_id', socialData?.uID);
    }

    try {
      const response = await fetch(base_url, {
        method: 'POST',
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
            dispatch({ type: USER_DETAILS, payload: responseData.success.data });
          }, 1500);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.data),
          );
        } else {
          setIsArtist(true);
          setTimeout(() => {
            setIsArtist(false);
            dispatch({ type: USER_DETAILS, payload: responseData.success.data });
          }, 1500);
          await AsyncStorage.setItem(
            'user_details',
            JSON.stringify(responseData.success.data),
          );
        }
      } else {
        Toast.show('something went wrong social');
        setLoading(false);
      }
    } catch (error) {
      console.log('catch error in register', error);

      setLoading(false);
    }
  };
};

export const verify_email_before_password = (
  data,
  type,
  navigation,
  setIsEmailExist,
  setLoading,
) => {
  if (type == 'forgot') {
    setLoading(true);
  }
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}verifyemail`;
      let myData = new FormData();

      myData.append('email', data.email);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        await dispatch({ type: OTP, payload: responseData.success.OTP });

        if (type == 'forgot') {
          setLoading(false);

          navigation.navigate('OTP', {
            type: type,
            data: data,
            user_id: responseData.success.id,
          });
        }
      } else {
        Toast.show('something went wrong');
        if (type == 'forgot') {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log('verify_email_before_password catch error -->', error);
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
  setLoading,
) => {
  setLoading(true);

  try {
    let base_url = `${BaseUrl}resetpassword/${user_id}`;
    let myData = new FormData();

    myData.append('password', data.confirm_password);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    console.log('response', response);
    const responseData = await response.json();
    console.log('responseData', responseData);

    if (responseData.success.status === 200) {
      setLoading(false);
      setPasswordChange(true);
      setTimeout(() => {
        setPasswordChange(false);
        navigation.navigate('SignIn');
      }, 2000);
    } else {
      Toast.show('something went wrong');
      setLoading(false);
    }
  } catch (error) {
    console.log('update_password error -->', error);
    setLoading(false);
  }
};

export const Delete_Account = () => {
  return async dispatch => {
    const Data = await AsyncStorage.getItem('user_details');
    const userDetails = JSON.parse(Data);

    let base_url = `${BaseUrl}account-delete/${userDetails.id}`;
    try {
      const Data = await AsyncStorage.getItem('token');
      const Token = JSON.parse(Data);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        method: 'POST',
        // body: myData,
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        await AsyncStorage.removeItem('user_details');
        dispatch({ type: USER_DETAILS, payload: null });
        Toast.show('Account is Successfully deleted');
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      console.log('catch error in Delete_Account', error);
    }
  };
};

export const Logout = (setLoad) => {
  return async dispatch => {
    try {
      setLoad(true);
      const Data = await AsyncStorage.getItem('user_details');
      const userDetails = JSON.parse(Data);

      let base_url = `${BaseUrl}logout-user/${userDetails.id}`;

      const response = await fetch(base_url, {
        method: 'post',
      });
      const responseData = await response.json();
      if (responseData?.success?.status === 200) {
        await AsyncStorage.removeItem('user_details')
        dispatch({ type: USER_DETAILS, payload: null })
        setLoad(false);
        Toast.show('Successfully Logout');
      } else {
        Toast.show('something went wrong');
        setLoad(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  }
}