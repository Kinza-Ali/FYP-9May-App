import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import asyncStorage from "@react-native-community/async-storage";
import { color } from "react-native-reanimated";
// import Feather from 'react-native-vector-icons/Feather'
// import{ AuthContext } from '../components/context';
export function DrawerContent(props) {
  const [name, setName] = useState("");
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  // const {LogOut} = React.useContext(AuthContext);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  //------ read Data---
  const readData = async () => {
    try {
      const name = await asyncStorage.getItem("name");
      setName(name);
      // console.log("=======");
      // console.log(name);
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  readData();
  //--- signOut-------
  signOut = async () => {
    try {
      auth().signOut().then();
      console.log("signOut");
      clearStorage();
    } catch (error) {
      console.log(error);
    }
    props.navigation.navigate("Start");
  };
  /// --------Clear Storage
  const clearStorage = async () => {
    try {
      await asyncStorage.clear();
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };
  //----------------------
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar.Image
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                }}
                size={50}
                backgroundColor="#B9BBDF"
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                {/* <Title style={styles.title}>
                  {" "}
                  {auth().currentUser.displayName}
                </Title> */}
                {/* <Caption style={styles.caption}>@123user</Caption> */}
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("HomeScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="About Us"
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />
            <Drawer.Section title="Preferences">
              <TouchableRipple
                onPress={() => {
                  toggleTheme();
                }}
              >
                <View style={styles.preference}>
                  <Text>Dark Theme</Text>
                  <View pointerEvents="none">
                    <Switch value={isDarkTheme} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Log out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    // fontFamily: "IowanOldStyle-Roman",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
