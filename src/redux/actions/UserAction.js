import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '../../utils/url';
import {
  IMAGE,
  SONGS,
  USER_DETAILS,
  PROFILE_DATA,
  PROFILE_IMAGE,
  PROFILE_VIDEO,
  HISTORY,
  PROFILE_SONG,
} from '../reducer/Holder';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

export const Edit_profile = (
  data,
  saveImage,
  setActiveLoading,
  setEdit,
  setShowInput,
) => {
  return async dispatch => {
    setActiveLoading(true);
    const Data = await AsyncStorage.getItem('user_details');
    const userDetails = JSON.parse(Data);
    try {
      let base_url = `${BaseUrl}edit-profile/${userDetails.id}`;

      let myData = new FormData();

      myData.append('email', data.email ? data.email : userDetails.email);
      myData.append(
        'phone_number',
        data.phone ? data.phone : userDetails.phone_number,
      );
      myData.append('name', data.name ? data.name : userDetails.name);
      myData.append('image', saveImage ? saveImage : userDetails.image);

      const Data = await AsyncStorage.getItem('token');
      const Token = JSON.parse(Data);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        body: myData,
        method: 'POST',
        headers: myHeaders,
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setActiveLoading(false);
        dispatch({ type: USER_DETAILS, payload: responseData.success.data });
        setEdit(false);
        setShowInput(false);
        await AsyncStorage.setItem(
          'user_details',
          JSON.stringify(responseData.success.data),
        );
      } else {
        console.log('else error');
        setActiveLoading(false);
      }
    } catch (error) {
      console.log('catch error in edit profile', error);
      setActiveLoading(false);
    }
  };
};

export const Update = (
  data,
  setPasswordChange,
  setLoading,
  setPasswordError,
) => {
  setLoading(true);
  return async dispatch => {
    const Data = await AsyncStorage.getItem('user_details');
    const userData = JSON.parse(Data);
    try {
      let base_url = `${BaseUrl}change-password/${userData.id}`;
      let myData = new FormData();

      myData.append('old_password', data.password);
      myData.append('password', data.confirm_password);

      const TokenData = await AsyncStorage.getItem('token');
      const Token = JSON.parse(TokenData);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        method: 'post',
        body: myData,
        headers: myHeaders,
      });
      console.log('response', response);
      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setLoading(false);
        setPasswordChange(true);
        setTimeout(() => {
          setPasswordChange(false);
          dispatch({ type: USER_DETAILS, payload: null });
        }, 2000);
      } else {
        console.log('error');
        setLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 2000);
      setLoading(false);
    }
  };
};

export const create_Video = async (
  data,
  type,
  saveVideo,
  saveImage,
  setSelect,
  setDone,
  setLoad,
) => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  console.log('userData.id', userData.id);
  try {
    setLoad(true);
    let base_url = `${BaseUrl}create-video/${userData.id}`;
    let myData = new FormData();

    myData.append('video_title', data.title);
    myData.append('description', data.description);
    myData.append('video_type', type);
    myData.append('video', saveVideo);
    myData.append('img', saveImage);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData?.success?.status == 200) {
      setLoad(false);
      setSelect(2);
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 2000);
    } else {
      Toast.show(
        responseData.error == 'The img failed to upload.'
          ? 'image file is unsupported'
          : 'unable to upload your video',
      );
      console.log('first', responseData.error);
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in create_Video', error);
    setLoad(false);
  }
};

export const Edit_Video = async (
  setLoad,
  data,
  Values,
  saveVideo,
  saveImage,
  navigation,
  type,
) => {
  try {
    setLoad(true);
    let base_url = `${BaseUrl}edit-video/${Values.id}`;
    let myData = new FormData();

    myData.append('video_title', data.title);
    myData.append('description', data.description);
    myData.append('video', saveVideo ? saveVideo : Values.video);
    myData.append('img', saveImage ? saveImage : Values.img);
    myData.append('video_type', type);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      navigation.goBack();
      Toast.show('Your video updated');
      setLoad(false);
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Edit_Video', error);
    setLoad(false);
  }
};

export const show_own_video = async setVideoData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  try {
    let base_url = `${BaseUrl}show-video-user/${userData.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data.reverse());
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_video', error);
  }
};

export const show_all_video = async (setVideoData, data) => {
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}videos/${data.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setVideoData(responseData.success.data.reverse());
      // dispatch({type: VLOG, payload: responseData.success.data});
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_all_video', error);
  }
};
// };

export const Delete_video = async (data, setDelete, setLoad) => {
  setLoad(true);
  try {
    let base_url = `${BaseUrl}delete-video/${data.id}`;

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setDelete(false);
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } else {
      console.log('else error in Delete_video');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Delete_video', error);
    setLoad(false);
  }
};
export const likedPost = (data, userData, posts, Postindex) => {
  console.log('liked')
  return async (dispatch) => {
    try {
      const Data = await AsyncStorage.getItem('token');
      const Token = JSON.parse(Data);
      let base_url = `${BaseUrl}like/${data.id}/${userData.id}`;
      let myData = new FormData();

      myData.append('type', data.type);

      var myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${Token}`);

      const response = await fetch(base_url, {
        method: 'POST',
        headers: myHeaders,
        body: myData,
      });
      const responseData = await response.json();
      if (responseData.success.status === 200) {
        posts[Postindex] = responseData.success.data
        console.log('posts', posts)
        console.log(' responseData.success.data', responseData.success.data)
        dispatch({ type: IMAGE, payload: posts });
      } else {
        console.log('else error in likedPost');
      }
    } catch (error) {
      console.log('catch error in likedPost', error);
    }
  };
};
export const dislikedPost = async (data, userData) => {
  try {
    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);
    let base_url = `${BaseUrl}dislike/${data.id}/${userData.id}`;
    let myData = new FormData();

    myData.append('type', data.type);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      headers: myHeaders,
      body: myData,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      // alert('dis')
    } else {
      console.log('else error in likedPost');
    }
  } catch (error) {
    console.log('catch error in likedPost', error);
  }
};

export const upload_Image = async (
  data,
  saveImage,
  setDone,
  setLoad,
  setSelect,
) => {
  console.log('data ==>', data, saveImage);
  setLoad(true);
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);

  let base_url = `${BaseUrl}create-picture/${userDetails.id}`;
  let myData = new FormData();

  myData.append('caption', data.title);
  myData.append('image', saveImage);
  try {
    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      Toast.show('Image has been uploaded');
      setLoad(false);
      setSelect(2);
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 2000);
    } else {
      Toast.show('unable to upload your image');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in uploadImage', error);
    setLoad(false);
  }
};

export const Edit_Image = async (
  setLoad,
  data,
  Values,
  saveImage,
  navigation,
) => {
  try {
    setLoad(true);
    let base_url = `${BaseUrl}edit-picture/${Values.id}`;
    let myData = new FormData();

    myData.append('caption', data.title);
    myData.append('image', saveImage ? saveImage : Values.image);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);
    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      navigation.goBack();
      Toast.show('Your Image updated');
      setLoad(false);
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Edit_Image', error);
    setLoad(false);
  }
};

export const Delete_Image = async (data, setDelete, setLoad) => {
  console.log('data', data);
  setLoad(true);
  try {
    let base_url = `${BaseUrl}delete-picture/${data.id}`;

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setDelete(false);
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      Toast.show('successfully deleted');
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Delete_Audio', error);
    setLoad(false);
  }
};

export const show_all_image = (setImageData, userDetails) => {
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}picture/${userDetails.id}`;

      const response = await fetch(base_url, {
        method: 'GET',
      });
      const responseData = await response.json();

      if (responseData.success.status === 200) {
        setImageData(responseData.success.data.reverse());
        dispatch({ type: IMAGE, payload: responseData.success.data });
      } else {
        console.log('else error in show_video');
      }
    } catch (error) {
      console.log('catch error in show_own_image', error);
    }
  };
};

export const show_own_image = async setImageData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}show-user-picture/${userDetails.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setImageData(responseData.success.data.reverse());
      // dispatch({type: IMAGE, payload: responseData.success.data});
    } else {
      console.log('else error in show_video');
    }
  } catch (error) {
    console.log('catch error in show_own_image', error);
  }
};
// };

export const store_livestream = async (data, setLoad, saveImage, setSelect) => {
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);
  setLoad(true);
  try {
    let base_url = `${BaseUrl}store-livestream/${userDetails.id}`;
    let myData = new FormData();

    myData.append('live_stream', data.link);
    myData.append('title', data.name);
    myData.append('img', saveImage);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    const responseData = await response.json();

    if (responseData?.success?.status == 200) {
      Toast.show('Successfully uploaded');
      setSelect(2);
      setLoad(false);
    } else {
      Toast.show('Image file is not supported');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in store_livestream', error);
    setLoad(false);
  }
};

export const Delete_stream = async (data, setDelete, setLoad) => {
  setLoad(true);
  try {
    let base_url = `${BaseUrl}delete-livestream/${data.id}`;

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setDelete(false);
      setTimeout(() => {
        setLoad(false);
      }, 2000);
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Delete_video', error);
    setLoad(false);
  }
};

export const Edit_Stream = async (
  setLoad,
  data,
  Values,
  navigation,
  saveImage,
) => {
  try {
    setLoad(true);
    let base_url = `${BaseUrl}edit-livestream/${Values.id}`;
    let myData = new FormData();

    myData.append('live_stream', data.link);
    myData.append('img', saveImage ? saveImage : Values.img);
    myData.append('title', data.title);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);
    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData?.success?.status == 200) {
      navigation.goBack();
      Toast.show('Your Stream is updated');
      setLoad(false);
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Stream', error);
    setLoad(false);
  }
};

export const show_own_streams = async setStreamData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}user-livestream/${userDetails.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setStreamData(responseData.success.data.reverse());
      // dispatch({type: IMAGE, payload: responseData.success.data});
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in show_own_streams', error);
  }
};
// };

export const show_all_podcast = async setGetPodcast => {
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}all-podcast`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setGetPodcast(responseData.success.data.reverse());
      // dispatch({type: IMAGE, payload: responseData.success.data});
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in show_all_podcast', error);
  }
};
// };
export const show_all_MucisVideo = async setGetPodcast => {
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}all-music-video`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setGetPodcast(responseData.success.data.reverse());
      // dispatch({type: IMAGE, payload: responseData.success.data});
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in show_all_podcast', error);
  }
};
// };
export const show_all_LiveStream = async setLiveStream => {
  // return async dispatch => {
  try {
    let base_url = `${BaseUrl}livestream`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setLiveStream(responseData.success.data.reverse());
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in show_all_podcast', error);
  }
};
// };

export const leaderboard = async (setActiveLoading, Days, setData) => {
  setActiveLoading(true);

  try {
    let base_url = `${BaseUrl}leaderboard`;

    let myData = new FormData();

    myData.append('days', Days);

    const response = await fetch(base_url, {
      body: myData,
      method: 'POST',
    });

    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setActiveLoading(false);
      setData(responseData.success.data);
    } else {
      Toast.show('something went wrong');
      setActiveLoading(false);
    }
  } catch (error) {
    console.log('catch error in leader board', error);
    setActiveLoading(false);
  }
};

export const Notification = async setNotification => {
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);
  try {
    let base_url = `${BaseUrl}all-notification/${userDetails.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });
    console.log('response', response)
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setNotification(responseData.success.data);
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in Notification', error);
  }
};
export const ReadNotification = async item => {
  try {
    let base_url = `${BaseUrl}read-notification/${item.id}`;

    const response = await fetch(base_url, {
      method: 'POST',
    });

    const responseData = await response.json();
    if (responseData.success.status === 200) {
      Toast.show('successfully Read');
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in read-notification', error);
  }
};

export const get_profile = (item, navigation, setLoad) => {
  return async dispatch => {
    setLoad(true);
    try {
      let base_url = `${BaseUrl}profiles/${item.user_id ? item.user_id : item.id
        }`;

      const response = await fetch(base_url, {
        method: 'GET',
      });
      const responseData = await response.json();

      if (responseData.success.status === 200) {
        console.log('responseData.success.picture', responseData.success);
        setLoad(false);
        dispatch({ type: PROFILE_DATA, payload: responseData.success.data });
        dispatch({ type: PROFILE_VIDEO, payload: responseData.success.video });
        dispatch({ type: PROFILE_IMAGE, payload: responseData.success.picture });
        dispatch({ type: PROFILE_SONG, payload: responseData.success.song });
        navigation.navigate('PlayAll');
      } else {
        Toast.show('something went wrong');
        setLoad(false);
      }
    } catch (error) {
      console.log('catch error in get_profile', error);
      setLoad(false);
    }
  };
};

export const search = async (text, setSearchData, setSearchLoad) => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  setSearchLoad(true);
  try {
    let base_url = `${BaseUrl}search/${userData.id}`;
    let myData = new FormData();

    myData.append('search', text);
    const response = await fetch(base_url, {
      body: myData,
      method: 'POST',
    });
    const responseData = await response.json();

    if (responseData.success.status === 200) {
      setSearchData(responseData.success.data.reverse());
      console.log('responseData.success.data', responseData.success.data)
      setSearchLoad(false);
    } else {
      Toast('something went wrong');
      setSearchLoad(false);
    }
  } catch (error) {
    console.log('catch error in get_profile', error);
    setSearchLoad(false);
  }
};

export const toggle = async () => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  console.log('userData', userData);
  try {
    let base_url = `${BaseUrl}toggle/${userData.id}`;

    const response = await fetch(base_url, {
      method: 'POST',
    });

    const responseData = await response.json();
    if (responseData.success.status === 200) {
      userData.notification_status = responseData.success.data;
      await AsyncStorage.setItem('user_details', JSON.stringify(userData));
      console.log(responseData.success);
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in toggle', error);
    Toast.show('something went wrong');
  }
};

export const create_song = async (
  data,
  setLoad,
  setDone,
  type,
  saveImage,
  setSelect,
  audioFile,
) => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  console.log('userData', userData);
  try {
    setLoad(true);
    let base_url = `${BaseUrl}create-song/${userData.id}`;
    let myData = new FormData();

    myData.append('title', data.title);
    myData.append('type', type);
    myData.append('image', saveImage);
    myData.append('song', audioFile);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setLoad(false);
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setSelect(2);
      }, 2000);
    } else {
      Toast.show('unable to upload your Audio');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in create_song', error);
    setLoad(false);
  }
};

export const Edit_Audio = async (
  setLoad,
  data,
  Values,
  saveImage,
  navigation,
  audioFile,
  type,
) => {
  try {
    setLoad(true);
    let base_url = `${BaseUrl}edit-song/${Values.id}`;
    let myData = new FormData();

    myData.append('title', data.title);
    myData.append('image', saveImage ? saveImage : Values.artist);
    myData.append('song', audioFile ? audioFile : Values.song);
    myData.append('type', type);

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);
    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData?.success?.status == 200) {
      navigation.goBack();
      Toast.show('Your Song is updated');
      setLoad(false);
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Edit_Audio', error);
    setLoad(false);
  }
};

export const Delete_Audio = async (data, setDelete, setLoad) => {
  console.log('data', data);
  setLoad(true);
  try {
    let base_url = `${BaseUrl}delete-song/${data.id}`;

    const Data = await AsyncStorage.getItem('token');
    const Token = JSON.parse(Data);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);

    const response = await fetch(base_url, {
      method: 'POST',
      headers: myHeaders,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setDelete(false);
      setTimeout(() => {
        setLoad(false);
      }, 2000);
      Toast.show('successfully deleted');
    } else {
      Toast.show('something went wrong');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in Delete_Audio', error);
    setLoad(false);
  }
};

export const show_own_song = async setSongData => {
  const Data = await AsyncStorage.getItem('user_details');
  const userData = JSON.parse(Data);
  try {
    let base_url = `${BaseUrl}show-user-song/${userData.id}`;

    const response = await fetch(base_url, {
      method: 'GET',
    });

    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setSongData(responseData.success.data.reverse());
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in show_own_song', error);
  }
};

export const song_type = async (setGetData, type, setLoad) => {
  try {
    setLoad(true);
    let base_url = `${BaseUrl}song-type`;
    let myData = new FormData();

    myData.append('type', type);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });
    const responseData = await response.json();
    if (responseData.success.status === 200) {
      setLoad(false);
      setGetData(responseData.success.data);
    } else {
      Toast.show('unable to upload your Audio');
      setLoad(false);
    }
  } catch (error) {
    console.log('catch error in song_type', error);
    setLoad(false);
  }
}; // work in progress

export const all_songs = (setGetAllSongs, setLoad) => {
  return async dispatch => {
    setLoad(true);
    try {
      let base_url = `${BaseUrl}song`;

      const response = await fetch(base_url, {
        method: 'GET',
      });
      const responseData = await response.json();

      if (responseData.success.status === 200) {
        setLoad(false);
        setGetAllSongs(responseData.success.data);
        dispatch({ type: SONGS, payload: responseData.success.data });
      } else {
        Toast.show('something went wrong');
        setLoad(false);
      }
    } catch (error) {
      console.log('catch error in all_songs', error);
      setLoad(false);
    }
  };
};
export const song_id = (item, navigation, setLoad) => {
  return async dispatch => {
    setLoad(true);
    try {
      let base_url = `${BaseUrl}show-song-id/${item.id}`;

      const response = await fetch(base_url, {
        method: 'GET',
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        setLoad(false);
      } else {
        Toast.show('something went wrong');
        setLoad(false);
      }
    } catch (error) {
      console.log('catch error in song_id', error);
      setLoad(false);
    }
  };
};

export const create_history = async item => {
  console.log('create_history pressed');
  // return async dispatch => {
  const Data = await AsyncStorage.getItem('user_details');
  const userDetails = JSON.parse(Data);

  try {
    let base_url = `${BaseUrl}create-history/${item.id}/${userDetails.id}`;
    let myData = new FormData();

    myData.append('type', item.type);

    const response = await fetch(base_url, {
      method: 'POST',
      body: myData,
    });

    const responseData = await response.json();
    if (responseData.success.status === 200) {
      // dispatch({type: HISTORY, payload:responseData.success.data })
      console.log('create_history ka data', responseData.success.data);
    } else {
      Toast.show('something went wrong');
    }
  } catch (error) {
    console.log('catch error in create_history', error);
  }
  // }
};

export const show_search = userData => {
  console.log('userData show_search', userData);
  return async dispatch => {
    try {
      let base_url = `${BaseUrl}show-history/${userData.id}`;

      const response = await fetch(base_url, {
        method: 'GET',
      });

      const responseData = await response.json();
      if (responseData.success.status === 200) {
        dispatch({ type: HISTORY, payload: responseData.success.data });
      } else {
        Toast.show('something went wrong');
      }
    } catch (error) {
      console.log('catch error in show_search', error);
    }
  };
};
