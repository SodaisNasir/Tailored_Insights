import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Table, Row, Col, TableWrapper } from "react-native-table-component";
import { GlobalStyle } from "../../Constants/GlobalStyle";
import { Colors } from "../../utils/Colors";
import Toast from "react-native-simple-toast";
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
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNPrint from "react-native-print";

const FullTable = ({ navigation, route }) => {
  const { radius, address, location, tableData, listType } = route.params;
  const [year, setYear] = useState(2023);
  const [number, setNumber] = useState(0);
  const [Qnumber, setQnumber] = useState(1);
  const [Mnumber, setMnumber] = useState(1);
  const [Wnumber, setWnumber] = useState(1);

  const [pageNumber, setPageNumber] = useState(1);
  const [demandNumber, setDemandNumber] = useState(0);
  const [data, setData] = useState(tableData);
  const [loading, setLoading] = useState(false);
  const [tableHead, setTableHead] = useState(["Products", "Quantity", "Sales"]);
  const [demand, setDemand] = useState("Y");
  const [displayedDemand, setDisplayedDemand] = useState("Q");
  const firstRenderRef = useRef(true);
  console.log("YYAZAAO ==>", data[0].length);
  console.log("==========");
  const printPDF = async () => {
    const results = await RNHTMLtoPDF.convert({
      html: `
      <!DOCTYPE html>
<html>

<head>

    <style>
        table {
            border-collapse: collapse;
            width: 50%;
            margin: 20px auto;
        }

        th,
        td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body onload="renderData()">
    <!-- <h1>Dynamic Table Example</h1>
    <button onclick="addRow()">Add Row</button> -->
    <table id="myTable">
        <thead>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Sales</th>
            </tr>
        </thead>
        <tbody>
            <!-- Rows will be added here -->
            ${data.map((element) =>
              element.map((item, index) => {
                return `<tr>
<td>${item[0]}</td>
<td>${item[1]}</td>
<td>${item[2]}</td>
</tr>
`;
              }).join("")
            )}
        </tbody>
    </table>

    <!-- <script>
        const allData = [
            [
                ["Nutro Products, Inc. 22lb NUT LID AD LAMB & SW POT", 2, "$0"]
            ],
            [
                ["Nutro Products, Inc. 22lb NUT LID AD LAMB & SW POT", 2, "$0"]
            ],
            [
                ["Nutro Products, Inc. 22lb NUT LID AD LAMB & SW POT", 2, "$188.76"]
            ],
            [
                ["Nutro Products, Inc. 22lb NUT LID AD LAMB & SW POT", 2, "$0"]
            ]
        ];

        function addRow(rowData, table) {
            const newRow = table.insertRow(-1); // Insert a row at the end of the table

            const nameCell = newRow.insertCell(0);
            const ageCell = newRow.insertCell(1);
            const countryCell = newRow.insertCell(2);

            nameCell.innerHTML = rowData[0];
            ageCell.innerHTML = rowData[1];
            countryCell.innerHTML = rowData[2];
        }

        function renderData() {
            const table = document.getElementById("myTable");
            allData.forEach(item => {
                addRow(item[0], table);
            });
        }

    </script> -->
</body>

</html>
      `,
      fileName: `PDF_${Math.floor(Math.random() * 10000)}`,
      base64: true,
    });

    await RNPrint.print({ filePath: results.filePath });
  };
  const OnShowTables = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );
    console.log(
      "DEMAND IN SHOW TABLE",
      "demand",
      demand,
      "year",
      year,
      "pageNumber",
      pageNumber,
      "listType",
      listType,
      "Qnumber",
      Qnumber
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
      startDate: `${year - 1}-11-19`,
      demandingPage: demand,
      neededQ: Qnumber,
      neededM: Mnumber,
      neededW: 0,
      pageNumber: pageNumber,
      pageSize: 100,
      radius: 5000,
      elat: 45,
      elong: 45,
    });
    console.log("RAWW ==>", raw);
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
          // const keys = Object.keys(result.responseContent[0]);
          // console.log("keys ====>", keys);
          // setTableHead(keys);
          // result.responseContent.forEach((item) => {
          //   let values = [];
          //   Object.keys(item).forEach((key) => {
          //     values = [...values, item[key]];
          //     // console.log("EXTRACTED VALUES ===>", values);
          //   });
          //   setData((prevData) => [...prevData, values]);
          //   console.log("DATA ==>", data);
          // });

          const q1Array = [];
          const q2Array = [];
          const q3Array = [];
          const q4Array = [];
          const q5Array = [];
          const q6Array = [];
          const q7Array = [];
          const q8Array = [];
          if (demand == "Q") {
            for (const item of result.responseContent) {
              q1Array.push([item.product, item.qty, `$${item.m1}`]);
              q2Array.push([item.product, item.qty, `$${item.m2}`]);
              q3Array.push([item.product, item.qty, `$${item.m3}`]);
            }
            setData([q1Array, q2Array, q3Array]);
            setLoading(false);
          } else if (demand == "Y") {
            for (const item of result.responseContent) {
              q1Array.push([item.product, item.qty, `$${item.q1}`]);
              q2Array.push([item.product, item.qty, `$${item.q2}`]);
              q3Array.push([item.product, item.qty, `$${item.q3}`]);
              q4Array.push([item.product, item.qty, `$${item.q4}`]);
            }
            // console.log("QUATER DATA ==>", [
            //   q1Array,
            //   q2Array,
            //   q3Array,
            //   q4Array,
            // ]);
            // console.log("===================");
            setData([q1Array, q2Array, q3Array, q4Array]);

            setLoading(false);
          } else if (demand == "M") {
            for (const item of result.responseContent) {
              q1Array.push([item.product, item.qty, `$${item.w1}`]);
              q2Array.push([item.product, item.qty, `$${item.w2}`]);
              q3Array.push([item.product, item.qty, `$${item.w3}`]);
              q4Array.push([item.product, item.qty, `$${item.w4}`]);
              q5Array.push([item.product, item.qty, `$${item.w5}`]);
              q6Array.push([item.product, item.qty, `$${item.w6}`]);
              setData([q1Array, q2Array, q3Array, q4Array, q5Array, q6Array]);
              setLoading(false);
            }
          }
        } else {
          Toast.show("No data found");
          setLoading(false);
        }

        // navigation.navigate("full_table", {
        //   radius: radius,
        //   address: address,
        //   location: location,
        //   tableHead: tableHead,
        //   tableData: data,
        // });
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        Toast.show("Network Error, Please Try again");
      });
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      console.log("ELSE IS TRIGGERED IN USEEFFECT ==>");
      OnShowTables();
    }
  }, [year, pageNumber, demand, demandNumber, Qnumber, Mnumber]);

  const [widthArr, setWidthArr] = useState([
    scale(170),
    scale(90),
    scale(90),
    scale(90),
    scale(90),
    scale(90),
    scale(90),
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

  const increseMonths = () => {
    if (Mnumber < 11) {
      setMnumber(Mnumber + 1);
    }
  };

  const decreaseMonths = () => {
    if (Mnumber > 1) {
      setMnumber(Mnumber - 1);
    }
  };

  const handleAdd = () => {
    setYear(year + 1);
  };
  const handleMinus = () => {
    setYear(year - 1);
  };

  const handleDemandAdd = () => {
    console.log("==================");
    console.log("handleDemandAdd");
    console.log("==================");
    if (Qnumber <= 3) {
      setQnumber(Qnumber + 1);
    }

    // if (demandNumber < 3 && displayedDemand == "M") {
    //   setDemandNumber(demandNumber + 1);
    // } else if (demandNumber < 3) {
    //   setDemandNumber(demandNumber + 1);
    // }
    // OnShowTables();
  };
  const handleDemandMinus = () => {
    if (Qnumber > 1) {
      setQnumber(Qnumber - 1);
    }

    // OnShowTables();
  };

  const QAdd = () => {
    console.log("NUMBER IN ADD Q ==>", number);
    if (displayedDemand == "M") {
      if (number < 2) {
        setNumber(number + 1);
      }
    } else if (displayedDemand == "W") {
      if (number < 5) {
        setNumber(number + 1);
      }
    } else {
      if (number < 3) {
        setNumber(number + 1);
      }
    }
  };
  const QMin = () => {
    if (number >= 1) {
      setNumber(number - 1);
    }
  };

  const increasePage = () => {
    setPageNumber(pageNumber + 1);
    setNumber(0);
  };

  const decreasePage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setNumber(0);
    }
  };
  const drillDown = () => {
    if (demand == "Y") {
      setDemand("Q");
      setDisplayedDemand("M");
      setNumber(0);
    } else if (demand == "Q") {
      setDemand("M");
      setDisplayedDemand("W");
      setNumber(0);
    } else {
      setDemand("W");
      setNumber(0);
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
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: scale(10),
              fontFamily: Font.Inter400,
              color: Colors.Black,
            }}
          >{`Within ${radius} miles of ${address}`}</Text>
        </View>
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

          <View style={{ marginLeft: scale(10), marginRight: scale(70) }}>
            <View style={GlobalStyle.Row}>
              {Exports?.map((item, index) => {
                const onPress = item.value == "PDF" ? () => printPDF() : null;
                return (
                  <TouchableOpacity onPress={onPress}>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <Image source={item.source} style={styles.Image} />
                      <Text style={styles.Export}>Export as {item.value}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: "pink",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("filter", {
                radius: radius,
                address: address,
                location: location,
                setMethod: setData,
              });
            }}
            style={{
              height: demand == "M" ? scale(150) : scale(100),
              width: "20%",
              backgroundColor: "#C9C9C9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="filter-sharp"
              size={scale(25)}
              color={Colors.Main}
            />
            <Text
              style={[styles.Year, { color: Colors.Main, fontSize: scale(10) }]}
            >
              Back to Filter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("HELLOOOO");
              setDemand("Y");
              setDisplayedDemand("Q");
              setPageNumber(1);
            }}
            style={{
              height: demand == "M" ? scale(150) : scale(100),
              width: "20%",
              backgroundColor: "#C9C9C9",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="calendar" size={scale(25)} color={Colors.Main} />
            <Text
              style={[styles.Year, { color: Colors.Main, fontSize: scale(10) }]}
            >
              Move Up
            </Text>
          </TouchableOpacity>
          <View>
            {demand == "Y" ? (
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
            ) : (
              <View
                style={[
                  styles.BoxOfTableHeader,
                  { height: scale(50), width: "100%" },
                ]}
              >
                <TouchableOpacity onPress={handleDemandMinus}>
                  <Entypo
                    name="chevron-left"
                    color={Colors.White}
                    size={scale(20)}
                  />
                </TouchableOpacity>
                <Text style={styles.Year}>{`Q${Qnumber}`}</Text>
                {/* <Ionicons
                    name="filter"
                    color={Colors.White}
                    size={scale(18)}
                  /> */}
                <TouchableOpacity onPress={handleDemandAdd}>
                  <Entypo
                    name="chevron-right"
                    color={Colors.White}
                    size={scale(20)}
                  />
                </TouchableOpacity>
              </View>
            )}
            {demand == "M" ? (
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
                <TouchableOpacity
                  activeOpacity={Mnumber == 0 && 1}
                  onPress={decreaseMonths}
                >
                  <Entypo
                    name="chevron-left"
                    color={Colors.White}
                    size={scale(20)}
                  />
                </TouchableOpacity>
                <View onPress={drillDown}>
                  <Text style={styles.Year}>
                    {`M${Mnumber + 1}`}
                    <Ionicons
                      name="filter"
                      color={Colors.White}
                      size={scale(18)}
                    />
                  </Text>
                </View>

                <TouchableOpacity onPress={increseMonths}>
                  <Entypo
                    name="chevron-right"
                    color={Colors.White}
                    size={scale(20)}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            <View
              style={[
                styles.BoxOfTableHeader,
                {
                  height: scale(50),
                  width: "100%",
                  backgroundColor: demand == "M" ? Colors.Main : "#339CCC",
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
              <TouchableOpacity onPress={drillDown}>
                <Text style={styles.Year}>
                  {`${displayedDemand}${number + 1}`}
                  <Ionicons
                    name="filter"
                    color={Colors.White}
                    size={scale(18)}
                  />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={QAdd}>
                <Entypo
                  name="chevron-right"
                  color={Colors.White}
                  size={scale(20)}
                />
              </TouchableOpacity>
            </View>

            {/* {demand != "Y" ? : null} */}
          </View>
        </View>
        <View
          style={[
            styles.BoxOfTableHeader,
            {
              height: scale(50),
              width: "100%",
              backgroundColor: demand == "M" ? "#339CCC" : Colors.Main,
              //   justifyContent: "space-between",
              //   paddingHorizontal: moderateScale(20),
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={pageNumber == 0 && 1}
            onPress={decreasePage}
          >
            <Entypo name="chevron-left" color={Colors.White} size={scale(20)} />
          </TouchableOpacity>
          <View>
            <Text style={styles.Year}>{`Page number ${pageNumber}`}</Text>
          </View>

          <TouchableOpacity onPress={increasePage}>
            <Entypo
              name="chevron-right"
              color={Colors.White}
              size={scale(20)}
            />
          </TouchableOpacity>
        </View>

        {!loading ? (
          <>
            <Table>
              {/*  borderStyle={styles.borderStyle}> */}
              <Row
                data={tableHead}
                widthArr={widthArr.slice(0, tableHead.length)}
                style={[
                  styles.header,
                  { backgroundColor: demand == "M" ? Colors.Main : "#339CCC" },
                ]}
                textStyle={[styles.text, { color: Colors.White }]}
              />
            </Table>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={styles.borderStyle}>
                    {data[number].map((rowData, index) => {
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
          </>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} color={Colors.Main} />
          </View>
        )}
      </View>
      <ConnectionModal />
      {/* <Loading isVisible={loading} /> */}
    </SafeAreaView>
  );
};

// (
//   <ScrollView style={styles.dataWrapper}>
//     <Table borderStyle={styles.borderStyle}>
//       {data[demandNumber].map((rowData, index) => {
//         return (
//           <Row
//             key={index}
//             data={rowData}
//             widthArr={widthArr.slice(0, tableHead.length)}
//             style={[
//               styles.row,
//               index % 2 == 0
//                 ? { backgroundColor: Colors.White }
//                 : null,
//             ]}
//             textStyle={styles.text}
//           />
//         );
//       })}
//     </Table>
//   </ScrollView>
// )
const styles = StyleSheet.create({
  header: {
    height: verticalScale(50),
    backgroundColor: "#339CCC",
  },
  text: { textAlign: "center", fontFamily: Font.Inter400, color: Colors.Black },
  dataWrapper: { marginTop: -1, flexDirection: "row" },
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
