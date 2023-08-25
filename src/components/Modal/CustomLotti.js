import {Text, SafeAreaView} from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const CustomLotti = ({
  isVisible,
  Title,
  source,
  Title2,
  TitleTrue,
  TextRestyle,
}) => {
  return (
    <Modal
      visible={isVisible}
      style={[GlobalStyle.MainModal, {backgroundColor: 'rgba(0,0,0,0.8)'}]}>
      <SafeAreaView style={GlobalStyle.ModalContainer}>
        <LottieView autoPlay style={GlobalStyle.LottieView} source={source} />
        <Text style={[GlobalStyle.ModalText, TextRestyle]}>{Title}</Text>
        {TitleTrue ? (
          <Text style={[GlobalStyle.ModalText, {padding: 0}]}>{Title2}</Text>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};
export default CustomLotti;
