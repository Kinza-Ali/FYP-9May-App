import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
} from "react-native";
import Breakfast from "./Breakfast";
import axios from "axios";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import asyncStorage from "@react-native-community/async-storage";
// import Card from "../assets/Card";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "../../Setup";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
export default class DietPlan extends Component {
  state = {
    // Breakfast: {},
    // Dinner: {},
    // Lunch: {},
    // Snacks: {},
    // name: '',
    // age: '',
    // weight: '',
    // height: '',
    // gender: '',
    // email: '',
    // prediction: {},
    // completeDietPlan: [],
    // firestoreDietPlan: {},
    dietPlan: {},
    refreshing: false,
  };
  // const [refreshing, setRefreshing] = React.useState(false);
  constructor(props) {
    super(props);
    // this.readData();
    firestore()
      .collection("DietPlan")
      .doc(auth().currentUser.uid)
      .collection("userDietPlan")
      .where("email", "==", auth().currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            dietPlan: docSnap.data().DietPlan,
          });
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View
          style={{
            marginHorizontal: 0,
            height: 40,
            marginTop: 20,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
              fontWeight: "bold",
              fontSize: 22,
              marginRight: 150,
              // alignSelf: "center",
              marginBottom: -20,
            }}
          >
            Diet Plan
          </Text>
          {/* </ImageBackground> */}
        </View>

        <ScrollView>
          {/* <View style={styles.container}> */}

          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ImageBackground
              source={require("../assets/images/berries.jpg")}
              style={styles.image}
            >
              <Card
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingLeft: 5,
                  backgroundColor: "#B9BBDF",
                  marginBottom: 15,
                  marginTop: 30,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: "IowanOldStyle-Roman",
                      color: "#484C7F",
                      paddingLeft: 10,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {" "}
                  Breakfast{" "}
                </Text>

                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Breakfast).map((item) => {
                      if (this.state.dietPlan.Breakfast[item])
                        return (
                          <View>
                            <Text
                              style={{
                                margin: 10,
                                fontFamily: "IowanOldStyle-Roman",
                              }}
                            >
                              {"• " +
                                item +
                                "    " +
                                this.state.dietPlan.Breakfast[item] +
                                "     " +
                                "grams"}
                            </Text>
                          </View>
                        );
                    })
                  : undefined}
              </Card>
              <Card
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingLeft: 5,
                  backgroundColor: "#B9BBDF",
                  marginBottom: 15,
                  marginTop: 10,
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: "IowanOldStyle-Roman",
                      color: "#484C7F",
                      fontWeight: "bold",
                      paddingLeft: 10,
                    },
                  ]}
                >
                  {" "}
                  Snacks{" "}
                </Text>

                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Snacks).map((item) => {
                      if (this.state.dietPlan.Snacks[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                              fontFamily: "IowanOldStyle-Roman",
                            }}
                          >
                            {"•	 " +
                              item +
                              "   " +
                              this.state.dietPlan.Snacks[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined}
              </Card>
              <Card
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingLeft: 5,
                  backgroundColor: "#B9BBDF",
                  marginBottom: 15,
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: "IowanOldStyle-Roman",
                      color: "#484C7F",
                      fontWeight: "bold",
                      paddingLeft: 10,
                    },
                  ]}
                >
                  {" "}
                  Lunch{" "}
                </Text>

                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Lunch).map((item) => {
                      if (this.state.dietPlan.Lunch[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                              fontFamily: "IowanOldStyle-Roman",
                            }}
                          >
                            {"•	 " +
                              item +
                              "   " +
                              this.state.dietPlan.Lunch[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined}
              </Card>

              <Card
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  paddingLeft: 5,
                  backgroundColor: "#B9BBDF",
                  marginBottom: 15,
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      fontSize: 20,
                      fontFamily: "IowanOldStyle-Roman",
                      color: "#484C7F",
                      // color: "white",
                      fontWeight: "bold",
                      paddingLeft: 10,
                    },
                  ]}
                >
                  {" "}
                  Dinner{" "}
                </Text>
                {/* </Card> */}

                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Dinner).map((item) => {
                      if (this.state.dietPlan.Dinner[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                              fontFamily: "IowanOldStyle-Roman",
                            }}
                          >
                            {"•	 " +
                              item +
                              "  " +
                              this.state.dietPlan.Dinner[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined}
              </Card>
            </ImageBackground>
          </Animatable.View>
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 20,
    // backgroundColor:'#5f9ea0',
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
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
    marginTop: 5,
    marginLeft: 50,
    justifyContent: "center",
    paddingRight: 35,
  },
  login: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    // borderRadius: 40,
  },
});
