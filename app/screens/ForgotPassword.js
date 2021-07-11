import React, {useState} from 'react';
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
  Modal,
  Pressable,
} from 'react-native';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import Feather from "react-native-vector-icons/Feather";


export default function ForgotPassword({navigation}) {

const [email, setEmail]= useState("");

//------------ Forgot Pasword ----
  const forgotPassword =() => {
    auth().sendPasswordResetEmail(email)
    .then((user)=>{
      alert("please check your email!")
    })
    .catch((error)=>{
      alert(error.message);
    })
  };


    return (
        <View style={styles.container}>
        
        <View style={{marginTop:40, marginLeft:20}}>
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
          </View>

                    {/* +++++++++++++++++++++++++++++++++ */}

          <View style={{marginTop:40}}> 

          <View style={styles.drawerHeader}>
              <Text
              style={{
              color: Colors.defaultDark,
              fontWeight: "bold",
              fontFamily: Colors.fontFamily,
              fontSize: 25,
            }}
              >Forgot Password</Text>
          </View>

          {/* +++++++++++++++++++++++++++++++++ */}

        <Text style={styles.textfooter}>Email</Text>
        <View style={styles.cardDesigns}>
          <Neomorph
            swapShadows
            style={styles.menuItems}
          >
            <View>
              <View style={styles.action}>
                <FontAwesomeIcons
                  name="envelope"
                  color="black"
                  size={20}
                  style={{ marginTop: 12, paddingLeft: 12 }}
                />
                <TextInput
                  value={email}
                  placeholder="Enter Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(email) =>setEmail(email)}
                /> 
              </View>
            </View>
          </Neomorph>
        </View>

        <View style={{marginTop:20}}>
        <TouchableOpacity  onPress={forgotPassword}>
        <LinearGradient
          colors={[Colors.lilac, Colors.lilac]}
          style={styles.login}
        >
          <Text style={[styles.textSign, { color: "#484C7F" }]}>
            {" "}
            Submit{" "}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
        </View>
      </View>
      </View>
    )
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.containerBg,
      fontFamily: Colors.fontFamily,
    },
    header: {
      flex: 5,
      justifyContent: "flex-end",
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
    footer: {
      flex: 8,
      backgroundColor: "white",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
      paddingHorizontal: 25,
      paddingVertical: 30,
    },
    textheader: {
      color: "white",
      fontWeight: "bold",
      fontSize: 30,
      fontFamily: "IowanOldStyle-Roman",
    },
    textfooter: {
      color: "black",
      fontSize: 18,
      marginTop: 30,
      marginBottom: 5,
      fontFamily: "IowanOldStyle-Roman",
      alignSelf: "flex-start",
      paddingLeft: 45,
      justifyContent: "space-between",
    },
    action: {
      flexDirection: "row",
      // marginTop: 5,
      // borderBottomWidth: 1,
      // borderBottomColor: "#484C7F",
      paddingBottom: 2,
      // paddingTop:40,
      alignSelf: "center",
      justifyContent: "space-evenly",
    },
    textInput: {
      flex: 1,
      paddingLeft: 10,
      color: "black",
      marginTop: 12,
      paddingBottom: 10,
      fontFamily: Colors.fontFamily,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      // marginTop: 30,
    },
    login: {
      width: "60%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      // paddingLeft:20,
      // paddingRight:20,
      borderRadius: 25,
      // marginTop: 20,
      // marginBottom: 5,
      // marginLeft:30
    },
    modalButton: {
      width: "100%",
      height: 55,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    selectButton: {
      width: "100%",
      height: 30,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    textSign: {
      fontSize: 18,
      fontWeight: "bold",
      fontFamily: "IowanOldStyle-Roman",
      marginTop: 0,
    },
    picker: {
      // height: 105,
      width: 300,
      // borderColor: "grey",
      // borderWidth: 3,
    },
  
    cardDesigns: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: perfectSize(8),
      // borderWidth:1
    },
    menuItems: {
      height: perfectSize(65),
      width: perfectSize(380),
      backgroundColor: Colors.containerBg,
      shadowRadius: 6,
      borderRadius: 23,
      // alignItems: 'center',
      borderColor: Colors.defaultDark,
      borderRadius: 23,
      borderWidth: 1,
    },
  
    // // NEW................................................
  
    drawerHeader: {
      // height: perfectSize(50),
      // width: '100%',
      marginTop: perfectSize(50),
      flexDirection: "row",
      alignItems: "center",
      // alignSelf:'center',
      // paddingLeft:100,
      justifyContent: "space-evenly",
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
  });
  