import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import LogBox from "../../components/Card/LogoCard";
import { Colors } from "../../utils/Colors";
import { scale } from "react-native-size-matters";
import { Font } from "../../utils/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import FilterModal from "../../components/Modal/FilterModal";

const Filter = () => {
  const [Filter, setFilter] = useState(false);
  const [index, setIndex] = useState(99);
  const [year, setYear] = useState(2023);

  const add = index === 1 ? "arrow-undo-outline" : "arrow-undo-sharp";
  const minus = index === 2 ? "arrow-redo-outline" : "arrow-redo-sharp";

  const handleAdd = () => {
    setIndex(1);
    setYear(year + 10);
  };
  const handleMinus = () => {
    setIndex(2);
    setYear(year - 1);
  };

  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogBox mailes />
      <Text style={styles.for}>
        For <Text style={{ color: Colors.red }}>Farmation</Text>
      </Text>
      <View style={GlobalStyle.verticalSpace} />
      <View style={[GlobalStyle.Row, { alignSelf: "center" }]}>
        <View style={GlobalStyle.Row}>
          <Ionicons
            onPress={handleMinus}
            name={add}
            color={Colors.Black}
            size={scale(16)}
          />
          <Text style={styles.Year}>{year}</Text>
          <Ionicons
            onPress={handleAdd}
            name={minus}
            color={Colors.Black}
            size={scale(16)}
          />
        </View>
        <View style={GlobalStyle.space} />
        <View style={GlobalStyle.space} />
        <View style={GlobalStyle.Row}>
          <TouchableOpacity onPress={() => setFilter(true)}>
            <Image
              style={styles.Image}
              source={require("../../assets/image/filter.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.Image}
              source={require("../../assets/image/powerpoint.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.Image}
              source={require("../../assets/image/excel.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={GlobalStyle.verticalSpace} />
      <Text style={styles.for}>{`Filter by <Selection>`}</Text>
      <Text style={styles.for}>List by {`<Selection>`}</Text>
      <FilterModal visible={Filter} onClose={() => setFilter(false)} />
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  for: {
    fontSize: scale(17),
    textAlign: "center",
    color: Colors.Black,
    fontFamily: Font.Inter500,
  },
  Year: {
    color: Colors.Black,
    fontFamily: Font.Inter400,
    fontSize: scale(15),
  },
  Image: {
    width: scale(50),
    height: scale(50),
    resizeMode: "contain",
  },
});
