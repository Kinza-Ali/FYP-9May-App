/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import asyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";
// import auth from '@react-native-firebase/auth'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";

// import {NavigationContainer} from '@react-navigation/native';
export default function Trial({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [emptyField, setEmptyField] = useState("");
  const [ageError, setAgeError] = useState("");
  const [WaterIntake, setWaterIntake] = useState();
  const [heightValid, setHeightValid] = useState("");
  const [weightValid, setWeightValid] = useState("");
  const [checkedMale, setCheckedMale] = React.useState(false);
  const [checkedFemale, setCheckedFemale] = React.useState(false);
  const [googleUser, setGoogleUser] = useState(false);
  const [genderError, setGenderError] = useState("");
  //------------  Sign-In Configuration
  useEffect(() => {
    readData();
    console.log(googleUser);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });
  // --------- Read Data --------
  const readData = async () => {
    try {
      const googleUserVal = await asyncStorage.getItem("googleUser");
      setGoogleUser(googleUserVal);
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  //---------------Save data 
  const saveData = async () => {
    try {
      const profile = await asyncStorage.setItem("profile", 'true');
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  // ---------- ON Add profile ----
  addProfile = () => {
    var value = this.formula(gender);
    //---------- firetstore collection
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .set({
        uid: auth().currentUser.uid,
        name: auth().currentUser.displayName,
        email: auth().currentUser.email,
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        role: "user",
        BMI: value.BMI,
        IBF: value.IBF,
        IBW: value.IBW,
        BMR: value.BMR,
        WaterIntake: value.WaterIntake,
      })
      .then(() => {
        alert("Profile Updated! \n Please generate your New Diet Plan. ");
        setGoogleUser(false);
        saveData();
      })
      // this.formula();
      .catch((error) => {
        console.error(error);
      });
  };

  //----------Email and Password authentication with firebase

  const onUpdate = () => {
    var value = this.formula(gender);
    // console.log(BMI + "BMI");
    //---------- firetstore collection
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        BMI: value.BMI,
        IBF: value.IBF,
        IBW: value.IBW,
        BMR: value.BMR,
        WaterIntake: value.WaterIntake,
      })
      .then(() => {
        alert("Profile Updated! \n Please generate your New Diet Plan. ");
      })
      // this.formula();
      .catch((error) => {
        console.error(error);
      });
  };

  //-------------------------------------
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      setLoggedIn(true);
    }
  }

  // ------ Empty Field Check ----
  const emptyFieldVlidator = (value) => {
    if (value == "") {
      setEmptyField("*");
    } else {
      setEmptyField(" ");
    }
  };
  //---- register -------
  const onConfirm = () => {
    let numregx = /^[0-9]+$/;
    let heightregx = /\d+(\.\d{1})/;
    let weightValid = numregx.test(weight);
    let heightValid = heightregx.test(height);
    if (age < 18) {
      setAgeError("Age must be greater than 18");
    } else if (!weightValid) {
      setWeightValid("Enter numbers only");
    } else if (!heightValid) {
      setHeightValid("Enter height in feet and inches");
    } else if (gender == "") {
      setGenderError("Select your gender");
    } else {
      if (googleUser) {
        addProfile();
      } else {
        onUpdate();
      }
    }
  };

  //--------------- Formulae Calculation ------------
  formula = (gender) => {
    var heightFeet = height.split(".");
    var heightInch = height.split(".")[1];

    var heightInCm = Math.round(height * 30.48);

    var heightInM = heightInCm / 100;

    //............... BMI.......
    var BMI = Math.round(weight / (heightInM * heightInM), 2);

    // ........Water Intake.......
    let i = weight - 25;
    let j = i * 25;
    let k = j + 1500;
    var WaterIntake = Math.floor(k / 250);

    if (gender === "Female") {
      //IBF for Females (fat percentage).....
      var IBF = Math.round(1.2 * BMI + 0.23 * age - 5.4, 2);

      // for IBW
      if (heightFeet == 4) {
        var IBW = 45.5 - 2.3 * heightInch;
      } else if (heightFeet == 5) {
        IBW = 45.5 + 2.3 * heightInch;
      } else {
        IBW = 45.5 + 25.3 + 2.3 * heightInch;
      }
      // ......for BMR.......
      var BMR = Math.round(
        655.1 + 9.6 * IBW + 1.85 * heightInCm - 4.67 * age,
        2
      );
    }

    if (gender === "Male") {
      //IBF for Males (fat percentage):
      IBF = Math.round(1.2 * BMI + 0.23 * age - 16.2, 2);
      // .....for IBW....
      if (heightFeet == 4) IBW = 50 - 2.3 * heightInch;
      else if (heightFeet == 5) IBW = 50 + 2.3 * heightInch;
      else {
        IBW = 50 + 25.3 + 2.3 * heightInch;
      }
      // .....for BMR...
      BMR = Math.round(
        66.5 + 13.75 * IBW + 5.003 * heightInCm - 6.755 * age,
        2
      );
    }

    IBW = Math.round(IBW, 2);
    return { IBW, IBF, BMR, WaterIntake, BMI };
  };

  //-------------------------------------------------
  return (
    <View style={styles.container}>
      {/* ************************************ DRAWER HEADER!!!!!  ************************** */}

      <View style={styles.drawerHeader}>
        <View style={{ paddingRight: 50 }}>
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
            paddingRight: 80,
            fontSize: 25,
          }}
        >
          {" "}
          Update Profile
        </Text>
      </View>
      {/* ++++++++++++++++ BODY  +++++++++++++++++++++++++++ */}
      {googleUser ? (
        <ScrollView>
          <View style={{ marginTop: perfectSize(30) }}>
            {/* ************************* AGE *********************************** */}
            <View>
              <Text style={styles.textfooter}>Age</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="calendar-check-o"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="Enter Your Age"
                        keyboardType="numeric"
                        // type = "number"
                        min="18"
                        max="70"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(age) => {
                          setAge(age);
                        }}
                        onBlur={() => emptyFieldVlidator(age)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {ageError}
              </Text>
            </View>
            {/* ************************ WEIGHT ************************************ */}

            <View>
              <Text style={styles.textfooter}>Weight</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="smile-o"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="Enter Your Weight In KG"
                        style={styles.textInput}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(weight) => {
                          setWeight(weight);
                        }}
                        onBlur={() => emptyFieldVlidator(weight)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {weightValid}{" "}
              </Text>
            </View>
            {/* ************************ HEIGHT ************************************ */}

            <View>
              <Text style={styles.textfooter}>Height</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="street-view"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="5.3'"
                        keyboardType="numeric"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setHeight}
                        onBlur={() => emptyFieldVlidator(height)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {heightValid}{" "}
              </Text>
            </View>
            {/* ++++++++++++++++++++++++++++++ Gender +++++++++++++++++++++++++++++++ */}
            <View>
              <Text style={styles.textfooter}> Gender </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 10,
                  marginTop: 3,
                }}
              >
                <TouchableOpacity
                  title="Male"
                  onPress={() => {
                    setGender("Male");
                    setCheckedMale(true);
                    setCheckedFemale(false);
                    console.log(gender);
                  }}
                >
                  <View>
                    {checkedMale ? (
                      <FontAwesome
                        name="male"
                        style={{ color: Colors.redDotColor }}
                        size={30}
                      />
                    ) : (
                      <FontAwesome name="male" size={30} />
                    )}

                    <Text>Male</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  title="Female"
                  onPress={() => {
                    setGender("Female");
                    setCheckedFemale(true);
                    setCheckedMale(false);
                    console.log(gender);
                  }}
                >
                  <View>
                    {checkedFemale ? (
                      <FontAwesome
                        name="female"
                        style={{ color: Colors.redDotColor }}
                        size={30}
                      />
                    ) : (
                      <FontAwesome name="female" size={30} />
                    )}
                    <Text>Female</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {genderError}
              </Text>
            </View>
            {/* ************************* NEW PASSWORD *********************************** */}
            {/*       
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfileEdit")}
                  style={[
                    styles.signUp,
                    // { borderColor: "#5f9ea0" },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: Colors.defaultDark,
                        marginBottom: 20,
                        fontSize: 15,
                      },
                    ]}
                  >
                    {" "}
                    Update Password {""}
                    <FontAwesome name="arrow-right" size={16} color="#484C7F" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* *************************CONFIRM *********************************** */}
          </View>
          <View>
            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                colors={[Colors.lilac, Colors.lilac]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  Confirm
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={{ marginTop: perfectSize(30) }}>
            {/* ************************* AGE *********************************** */}
            <View>
              <Text style={styles.textfooter}>Age</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="calendar-check-o"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="Enter Your Age"
                        keyboardType="numeric"
                        // type = "number"
                        min="18"
                        max="70"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(age) => {
                          setAge(age);
                        }}
                        onBlur={() => emptyFieldVlidator(age)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {ageError}
              </Text>
            </View>
            {/* ************************ WEIGHT ************************************ */}

            <View>
              <Text style={styles.textfooter}>Weight</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="smile-o"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="Enter Your Weight In KG"
                        style={styles.textInput}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        onChangeText={(weight) => {
                          setWeight(weight);
                        }}
                        onBlur={() => emptyFieldVlidator(weight)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {weightValid}{" "}
              </Text>
            </View>
            {/* ************************ HEIGHT ************************************ */}

            <View>
              <Text style={styles.textfooter}>Height</Text>
              <View style={styles.cardDesigns}>
                <Neomorph
                  // lightShadowColor="#D0E6A5"
                  // darkShadowColor="#D0E6A5" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View>
                    <View style={styles.action}>
                      <FontAwesomeIcons
                        name="street-view"
                        color="black"
                        size={20}
                        style={{ marginTop: 12, paddingLeft: 12 }}
                      />
                      <TextInput
                        placeholder="5.3'"
                        keyboardType="numeric"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={setHeight}
                        onBlur={() => emptyFieldVlidator(height)}
                      />
                      <Text
                        style={{
                          color: "red",
                          paddingRight: 20,
                          marginTop: 20,
                        }}
                      >
                        {emptyField}{" "}
                      </Text>
                    </View>
                  </View>
                </Neomorph>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {heightValid}{" "}
              </Text>
            </View>
            {/* ++++++++++++++++++++++++++++++ Gender +++++++++++++++++++++++++++++++ */}
            <View>
              <Text style={styles.textfooter}> Gender </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 10,
                  marginTop: 3,
                }}
              >
                <TouchableOpacity
                  title="Male"
                  onPress={() => {
                    setGender("Male");
                    setCheckedMale(true);
                    setCheckedFemale(false);
                    console.log(gender);
                  }}
                >
                  <View>
                    {checkedMale ? (
                      <FontAwesome
                        name="male"
                        style={{ color: Colors.redDotColor }}
                        size={30}
                      />
                    ) : (
                      <FontAwesome name="male" size={30} />
                    )}

                    <Text>Male</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  title="Female"
                  onPress={() => {
                    setGender("Female");
                    setCheckedFemale(true);
                    setCheckedMale(false);
                    console.log(gender);
                  }}
                >
                  <View>
                    {checkedFemale ? (
                      <FontAwesome
                        name="female"
                        style={{ color: Colors.redDotColor }}
                        size={30}
                      />
                    ) : (
                      <FontAwesome name="female" size={30} />
                    )}
                    <Text>Female</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={{ color: "red", alignSelf: "center" }}>
                {" "}
                {genderError}
              </Text>
            </View>
            {/* ************************* NEW PASSWORD *********************************** */}

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfileEdit")}
                  style={[
                    styles.signUp,
                    // { borderColor: "#5f9ea0" },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: Colors.defaultDark,
                        marginBottom: 20,
                        fontSize: 15,
                      },
                    ]}
                  >
                    {" "}
                    Update Password {""}
                    <FontAwesome name="arrow-right" size={16} color="#484C7F" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* *************************CONFIRM *********************************** */}
          </View>
          <View>
            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                colors={[Colors.lilac, Colors.lilac]}
                style={styles.login}
              >
                <Text style={[styles.textSign, { color: "#484C7F" }]}>
                  Confirm
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
