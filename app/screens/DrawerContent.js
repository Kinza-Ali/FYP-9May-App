import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Avatar,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  Title,
} from "react-native-paper";
import Colors from "../assets/themes/Colors";
import auth from "@react-native-firebase/auth";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import asyncStorage from "@react-native-community/async-storage";
export function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

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
      // alert("Failed to clear the async storage.");
    }
  };
  //----------------------
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar.Image
                source={{
                  uri:
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                }}
                size={40}
                backgroundColor={Colors.containerBg}
              />
              <View style={{ flexDirection: "column" }}>
                <Title style={styles.title}>
                  {" "}
                  {auth().currentUser.displayName}
                </Title>
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
                <Icon name="account-edit-outline" color={color} size={size} />
              )}
              label="Edit Profile"
              onPress={() => {
                props.navigation.navigate("Trial");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="About Us"
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />

            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Trial"
              onPress={() => {
                props.navigation.navigate("Trial");
              }}
            /> */}

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
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    fontFamily: Colors.fontFamily,
  },
  drawerContent: {
    backgroundColor: Colors.backgroundColor,
    fontFamily: Colors.fontFamily,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    fontFamily: Colors.fontFamily,
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
