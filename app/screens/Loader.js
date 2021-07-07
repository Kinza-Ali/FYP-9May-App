import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import asyncStorage from "@react-native-community/async-storage";

const Loader = (props) => {
  useEffect(() => {
    readData();
  }, []);
  const readData = async () => {
    try {
      const loggedIn = await asyncStorage.getItem("loggedIn");
      const admin = await asyncStorage.getItem("isAdmin");
      if (loggedIn) props.navigation.navigate("MainTabScreen");
      else {
        props.navigation.navigate("Start");
      }
    } catch (e) {
      console.log("ERROR");
      console.log(e);
      console.log("ERROR");
      alert("Failed to fetch the data from storage");
    }
  };

  return <ActivityIndicator style={{ marginTop: 50 }} />;
};

export default Loader;
