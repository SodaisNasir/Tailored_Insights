import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Table, Row, Col, TableWrapper } from "react-native-table-component";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { Colors } from "../../utils/Colors";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { Font } from "../../utils/font";
import { Exports, FilterBy, SubFilter, Type } from "../../Constants/Data";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import LogoCard from "../../components/Card/LogoCard";
import ConnectionModal from "../../components/Modal/ConnectionModal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../../components/Modal/Loading";
import { BaseUrl } from "../../utils/url";

const FullTable = ({ navigation, route }) => {
  const { radius, address, location, tableHead1, tableData, listType } = route.params;
  const [data, setData] = useState(tableData);
  const [loading, setLoading] = useState(false);
  const [tableHead, setTableHead] = useState(tableHead1);

  const OnShowTables = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );
    var raw = JSON.stringify({
      listType: listType,
      customertypelo: 0,
      customertypehi: 0,
      outletlo: 0,
      outlethi: 0,
      familylo: 0,
      familyhi: 0,
      categorylo: 0,
      categoryhi: 0,
      vendorlo: 0,
      vendorhi: 0,
      skulo: 0,
      skuhi: 0,
      enddate: "2023-11-19",
      startDate: `${year}-11-19`,
      demandingPage: "Y",
      neededQ: number,
      neededM: number,
      neededW: number,
      pageNumber: number,
      pageSize: number,
      radius: 5000,
      elat: 45,
      elong: 45,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}/mapping/invoicePageDataByListType`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode == "0") {
          const keys = Object.keys(result.responseContent[0]);
          console.log("keys ====>", keys);
          setTableHead(keys);
          result.responseContent.forEach((item) => {
            let values = [];
            Object.keys(item).forEach((key) => {
              values = [...values, item[key]];
              // console.log("EXTRACTED VALUES ===>", values);
            });
            setData((prevData) => [...prevData, values]);
            console.log("DATA ==>", data);
          });
        }
        setLoading(false);
        // navigation.navigate("full_table", {
        //   radius: radius,
        //   address: address,
        //   location: location,
        //   tableHead: tableHead,
        //   tableData: data,
        // });
      })
      .catch((error) => console.log("error", error));
  };




  // const [tableHead] = useState([
  //   "Head",
  //   "Head2",
  //   "Head3",
  //   "Head4",
  //   "Head5",
  //   "Head6",
  //   "Head7",
  //   "Head8",
  //   "Head9",
  // ]);
  const [year, setYear] = useState(2023);
  const [number, setNumber] = useState(1);
  const [widthArr, setWidthArr] = useState([
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
    scale(300),
  ]);

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

  const handleAdd = () => {
    setYear(year + 1);
    OnShowTables();
  };
  const handleMinus = () => {
    setYear(year - 1);
    OnShowTables();
  };

  const QAdd = () => {
    setNumber(number + 1);
    OnShowTables();
  };
  const QMin = () => {
    if (number !== 0) {
      setNumber(number - 1);
      OnShowTables();
    }
  };

  // const tableData = generateTableData();

  return (
    <SafeAreaView
      style={[GlobalStyle.Container, { backgroundColor: Colors.Main }]}
    >
      <View style={GlobalStyle.Container}>
        <StatusBar backgroundColor={Colors.Main} barStyle="light-content" />
        <LogoCard NoBack />
        <View
          style={[
            GlobalStyle.Row,
            {
              justifyContent: "space-between",
              paddingHorizontal: moderateScale(13),
              marginBottom: scale(20),
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
              size={scale(25)}
            />
            <Text style={styles.back}>Back to Map</Text>
          </TouchableOpacity>
          {/* <View style={{ marginLeft: scale(10), marginRight: scale(70) }}>
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
          </View> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "pink",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("filter", {
                radius: radius,
                address: address,
                location: location,
              })
            }
            style={{
              height: scale(100),
              width: "40%",
              backgroundColor: "#C9C9C9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="filter-sharp"
              size={scale(30)}
              color={Colors.Main}
            />
            <Text style={[styles.Year, { color: Colors.Main }]}>
              Back to Filter
            </Text>
          </TouchableOpacity>
          <View>
            <View
              style={[
                styles.BoxOfTableHeader,
                { height: scale(50), width: "100%" },
              ]}
            >
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
                  height: scale(50),
                  width: "100%",
                  backgroundColor: "#339CCC",
                  //   justifyContent: "space-between",
                  //   paddingHorizontal: moderateScale(20),
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
        </View>

        <ScrollView horizontal showsVerticalScrollIndicator={false}>
          <View>

            <Table>
              {/*  borderStyle={styles.borderStyle}> */}
              <Row
                data={tableHead}
                widthArr={widthArr.slice(0, tableHead.length)}
                style={styles.header}
                textStyle={[styles.text, { color: Colors.White }]}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={styles.borderStyle}>
                {tableData.map((rowData, index) => {
                  return (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr.slice(0, tableHead.length)}
                      style={[
                        styles.row,
                        index % 2 == 0
                          ? { backgroundColor: Colors.White }
                          : null,
                      ]}
                      textStyle={styles.text}
                    />
                  );
                })}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <ConnectionModal />
      <Loading isVisible={loading} />
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
  row: { height: verticalScale(40), backgroundColor: "#E7E6E1", width: "100%" },
  borderStyle: {
    borderWidth: scale(1),
    borderColor: Colors.border,
    borderTopColor: Colors.Main,
  },
  Back: {
    color: Colors.White,
    fontSize: scale(14),
  },
  back: {
    color: Colors.Main,
    fontSize: scale(12),
    fontFamily: Font.Inter400,
  },
  Image: {
    width: scale(35),
    height: scale(35),
    resizeMode: "contain",
  },
  Export: {
    color: Colors.Grey,
    fontSize: scale(11),
    fontFamily: Font.Inter500,
    textDecorationLine: "underline",
  },
  BoxOfTableHeader: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.Main,
    alignItems: "center",
    paddingVertical: moderateVerticalScale(10),
  },
  Year: {
    color: Colors.White,
    fontFamily: Font.Inter400,
    fontSize: scale(15),
  },
});

export default FullTable;
