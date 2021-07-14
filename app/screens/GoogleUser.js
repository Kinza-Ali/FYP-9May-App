import React, { useState, useEffect } from "react";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import asyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
export default function GoogleUser({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("Male");
  const [emptyField, setEmptyField] = useState("");
  const [ageError, setAgeError] = useState("");
  const [heightValid, setHeightValid] = useState("");
  const [weightValid, setWeightValid] = useState("");
  const [checkedMale, setCheckedMale] = React.useState(false);
  const [checkedFemale, setCheckedFemale] = React.useState(false);
  //------------  Sign-In Configuration
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  //----------Email and Password authentication with firebase

  addProfile = () => {
    var value = this.formula(gender);
    //---------- firetstore collection
    firestore().collection("Users").doc(auth().currentUser.uid).set({
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
    });
    this.saveData();
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
  const onRegister = () => {
    console.log;
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
    } else {
      this.addProfile();
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
  // -------- Save Data ---------------------------
  saveData = async () => {
    try {
      await asyncStorage.setItem("profile", "true");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
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
            paddingRight: 110,
            fontSize: 25,
          }}
        >
          {" "}
          Add Profile
        </Text>
      </View>
      {/* ++++++++++++++++ BODY  +++++++++++++++++++++++++++ */}
      <ScrollView>
        <View style={{ marginTop: perfectSize(30) }}>
          {/* ************************************************************ */}
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
                    <Text
                      style={{ color: "red", paddingRight: 20, marginTop: 20 }}
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
          {/* ************************************************************ */}

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
                      placeholder="Your Weight In KG"
                      style={styles.textInput}
                      keyboardType="numeric"
                      autoCapitalize="none"
                      onChangeText={(weight) => {
                        setWeight(weight);
                      }}
                      onBlur={() => emptyFieldVlidator(weight)}
                    />
                    <Text
                      style={{ color: "red", paddingRight: 20, marginTop: 20 }}
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
          {/* ************************************************************ */}

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
                      style={{ color: "red", paddingRight: 20, marginTop: 20 }}
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
          {/* ************************************************************ */}
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
          </View>
          {/* ************************************************************ */}
        </View>
        <View>
          <TouchableOpacity onPress={onRegister}>
            <LinearGradient
              colors={[Colors.lilac, Colors.lilac]}
              style={styles.login}
            >
              <Text style={[styles.textSign, { color: "#484C7F" }]}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 5,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "flex-start",
    paddingLeft: 45,
    justifyContent: "space-between",
  },
  action: {
    flexDirection: "row",
    paddingBottom: 2,
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
  },
  login: {
    width: "80%",
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
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
    width: 300,
  },

  cardDesigns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: perfectSize(8),
  },
  menuItems: {
    height: perfectSize(65),
    width: perfectSize(380),
    backgroundColor: Colors.containerBg,
    shadowRadius: 6,
    borderRadius: 23,
    borderColor: Colors.defaultDark,
    borderRadius: 23,
    borderWidth: 1,
  },

  // // NEW................................................

  drawerHeader: {
    marginTop: perfectSize(50),
    flexDirection: "row",
    alignItems: "center",
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
