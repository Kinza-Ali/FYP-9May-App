import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Start = ({ navigation }) => {
  // const { colors } = useTheme();
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
      <ImageBackground
        source={require("../assets/images/berries.jpg")}
        style={styles.image}
      >
        <Animatable.View style={styles.header}>
          {/* <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require("../assets/images/orange.jpg")}
            style={styles.logo}
            resizeMode="stretch"
            animation="fadeInUpBig"
          /> */}
        </Animatable.View>
        <Animatable.View
          // style={[
          //   styles.footer,
          //   {
          //     backgroundColor: "F6E5E5",
          //   },
          // ]}
          animation="fadeInUpBig"
        >
          <Text
            style={[
              styles.title,
              {
                color: "black",
                marginLeft: 20,
                marginTop: 60,
              },
            ]}
          >
            Welcome to Health & Nutrition!
          </Text>
          {/* <Text style={styles.text}>Sign in with account</Text> */}
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <LinearGradient
                colors={["#B9BBDF", "#B9BBDF"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="black" size={20} />
                {/* <FontAwesomeIcons name="chevrons-right" color="black" size={25} /> */}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

export default Start;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F6",
    opacity: 0.9,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#F6E5E5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    marginTop: 2,
    marginLeft: 5,
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    // marginTop: 10,
    paddingBottom: 260,
    // padding: 20,

    paddingLeft: 30,
    paddingRight: 40,
    justifyContent: "center",
    fontFamily: Colors.fontFamily,
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    // marginTop: 280,
    paddingTop: 15,
    marginBottom: 120,
    paddingRight: 20,
    opacity: 0.9,
  },
  signIn: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // opacity:1
  },
  textSign: {
    color: "black",
    fontWeight: "bold",
    fontFamily: Colors.fontFamily,
  },
});
