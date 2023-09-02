import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { Colors } from "../../utils/Colors";
import { scale, verticalScale } from "react-native-size-matters";
import { Font } from "../../utils/font";
import LogoCard from "../../components/Card/LogoCard";
import ConnectionModal from "../../components/Modal/ConnectionModal";

const FullTable = () => {
  const [tableHead] = useState([
    "Head",
    "Head2",
    "Head3",
    "Head4",
    "Head5",
    "Head6",
    "Head7",
    "Head8",
    "Head9",
  ]);

  const [widthArr] = useState([40, 60, 80, 100, 120, 140, 160, 180, 200]);

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
    <SafeAreaView
      style={[GlobalStyle.Container, { backgroundColor: Colors.Main }]}
    >
      <View style={GlobalStyle.Container}>
        <StatusBar backgroundColor={Colors.Main} barStyle="light-content" />
        {/* <LogoCard /> */}
        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View>
            <Table>
              {/*  borderStyle={styles.borderStyle}> */}
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={[styles.text, { color: Colors.White }]}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
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
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <ConnectionModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: verticalScale(50),
    backgroundColor: Colors.Main,
  },
  text: { textAlign: "center", fontFamily: Font.Inter400, color: Colors.Black },
  dataWrapper: { marginTop: -1 },
  row: { height: verticalScale(40), backgroundColor: "#E7E6E1" },
  borderStyle: {
    borderWidth: scale(1),
    borderColor: Colors.border,
    borderTopColor: Colors.Main,
  },
});

export default FullTable;
