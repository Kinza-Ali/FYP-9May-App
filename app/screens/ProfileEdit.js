import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import Feather from "react-native-vector-icons/Feather";
import firestore from "@react-native-firebase/firestore";
import { error } from "react-native-gifted-chat/lib/utils";

export default function ProfileEdit({ navigation }) {
  const [newPasswrord, setNewPassword] = useState("");
  const [currentPasswrord, setCurrentPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);

  onChangePassword = () => {
    this.reauthenticate(currentPasswrord)
      .then(() => {
        var user = auth().currentUser;
        user
          .updatePassword(newPasswrord)
          .then(() => {
            alert("Password is changed!");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  reauthenticate = (currentPasswrord) => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(user.email, currentPasswrord);
    return user.reauthenticateWithCredential(cred);
  };

  const UpdateSecureTextEntry = () => {
    if (secureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  };

  const UpdateSecureTextEntry1 = () => {
    if (secureTextEntry1) {
      setSecureTextEntry1(false);
    } else {
      setSecureTextEntry1(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* ************************************ DRAWER HEADER!!!!!  ************************** */}

      <View style={styles.drawerHeader}>
        <View
          style={
            {
              // paddingRight: 50
            }
          }
        >
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <FontAwesome name="arrow-left" size={20} color="black" />
            </TouchableOpacity>
          </Neomorph>
        </View>
        <Text
          style={{
            color: Colors.defaultDark,
            fontWeight: "bold",
            fontFamily: Colors.fontFamily,
            paddingRight: 50,
            fontSize: 25,
          }}
        >
          {" "}
          Update Password
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textfooter}>Current Password</Text>
          <View style={styles.cardDesigns}>
            <Neomorph swapShadows style={styles.menuItems}>
              <View>
                <View style={styles.action}>
                  <FontAwesomeIcons
                    name="lock"
                    color="black"
                    size={20}
                    style={{ marginTop: 12, paddingLeft: 12 }}
                  />
                  <TextInput
                    value={currentPasswrord}
                    placeholder="Enter Your Current Password"
                    secureTextEntry={secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(password) => setCurrentPassword(password)}
                  />
                  <TouchableOpacity onPress={UpdateSecureTextEntry}>
                    {secureTextEntry ? (
                      <Feather
                        name="eye-off"
                        color="blue"
                        size={20}
                        style={{ paddingRight: 20, marginTop: 15 }}
                      />
                    ) : (
                      <Feather
                        name="eye"
                        color="blue"
                        size={20}
                        style={{ paddingRight: 20, marginTop: 15 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Neomorph>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.textfooter}>New Password</Text>
          <View style={styles.cardDesigns}>
            <Neomorph swapShadows style={styles.menuItems}>
              <View>
                <View style={styles.action}>
                  <FontAwesomeIcons
                    name="lock"
                    color="black"
                    size={20}
                    style={{ marginTop: 12, paddingLeft: 12 }}
                  />
                  <TextInput
                    value={newPasswrord}
                    secureTextEntry={secureTextEntry1 ? true : false}
                    placeholder="Enter Your New Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(password) => setNewPassword(password)}
                  />
                  <TouchableOpacity onPress={UpdateSecureTextEntry1}>
                    {secureTextEntry1 ? (
                      <Feather
                        name="eye-off"
                        color="blue"
                        size={20}
                        style={{ paddingRight: 20, marginTop: 15 }}
                      />
                    ) : (
                      <Feather
                        name="eye"
                        color="blue"
                        size={20}
                        style={{ paddingRight: 20, marginTop: 15 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Neomorph>
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity onPress={this.onChangePassword}>
              <LinearGradient
                colors={[Colors.lilac, Colors.lilac]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  {" "}
                  Change Password{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
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
    // marginTop: 5,
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
