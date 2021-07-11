import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  RefreshControl
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Images from "../assets/themes/Images";
import Colors from "../assets/themes/Colors";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import { Tooltip, CheckBox } from "react-native-elements";
import firestore from "@react-native-firebase/firestore";
import asyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.getUser();
  }
  
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
    showModal: false,
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    data: [
      "Check Fasting Blood Sugar",
      "Take Meals at Proper Time",
      "Walk for atleast 30mins",
      "Min Sleep 7-8 hours",
      "Do Workout/Yoga/Medidation",
      "Stay Hydrated",
    ],
    refreshing:false
  };

// onRefresh = async() => {
//     this.setState({refreshing: true});
//       await firestore()
//       .collection("Users")
//       .where("email", "==", email)
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((docSnap) => {
//           this.setState({
//             user: {
//               name: docSnap.data().name,
//               age: docSnap.data().age,
//               weight: docSnap.data().weight,
//               height: docSnap.data().height,
//               gender: docSnap.data().gender,
//               email: docSnap.data().email,
//               BMI: docSnap.data().BMI,
//               IBF: docSnap.data().IBF,
//               IBW: docSnap.data().IBW,
//               BMR: docSnap.data().BMR,
//               WaterIntake: docSnap.data().WaterIntake,
//             },
//           });
//         });
//       })
//       .then(() => {
//         this.setState({refreshing: false});
//       });
//     await firestore()
//       .collection("DietPlan")
//       .doc(auth().currentUser.uid)
//       .collection("userDietPlan")
//       .where("email", "==", email)
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((docSnap) => {
//           this.setState({
//             calorieCount: docSnap.data().calorieCount,
//           });
//         });
//       })
    
//   };

  readData = async () => {
    try {
      const predict = await asyncStorage.getItem("prediction");
      const calorie = await asyncStorage.getItem("calorieCount");
      this.setState({
        prediction: JSON.parse(predict),
        calorieCount: JSON.parse(calorie),
      });
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
            refreshing:false
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
  };

  onChecked(id) {
    const data = this.state.data;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    this.setState(data);
  }

  // getSelectList() {}

  onRefresh = () => {
      this.setState({refreshing:true});
     this.getUser()
    }


  //-------------- Set Interval ---------------
  time = setInterval(()=> {
    this.setState({
      checked1:false, 
      checked2:false, 
      checked3:false, 
      checked4:false, 
      checked5:false,
      checked6:false})
  },86400000);

// testing: 100000
// time 24 hrs=86400000

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerHeader}>
          <View>
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
                  this.props.navigation.goBack();
                }}
              >
                <FontAwesome name="arrow-left" size={20} color="black" />
              </TouchableOpacity>
            </Neomorph>
          </View>
          <View style={{ flexDirection: "column", paddingRight: 50 }}>
            <Text style={styles.headerText}>Todo</Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showModal: true });
              }}
            >
              <Neomorph
                darkShadowColor={Colors.blackColor}
                lightShadowColor="white"
                swapShadows
                style={styles.headerEndSection}
              >
                <View
                  style={[styles.dot, { backgroundColor: Colors.blueDotColor }]}
                />
                <View
                  style={[styles.dot, { backgroundColor: Colors.redDotColor }]}
                />
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: Colors.yellowDotColor },
                  ]}
                />
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: Colors.greenDotColor },
                  ]}
                />
              </Neomorph>
            </TouchableOpacity>

            {/* {****************************************************} */}

            <Modal visible={this.state.showModal} transparent={false}>
              <View style={styles.container}>
                <ScrollView
                  style={{
                    width: "100%",
                    height: "30%",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      marginVertical: 22,
                      alignItems: "center",
                    }}
                  >
                    <Neomorph
                      swapShadows
                      style={[
                        styles.ModalIcons,
                        {
                          borderRadius: perfectSize(18),
                          height: perfectSize(50),
                          width: perfectSize(50),
                        },
                      ]}
                    >
                      <Image source={Images.ToDo} style={[styles.Modalicon]} />
                    </Neomorph>
                  </View>

                  <View
                    style={{
                      marginTop: 100,
                      paddingLeft: 20,
                      paddingRight: 20,
                    }}
                  >
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Check Fasting Blood Sugar"
                      checked={this.state.checked1}
                      onPress={() =>
                        this.setState({ checked1: !this.state.checked1})
                      }
                    />
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Take Meals at Proper Time"
                      checked={this.state.checked2}
                      onPress={() =>
                        this.setState({ checked2: !this.state.checked2 })
                      }
                    />
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Walk for atleast 30mins"
                      checked={this.state.checked3}
                      onPress={() =>
                        this.setState({ checked3: !this.state.checked3 })
                      }
                    />
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Min Sleep 7-8 hours"
                      checked={this.state.checked4}
                      onPress={() =>
                        this.setState({ checked4: !this.state.checked4 })
                      }
                    />
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Do Workout/Yoga/Medidation"
                      checked={this.state.checked5}
                      onPress={() =>
                        this.setState({ checked5: !this.state.checked5 })
                      }
                    />
                    <CheckBox
                      containerStyle={{ backgroundColor: Colors.containerBg }}
                      title="Stay Hydrated"
                      checked={this.state.checked6}
                      onPress={() =>
                        this.setState({ checked6: !this.state.checked6 })
                      }
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Neomorph
                      style={[
                        styles.crossIcons,
                        {
                          marginTop:20,
                          borderRadius: perfectSize(30),
                          height: perfectSize(56),
                          width: perfectSize(56),
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ showModal: false });
                        }}
                      >
                        <FontAwesome name="times" size={25} color="black" />
                      </TouchableOpacity>
                    </Neomorph>
                  </View>
                </ScrollView>
              </View>
            </Modal>

            {/* {****************************************************} */}
          </View>
        </View>
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        >
          <View style={styles.user}>
            <Image
              source={Images.Avatar}
              style={styles.headerNotificationIcon}
            />
            <Text style={styles.headerDate}>
              Hey ,{" "}
              <Text style={{ color: Colors.defaultDark, fontWeight: "bold" }}>
                {auth().currentUser.displayName} {"!"}
              </Text>
            </Text>
          </View>

          <View style={{ marginTop: perfectSize(25) }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Neomorph
                darkShadowColor="#E8A49C" // <- set this
                lightShadowColor="#E8A49C"
                swapShadows
                style={styles.menuItems}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: perfectSize(18),
                  }}
                >
                  <Neomorph
                    swapShadows
                    style={[
                      styles.menuIcons,
                      {
                        borderRadius: perfectSize(18),
                        height: perfectSize(56),
                        width: perfectSize(56),
                      },
                    ]}
                  >
                    <Tooltip popover={<Text>{auth().currentUser.email}</Text>}>
                      <Image source={Images.Email} style={[styles.icon]} />
                    </Tooltip>
                  </Neomorph>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: perfectSize(18),
                  }}
                >
                  <Neomorph swapShadows style={styles.ageIcons}>
                    <Image source={Images.Age} style={[styles.icon]} />
                    <Text> {this.state.user.age}</Text>
                  </Neomorph>
                </View>
              </Neomorph>

              {/* {**************************************************************************}   */}
              <Neomorph
                lightShadowColor="#D0E6A5"
                darkShadowColor="#D0E6A5" // <- set this
                swapShadows
                style={styles.menuItems}
              >
                <TouchableOpacity
                  style={{
                    marginTop: perfectSize(35),
                  }}
                  onPress={() => this.props.navigation.navigate("DietPlan")}
                >
                  <LinearGradient
                    colors={["#ecf0f2", "#ecf0f2"]}
                    style={styles.login}
                  >
                    <Image source={Images.DietPlan} style={[styles.dietIcon]} />
                  </LinearGradient>
                </TouchableOpacity>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: perfectSize(17),
                    marginTop: perfectSize(5),
                  }}
                >
                  Diet Plan
                </Text>
              </Neomorph>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: perfectSize(23),
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: perfectSize(18),
                }}
              >
                <Neomorph
                  lightShadowColor="#A8DEE0"
                  darkShadowColor="#A8DEE0" // <- set this
                  swapShadows
                  style={[
                    styles.menuIcons,
                    {
                      height: perfectSize(80),
                      width: perfectSize(100),
                      borderRadius: perfectSize(18),
                    },
                  ]}
                >
                  <Image source={Images.Weight} style={[styles.icon]} />
                  <Text> {this.state.user.weight} kgs</Text>
                </Neomorph>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: perfectSize(18),
                }}
              >
                <Neomorph
                  lightShadowColor="#FFC98B"
                  darkShadowColor="#FFC98B" // <- set this
                  swapShadows
                  style={[
                    styles.menuIcons,
                    {
                      height: perfectSize(80),
                      width: perfectSize(100),
                      borderRadius: perfectSize(18),
                    },
                  ]}
                >
                  <Image source={Images.Height} style={[styles.icon]} />
                  <Text> {this.state.user.height}"</Text>
                </Neomorph>
              </View>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: perfectSize(18),
                }}
              >
                <Neomorph
                  lightShadowColor="#F8956F"
                  darkShadowColor="#F8956F" // <- set this
                  swapShadows
                  style={[
                    styles.menuIcons,
                    {
                      height: perfectSize(80),
                      width: perfectSize(100),
                      borderRadius: perfectSize(18),
                    },
                  ]}
                >
                  <Image source={Images.Gender} style={[styles.icon]} />
                  <Text> {this.state.user.gender}</Text>
                </Neomorph>
              </View>
            </View>
            {/* {**************************************************************************}   */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginTop: perfectSize(23),
              }}
            >
              <View style={styles.menuItems}>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: perfectSize(18),
                  }}
                >
                  <Neomorph
                    l
                    lightShadowColor="#522157"
                    darkShadowColor="#522157" // <- set this
                    swapShadows
                    style={[
                      styles.menuIcons,
                      {
                        height: perfectSize(80),
                        width: perfectSize(140),
                        borderRadius: perfectSize(18),
                      },
                    ]}
                  >
                    <Image source={Images.IBF} style={[styles.icon]} />
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        fontSize: perfectSize(15),
                      }}
                    >
                      IBF: {this.state.user.IBF}%
                    </Text>
                    <Text
                      style={{
                        // fontWeight: 'bold',
                        fontSize: perfectSize(15),
                      }}
                    >
                      IBW: {this.state.user.IBW}
                    </Text>
                  </Neomorph>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: perfectSize(18),
                  }}
                >
                  <Neomorph
                    lightShadowColor="#E79796"
                    darkShadowColor="#E79796" // <- set this
                    swapShadows
                    style={[
                      styles.menuIcons,
                      {
                        height: perfectSize(80),
                        width: perfectSize(140),
                        borderRadius: perfectSize(18),
                      },
                    ]}
                  >
                    <Image source={Images.Water} style={[styles.icon]} />
                    <Text style={{ fontSize: perfectSize(15), marginTop: 3 }}>
                      Water Intake: {this.state.user.WaterIntake}{" "}
                    </Text>
                  </Neomorph>
                </View>
              </View>

              {/* {**************************************************************************}   */}

              <View
                style={[
                  styles.menuItems,
                  {
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                  },
                ]}
              >
                <Neomorph
                  lightShadowColor="#F8D90F"
                  darkShadowColor="#F8D90F" // <- set this
                  swapShadows
                  style={styles.menuItems}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: perfectSize(18),
                    }}
                  >
                    <Neomorph
                      swapShadows
                      style={[
                        styles.menuIcons,
                        {
                          borderRadius: perfectSize(18),
                          height: perfectSize(56),
                          width: perfectSize(56),
                        },
                      ]}
                    >
                      <Tooltip popover={<Text>{this.state.userStatus}</Text>}>
                        <Image source={Images.BMI} style={[styles.icon]} />
                      </Tooltip>
                    </Neomorph>
                  </View>

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: perfectSize(18),
                    }}
                  >
                    <Neomorph swapShadows style={styles.ageIcons}>
                      <Image source={Images.Calorie} style={[styles.icon]} />
                      <Text> {this.state.calorieCount} calories</Text>
                    </Neomorph>
                  </View>
                </Neomorph>
              </View>
            </View>
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
    backgroundColor: Colors.containerBg,
    fontFamily: Colors.fontFamily,
  },
  header: {
    height: perfectSize(50),
    width: "100%",
    marginTop: perfectSize(50),
    flexDirection: "row",
    // alignItems: "flex-start",
    justifyContent: "space-evenly",
  },
  drawerHeader: {
    height: perfectSize(50),
    width: "100%",
    marginTop: perfectSize(50),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  user: {
    height: perfectSize(50),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    color: Colors.defaultDark,
    fontSize: perfectSize(15),
    alignSelf: "center",
  },
  headerEndSection: {
    height: perfectSize(30),
    width: perfectSize(90),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: perfectSize(23),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerNotificationIcon: {
    height: perfectSize(25),
    width: perfectSize(25),
    tintColor: Colors.defaultDark,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 23,
  },
  headerDate: {
    fontFamily: Colors.fontFamily,
    color: Colors.defaultDark,
    fontSize: perfectSize(22),
    right: perfectSize(60),
  },
  menuItems: {
    height: perfectSize(156),
    width: perfectSize(150),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    alignItems: "center",
  },
  menuIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  BackIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.redDotColor,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ageIcons: {
    height: perfectSize(50),
    width: perfectSize(100),
    borderRadius: perfectSize(18),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  icon: {
    height: perfectSize(25),
    width: perfectSize(25),
    marginBottom: 4,
  },
  Modalicon: {
    height: perfectSize(150),
    width: perfectSize(150),
    marginBottom: 4,
    marginTop: 100,
    borderRadius: 150,
    borderColor: "#D7E1F3",
    borderWidth: 10,
  },
  dietIcon: {
    height: perfectSize(50),
    width: perfectSize(50),
    marginBottom: 4,
  },

  footer: {
    height: perfectSize(50),
    width: perfectSize(300),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    marginTop: perfectSize(23),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  footerIcon: {
    height: perfectSize(18),
    width: perfectSize(18),
    tintColor: Colors.headerTextColor,
  },
});
