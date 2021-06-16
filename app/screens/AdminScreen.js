import React, { useState, useEffect } from "react";
import {
  // FontAwesomeIcons,
  // Feather,
  LinearGradient,
  auth,
  asyncStorage,
} from "../../Setup";
// import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";
// import LinearGradient from 'react-native-linear-gradient';
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
// import {NavigationContainer} from '@react-navigation/native';

const AdminScreen = ({ navigation }) => {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [userName, setUserName] = useState([]);

  const clearStorage = async () => {
    try {
      await asyncStorage.clear();
      // alert('Storage successfully cleared!');
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  //----------- Google Sign Out -----------
  signOut = async () => {
    try {
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => alert("You are signed Out! "));
      console.log("signOut");
      clearStorage();

      // setLoggedIn(false);
    } catch (error) {
      alert(error);
    }
    // setUserName(null);
    navigation.navigate("Login");
    // setVerify(false);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <StatusBar backgroundColor="#5f9ea0" barStyle="Light-content" /> */}
        <View style={styles.header}>
          <Text style={styles.textheader}>Welcome to Health & Nutrition!</Text>
        </View>
        <View style={styles.footer}>
          <ScrollView contentContainerStyle={{ alignSelf: "center" }}>
            <View style={styles.Button}>
              <TouchableOpacity onPress={() => navigation.navigate("Blogs")}>
                <LinearGradient
                  colors={["#5f9ea0", "#5f9ea0"]}
                  style={styles.login}
                >
                  <Image source={require("../assets/images/blogs.png")} />
                  <Text style={[styles.textSign, { color: "white" }]}>
                    {" "}
                    Blogs{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.Button}>
              <TouchableOpacity onPress={() => navigation.navigate("Recipes")}>
                <LinearGradient
                  colors={["#5f9ea0", "#5f9ea0"]}
                  style={styles.login}
                >
                  <Image source={require("../assets/images/recepie.png")} />
                  <Text style={[styles.textSign, { color: "white" }]}>
                    {" "}
                    Recipes{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.Button}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SuccessStories")}
              >
                <LinearGradient
                  colors={["#5f9ea0", "#5f9ea0"]}
                  style={styles.login}
                >
                  <Image
                    style={styles.image}
                    source={require("../assets/images/note-book.png")}
                  />
                  <Text style={[styles.textSign, { color: "white" }]}>
                    {" "}
                    Success Stories{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.Button}>
              <TouchableOpacity onPress={this.signOut}>
                <LinearGradient
                  colors={["#5f9ea0", "#5f9ea0"]}
                  style={styles.login}
                >
                  {/* <Image
                  source={require('../assets/images/logout.png')} 
                  /> */}
                  <Text style={[styles.textSign, { color: "white" }]}>
                    {" "}
                    Log Out{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
export default AdminScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f9ea0",
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
    //height: Platform.OS === 'android' ? 76 : 50,
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
});
