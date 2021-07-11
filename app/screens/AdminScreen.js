import React from "react";
import auth from "@react-native-firebase/auth";
import asyncStorage from "@react-native-community/async-storage";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Images from "../assets/themes/Images";
import Colors from "../assets/themes/Colors";

const AdminScreen = ({ navigation }) => {
  const clearStorage = async () => {
    try {
      await asyncStorage.clear();
      // alert('Storage successfully cleared!');
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  //----------- Sign Out -----------
  signOut = async () => {
    try {
      auth()
        .signOut()
        .then(() => console.log("signOut"));
      clearStorage();
    } catch (error) {
      alert(error);
    }
    navigation.replace("Start");
  };
  return (
    <View style={styles.container}>
      {/* ************************************ DRAWER HEADER!!!!!  ************************** */}

      <View style={styles.drawerHeader}>
        <Text
          style={{
            color: Colors.defaultDark,
            fontWeight: "bold",
            fontFamily: Colors.fontFamily,
            alignSelf: "center",
            fontSize: 25,
          }}
        >
          {" "}
          Admin Panel
        </Text>
      </View>

      {/* ****************************** BODY ********************************** */}

      <ScrollView
      //  refreshControl={
      //   <RefreshControl refreshing={this.state.refreshing} onRefresh={() => onRefresh} />
      // }
      >
        <View style={{ marginTop: perfectSize(100) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Neomorph
              lightShadowColor="#D0E6A5"
              darkShadowColor="#D0E6A5" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={() => navigation.navigate("Recipes")}
              >
                <Image source={Images.Recipes} style={[styles.dietIcon]} />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Recipes</Text>
            </Neomorph>
            {/* {******************************  BODY ****************************************}   */}
            <Neomorph
              lightShadowColor="#A8DEE0"
              darkShadowColor="#A8DEE0" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={() => navigation.navigate("Blogs")}
              >
                <Image source={Images.Blogs} style={[styles.dietIcon]} />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Blogs</Text>
            </Neomorph>
          </View>
          {/* {**************************************************************************}   */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: perfectSize(70),
            }}
          >
            <Neomorph
              lightShadowColor="#F8D90F"
              darkShadowColor="#F8D90F" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={() => navigation.navigate("SuccessStories")}
              >
                <Image
                  source={Images.SuccessStories}
                  style={[styles.dietIcon]}
                />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Success Stories</Text>
            </Neomorph>
            <Neomorph
              lightShadowColor="#E79796"
              darkShadowColor="#E79796" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={this.signOut}
              >
                <Image source={Images.Logout} style={[styles.dietIcon]} />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Logout</Text>
            </Neomorph>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default AdminScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily: Colors.fontFamily,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 30,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#484C7F",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  login: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "IowanOldStyle-Roman",
  },
  signUp: {
    width: "100%",
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#484C7F",
  },
  image: {
    height: 35,
    width: 35,
  },
  drawerHeader: {
    height: perfectSize(50),
    width: "100%",
    marginTop: perfectSize(50),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 20,
    justifyContent: "center",
  },
  user: {
    height: perfectSize(50),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    color: Colors.defaultDark,
    fontSize: perfectSize(15),
    alignSelf: "center",
  },
  headerEndSection: {
    height: perfectSize(30),
    width: perfectSize(90),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: perfectSize(23),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerNotificationIcon: {
    height: perfectSize(25),
    width: perfectSize(25),
    tintColor: Colors.defaultDark,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 23,
  },
  headerDate: {
    fontFamily: Colors.fontFamily,
    color: Colors.defaultDark,
    fontSize: perfectSize(22),
    right: perfectSize(60),
  },
  menuItems: {
    height: perfectSize(180),
    width: perfectSize(174),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    alignItems: "center",
    borderColor: Colors.defaultDark,
    borderRadius: 23,
  },
  menuIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  BackIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.containerBg,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.redDotColor,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ageIcons: {
    height: perfectSize(50),
    width: perfectSize(100),
    borderRadius: perfectSize(18),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  icon: {
    height: perfectSize(25),
    width: perfectSize(25),
    marginBottom: 4,
  },
  Modalicon: {
    height: perfectSize(150),
    width: perfectSize(150),
    marginBottom: 4,
    marginTop: 100,
    borderRadius: 150,
    borderColor: "#D7E1F3",
    borderWidth: 10,
  },
  dietIcon: {
    height: perfectSize(60),
    width: perfectSize(60),
    marginBottom: 4,
  },
  textIcon: {
    fontFamily: Colors.fontFamily,
    fontWeight: "bold",
    fontSize: perfectSize(22),
    marginTop: perfectSize(5),
  },

  footer: {
    height: perfectSize(50),
    width: perfectSize(300),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    marginTop: perfectSize(23),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  footerIcon: {
    height: perfectSize(18),
    width: perfectSize(18),
    tintColor: Colors.headerTextColor,
  },
});
