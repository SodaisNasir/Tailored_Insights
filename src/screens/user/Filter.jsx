import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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
import RadioButtonRN from "radio-buttons-react-native";

import {
  ZTypeFilter,
  ZTypeList,
  CTypeList,
  VTypeList,
  VTypeListFullAccess,
} from "../../Constants/Data";
import { BaseUrl } from "../../utils/url";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../components/Modal/Loading";
import CustomButton from "../../components/CustomButton";

const Filter = ({ navigation, route }) => {
  const [year, setYear] = useState(2023);
  const [number, setNumber] = useState(1);
  const [type, setType] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [filter, setFilter] = useState("");

  const [loading, setLoading] = useState(false);

  const [listType, setListType] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [subFilterType, setSubFilterType] = useState([]);
  const [data, setData] = useState([]);

  const { radius, address, location } = route.params;
  const user = useSelector((state) => state.userData);
  const Products = useSelector((state) => state.ProductsData);

  const Static = [
    {
      lable: 10655,
      value: "10655-SOFTCARE COMPUTER CONSULTING",
    },
    {
      lable: 10655,
      value: "13348-SOFTCARE COMPUTER CONSULTING",
    },
    {
      lable: 10660,
      value: "10660-METRO K9 ACADEMY LLC",
    },
    {
      lable: 10664,
      value: "10664-NATURAL TAIL TREATS LLC",
    },
    {
      lable: 10664,
      value: "13356-NATURAL TAIL TREATS LLC",
    },
    {
      lable: 10667,
      value: "10667-FUSSY FRIENDS PET SUPPLY",
    },
    {
      lable: 10667,
      value: "13357-FUSSY FRIENDS PET SUPPLY",
    },
    {
      lable: 10671,
      value: "10671-The Grooming Shoppe  Inc dba the Petcare Market",
    },
    {
      lable: 10671,
      value: "18408-The Petcare  Market",
    },
    {
      lable: 10675,
      value: "10675-WOOF GANG BAKERY & GROOMING",
    },
    {
      lable: 10676,
      value: "10676-WHOLISTIC PAWS-RIDGEWOOD",
    },
    {
      lable: 10676,
      value: "13360-WHOLISTIC PAWS",
    },
    {
      lable: 10676,
      value: "13361-WHOLISTIC PAWS",
    },
    {
      lable: 10676,
      value: "18399-Wholistic Ridgewood ship to Ramsey",
    },
    {
      lable: 10679,
      value: "10679-DONNA S PET DEPOT",
    },
    {
      lable: 10681,
      value: "10681-BLACKINN",
    },
    {
      lable: 10682,
      value: "13362-SHAMPOOCHIES",
    },
    {
      lable: 10683,
      value: "10683-MAMA S & PAPA S",
    },
    {
      lable: 10687,
      value: "10687-PET SUPPLIES PLUS #4006",
    },
    {
      lable: 10692,
      value: "10692-WESTWOOD PETS UNLIMITED",
    },
    {
      lable: 10692,
      value: "19586-WESTWOOD PETS UNLIMITED",
    },
    {
      lable: 10694,
      value: "10694-Pet Goods",
    },
    {
      lable: 10694,
      value: "13363-PET GOODS-SUCCASUNNA",
    },
    {
      lable: 10694,
      value: "19626-Pet Goods 2 Roxbury",
    },
    {
      lable: 10702,
      value: "10702-Plaza Pet World, Inc.",
    },
    {
      lable: 10702,
      value: "18065-Plaza Pet World, Inc.",
    },
    {
      lable: 10708,
      value: "10708-MOYSESTRA ENTERPRISES, INC.",
    },
    {
      lable: 10708,
      value: "13370-PET SUPPLIES PLUS #4003",
    },
    {
      lable: 10709,
      value: "10709-PAWS TO LOVE ADOPTIONS,INC.",
    },
    {
      lable: 10710,
      value: "10710-AMY S ROYAL TREATMENT",
    },
    {
      lable: 10711,
      value: "10711-Hound About Town (McWilliams)",
    },
    {
      lable: 10715,
      value: "10715-ONE OF THE FAMILY PETS SUPPLY",
    },
    {
      lable: 10715,
      value: "17504-ONE OF THE FAMILY PETS SUPPLY",
    },
    {
      lable: 10716,
      value: "10716-WHOLISTIC PAWS-RAMSEY",
    },
    {
      lable: 10718,
      value: "10718-THE BIG BAD WOOF TAKOMA",
    },
    {
      lable: 10718,
      value: "13373-METROPOLITAN POLICE DEPT.",
    },
    {
      lable: 10719,
      value: "10719-CHIEN DE LUXE",
    },
    {
      lable: 10728,
      value: "10728-LITTLE RASCALS DOGGIE DAY CARE",
    },
    {
      label: 10728,
      value: "13375-LITTLE RASCALS DOGGIE",
    },
    {
      lable: 10729,
      value: "10729-HUMANE RESCUE ALLIANCE",
    },
  ];

  const handleAdd = () => {
    setYear(year + 1);
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

  const getCustomerTypeData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2022-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "Y",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-customer_type-data-page`, requestOptions)
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  const getCustomerData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-11-19",
      startDate: "2022-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "M",
      neededQ: 4,
      neededM: 11,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-customer-data-page`, requestOptions)
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
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  const getOutletData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      startDate: "2022-11-19",
      enddate: "2023-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "M",
      neededQ: 4,
      neededM: 11,
      neededW: 2,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-outlet-data-page`, requestOptions)
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
              console.log("EXTRACTED VALUES ===>", values);
            });
            setData((prevData) => [...prevData, values]);
            console.log("DATA ==>", data);
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  const getFamilyData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      startDate: "2022-11-19",
      enddate: "2023-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "M",
      neededQ: 4,
      neededM: 11,
      neededW: 2,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-family-data-page`, requestOptions)
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  const getVendorData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      startDate: "2022-11-19",
      enddate: "2023-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "M",
      neededQ: 4,
      neededM: 11,
      neededW: 2,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-vendor-data-page`, requestOptions)
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };
  const getSKUData = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      startDate: "2022-11-19",
      enddate: "2023-11-19",
      radius: 5000,
      elat: 45,
      elong: 45,
      demandingPage: "M",
      neededQ: 4,
      neededM: 11,
      neededW: 2,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}mapping/invoice-sku-data-page`, requestOptions)
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  // useEffect(()=>{
  //   console.log("EFFECT DATA ==>",data);
  //     },[data,setData])
  const [tableHead, setTableHead] = useState([
    // "Back",
    // "QTY",
    // "SALES",
    // "Head4",
    // "Head5",
    // "Head6",
    // "Head7",
    // "Head8",
    // "Head9",
  ]);

  const widthArr = [
    scale(150),
    scale(150),
    scale(150),
    // scale(150),
    // scale(150),
    // scale(150),
    // scale(150),
    // scale(150),
    // scale(150),
  ];

  const generateTableData = () => {
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    // console.log("tableData =====>",tableData);
    return tableData;
  };

  const subCustomerType = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${BaseUrl}customerType/findAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            key: item.id,
            values: item.name,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subCustomer = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}customer/findAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            key: item.id,
            value: item.name,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subOutlet = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "Get",
      headers: myHeaders,
      // body: raw,
      redirect: "follow",
    };

    fetch(`${BaseUrl}outlet/findAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            key: item.customerId,
            value: item.contactName,
          };
        });
        console.log("result.responseContent", data.length);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subFamily = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
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
            key: item.family,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subCategory = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

 

    var requestOptions = {
      method: "GET",
      headers: myHeaders,

      redirect: "follow",
    };

    fetch(`${BaseUrl}category/findAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const data = result.responseContent.map((item) => {
          return {
            value: item.name,
            key: item.familyCategoryId,
          };
        });
        console.log("result.CATEGORY", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subVendor = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
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
            key: item.vendorId,
          };
        });
        console.log("result.responseContent", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const subSKU = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      enddate: "2023-12-31",
      startDate: "2023-01-01",
      // radius: radius.value,
      radius: 5000,
      elat: 45,
      elong: 45,
      // elat: location.latitude,
      // elong: location.longitude,
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      
      redirect: "follow",
    };

    fetch(`${BaseUrl}sku/findAll`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("SKU RESULT ===>", result);
        const data = result.responseContent.map((item) => {
          console.log("ITEM IN SKU ==>",item);
          return {
            value: item.name,
            key: item.skuId,
          };
        });
        // console.log("result.responseContent", data);
        setSubFilterType(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  };

  const onChangeFilter = (value) => {
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

  const onChangeListType = (value) => {
    console.log("ON CHANGE LIST ==>", value);
    if (value == "Customer Type") {
      getCustomerTypeData();
    } else if (value == "Customer") {
      getCustomerData();
    } else if (value == "Outlet") {
      getOutletData();
    } else if (value == "Family") {
      getFamilyData();
    } else if (value == "Category") {
      subCategory();
    } else if (value == "Vendor") {
      getVendorData();
    } else if (value == "SKU") {
      getSKUData();
    }
  };

  useFocusEffect(
    useCallback(() => {
      // if (user.type == "V") {
      //   if (user.status.trim() == "Y") {
      //     getOutletData();
      //     console.log("full");
      //   } else {
      //     getCustomerData();
      //   }
      // } else if (user.type == "C") {
      //   getOutletData();
      // } else if (user.type == "Z") {
      //   getCustomerTypeData();
      // }
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

  // this is an extensive filteration method

  const filterProducts = (value) => {
    const subFilterObject = subFilterType.filter((item) => item.value == value);
    if (filter == "Customer Type") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.customerType == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "Customer") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.map((item) => {
        if (item.customerId == filterItem) {
          return {
            Product: item.skuName,
            Amount: item.amount,
            Quantity: item.qty,
          };
        }
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "Outlet") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.customerId == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });

      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "Family") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.family == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "Category") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.familyCategoryId == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "Vendor") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.vendorId == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    } else if (filter == "SKU") {
      const filterItem = subFilterObject[0].label;
      const FilteredProducts = Products.filter(
        (item) => item.skuId == filterItem
      ).map((item) => {
        return {
          Product: item.skuName,
          Amount: item.amount,
          Quantity: item.qty,
        };
      });
      if (FilteredProducts.length > 0) {
        const keys = Object.keys(FilteredProducts[0]);
        console.log("keys ====>", keys);
        setTableHead(keys);
        FilteredProducts.forEach((item) => {
          let values = [];
          Object.keys(item).forEach((key) => {
            values = [...values, item[key]];
            console.log("EXTRACTED VALUES ===>", values);
          });
          setData((prevData) => [...prevData, values]);
          console.log("DATA ==>", data);
        });
      }
    }
  };

  const OnShowTables = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Cookie",
      "ARRAffinity=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1; ARRAffinitySameSite=2f04080791214b9cd44673d14595786928ab2c0b432cd4549ad24da8c30a08e1"
    );

    console.log("type====>", type);
    var raw = JSON.stringify({
      listType: type,
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
      startDate: "2022-11-19",
      demandingPage: "Y",
      neededQ: 3,
      neededM: 4,
      neededW: 5,
      pageNumber: 1,
      pageSize: 100,
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
          let arr = [];
          result.responseContent.forEach((item) => {
            let values = [];
            Object.keys(item).forEach((key) => {
              values = [...values, item[key]];
              // console.log("EXTRACTED VALUES ===>", values);
            });
            arr = [...arr, values];
            setData((prevData) => [...prevData, values]);
            console.log("DATA ==>", arr);
          });
          setLoading(false);
          navigation.navigate("full_table", {
            radius: radius,
            address: address,
            location: location,
            tableHead: tableHead,
            tableData: arr,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const tableData = generateTableData();
  return (
    <SafeAreaView style={GlobalStyle.Container}>
      <LogBox />
      <Loading isVisible={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyle.verticalSpace} />

        <DropDown
          title="list By"
          items={listType}
          value={type}
          setValue={(value) => {
            console.log("value", value);
            setType(value);
            // onChangeListType(value);
          }}
        />
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.Text}>Filter By</Text>
          <TouchableOpacity onPress={() => setFilter(null)}>
            <Text style={styles.Text}>Reset</Text>
          </TouchableOpacity>
        </View>
        {filterType.map((item) => {
          return type != item.label ? (
            <TouchableOpacity
              style={{ width: "90%", alignSelf: "center", padding: scale(10) }}
              onPress={() => {
                setFilter(item.value);
                onChangeFilter(item.value);
              }}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <View
                  style={{
                    height: scale(20),
                    width: scale(20),
                    borderColor: Colors.Main,
                    borderRadius: scale(20),
                    borderWidth: scale(1),
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      height: scale(10),
                      width: scale(10),
                      backgroundColor:
                        filter == item.label ? Colors.Main : Colors.White,
                      borderRadius: scale(20),
                      alignSelf: "center",
                    }}
                  />
                </View>
                <Text
                  style={[
                    styles.Text,
                    { bottom: scale(2), marginLeft: scale(5) },
                  ]}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null;
        })}
        {/* <RadioButtonRN
          data={filterType}
          style={{ marginHorizontal: scale(20) }}
          selectedBtn={(value) => {setFilter(value); console.log("value ==>",value);}}
        /> */}
        {/* <DropDown
          title="Filter By"
          items={filterType}
          value={customer}
          setValue={(value) => setFilter(value)}
        /> */}
        <DropDown
          save="key"
          title="Sub Filter"
          items={subFilterType}
          value={subFilter}
          setValue={(item) => {
            console.log("THIS IS SELECTED ==>",item,);
            setSubFilter(item);
            // filterProducts(value);
          }}
        />
        {/*  borderStyle={styles.borderStyle}> */}
        <View style={GlobalStyle.verticalSpace} />
        {/* <CustomButton
          containerStyle={styles.MainContainer}
          onPress={() => null}
          title="Filter"
        /> */}
        {/* <View style={GlobalStyle.Row}>
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
        </View> */}
        {/* {data.length > 0 ? (
          <ScrollView horizontal showsVerticalScrollIndicator={false}>
            <View>
              <Table>
                <Row
                  data={tableHead}
                  widthArr={widthArr}
                  style={styles.header}
                  textStyle={[styles.text, { color: Colors.White }]}
                />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={styles.borderStyle}>
                  {data.map((rowData, index) => (
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
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginVertical: scale(20),
            }}
          >
            <Text
              style={{
                color: Colors.Main,
                fontFamily: Font.Inter300,
                fontSize: scale(20),
              }}
            >
              Nothing to show
            </Text>
          </View>
        )} */}
        <CustomButton
          containerStyle={styles.MainContainer}
          onPress={OnShowTables}
          title="SHOW RESULTS"
        />
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
    backgroundColor: "#339CCC",
  },
  text: { textAlign: "center", fontFamily: Font.Inter400, color: Colors.Black },
  row: { height: verticalScale(50), backgroundColor: "#E7E6E1" },
  borderStyle: {
    borderWidth: scale(1),
    borderColor: Colors.ThemeCream,
    borderTopColor: Colors.Main,
  },
  headerBorderStyle: {
    borderWidth: scale(1),
    borderColor: Colors.White,
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
    // marginRight:scale(50),
    // width: "80%",
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
  Text: {
    color: Colors.Main,
    fontSize: scale(16),
    fontFamily: Font.Inter600,
    textTransform: "capitalize",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
});
