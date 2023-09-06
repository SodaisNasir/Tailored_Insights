import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
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
import { useSelector } from "react-redux";
import { State } from "react-native-image-zoom-viewer/built/image-viewer.type";

import {
  ZTypeFilter,
  ZTypeList,
  CTypeList,
  VTypeList,
  VTypeListFullAccess,
} from "../../Constants/Data";
import { BaseUrl } from "../../utils/url";
import { useFocusEffect } from "@react-navigation/native";

const Filter = ({ navigation, route }) => {
  const [year, setYear] = useState(2023);
  const [number, setNumber] = useState(1);
  const [type, setType] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [customer, setCustomer] = useState("");

  const [listType, setListType] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [subFilterType, setSubFilterType] = useState([]);
  const { radius, address, location } = route.params;
  const user = useSelector((state) => state.userData);

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

  const subCustomerType = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-customer_type`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.customerType,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subCustomer = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-customer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.customerId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subOutlet = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-outlet`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.contactName,
            label: item.customerOutletId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subFamily = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-family`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.family,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subCategory = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-category`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.familyCategoryId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subVendor = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-vendor`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.vendorId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const subSKU = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2023-11-19",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-sku`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            label: item.skuId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
      })
      .catch((error) => console.log("error", error));
  };

  const onChangeListType = (value) => {
    console.log("ON CHANGE ==>", value);
    if (value == "Customer Type") {
      subCustomerType();
    } else if (value == "Customer") {
      subCustomer();
    } else if (value == "Outlet") {
      subOutlet();
    } else if (value == "Family") {
      subFamily();
    } else if (value == "Category") {
      subCategory();
    } else if (value == "Vendor") {
      subVendor();
    } else if (value == "SKU") {
      subSKU();
    }
  };

  useFocusEffect(
    useCallback(() => {
      filterDropDowns();
    }, [])
  );

  const filterDropDowns = () => {
    console.log("user.type ==>", user.type);

    if (user.type == "V") {
      if (user.status.trim() == "Y") {
        setListType(VTypeListFullAccess);
        setFilterType(VTypeListFullAccess);
        console.log("full");
      } else {
        setListType(VTypeList);
        setFilterType(VTypeList);
      }
    } else if (user.type == "C") {
      setListType(CTypeList);
      setFilterType(CTypeList);
    } else if (user.type == "Z") {
      setListType(ZTypeList);
      setFilterType(ZTypeList);
    }
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
            <Text
              style={styles.miles}
            >{`Within (${radius.name}) miles of (${address})`}</Text>
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
          items={listType}
          value={type}
          setValue={(value) => {
            console.log("value", value);
            setType(value);
            onChangeListType(value);
          }}
        />
        <DropDown
          title="Filter By"
          items={filterType}
          value={customer}
          setValue={(value) => setCustomer(value)}
        />
        <DropDown
          title="Sub Filter"
          items={subFilterType}
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
    // marginRight:scale(50),
    width: "30%",
    // backgroundColor:'red'
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
