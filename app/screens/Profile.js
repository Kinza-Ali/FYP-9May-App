import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import asyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Breakfast from "./Breakfast";
import { LinearGradient } from "../../Setup";
import Card from "../assets/Card";

class Profile extends Component {
  state = {
    user: {
      name: "",
      age: "",
      weight: "",
      height: "",
      gender: "",
      email: "",
      BMI: "",
      IBF: "",
      IBW: "",
      BMR: "",
      WaterIntake: "",
    },
    BMI: 0,
    IBF: 0,
    calorieCount: 0,
    IBW: 0,
    BMR: 0,
    WaterIntake: 0,
    userStatus: "",
    prediction: {},
    Breakfast: {},
    Dinner: {},
    Lunch: {},
    Snacks: {},
    completeDietPlan: [],
    dietPlan: {},
    finalDietPlan: "",
  };
  readData = async () => {
    try {
      const predict = await asyncStorage.getItem("prediction");
      const calorie = await asyncStorage.getItem("calorieCount");
      this.setState({
        prediction: JSON.parse(predict),
        calorieCount: JSON.parse(calorie),
      });
      // console.log("=======");
      // console.log(this.state.prediction);
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  saveData = async () => {
    try {
      await asyncStorage.setItem("name", this.state.user.name);
      await asyncStorage.setItem("gender", this.state.user.gender);
      await asyncStorage.setItem("age", this.state.user.age);
      await asyncStorage.setItem("height", this.state.user.height);
      await asyncStorage.setItem("weight", this.state.user.weight);
      await asyncStorage.setItem("BMI", JSON.stringify(this.state.BMI));
      await asyncStorage.setItem(
        "calorieCount",
        JSON.stringify(this.state.calorieCount)
      );
      console.log(JSON.stringify(this.state.calorieCount));
      await asyncStorage.setItem("IBF", JSON.stringify(this.state.IBF));
      await asyncStorage.setItem("IBW", JSON.stringify(this.state.IBW));
      await asyncStorage.setItem(
        "WaterIntake",
        JSON.stringify(this.state.WaterIntake)
      );
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  constructor(props) {
    super(props);
    this.getUser();

    // console.log(email);
  }
  getUser = async () => {
    const email = auth().currentUser.email;
    const userdoc = await firestore()
      .collection("Users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            user: {
              name: docSnap.data().name,
              age: docSnap.data().age,
              weight: docSnap.data().weight,
              height: docSnap.data().height,
              gender: docSnap.data().gender,
              email: docSnap.data().email,
              BMI: docSnap.data().BMI,
              IBF: docSnap.data().IBF,
              IBW: docSnap.data().IBW,
              BMR: docSnap.data().BMR,
              WaterIntake: docSnap.data().WaterIntake,
            },
          });
        });
      });
    await firestore()
      .collection("DietPlan")
      .doc(auth().currentUser.uid)
      .collection("userDietPlan")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            calorieCount: docSnap.data().calorieCount,
          });
        });
      });
    if (this.state.user.BMI < 18.5) {
      this.setState({ userStatus: "Under Weight" });
    } else if ((BMI = 18.5 || BMI <= 24.5)) {
      this.setState({ userStatus: "Normal Weight" });
    } else if ((BMI = 25 || BMI <= 29.5)) {
      this.setState({ userStatus: "Over Weight" });
    } else if (BMI >= 30) {
      this.setState({ userStatus: "Obese" });
    }
    // console.log(this.state.userStatus);
    // const dietPlanDoc = await firestore()
    //   .collection('DietPlan')
    //   .where('email', '==', email)
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((docSnap) => {
    //       console.log('______________');
    //       // console.log(docSnap.data().DietPlan);
    //       // console.log("______________");
    //       this.setState({
    //         dietPlan: docSnap.data().DietPlan,
    //       });
    //     });
    //   });
    // this.saveData(JSON.stringify(this.state.dietPlan));
    // console.log(this.state.dietPlan);
    // this.formula(this.state.user.gender);
  };

  // Formula
  formula = (gender) => {
    // console.log(this.state.prediction.diabetesType);
    // var heightFeet = this.state.user.height.split(".");
    // var heightInch = this.state.user.height.split(".")[1];
    // var heightInCm = Math.round(this.state.user.height * 30.48);
    // var heightInM = heightInCm / 100;
    // //............... BMI.......
    // var BMI = Math.round(this.state.user.weight / (heightInM * heightInM), 2);
    // // ........Water Intake.......
    // let i = this.state.user.weight - 25;
    // let j = i * 25;
    // let k = j + 1500;
    // var WaterIntake = Math.floor(k / 250);
    // if (gender == "Female") {
    //   //IBF for Females (fat percentage).....
    //   var IBF = Math.round(1.2 * BMI + 0.23 * this.state.user.age - 5.4, 2);
    //   // for IBW
    //   if (heightFeet == 4) {
    //     var IBW = 45.5 - 2.3 * heightInch;
    //   } else if (heightFeet == 5) {
    //     IBW = 45.5 + 2.3 * heightInch;
    //   } else {
    //     IBW = 45.5 + 25.3 + 2.3 * heightInch;
    //   }
    //   // ......for BMR.......
    //   var BMR = Math.round(
    //     655.1 + 9.6 * IBW + 1.85 * heightInCm - 4.67 * this.state.user.age,
    //     2
    //   );
    // }
    // if (gender == "Male") {
    //   //IBF for Males (fat percentage):
    //   IBF = Math.round(1.2 * BMI + 0.23 * this.state.user.age - 16.2, 2);
    //   // .....for IBW....
    //   if (heightFeet == 4) IBW = 50 - 2.3 * heightInch;
    //   else if (heightFeet == 5) IBW = 50 + 2.3 * heightInch;
    //   else {
    //     IBW = 50 + 25.3 + 2.3 * heightInch;
    //   }
    //   // .....for BMR...
    //   BMR = Math.round(
    //     66.5 + 13.75 * IBW + 5.003 * heightInCm - 6.755 * this.state.user.age,
    //     2
    //   );
    // }
    // console.log(this.state.prediction.lifestyle);
    // Sedentary Lifestyle:
    // if (this.state.prediction.lifestyle == 1)
    //   var calorieCount = Math.round(BMR * 1.2, 2);
    // // Light Exercise:
    // else if (this.state.prediction.lifestyle == 2)
    //   calorieCount = Math.round(BMR * 1.375, 2);
    // //Moderate Exercise (3-5 days):
    // else if (this.state.prediction.lifestyle == 3)
    //   calorieCount = Math.round(BMR * 1.55, 2);
    // // Very Active:
    // else calorieCount = Math.round(BMR * 1.725, 2);
    // if (BMI < 18.5) {
    //   this.setState({ userStatus: "Under Weight" });
    // } else if ((BMI = 18.5 || BMI <= 24.5)) {
    //   this.setState({ userStatus: "Normal Weight" });
    // } else if ((BMI = 25 || BMI <= 29.5)) {
    //   this.setState({ userStatus: "Over Weight" });
    // } else if (BMI >= 30) {
    //   this.setState({ userStatus: "Obese" });
    // }
    // IBW = Math.round(IBW, 2);
    // this.setState({
    //   BMR: BMR,
    //   IBW: IBW,
    //   IBF,
    //   WaterIntake,
    //   BMI,
    //   calorieCount,
    // });
    // this.saveData();
    // console.log(this.state.user.BMR);
  };
  //....

  //-------
  render() {
    return (
      <View style={{ backgroundColor: "#5f9ea0" }}>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={{
                marginHorizontal: 0,
                height: 40,
                marginTop: 40,
                marginBottom: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#5f9ea0",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <FontAwesome name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 20 }}>Profile</Text>
              <View />
            </View>
            <ScrollView>
              <View style={styles.container}>
                {/* <Card leftText = "Name: " rightText = {this.state.user.name} style={styles.InputFields}/> 
        <Text> {this.state.user.name}</Text> */}

                <Card leftText="Name: " rightText={this.state.user.name} />
                <Card leftText="Age: " rightText={this.state.user.age} />
                <Card leftText="Weight: " rightText={this.state.user.weight} />

                <Card leftText="Height: " rightText={this.state.user.height} />
                <Card leftText="Gender: " rightText={this.state.user.gender} />
                <Card leftText="Email: " rightText={this.state.user.email} />
                <Card leftText="IBF: " rightText={this.state.user.IBF} />
                <Card leftText="BMI: " rightText={this.state.user.BMI} />
                <Card leftText="Status" rightText={this.state.userStatus} />
                <Card
                  leftText="Water Intake: "
                  rightText={this.state.user.WaterIntake}
                />
                <Card leftText="IBW: " rightText={this.state.user.IBW} />
                <Card
                  leftText="calorieCount: "
                  rightText={this.state.calorieCount}
                />

                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("DietPlan")}
                  >
                    <LinearGradient
                      colors={["#5f9ea0", "#5f9ea0"]}
                      style={styles.login}
                    >
                      <Text style={[styles.textSign, { color: "white" }]}>
                        {" "}
                        Diet Plan{" "}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {/* <Text> {this.state.calorieCount}</Text> */}
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginTop: 0,
    marginLeft: 50,
    justifyContent: "center",
    paddingRight: 35,
    marginBottom: 15,
  },
  login: {
    flexDirection: "row",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
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
  InputFields: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 30,
  },
});
