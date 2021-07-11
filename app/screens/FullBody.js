import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import YoutubePlayer from "react-native-youtube-sdk";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Abs = ({ navigation }) => {
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </Neomorph>
        <Text
          style={{
            color: Colors.defaultDark,
            fontWeight: "bold",
            fontFamily: Colors.fontFamily,
            paddingRight: 40,
            fontSize: 25,
          }}
        >
          Move Your Body!
        </Text>
      </View>

      {/* ****************************** BODY ********************************** */}
      <ScrollView>
        <View style={{ marginTop: perfectSize(40) }}>
          <View>
            <View style={styles.cardDesigns}>
              <Neomorph
                // lightShadowColor="#D0E6A5"
                // darkShadowColor="#D0E6A5" // <- set this
                swapShadows
                style={styles.menuItems}
              >
                <YoutubePlayer
                  videoId={"UItWltVZZmE"}
                  autoPlay={false}
                  fullscreen={false}
                  showfullscreenButton={true}
                  showSeekBar={true}
                  style={{ width: "100%", height: 200 }}
                  onError={(e) => console.log(e)}
                  onChangeState={(e) => console.log(e)}
                  onChangeFullScreen={(e) => console.log(e)}
                />
              </Neomorph>
            </View>
            {/* ***************************************************** */}
            <View style={styles.cardDesigns}>
              <Neomorph
                // lightShadowColor="#D0E6A5"
                // darkShadowColor="#D0E6A5" // <- set this
                swapShadows
                style={styles.menuItems}
              >
                <YoutubePlayer
                  videoId={"6VFLKdfxA24"}
                  autoPlay={false}
                  fullscreen={false}
                  showfullscreenButton={true}
                  showSeekBar={true}
                  style={{ width: "100%", height: 200 }}
                  onError={(e) => console.log(e)}
                  onChangeState={(e) => console.log(e)}
                  onChangeFullScreen={(e) => console.log(e)}
                />
              </Neomorph>
            </View>

            {/* ***************************************************** */}
            <View style={styles.cardDesigns}>
              <Neomorph
                // lightShadowColor="#D0E6A5"
                // darkShadowColor="#D0E6A5" // <- set this
                swapShadows
                style={styles.menuItems}
              >
                <YoutubePlayer
                  videoId={"g_tea8ZNk5A"}
                  autoPlay={false}
                  fullscreen={false}
                  showfullscreenButton={true}
                  showSeekBar={true}
                  style={{ width: "100%", height: 200 }}
                  onError={(e) => console.log(e)}
                  onChangeState={(e) => console.log(e)}
                  onChangeFullScreen={(e) => console.log(e)}
                />
              </Neomorph>
            </View>

            {/* ***************************************************** */}
            <View style={styles.cardDesigns}>
              <Neomorph
                // lightShadowColor="#D0E6A5"
                // darkShadowColor="#D0E6A5" // <- set this
                swapShadows
                style={styles.menuItems}
              >
                <YoutubePlayer
                  videoId={"jAw5tmQJECI"}
                  autoPlay={false}
                  fullscreen={false}
                  showfullscreenButton={true}
                  showSeekBar={true}
                  //startTime={2}
                  style={{ width: "100%", height: 200 }}
                  onError={(e) => console.log(e)}
                  onChangeState={(e) => console.log(e)}
                  onChangeFullScreen={(e) => console.log(e)}
                />
              </Neomorph>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Abs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily: Colors.fontFamily,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "times new Roman",
    marginTop: 10,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#5f9ea0",
    paddingBottom: 5,
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 60,
    marginLeft: 50,
    justifyContent: "center",
  },
  login: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
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
    height: perfectSize(280),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    borderColor: Colors.defaultDark,
    borderRadius: 23,
  },
  menuItemsSnacks: {
    height: perfectSize(120),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
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
  cardDesigns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: perfectSize(40),
  },
});
