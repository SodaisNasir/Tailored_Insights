import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { GlobalStyle } from '../../Constants/GlobalStyle'
import { Colors } from '../../utils/Colors'
import { scale } from 'react-native-size-matters'
import ReactNativeModal from 'react-native-modal'

const IndicatorModal = ({Visible}) => {
  return (
    <View style={styles.container}>
      <ReactNativeModal isVisible={Visible} style={GlobalStyle.MainModal}>
          <ActivityIndicator size={scale(50)} color={Colors.White} />
        </ReactNativeModal>
    </View>
  )
}

export default IndicatorModal

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:Colors.Non}
})