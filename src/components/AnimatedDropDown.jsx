import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Radius } from "../Constants/Data";
import { Font } from "../utils/font";
import { Colors } from "../utils/Colors";
import { GlobalStyle } from "../Constants/GlobalStyle";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
// import { useSelector } from 'react-redux'

const AnimatedDropDown = ({ options }) => {
  console.log("options", options);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={{
        padding: moderateScale(10),
        borderBottomWidth: scale(1),
        borderColor: "lightgray",
        width: "90%",
        alignSelf: "center",
      }}
      onPress={() => selectOption(item)}
    >
      <Text style={styles.Name}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <TouchableOpacity style={styles.MainContainer} onPress={toggleDropdown}>
        <MaterialIcons name="radar" size={scale(20)} color={Colors.Sky} />

        <View style={{ flex: 1 }}>
          <Text
            style={[
              {
                color: selectedOption
                  ? Colors.Black
                  : Colors.placeholderTextColor,
              },
              styles.Text,
            ]}
          >
            {selectedOption ? selectedOption.name : "Select an option"}
          </Text>
        </View>
        <Entypo
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={scale(20)}
          color={Colors.placeholderTextColor}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={{ height: 200 }}>
          <FlatList
            data={options}
            renderItem={renderOption}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default AnimatedDropDown;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    // marginTop: scale(15),
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    width: "90%",
    alignSelf: "center",
    height: verticalScale(46),
    borderWidth: scale(1),
    borderColor: Colors.Main,
    borderRadius: scale(12),
    paddingHorizontal: moderateScale(15),
  },
  Text: {
    paddingLeft: moderateScale(10),
  },
  Name: {
    color: Colors.Black,
    fontFamily: Font.Inter400,
  },
});
