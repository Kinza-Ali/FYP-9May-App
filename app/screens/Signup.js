/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from "@react-native-community/async-storage";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
// import {NavigationContainer} from '@react-navigation/native';
export default function SignUp({ navigation }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkTextInputChange, setcheckTextInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [role, setRole] = useState(false);
  const [emptyField, setEmptyField] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [BMI, setBMI] = useState();
  const [IBF, setIBF] = useState();
  const [IBW, setIBW] = useState();
  const [BMR, setBMR] = useState();
  const [WaterIntake, setWaterIntake] = useState();
  const [heightValid, setHeightValid] = useState("");
  const [weightValid, setWeightValid] = useState("");
  //------------  Sign-In Configuration
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  //----------Email and Password authentication with firebase

  createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User account created & signed in!");

        // eslint-disable-next-line prettier/prettier
        auth()
          .currentUser.updateProfile({ displayName: userName.trim() })
          .then(() => {
            console.log(auth().currentUser);
          });

        navigation.navigate("HomeScreen");

        var value = this.formula(gender);
        // console.log(BMI + "BMI");
        //---------- firetstore collection
        firestore().collection("Users").add({
          // token: auth().currentUser.accessToken,
          uid: auth().currentUser.uid,
          name: userName,
          email: email,
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
        });
        // this.formula();
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
          console.log("That email address is invalid!");
        }
        console.error(error);
      });
    setLoggedIn(true);
  };

  //-------------------------------------
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      setLoggedIn(true);
    }
  }

  //----------- Google Sign Out ---------------
  signOut = async () => {
    try {
      auth()
        .signOut()
        .then(() => alert("You are signed Out! "));
      console.log("signOut");
      setLoggedIn(false);
    } catch (error) {
      alert(error);
    }
    setUserName(null);
  };
  //--------- Email Text Input -------------
  const textInputchange = (email) => {
    if (email.length != 0) {
      setEmail(email), setcheckTextInputChange(true);
    } else {
      setcheckTextInputChange(false);
    }
  };
  // ------- Display User Name -----------
  const displayName = (username) => {
    if (username.length !== 0) {
      setUserName(username);
    }
  };
  // ---------- Password input Field ---
  const handllePasswordChange = (password) => {
    setPassword(password);
  };
  // ---------- Confirm Password input Field ---
  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };
  //-------- Update Security Text Entry -----
  const UpdateSecureTextEntry = () => {
    if (secureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  };
  const UpdateConfirmSecureTextEntry = () => {
    setConfirmSecureTextEntry(false);
  };
  // ------ Empty Field Check ----
  const emptyFieldVlidator = (value) => {
    if (value == "") {
      setEmptyField("*");
    } else {
      setEmptyField(" ");
    }
  };
  //---- register -------
  const onRegister = () => {
    console.log;
    let regx = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    let eregx = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    let numregx = /^[0-9]+$/;
    // let nregx = /^[0-9]+$/;
    let heightregx = /\d+(\.\d{1})/;
    let isValid = regx.test(userName);

    let emailValid = eregx.test(email);
    let weightValid = numregx.test(weight);
    let heightValid = heightregx.test(height);
    if (!isValid) {
      setNameError("Name Must be alphabets and should be Full name");
    } else if (!emailValid) {
      setEmailError("Enter Correct Email");
    } else if (password.length < 8) {
      setPasswordError("Pasword must be 8 character long");
    } else if (age < 18) {
      setAgeError("Age must be greater than 18");
    } else if (!weightValid) {
      setWeightValid("Enter numbers only");
    } else if (!heightValid) {
      setHeightValid("Enet height in feet and inches");
    } else {
      this.createUser();
    }
  };
  // const [pickerValue, setPickerValue] = useState();
  //--------------- Formulae Calculation ------------
  formula = (gender) => {
    // // console.log(this.state.prediction.diabetesType);
    // console.log(gender);
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
  // -------- Save Data ---------------------------
  saveData = async () => {
    try {
      await asyncStorage.setItem("name", userName);
      await asyncStorage.setItem("gender", gender);
      await asyncStorage.setItem("age", age);
      await asyncStorage.setItem("height", height);
      await asyncStorage.setItem("weight", weight);
      await asyncStorage.setItem("BMI", JSON.stringify(BMI));
      // await asyncStorage.setItem(
      //   "calorieCount",
      //   JSON.stringify(this.state.calorieCount)
      // );
      console.log(JSON.stringify(calorieCount));
      await asyncStorage.setItem("IBF", JSON.stringify(IBF));
      await asyncStorage.setItem("IBW", JSON.stringify(IBW));
      await asyncStorage.setItem("WaterIntake", JSON.stringify(WaterIntake));
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  //-------------------------------------------------
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 40,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                paddingRight: 160,
                fontFamily: "IowanOldStyle-Roman",
              }}
            >
              SignUp
            </Text>
          </View>
          <ScrollView>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              <Text style={styles.textfooter}> Full Name </Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="user-circle" color="black" size={25} />
                <TextInput
                  placeholder="Jane Doe"
                  style={styles.textInput}
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(username) => displayName(username)}
                  onBlur={() => emptyFieldVlidator(userName)}
                />
                <Text style={{ color: "red" }}> {emptyField} </Text>
              </View>
              <Text style={{ color: "red" }}> {nameError}</Text>
              <Text style={styles.textfooter}>Email</Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="user-o" color="black" size={25} />
                <TextInput
                  placeholder="xyz@xyz.com"
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(email) => textInputchange(email)}
                  onBlur={() => emptyFieldVlidator(email)}
                />
                <Text style={{ color: "red" }}> {emptyField} </Text>
                {checkTextInputChange ? (
                  <Feather name="check-circle" color="blue" size={25} />
                ) : null}
              </View>
              <Text style={{ color: "red" }}> {emailError}</Text>
              <Text style={styles.textfooter}> Age </Text>
              <View style={styles.action}>
                <FontAwesomeIcons
                  name="calendar-check-o"
                  color="black"
                  size={25}
                />
                <TextInput
                  placeholder="Your Age"
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
                <Text style={{ color: "red" }}> {emptyField} </Text>
              </View>
              <Text style={{ color: "red" }}> {ageError}</Text>
              <Text style={styles.textfooter}> Weight </Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="smile-o" color="black" size={25} />

                <TextInput
                  placeholder="Your Weight In KG"
                  style={styles.textInput}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  onChangeText={(weight) => {
                    setWeight(weight);
                  }}
                  onBlur={() => emptyFieldVlidator(weight)}
                />
                <Text style={{ color: "red" }}> {emptyField} </Text>
              </View>
              <Text style={{ color: "red" }}> {weightValid} </Text>
              <Text style={styles.textfooter}> Height </Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="street-view" color="black" size={25} />

                <TextInput
                  placeholder="5.3"
                  keyboardType="numeric"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={setHeight}
                  onBlur={() => emptyFieldVlidator(height)}
                />
                <Text style={{ color: "red" }}> {emptyField} </Text>
              </View>
              <Text style={{ color: "red" }}> {heightValid} </Text>
              <Text style={styles.textfooter}> Gender </Text>
              <Text style={styles.textfooter}> {gender} </Text>
              <View style={styles.button}>
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <LinearGradient
                    colors={["#B9BBDF", "#B9BBDF"]}
                    style={styles.selectButton}
                  >
                    <Text style={[styles.textSign, { color: "black" }]}>
                      {" "}
                      Select{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <Modal visible={showModal} transparent={false}>
                <View style={{ width: "80%", height: "30%", paddingLeft: 40 }}>
                  <Picker
                    style={styles.picker}
                    // style={{ height: 10, width: 300 }}
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                  >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
                {/* <Pressable onPress={() => setShowModal(false)}>
                  <Text style>Submit</Text>
                </Pressable> */}
                <View style={styles.button}>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <LinearGradient
                      colors={["#484C7F", "#484C7F"]}
                      style={styles.modalButton}
                    >
                      <Text style={[styles.textSign, { color: "white" }]}>
                        {" "}
                        Submit{" "}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Modal>
              <Text style={[styles.textfooter, { marginTop: 20 }]}>
                {" "}
                Password
              </Text>

              <View style={styles.action}>
                <FontAwesomeIcons name="lock" color="black" size={25} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  // eslint-disable-next-line no-shadow
                  onChangeText={(password) => handllePasswordChange(password)}
                  onBlur={() => emptyFieldVlidator(password)}
                />
                <Text style={{ color: "red" }}> {emptyField} </Text>
                <TouchableOpacity onPress={UpdateSecureTextEntry}>
                  {secureTextEntry ? (
                    <Feather name="eye-off" color="blue" size={20} />
                  ) : (
                    <Feather name="eye" color="blue" size={20} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={{ color: "red" }}> {passwordError} </Text>
              <View style={styles.Button}>
                <TouchableOpacity onPress={onRegister}>
                  <LinearGradient
                    colors={["#484C7F", "#484C7F"]}
                    style={styles.login}
                  >
                    <Text style={[styles.textSign, { color: "white" }]}>
                      {" "}
                      REGISTER{" "}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[
                    styles.signUp,
                    { borderColor: "#5f9ea0", marginTop: 2 },
                  ]}
                >
                  <Text
                    style={[styles.textSign, { color: "black", marginTop: 10 }]}
                  >
                    {" "}
                    Already a Registered User?LOGIN
                  </Text>
                </TouchableOpacity>
              </View>
            </Animatable.View>

            {/* </View> */}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
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
    marginTop: 5,
    fontFamily: "IowanOldStyle-Roman",
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#484C7F",
    paddingBottom: 2,
    // paddingTop:40,
    alignSelf: "center",
  },
  textInput: {
    flex: 1,
    fontFamily: "IowanOldStyle-Roman",

    //height: Platform.OS === 'android' ? 76 : 50,

    paddingLeft: 10,
    color: "black",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    // marginTop: 30,
  },
  login: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
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
});
