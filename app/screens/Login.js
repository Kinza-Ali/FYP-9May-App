import React, { useState, useEffect } from "react";
import notification, {
  handleScheduleNotification,
} from "../../src/notification.ios";
import * as Animatable from "react-native-animatable";
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from "@react-native-community/async-storage";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import App from "../../App";
export default function Login({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState([]);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [checkTextInputChange, setcheckTextInputChange] = useState(false);
  // const [isAdmin, setAdmin] = useState(false);
  const saveData = async () => {
    try {
      await asyncStorage.setItem("isAdmin", "true");
      // await asyncStorage.setItem('loggedIn', 'true');
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };
  const logIn = async () => {
    try {
      await asyncStorage.setItem("loggedIn", "true");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  //------------ Google Sign-In Configuration

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"],
      webClientId:
        "111595640287-rd4lobg73o37ljn63qb92pvo6hl9h5o8.apps.googleusercontent.com",
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  //--------------- Sign In with email and password auth ----------------------
  signInUser = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account signed in!");
        firestore()
          .collection("Users")
          .where("email", "==", email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((docSnap) => {
              //setAdmin(true);
              // console.log(docSnap.data().role);
              if (docSnap.data().role == "admin") {
                navigation.navigate("AdminScreen");
                // setAdmin(true);
                saveData();
              } else {
                navigation.navigate("HomeScreen");
              }
            });
          });
        //----------------------------------
        auth()
          .currentUser.updateProfile({
            displayName: auth().currentUser.displayName.trim(),
          })
          .then(() => {
            // console.log(auth().currentUser);
          });
        // handleScheduleNotification();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("That email address or password is invalid!");
          console.log("That email address is invalid!");
        }
        console.error(error);
        alert(error);
      });
    logIn();
    setLoggedIn(true);
    loggedIn ? <App /> : undefined;
  };
  //--------------- Google Sign In -------
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();

      setLoggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(credential);
      navigation.navigate("HomeScreen");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("cancel");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in Progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services not available");
      }
    }
  };
  //--------------- ON Auth State Change ----------------------
  function onAuthStateChanged(user) {
    setUser(auth().currentUser);
    // console.log(user);
    if (user) {
      setLoggedIn(true);
    }
  }

  //-----------  Sign Out ---------------
  signOut = async () => {
    try {
      await auth()
        .signOut()
        .then(() => alert("You are signed Out! "));
      console.log("signOut");
      setLoggedIn(false);
      setPassword(null);
      console.log("------------------------");
      console.log(password);
      setEmail("");
      // setUserName(null);
      navigation.navigate("Login");
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  };
  //--------- Email Text Input -------------
  const textInputchange = (email) => {
    if (email.length != 0) {
      setEmail(email), setcheckTextInputChange(true);
    } else {
      setcheckTextInputChange(false);
    }
  };

  // ---------- Password input Field ---
  const handllePasswordChange = (password) => {
    setPassword(password);
  };
  const UpdateSecureTextEntry = () => {
    console.log("function called");
    if (secureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
    // setData({
    //   ...data,
    //   secureTextEntry: !data.secureTextEntry,
    // });
  };
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#5f9ea0" barStyle="Light-content" /> */}
      <ImageBackground
        source={require("../assets/images/berriesSmoll.jpg")}
        style={styles.image}
      >
        <View style={styles.header}></View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.textfooter}>Email</Text>
          <View style={styles.action}>
            <FontAwesomeIcons name="user-o" color="black" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => textInputchange(email)}
            />
            {checkTextInputChange ? (
              <Feather name="check-circle" color="blue" size={20} />
            ) : null}
          </View>
          <Text style={[styles.textfooter, { marginTop: 35 }]}> Password</Text>
          <View style={styles.action}>
            <FontAwesomeIcons name="lock" color="black" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(password) => handllePasswordChange(password)}
            />
            <TouchableOpacity onPress={UpdateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="blue" size={20} />
              ) : (
                <Feather name="eye" color="blue" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={
                this.signInUser
                // handleScheduleNotification()
              }
            >
              <LinearGradient
                colors={["#484C7F", "#484C7F"]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "white" }]}>
                  {" "}
                  LOGIN{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[styles.signUp, { borderColor: "#5f9ea0", marginTop: 2 }]}
            >
              <LinearGradient
                colors={["#EEEEEE", "#EEEEEE"]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  {" "}
                  Not a registered User?SIGN UP
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomePage")}
              style={[{ borderColor: "#5f9ea0", borderWidth: 0, marginTop: 0 }]}
            >
              <LinearGradient
                colors={["#484C7F", "#484C7F"]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "white" }]}>
                  {" "}
                  Continue without LOGIN{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
    // opacity: 0.8,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    // opacity: 0.6,
  },

  footer: {
    flex: 3,
    backgroundColor: "#EEEEEE",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
    // opacity: 0.4,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "times new Roman",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
    fontFamily: "IowanOldStyle-Roman",
  },
  action: {
    flexDirection: "row",
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#484C7F",
    paddingBottom: 10,
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    paddingBottom: 10,
    color: "black",
    fontFamily: "IowanOldStyle-Roman",
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
    marginBottom: 5,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "IowanOldStyle-Roman",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
