import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {Colors} from '../../utils/Colors';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const Error = ({message, isVisible}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={[GlobalStyle.MainModal, {backgroundColor: 'rgba(0,0,0,0.8)'}]}>
      <SafeAreaView style={GlobalStyle.ModalContainer}>
        <LottieView
          autoPlay
          style={GlobalStyle.LottieView}
          source={require('../../assets/lotti/error.json')}
        />
        <Text style={[GlobalStyle.ModalText, {color: Colors.Danger}]}>
          {message}
        </Text>
      </SafeAreaView>
    </Modal>
  );
};
export default Error;
