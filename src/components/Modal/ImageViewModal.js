import React from 'react'
import { StyleSheet, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import { GlobalStyle } from '../../Utils/GlobalStyle';
import Color from '../../Assets/Color';
import AntDesign from 'react-native-vector-icons/AntDesign'
import ImageViewer from 'react-native-image-zoom-viewer';

const { width, height } = Dimensions.get('window')

const ImageViewModal = ({ isVisible, onClose, images }) => {
    return (
        <Modal swipeDirection='down' onSwipeComplete={onClose} isVisible={isVisible} style={GlobalStyle.MainModal}>
            <View style={styles.ModalContainer}>
                <TouchableOpacity style={styles.IconBox} onPress={onClose} android_ripple={{ color: Color.Black }}>
                    <AntDesign name='closecircle' color={Color.White} size={scale(18)} />
                </TouchableOpacity>
                <View style={styles.imageBox}>
                    <ImageViewer
                        imageUrls={[{ url: images }]}
                        enableSwipeDown={true}
                        onSwipeDown={onClose}
                        saveToLocalByLongPress={true}
                        renderIndicator={() => null}
                    />
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    imageBox: {
        width: width,
        height: height
    },
    IconBox: {
        right: scale(20),
        position: 'absolute',
        top: StatusBar.currentHeight,
        zIndex: 99
    },
    ModalContainer: {
        justifyContent: 'center',
        borderRadius: scale(10),
        backgroundColor: Color.Black,
        alignSelf: 'center',
    },
})

export default ImageViewModal
