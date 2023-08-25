import React, { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SelectList } from "react-native-dropdown-select-list";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { Font } from "../../utils/font";
import { Colors } from "../../utils/Colors";

const DropDown = forwardRef((props, ref) => {
  return (
    <View style={props.style}>
      <SelectList
        placeholder="Select a value"
        arrowicon={
          <Entypo name="chevron-down" size={scale(18)} color={Colors.Black} />
        }
        searchPlaceholder="Search"
        dropdownStyles={styles.dropdownStyles}
        dropdownItemStyles={styles.dropdownItemStyles}
        boxStyles={styles.boxStyles}
        dropdownTextStyles={styles.dropdownTextStyles}
        inputStyles={styles.inputStyles}
        data={props.items}
        setSelected={props.setValue}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  InputStyles: {
    width: "100%",
    height: "100%",
    color: Colors.Black,
    fontFamily: Font.in,
    fontSize: scale(15),
  },
  smallbox: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: verticalScale(5),
    width: "100%",
    paddingHorizontal: moderateScale(15),
    height: verticalScale(42),
    backgroundColor: Colors.White,
    borderWidth: scale(1),
    borderColor: Colors.border,
  },
  boxStyles: {
    backgroundColor: Colors.Non,
    height: verticalScale(50),
    alignItems: "center",
    borderRadius: scale(10),
    marginTop: verticalScale(10),
    borderWidth: scale(1),
    borderColor: Colors.border,
  },
  inputStyles: {
    color: Colors.Black,
    fontSize: scale(13),
    fontFamily: Font.Inter500,
  },
  dropdownTextStyles: {
    color: Colors.Black,
  },
  dropdownItemStyles: {
    backgroundColor: Colors.Non,
  },
  dropdownStyles: {
    backgroundColor: Colors.Non,
    borderWidth: scale(1),
    borderColor: Colors.Black,
  },
});

export default DropDown;
