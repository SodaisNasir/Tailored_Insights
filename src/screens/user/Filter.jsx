import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import LogBox from "../../components/Card/LogoCard";
import { Colors } from "../../utils/Colors";
import {
  moderateScale,
  mvs,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { Font } from "../../utils/font";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FilterModal from "../../components/Modal/FilterModal";
import { Table, Row } from "react-native-table-component";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import { Exports, FilterBy, SubFilter, Type } from "../../Constants/Data";
import DropDown from "../../components/Modal/DropDown";
import BottomText from "../../components/Card/BottomText";

const Filter = ({ navigation }) => {
  const [year, setYear] = useState(2023);
  const [number, setNumber] = useState(1);
  const [type, setType] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [customer, setCustomer] = useState("");

  const handleAdd = () => {
    setYear(year + 10);
  };
  const handleMinus = () => {
    setYear(year - 1);
  };

  const QAdd = () => {
    setNumber(number + 1);
  };
  const QMin = () => {
    if (number !== 0) {
      setNumber(number - 1);
    }
  };

  const [tableHead] = useState([
    "Back",
    "QTY",
    "SALES",
    "Head4",
    "Head5",
    "Head6",
    "Head7",
    "Head8",
    "Head9",
  ]);

  const [widthArr] = useState([150, 80, 100, 120, 140, 160, 180, 200, 200]);

  const generateTableData = () => {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return tableData;
  };

  const tableData = generateTableData();
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogBox NoBack />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.verticalSpace} />
        <View
          style={[
            GlobalStyle.Row,
            {
              justifyContent: "space-between",
              paddingHorizontal: moderateScale(13),
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5
              name="map-marked-alt"
              color={Colors.Main}
              size={scale(30)}
            />
            <Text style={styles.back}>Back to Map</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.miles}>Within (XX) miles of (location)</Text>
            <View style={GlobalStyle.Row}>
              {Exports?.map((item, index) => {
                return (
                  <View
                    style={{ flexDirection: "row", alignItems: "flex-end" }}
                  >
                    <Image source={item.source} style={styles.Image} />
                    <Text style={styles.Export}>Export as {item.value}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <DropDown
          title="list type"
          items={Type}
          value={type}
          setValue={(value) => setType(value)}
        />
        <DropDown
          title="Filter By"
          items={FilterBy}
          value={customer}
          setValue={(value) => setCustomer(value)}
        />
        <DropDown
          title="Sub Filter"
          items={SubFilter}
          value={subFilter}
          setValue={(value) => setSubFilter(value)}
        />

        <View style={GlobalStyle.verticalSpace} />
        <View style={GlobalStyle.Row}>
          <View style={styles.BoxOfTableHeader}>
            <TouchableOpacity onPress={handleMinus}>
              <Entypo
                name="chevron-left"
                color={Colors.White}
                size={scale(20)}
              />
            </TouchableOpacity>
            <Text style={styles.Year}>{year}</Text>
            <TouchableOpacity onPress={handleAdd}>
              <Entypo
                name="chevron-right"
                color={Colors.White}
                size={scale(20)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.BoxOfTableHeader,
              {
                width: "60%",
                backgroundColor: "#339CCC",
                justifyContent: "space-between",
                paddingHorizontal: moderateScale(20),
              },
            ]}
          >
            <TouchableOpacity activeOpacity={number == 0 && 1} onPress={QMin}>
              <Entypo
                name="chevron-left"
                color={Colors.White}
                size={scale(20)}
              />
            </TouchableOpacity>
            <Text style={styles.Year}>
              Q{number}
              <Ionicons name="filter" color={Colors.White} size={scale(18)} />
            </Text>
            <TouchableOpacity onPress={QAdd}>
              <Entypo
                name="chevron-right"
                color={Colors.White}
                size={scale(20)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View>
            <Table>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={[
                  styles.header,
                  { backgroundColor: tableHead % 2 ? "#339CCC" : Colors.Main },
                ]}
                textStyle={[styles.text, { color: Colors.White }]}
              />
            </Table>
            {console.log("widthArr", widthArr[0])}
            <Table borderStyle={styles.borderStyle}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: Colors.White },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </View>
        </ScrollView>
      </ScrollView>
      <BottomText />
      <ConnectionModal />
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
    color: Colors.White,
    fontFamily: Font.Inter400,
    fontSize: scale(15),
  },
  Image: {
    width: scale(35),
    height: scale(35),
    resizeMode: "contain",
  },

  header: {
    height: verticalScale(50),
    backgroundColor: Colors.Main,
  },
  text: { textAlign: "center", fontFamily: Font.Inter400, color: Colors.Black },
  row: { height: verticalScale(40), backgroundColor: "#E7E6E1" },
  borderStyle: {
    borderWidth: scale(1),
    borderColor: Colors.border,
    borderTopColor: Colors.Main,
  },
  back: {
    color: Colors.Main,
    fontSize: scale(13),
    fontFamily: Font.Inter400,
  },
  Export: {
    color: Colors.Grey,
    fontSize: scale(11),
    fontFamily: Font.Inter500,
    textDecorationLine: "underline",
  },
  miles: {
    color: Colors.Grey,
    fontSize: scale(12),
    textAlign: "right",
  },
  BoxOfTableHeader: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Main,
    alignItems: "center",
    paddingVertical: mvs(10),
  },
  Back: {
    color: Colors.White,
    fontSize: scale(14),
  },
});
