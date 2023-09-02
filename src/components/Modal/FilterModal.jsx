import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import Modal from "react-native-modal";
import { Colors } from "../../utils/Colors";
import { moderateScale, scale } from "react-native-size-matters";
import DropDown from "./DropDown";
import { Customer, FilterOutline, Outline, Type } from "../../Constants/Data";
import { Font } from "../../utils/font";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomButton from "../CustomButton";

const FilterModal = ({ visible, onClose, onPress }) => {
  const [type, setType] = useState("");
  const [customer, setCustomer] = useState("");
  const [outline, setOutline] = useState("");

  const [searchSelected, setSearchSelected] = useState("");

  const handleSelect = (item) => {
    setSearchSelected(item.id);
  };
  return (
    <Modal
      testID={"modal"}
      backdropOpacity={0.3}
      swipeDirection="down"
      onSwipeComplete={onClose}
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
    >
      <View style={styles.Container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.Box}>
            <DropDown
              items={Type}
              value={type}
              setValue={(value) => setType(value)}
            />
            <DropDown
              items={Customer}
              value={customer}
              setValue={(value) => setCustomer(value)}
            />
            <DropDown
              items={Outline}
              value={outline}
              setValue={(value) => setOutline(value)}
            />
          </View>
          <View style={GlobalStyle.verticalSpace} />
          <View style={{ backgroundColor: Colors.White }}>
            <View style={styles.Box}>
              <DropDown
                items={Type}
                value={type}
                setValue={(value) => setType(value)}
              />
              <DropDown
                items={Customer}
                value={customer}
                setValue={(value) => setCustomer(value)}
              />
              <DropDown
                items={Outline}
                value={outline}
                setValue={(value) => setOutline(value)}
              />
            </View>
          </View>
          <View style={GlobalStyle.verticalSpace} />
          <View style={GlobalStyle.Row}>
            {FilterOutline?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  key={item.id}
                  style={[GlobalStyle.Row, { marginHorizontal: scale(20) }]}
                >
                  <Fontisto
                    style={{ marginHorizontal: scale(5) }}
                    name={
                      searchSelected == item.id
                        ? "radio-btn-active"
                        : "radio-btn-passive"
                    }
                    color={
                      searchSelected == item.id ? Colors.Main : Colors.Black
                    }
                    size={scale(20)}
                  />
                  <Text
                    style={[
                      styles.title,
                      {
                        color:
                          searchSelected == item.id
                            ? Colors.Main
                            : Colors.Black,
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={GlobalStyle.verticalSpace} />
          <CustomButton title="Narrative" onPress={onClose} />
        </ScrollView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  Box: {
    borderRadius: scale(15),
    borderWidth: scale(1),
    borderColor: Colors.Black,
    padding: moderateScale(15),
  },
  Container: {
    backgroundColor: Colors.White,
    padding: moderateScale(20),
    borderRadius: scale(20),
  },
  title: {
    fontSize: scale(16),
    fontFamily: Font.Inter500,
  },
});

export default FilterModal;
