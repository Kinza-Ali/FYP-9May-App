import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import asyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Breakfast from "./Breakfast";
import { LinearGradient } from "../../Setup";
import Cards from "../assets/Card";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";

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
    refreshing: false,
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

  //....

  //-------
  render() {
    return (
      <View style={{ backgroundColor: "#B9BBDF" }}>
        <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
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
                backgroundColor: "#B9BBDF",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <FontAwesome name="chevron-left" size={20} color="black" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: "IowanOldStyle-Roman",
                  color: "black",
                  fontSize: 20,
                }}
              >
                Profile
              </Text>
              <View />
            </View>
            <ScrollView>
              <View style={styles.container}>
                {/* <Cards leftText = "Name: " rightText = {this.state.user.name} style={styles.InputFields}/> 
        <Text> {this.state.user.name}</Text> */}
                <Text style={{ marginLeft: 60, marginBottom: 20 }}>
                  <Avatar.Image
                    source={{
                      uri:
                        "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                    }}
                    size={40}
                    backgroundColor="#B9BBDF"
                    containerStyle={{
                      // marginLeft: 20,
                      // paddingLeft: 20,
                      marginBottom: 200,
                    }}
                  />{" "}
                  <Text style={styles.avatar}>
                    {"  "}
                    Hey, {this.state.user.name}
                  </Text>
                </Text>

                <Cards leftText="Age:" rightText={this.state.user.age} />
                <Cards leftText="Weight: " rightText={this.state.user.weight} />
                <Cards leftText="Height: " rightText={this.state.user.height} />
                <Cards leftText="Gender: " rightText={this.state.user.gender} />
                <Cards leftText="Email: " rightText={this.state.user.email} />
                <Cards leftText="IBF: " rightText={this.state.user.IBF} />
                <Cards leftText="BMI: " rightText={this.state.user.BMI} />
                <Cards leftText="Status" rightText={this.state.userStatus} />
                <Cards
                  leftText="Water Intake (In glass):"
                  rightText={this.state.user.WaterIntake}
                />
                <Cards leftText="IBW: " rightText={this.state.user.IBW} />
                <Cards
                  leftText="calorieCount: "
                  rightText={this.state.calorieCount}
                />
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("DietPlan")}
                  >
                    <LinearGradient
                      colors={["#484C7F", "#484C7F"]}
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
    borderBottomColor: "#B9BBDF",
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
    color: "#B9BBDF",
  },
  texts: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "#484C7F",
    fontFamily: "IowanOldStyle-Roman",
    paddingLeft: 43,
    marginBottom: -10,
  },
  InputFields: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 30,
  },
  avatar: {
    fontFamily: "IowanOldStyle-Roman",
    fontWeight: "bold",
    fontSize: 26,
  },
});
