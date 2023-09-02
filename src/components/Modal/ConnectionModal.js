import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import Modal from 'react-native-modal'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NetInfo from '@react-native-community/netinfo';
import { Font } from '../../utils/font'
import { Colors } from '../../utils/Colors'


const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const ConnectionModal = props => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('state', state)
      if (state.isConnected == false) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Modal
      backdropOpacity={0.1}
      isVisible={isConnected}
      onBackdropPress={() => setIsConnected(false)}
      animationIn="fadeInUpBig"
      animationInTiming={400}
      animationOut="fadeOutDownBig"
      animationOutTiming={1500}
      style={{
        flex: 1,
        justifyContent: 'flex-end',
      }}>
      <View style={{
        height: verticalScale(48),
        width: '95%',
        backgroundColor: Colors.Main,
        borderRadius: scale(12),
        bottom: scale(20),
        overflow: 'hidden',
        flexDirection: 'row',
        alignSelf: 'center'
      }}>
        <View style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <MaterialIcons
            name='wifi-tethering-error'
            size={scale(30)}
            color={Colors.White}
          />
        </View>
        <View style={{ flex: 3, justifyContent: 'center', }}>

          <Text style={{
            color: Colors.White,
            fontSize: scale(14),
            fontFamily: Font.Inter500,
          }}>
            No Internet Connection
          </Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  ModalMain: {
    height: verticalScale(70),
    // backgroundColor: '#435CA8',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: scale(20),
    flexDirection: 'row',
  },
})
export default ConnectionModal;
