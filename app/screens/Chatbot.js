/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from '../env';
import uuid from 'react-native-uuid';
import asyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import axios from 'axios';
import Breakfast from './Breakfast';
//Bot Image
const botAvatar = require('../assets/images/bot.png');
//Bot User
const BOT = {
  _id: 2,
  name: 'Mr Bot',
  avatar: botAvatar,
};

class Chatbot extends Component {
  state = {
    messages: [],
    id: 1,
    name: '',
    answers: [],
    Breakfast: {},
    Dinner: {},
    Lunch: {},
    Snacks: {},
    completeDietPlan: [],
    BMI: 0,
    IBF: 0,
    calorieCount: 0,
    IBW: 0,
    WaterIntake: 0,
    prediction: {},
    Breakfastupd: {},
    dietPlan: {},
  };

  //.......................

  componentDidMount() {
    //DialogFlow configurations
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
    const {name, id} = this.props.route.params;
    // console.log(name);
    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc') //stores on the basis of previous date
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
          this.setState({name, id, messages});
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
                text: 'HI',
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
  //....
  getDietPLan = async () => {
    this.readData();
    // post request....
    await this.post('https://dietplan-model.herokuapp.com/dietplan', {
      gender: this.state.gender,
      age: this.state.age,
      height: this.state.height,
      weight: this.state.weight,
      diabetesType: this.state.prediction.diabetesType,
      insulin: this.state.prediction.insulin,
      lifeStyle: this.state.prediction.lifeStyle,
      symtomsHB: this.state.prediction.symtomsHB,
      styleOfEating: this.state.prediction.styleOfEating,
      BMI: this.state.BMI,
      IBF: this.state.IBF,
      WaterIntake: this.state.WaterIntake,
      IBW: this.state.IBW,
      calorieCount: this.state.calorieCount,
    });
    this.saveData();
  };
  // ... post command
  post = (url, data) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
          // console.log('________________');
          // console.log( this.state.user.email);

          // this.saveData(JSON.stringify(res.data));
          
          var arrayPlan = [];
          arrayPlan.push(res.data.Breakfast);
          arrayPlan.push(res.data.Lunch);
          arrayPlan.push(res.data.Dinner);
          arrayPlan.push(res.data.Snacks);
          var joined = this.state.completeDietPlan.concat(arrayPlan);
          JSON.stringify(
            this.state.completeDietPlan.forEach(function (itm) {
              // console.log(JSON.stringify(itm));
            }),
          );
          this.setState({
            Breakfast: res.data.Breakfast,
            Lunch: res.data.Lunch,
            Snacks: res.data.Snacks,
            Dinner: res.data.Dinner,
            completeDietPlan: joined,
            dietPlan: res.data,
          });
          firestore()
            .collection('DietPlan')
            .doc(auth().currentUser.uid)
            .collection('userDietPlan')
            .add({
              // token: auth().currentUser.accessToken,
              email: auth().currentUser.email,
              DietPlan: this.state.dietPlan,
              createdAt: new Date().getTime(),
            });
          // console.log(this.state.Breakfast);
          this.sendBotResponse(JSON.stringify(res.data));

          // this.handleGoogleResponse(res.data.Breakfast)
          this.setState({Breakfastupd: this.state.Breakfast});
        })
        .catch((err) => {
          reject(err);
        });
    });
  //...........................
  saveData = async () => {
    try {
      await asyncStorage.setItem(
        'prediction',
        JSON.stringify(this.state.prediction),
      );
      await asyncStorage.setItem(
        'Breakfast',
        JSON.stringify(this.state.Breakfast),
      );
      await asyncStorage.setItem(
        'dietPlan',
        JSON.stringify(this.state.dietPlan),
      );
      await asyncStorage.setItem('Lunch', JSON.stringify(this.state.Lunch));
      await asyncStorage.setItem('Dinner', JSON.stringify(this.state.Dinner));
      await asyncStorage.setItem('Snacks', JSON.stringify(this.state.Snacks));
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };
  //..........................
  readData = async () => {
    try {
      const age = await asyncStorage.getItem('age');
      const gender = await asyncStorage.getItem('gender');
      const height = await asyncStorage.getItem('height');
      const weight = await asyncStorage.getItem('weight');
      const BMI = await asyncStorage.getItem('BMI');
      const IBW = await asyncStorage.getItem('IBW');
      const IBF = await asyncStorage.getItem('IBF');
      const WaterIntake = await asyncStorage.getItem('Waterintake');
      const calorieCount = await asyncStorage.getItem('calorieCount');

      this.setState({
        age: age,
        weight: weight,
        height: height,
        gender: gender,
        BMI: BMI,
        IBW: IBW,
        IBF: IBF,
        WaterIntake: WaterIntake,
        calorieCount: calorieCount,
      });
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  //...........................

  //handleGoogleResponse to show the response from the bot to the user
  handleGoogleResponse(result) {
    // sends the response from dialogFlow
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    // sending that response to the user
    this.sendBotResponse(text);
  }
  testAlert() {
    alert('test');
  }
  //...........................
  // receives response from dialogflow and shows to user
  sendBotResponse(text) {
    let msg;
    if (text == 'dietPlan') {
      msg = {
        // _id: this.state.messages.length + 1,

        text: 'Let me ask you some questions',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == 'begin questions') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,

        text: 'When were you first diagnosed with diabetes?',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {title: 'Type1', value: 'Type 1*1', _id: uuid.v4()},
            {title: 'Type2', value: 'Type 2*2', _id: uuid.v4()},
            {title: 'Type3', value: 'Type 3*3', _id: uuid.v4()},
          ],
        },
      };
    } else if (text == 'second question') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: 'Do you take insulin?',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {title: 'Yes', value: 'Yes*1', _id: uuid.v4()},
            {title: 'No', value: 'No*0', _id: uuid.v4()},
          ],
        },
      };
    } else if (text == 'third question') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: 'What’s your lifestyle like?',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Sedentary Lifestyle (0 mins)',
              value: 'Sedentary Lifestyle (0 mins)*1',
              _id: uuid.v4(),
            },
            {
              title: 'Light Exercise Lifestyle (30 mins)',
              value: 'Light Exercise Lifestyle (30 mins)*2',
              _id: uuid.v4(),
            },
            {
              title: 'Moderate Exercise (3-5 days) Lifestyle (60 mins)',
              value: 'Moderate Exercise (3-5 days) Lifestyle (60 mins)*3',
              _id: uuid.v4(),
            },
            {
              title: 'Very Active Lifestyle (90 mins)',
              value: 'Very Active Lifestyle (90 mins)*4',
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == 'fourth question') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: 'Have you had symptoms of high blood sugar lately? ',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Hunger& thirst',
              value: 'Hunger& thirst*1',
              _id: uuid.v4(),
            },
            {
              title: 'None',
              value: 'None*0',
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == 'fifth question') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: 'Style of eating:',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'All day',
              value: 'All day*0',
              _id: uuid.v4(),
            },
            {
              title: 'Only when hungry',
              value: 'Only when hungry*1',
              _id: uuid.v4(),
            },
            {
              title: 'Fairly regular meal times',
              value: 'Fairly regular meal times*2',
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (text == 'sixth question') {
      msg = {
        //     //   // _id: this.state.messages.length + 1,
        text: '	Do you check your blood sugar?  ',
        createdAt: new Date().getTime(),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Yes',
              value: 'Yes',
              _id: uuid.v4(),
            },
            {
              title: 'No',
              value: 'No',
              _id: uuid.v4(),
            },
          ],
        },
      };
    } else if (
      text ==
      'Thank you for your response, you will be getting your diet plan in a while.'
    ) {
      this.getDietPLan();
        // msg = {
        //   //     //   // _id: this.state.messages.length + 1,
        //   text: 'Breakfast:', // add diet plan here
        //   createdAt: new Date().getTime(),
        //   user: BOT,
         
        // };
    } else {
      msg = {
        // _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date().getTime(),
        user: BOT,
        _id:0,
      };
    }
    console.log(msg);
    const {id} = this.props.route.params;

    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
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
    const {id, name} = this.props.route.params;

    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
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
      (error) => console.log(error),
    );
  }
  //...............................
  //function to chose between options
  onQuickReply(quickReply) {
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, quickReply),
    // }));
    // no. of options set as responses at dialogFlow
    // console.log('*************>>>>>>>>>>');
    // console.log(quickReply[0]);
    // console.log(quickReply);
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
    //  {
    //   console.log(this.state.answers[0].split('*')[0]);
    //   console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //   console.log(this.state.answers[0].split('*')[1]);
    // }
    if (this.state.answers.length == 5) {
      var prediction = {};
      this.state.answers.forEach(function (itm) {
        var itmText = itm.split('*')[0];
        // console.log(itmText);
        var itmVal = itm.split('*')[1];
        switch (itmText) {
          case 'Type 1':
            prediction.diabetesType = itmVal;
            break;
          case 'Type 2':
            prediction.diabetesType = itmVal;
            break;
          case 'Type 3':
            prediction.diabetesType = itmVal;
            break;
          case 'Yes':
            prediction.insulin = itmVal;
            break;
          case 'No':
            prediction.insulin = itmVal;
            break;
          case 'Sedentary Lifestyle (0 mins)':
            prediction.lifestyle = itmVal;
            break;
          case 'Light Exercise Lifestyle (30 mins)':
            prediction.lifestyle = itmVal;
            break;
          case 'Moderate Exercise (3-5 days) Lifestyle (60 mins)':
            prediction.lifestyle = itmVal;
            break;
          case 'Very Active Lifestyle (90 mins)':
            prediction.lifestyle = itmVal;
            break;
          case 'Hunger& thirst':
            prediction.symptomsHB = itmVal;
            break;
          case 'None':
            prediction.symptomsHB = itmVal;
            break;
          case 'All day':
            prediction.styleOfEating = itmVal;
            break;
          case 'Only when hungry':
            prediction.styleOfEating = itmVal;
            break;
          case 'Fairly regular meal times':
            prediction.styleOfEating = itmVal;
            break;
        }
      });
      // console.log(JSON.stringify(prediction));
      this.setState({prediction: prediction});
      this.saveData();
    } else {
      var joined = this.state.answers.concat(message);
      this.setState({answers: joined});
    }
    // console.log(this.state.answers.length);
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log('testing error con' + error),
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          user={{_id: 1}}
        />
      </View>
    );
  }
}

export default Chatbot;
