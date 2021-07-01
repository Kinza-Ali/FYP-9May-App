import React from "react";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
const Workouts = ({ navigation }) => {
  return (
    <View>
      {/* <View style={{ marginTop:20, backgroundColor:'#484C7F',height:33}} >
    <TouchableOpacity title ="ChatBot" onPress = {()=> navigation.goBack()
      
    }>
    <FontAwesomeIcons name="chevron-left" color="black" size={20} style={{marginTop:7}}/>
    </TouchableOpacity>
    </View>  */}
      <ScrollView>
        <View style={styles.container}>
          {/* <StatusBar backgroundColor ='#484C7F' barStyle="Light-content"/> */}
          <View style={styles.header}>
            <Text style={styles.textheader}> Pick your Today's Workout</Text>
          </View>
          <View style={styles.footer}>
            <ScrollView contentContainerStyle={{ alignSelf: "center" }}>
              <View style={styles.Button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FullBody")}
                >
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/full.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Full body{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity onPress={() => navigation.navigate("Arms")}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/arm.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Arm's Workout{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity onPress={() => navigation.navigate("Abs")}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/abs.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Abs Workout{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity onPress={() => navigation.navigate("Legs")}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/legs.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Leg's Workout{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Shoulders")}
                >
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/shoulder.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Shoulder's Workout{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity onPress={() => navigation.navigate("Facial")}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/face.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Facial Workouts{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={styles.Button}>
                <TouchableOpacity onPress={() => navigation.navigate("WarmUp")}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require("../assets/images/warmup.png")}
                    />
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      Warm Up{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Workouts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  footer: {
    flex: 3,
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
    marginTop: 40,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
    fontFamily: "IowanOldStyle-Roman",
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
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 70,
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
});
