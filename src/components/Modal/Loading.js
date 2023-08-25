import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {Colors} from '../../utils/Colors';
import {scale} from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import {GlobalStyle} from '../../Constants/GlobalStyle';

const Loading = ({isVisible}) => {
  return (
    <SafeAreaView style={{justifyContent: 'center'}}>
      <ReactNativeModal
        visible={isVisible}
        style={[styles.modal, GlobalStyle.Container]}>
        <View style={styles.buttons}>
          <LottieView
            autoPlay
            style={GlobalStyle.LottieView}
            source={require('../../assets/lotti/loader.json')}
          />
          <Text style={GlobalStyle.ModalText}>Please Wait...</Text>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  buttons: {
    backgroundColor: Colors.ThemeCream,
    width: '60%',
    alignSelf: 'center',
    borderRadius: scale(20),
  },
});
export default Loading;
