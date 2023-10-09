import React from "react";
import Modal from "react-native-modal";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";
import { Colors } from "../../utils/Colors";
import { Font } from "../../utils/font";

const ListModal = (props) => {
  // render Function

  return (
    <Modal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
      <View
        style={[
          GlobalStyle.Container,
          { flex: .9, borderRadius: scale(20), padding: scale(10), alignItems: "center" },
        ]}
      >
        <Text
          style={{
            color: "black",
            marginVertical: scale(10),
            fontFamily: Font.Inter500,
          }}
        >
          Sub Filter Options
        </Text>
        <FlatList
        // initialNumToRender={100}
          data={props.data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => props.onPress(item)}
              style={{
                backgroundColor: Colors.ThemeCream,
                marginVertical: scale(10),
                padding: scale(20),
                borderRadius: scale(20),
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: Font.Inter300,
                  textAlign: "center",
                }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <View style={{alignItems:"center", justifyContent:"center"}}>
              <Text
                 style={{
                    color: "black",
                    fontFamily: Font.Inter300,
                    textAlign: "center",
                  }}
              >
                No data Found
              </Text>
            </View>
          )}
          
        />
      </View>
    </Modal>
  );
};

export default ListModal;
