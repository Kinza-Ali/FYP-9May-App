import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* ************************************ DRAWER HEADER!!!!!  ************************** */}

      <View style={styles.drawerHeader}>
        <Neomorph
          style={[
            styles.BackIcons,
            {
              borderRadius: perfectSize(30),
              height: perfectSize(56),
              width: perfectSize(56),
            },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Start")}>
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </Neomorph>
        <Text
          style={{
            color: Colors.defaultDark,
            fontWeight: "bold",
            fontFamily: Colors.fontFamily,
            paddingRight: 150,
            fontSize: 25,
          }}
        >
          {" "}
          HOME
        </Text>
      </View>

      {/* ****************************** BODY ********************************** */}

      <ScrollView>
        <View style={{ marginTop: perfectSize(50) }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Neomorph
              // lightShadowColor="#D0E6A5"
              // darkShadowColor="#D0E6A5" // <- set this
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
            {/* {**************************************************************************}   */}
            <Neomorph
              // lightShadowColor="#D0E6A5"
              // darkShadowColor="#D0E6A5" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={() => navigation.navigate("Workouts")}
              >
                <Image source={Images.Workouts} style={[styles.dietIcon]} />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Workouts</Text>
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
              //  lightShadowColor="#D0E6A5"
              //  darkShadowColor="#D0E6A5" // <- set this
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
              //  lightShadowColor="#D0E6A5"
              //  darkShadowColor="#D0E6A5" // <- set this
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
              //  lightShadowColor="#D0E6A5"
              //  darkShadowColor="#D0E6A5" // <- set this
              swapShadows
              style={styles.menuItems}
            >
              <TouchableOpacity
                style={{
                  marginTop: perfectSize(42),
                }}
                onPress={() => navigation.navigate("Nutritionists")}
              >
                <Image source={Images.Nutritionist} style={[styles.dietIcon]} />
              </TouchableOpacity>
              <Text style={styles.textIcon}>Nutritionist</Text>
            </Neomorph>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily: Colors.fontFamily,
  },
  header: {
    flex: 2,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "black",
    fontSize: 30,
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "IowanOldStyle-Roman",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#5f9ea0",
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
    color: "#5f9ea0",
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
    paddingLeft: 20,
    justifyContent: "space-between",
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
