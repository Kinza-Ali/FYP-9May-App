import React, { useState, useEffect } from "react";
import notification, {
  handleScheduleNotification,
} from "../../src/notification.ios";
import * as Animatable from "react-native-animatable";
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import { Neomorph } from 'react-native-neomorph-shadows';
import perfectSize from '../assets/themes/Screen';
import Colors from '../assets/themes/Colors';


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
                navigation.replace("AdminScreen");
                // setAdmin(true);
                saveData();
              } else {
                navigation.replace("UserScreens");
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

      <ImageBackground
        // source={require("../assets/images/berriesSmoll.jpg")}
        style={styles.image}
      >
      <View style={styles.drawerHeader}>
      <Text style={{
        color: Colors.defaultDark, 
                fontWeight: 'bold',
                fontFamily:Colors.fontFamily,
                // paddingRight:150,
                fontSize:25
                }}> Log In
                </Text>
        </View>

      <View style={{marginTop: perfectSize(30)}}>
          <View>
          <Text style={styles.textfooter}>Email</Text>
      <View style={styles.cardDesigns}>    
          <Neomorph 
          // lightShadowColor="#D0E6A5"
          // darkShadowColor="#D0E6A5" // <- set this
              swapShadows
              style={styles.menuItems}
          >
            <View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="black" size={20} 
              style={{marginTop:12, paddingLeft:12}}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => textInputchange(email)}
            />
            {checkTextInputChange ? (
              <Feather name="check-circle" color="blue" size={20} 
              style={{marginTop:13, paddingRight:12}}/>
            ) : null}
          </View>
          </View>
      </Neomorph>        
        </View>    
        </View> 

{/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

        <View>
          <Text style={styles.textfooter}>Password</Text>
      <View style={styles.cardDesigns}>    
          <Neomorph 
          // lightShadowColor="#D0E6A5"
          // darkShadowColor="#D0E6A5" // <- set this
              swapShadows
              style={styles.menuItems}
          >
            <View>
          <View style={styles.action}>
            <FontAwesome name="lock" color="black" size={20} 
              style={{marginTop:12, paddingLeft:12}}
            />
            <TextInput
              placeholder="Your Password"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => handllePasswordChange(password)}
            />
            <TouchableOpacity onPress={UpdateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="blue" size={20} 
                style={{marginTop:13, paddingRight:12}} />
              ) : (
                <Feather name="eye" color="blue" size={20}
                style={{marginTop:13, paddingRight:12}} />
              )}
            </TouchableOpacity>
          </View>

          </View>
      </Neomorph>        
        </View>    
        </View> 

        </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={
                this.signInUser
                // handleScheduleNotification()
              }
            >
              <LinearGradient
                colors={[Colors.lilac, Colors.lilac]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  {" "}
                  LOGIN{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

{/* ++++++++++++++++++++++++++++++++++++++++++ */}
              <Text 
              style={{
                flexDirection:'row',
            justifyContent:'space-between',
            alignSelf:'center',
            marginTop:30,
            color: "#484C7F",
            fontSize:16
            }}>
               or </Text>
         <View style={{
           flexDirection:'row',
            justifyContent:'space-between',
            alignSelf:'center',
            marginTop:20}}>
            
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={[styles.signUp, { borderColor: "#5f9ea0", marginTop: 2 }]}
            >
              {/* <LinearGradient
                colors={["#EEEEEE", "#EEEEEE"]}
                style={styles.login}
              > */}
              
              <Text style={[styles.textSign, { color: "#484C7F" }]}>         
                   Sign Up {" "}
                </Text>
              
              {/* </LinearGradient> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomePage")}
              style={[{ borderColor: "#5f9ea0", borderWidth: 0, marginTop: 0 }]}
            >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  
                | {" "}Continue without LOGIN
                </Text>
            </TouchableOpacity>
            </View>
          </View>
        {/* </Animatable.View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily:Colors.fontFamily
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
    fontFamily: Colors.fontFamily,
  },
  textfooter: {
    color: "black",
    fontSize: 18,
    fontFamily: Colors.fontFamily,
    paddingLeft:50,
    marginBottom:6
  },
  action: {
    flexDirection: "row",
    // marginTop: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: "#484C7F",
    paddingBottom: 10,
    justifyContent: 'space-evenly',
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    paddingBottom: 10,
    marginTop:12,
    color: "black",
    fontFamily: Colors.fontFamily,
  },
  button: {
    alignItems: "center",
    marginTop: 60,
    marginLeft: 50,
    justifyContent: "center",
  },
  login: {
    width: "85%",
    height: 53,
    // paddingLeft:20,
    alignSelf:'center',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 5,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Colors.fontFamily,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
cardDesigns: {
flexDirection: 'row', 
alignItems: 'center',
justifyContent: 'space-around',
marginBottom: perfectSize(20),
// borderWidth:1
},
menuItems: {
  height: perfectSize(65),
  width: perfectSize(380),
  backgroundColor: Colors.containerBg,
  shadowRadius: 6,
  borderRadius: 23,
  // alignItems: 'center',
  borderColor:Colors.defaultDark,
  borderRadius: 23,
  borderWidth:1
},

// // NEW................................................
  
drawerHeader: {
  height: perfectSize(50),
  width: '100%',
  marginTop: perfectSize(130),
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf:'center',
  // paddingLeft:100,
  justifyContent: 'center'
},

});
