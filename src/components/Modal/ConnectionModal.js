import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../utils/Colors';
import { GlobalStyle } from '../../Constants/GlobalStyle';
import { scale } from 'react-native-size-matters';

const ConnectionModal = ({ isVisible }) => {
  return (
    <Modal
      visible={isVisible}
      style={[styles.MainModal, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
      <View style={styles.ModalContainer}>
        <Text style={[GlobalStyle.ModalText, { color: Colors.White }]}>
          {"You don't have internet connection"}
        </Text>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  ModalContainer: {
    justifyContent: 'center',
    width: '70%',
    borderRadius: scale(10),
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'center',
  },
  MainModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})
export default ConnectionModal;
