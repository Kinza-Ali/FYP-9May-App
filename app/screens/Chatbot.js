/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../env";
import uuid from "react-native-uuid";
import asyncStorage from "@react-native-community/async-storage";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./HomeScreen";
import axios from "axios";
import Breakfast from "./Breakfast";
import { color } from "react-native-reanimated";
import { handleScheduleNotification } from "../../src/notification.ios";

//Bot Image
const botAvatar = require("../assets/images/bot.png");
//Bot User
const BOT = {
  _id: 2,
  name: "Mr Bot",
  avatar: botAvatar,
};

class Chatbot extends Component {
  state = {
    messages: [],
    id: 1,
    name: "",
    answers: [],
    oldEmail:"",
    calorieCount: 0,
    prediction: {},
    Breakfastupd: {},
    dietPlan: {},
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
      BMR: 0,
      WaterIntake: "",
    },
  };

  //.......................

  componentDidMount() {
    //DialogFlow configurations
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
    const { name, id } = this.props.route.params;

    firestore()
      .collection("CHATBOT_HISTORY")
      .doc(id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc") //stores on the basis of previous date
      .limit(50) //limit for previous messages
      .get()
      .then((snapshot) => {
        let messages = snapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: doc.text,
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name,
            };
          }
          return data;
        });
        if (messages.length > 0) {
          this.setState({ name, id, messages });
        } else {
          this.setState({
            name,
            id,
            messages: [
              {
                //id of the message
                _id: 2,
                text: `Hello, ${this.props.route.params.name}. I am Mr.Bot,your automated Nutriguide`,
                createdAt: new Date().getTime(),
                user: BOT,
              },
              {
                _id: 1,
                text: "HI",
                createdAt: new Date().getTime(),
                user: BOT,
              },
            ],
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.oldEmail !== this.state.oldEmail) {
      console.log("New cal " + this.state.oldEmail);
    }
  }

  constructor(props) {
    
    super(props);
      // var oldEmail="";
    firestore()
      .collection("DietPlan")
      .doc(auth().currentUser.uid)
      .collection("userDietPlan")
      .where("email", "==", auth().currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            // dietPlan: docSnap.data().DietPlan,
            // console.log("%%%%%%%%%%%");
            // console.log(docSnap.data().email);
            oldEmail:docSnap.data().email
          });
          console.log(this.state.oldEmail);
        });
      });
      console.log("--------------");
      // console.log(this.state.oldEmail);
    this.getUser();
  }
  //-------- Get user Info
  getUser = async () => {
    const email = auth().currentUser.email;
    await firestore()
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
  };
  //....
  getDietPLan = async () => {
    if (this.state.gender == "Male") {
      var genderVal = 1;
    } else {
      genderVal = 0;
    }
    // Push Notifications
    handleScheduleNotification();
    // post request....
    await this.post("http://3b199b91829f.ngrok.io/dietplan", {
      gender: genderVal,
      age: this.state.user.age,
      height: this.state.user.height,
      weight: this.state.user.weight,
      diabetesType: this.state.prediction.diabetesType,
      insulin: this.state.prediction.insulin,
      lifeStyle: this.state.prediction.lifestyle,
      symptomsHB: this.state.prediction.symptomsHB,
      styleOfEating: this.state.prediction.styleOfEating,
      BMI: this.state.user.BMI,
      IBF: this.state.user.IBF,
      WaterIntake: this.state.user.WaterIntake,
      IBW: this.state.user.IBW,
      calorieCount: this.state.calorieCount,
    });
  };
  // ... post command
  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
          this.setState({
            dietPlan: res.data,
          });
      
      console.log("+++++++++++++++++++++++");

      // if(auth().currentUser.email == oldEmail) {
        // firestore()
        //     .collection("DietPlan")
        //     .doc(auth().currentUser.uid)
        //     .collection("userDietPlan")
        //     .where("email", "==", auth().currentUser.email)
        //     .delete()

        //     .then(() => {
        //       firestore()
        //       .collection("DietPlan")
        //       .doc(auth().currentUser.uid)
        //       .collection("userDietPlan")
        //       .add({
        //         // token: auth().currentUser.accessToken,
        //         email: auth().currentUser.email,
        //         DietPlan: this.state.dietPlan,
        //         createdAt: new Date().getTime(),
        //         calorieCount: this.state.calorieCount,
        //       })
        //       this.sendBotResponse(JSON.stringify(res.data));
        //     });
      // }
      // else {
          firestore()
            .collection("DietPlan")
            .doc(auth().currentUser.uid)
            .collection("userDietPlan")
            .add({
              // token: auth().currentUser.accessToken,
              email: auth().currentUser.email,
              DietPlan: this.state.dietPlan,
              createdAt: new Date().getTime(),
              calorieCount: this.state.calorieCount,
            })
            .then(() => {
              console.log('User added!');
            });
          console.log(res.data);
          this.sendBotResponse(JSON.stringify(res.data));
      // }
          this.setState({ Breakfastupd: this.state.Breakfast });
        })
        .catch((err) => {
          reject(err);
        });
    });

  //...........................

  //handleGoogleResponse to show the response from the bot to the user
  handleGoogleResponse(result) {
    // sends the response from dialogFlow
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    // sending that response to the user
    this.sendBotResponse(text);
  }
  testAlert() {
    alert("test");
  }
  //...........................
  // receives response from dialogflow and shows to user
  sendBotResponse(text) {
    let msg;
    if (text == "dietPlan") {
      msg = {
        // _id: this.state.messages.length + 1,

        text: "Let me ask you some questions",
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == "begin questions") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,

        text: "When were you first diagnosed with diabetes?",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            { title: "Type1", value: "Type 1*1", _id: uuid.v4() },
            { title: "Type2", value: "Type 2*2", _id: uuid.v4() },
            { title: "Type3", value: "Type 3*3", _id: uuid.v4() },
          ],
        },
      };
    } else if (text == "second question") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "Do you take insulin?",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            { title: "Yes", value: "Yes*1", _id: uuid.v4() },
            { title: "No", value: "No*0", _id: uuid.v4() },
          ],
        },
      };
    } else if (text == "third question") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "What’s your lifestyle like?",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "Sedentary Lifestyle (0 mins)",
              value: "Sedentary Lifestyle (0 mins)*1",
              _id: uuid.v4(),
            },
            {
              title: "Light Exercise Lifestyle (30 mins)",
              value: "Light Exercise Lifestyle (30 mins)*2",
              _id: uuid.v4(),
            },
            {
              title: "Moderate Exercise (3-5 days) Lifestyle (60 mins)",
              value: "Moderate Exercise (3-5 days) Lifestyle (60 mins)*3",
              _id: uuid.v4(),
            },
            {
              title: "Very Active Lifestyle (90 mins)",
              value: "Very Active Lifestyle (90 mins)*4",
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == "fourth question") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "Have you had symptoms of high blood sugar lately? ",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "Hunger& thirst",
              value: "Hunger& thirst*1",
              _id: uuid.v4(),
            },
            {
              title: "None",
              value: "None*0",
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == "fifth question") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "Style of eating:",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "All day",
              value: "All day*0",
              _id: uuid.v4(),
            },
            {
              title: "Only when hungry",
              value: "Only when hungry*1",
              _id: uuid.v4(),
            },
            {
              title: "Fairly regular meal times",
              value: "Fairly regular meal times*2",
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == "sixth question") {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "	Do you check your blood sugar?  ",
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: "radio",
          keepIt: true,
          values: [
            {
              title: "Yes",
              value: "Yes",
              _id: uuid.v4(),
            },
            {
              title: "No",
              value: "No",
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (
      text ==
      "Thank you for your response, you will be getting your diet plan in a while."
    ) {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: "You will be getting your Diet plan in a while",
        createdAt: new Date().getTime(),
        user: BOT,
      };
      this.getDietPLan();
    } else {
      msg = {
        // _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date().getTime(),
        user: BOT,
        _id: 0,
      };
    }
    console.log(msg);
    const { id } = this.props.route.params;

    firestore()
      .collection("CHATBOT_HISTORY")
      .doc(id)
      .collection("MESSAGES")
      .add(msg);

    msg._id = uuid.v4();
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }
  //...........................
  // onSend function for the user sending the msg
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    // extracting the current msg from the messages array
    let text = messages[0].text;
    console.log(messages[0]);
    const { id, name } = this.props.route.params;

    firestore()
      .collection("CHATBOT_HISTORY")
      .doc(id)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: 1,
          name: name,
        },
      });

    Dialogflow_V2.requestQuery(
      text,
      //response by dialogFlow
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }
  //...............................
  //function to chose between options
  onQuickReply(quickReply) {
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, quickReply),
    // }));
    // no. of options set as responses at dialogFlow
    let message = quickReply[0].value;

    let msg = {
      _id: uuid.v4(),
      // text: message,
      // createdAt: new Date().getTime(),
      user: {
        _id: 1,
      },
    };
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
    if (this.state.answers.length == 5) {
      var prediction = {};
      this.state.answers.forEach(function (itm) {
        var itmText = itm.split("*")[0];
        var itmVal = itm.split("*")[1];
        switch (itmText) {
          case "Type 1":
            prediction.diabetesType = itmVal;
            break;
          case "Type 2":
            prediction.diabetesType = itmVal;
            break;
          case "Type 3":
            prediction.diabetesType = itmVal;
            break;
          case "Yes":
            prediction.insulin = itmVal;
            break;
          case "No":
            prediction.insulin = itmVal;
            break;
          case "Sedentary Lifestyle (0 mins)":
            prediction.lifestyle = itmVal;
            break;
          case "Light Exercise Lifestyle (30 mins)":
            prediction.lifestyle = itmVal;
            break;
          case "Moderate Exercise (3-5 days) Lifestyle (60 mins)":
            prediction.lifestyle = itmVal;
            break;
          case "Very Active Lifestyle (90 mins)":
            prediction.lifestyle = itmVal;
            break;
          case "Hunger& thirst":
            prediction.symptomsHB = itmVal;
            break;
          case "None":
            prediction.symptomsHB = itmVal;
            break;
          case "All day":
            prediction.styleOfEating = itmVal;
            break;
          case "Only when hungry":
            prediction.styleOfEating = itmVal;
            break;
          case "Fairly regular meal times":
            prediction.styleOfEating = itmVal;
            break;
        }
      });
      this.setState({ prediction: prediction });
      this.calulateCalorieCount();
      // console.log("stateCalorie" + this.state.calorieCount);
    } else {
      var joined = this.state.answers.concat(message);
      this.setState({ answers: joined });
    }
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log("testing error con" + error)
    );
  }
  //------- calarie Count calculation
  calulateCalorieCount = () => {
    // Sedentary Lifestyle:
    if (this.state.prediction.lifestyle == 1)
      var calorieCount = Math.round(this.state.user.BMR * 1.2, 2);
    // Light Exercise:
    else if (this.state.prediction.lifestyle == 2)
      calorieCount = Math.round(this.state.user.BMR * 1.375, 2);
    //Moderate Exercise (3-5 days):
    else if (this.state.prediction.lifestyle == 3)
      calorieCount = Math.round(this.state.user.BMR * 1.55, 2);
    // Very Active:
    else calorieCount = Math.round(this.state.user.BMR * 1.725, 2);

    console.log("calorieCount" + calorieCount);
    this.setState({ calorieCount: calorieCount });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#5f9ea0",
            height: 33,
            borderTopLeftRadius: 5,
            borderBottomRightRadius: 7,
          }}
        >
          <TouchableOpacity
            title="ChatBot"
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesomeIcons
              name="chevron-left"
              color="black"
              size={20}
              style={{ marginTop: 7 }}
            />
          </TouchableOpacity>
        </View>

        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          user={{ _id: 1 }}
        />
      </View>
    );
  }
}

export default Chatbot;
