import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import asyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Breakfast from './Breakfast';
// import { saveData } from '../../Setup';

class Profile extends Component {
  state = {
    user: {
      name: '',
      age: '',
      weight: '',
      height: '',
      gender: '',
      email: '',
    },
    BMI: 0,
    IBF: 0,
    calorieCount: 0,
    IBW: 0,
    BMR: 0,
    WaterIntake: 0,
    userStatus: '',
    prediction: {},
    Breakfast: {},
    Dinner: {},
    Lunch: {},
    Snacks: {},
    completeDietPlan: [],
    dietPlan: {},
    finalDietPlan: '',
  };
  readData = async () => {
    try {
      const predict = await asyncStorage.getItem('prediction');
      // const dietPlan = await asyncStorage.getItem('dietPlan');
      this.setState({prediction: JSON.parse(predict)});
      // this.setState({dietPlan: JSON.parse(dietPlan)});
      // console.log(this.state.prediction);
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };
  saveData = async () => {
    try {
      await asyncStorage.setItem('gender', this.state.user.gender);
      await asyncStorage.setItem('age', this.state.user.age);
      await asyncStorage.setItem('height', this.state.user.height);
      await asyncStorage.setItem('weight', this.state.user.weight);
      await asyncStorage.setItem('BMI', this.state.BMI);
      await asyncStorage.setItem('calorieCount', this.state.calorieCount);
      await asyncStorage.setItem('IBF', this.state.IBF);
      await asyncStorage.setItem('IBW', this.state.IBW);
      await asyncStorage.setItem('WaterIntake', this.state.WaterIntake);
    } catch (e) {
      alert('Failed to save the data to the storage');
    }
  };

  constructor(props) {
    super(props);
    this.getUser();

    // console.log(email);
  }
  getUser = async () => {
    this.readData();
    const email = auth().currentUser.email;
    const userdoc = await firestore()
      .collection('Users')
      .where('email', '==', email)
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
            },
          });
        });
      });
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
    this.formula(this.state.user.gender);
  };

  // Formula
  formula = (gender) => {
    // console.log(this.state.prediction.diabetesType);

    var heightFeet = this.state.user.height.split('.');
    var heightInch = this.state.user.height.split('.')[1];

    var heightInCm = Math.round(this.state.user.height * 30.48);

    var heightInM = heightInCm / 100;

    //............... BMI.......
    var BMI = Math.round(this.state.user.weight / (heightInM * heightInM), 2);

    // ........Water Intake.......
    let i = this.state.user.weight - 25;
    let j = i * 25;
    let k = j + 1500;
    var WaterIntake = Math.floor(k / 250);

    if (this.state.user.gender == 'Female') {
      //IBF for Females (fat percentage).....
      var IBF = Math.round(1.2 * BMI + 0.23 * this.state.user.age - 5.4, 2);

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
        655.1 + 9.6 * IBW + 1.85 * heightInCm - 4.67 * this.state.user.age,
        2,
      );
    }

    if (this.state.user.gender == 'Male') {
      //IBF for Males (fat percentage):
      IBF = Math.round(1.2 * BMI + 0.23 * this.state.user.age - 16.2, 2);
      // .....for IBW....
      if (heightFeet == 4) IBW = 50 - 2.3 * heightInch;
      else if (heightFeet == 5) IBW = 50 + 2.3 * heightInch;
      else {
        IBW = 50 + 25.3 + 2.3 * heightInch;
      }
      // .....for BMR...
      BMR = Math.round(
        66.5 + 13.75 * IBW + 5.003 * heightInCm - 6.755 * this.state.user.age,
        2,
      );
    }
    // Sedentary Lifestyle:
    if (this.state.prediction.lifeStyle == 1)
      var calorieCount = Math.round(BMR * 1.2, 2);
    // Light Exercise:
    else if (this.state.prediction.lifeStyle == 2)
      calorieCount = Math.round(BMR * 1.375, 2);
    //Moderate Exercise (3-5 days):
    else if (this.state.prediction.lifeStyle == 3)
      calorieCount = Math.round(BMR * 1.55, 2);
    // Very Active:
    else calorieCount = Math.round(BMR * 1.725, 2);
    if (BMI < 18.5) {
      this.setState({userStatus: 'Under Weight'});
    } else if ((BMI = 18.5 || BMI <= 24.5)) {
      this.setState({userStatus: 'Normal Weight'});
    } else if ((BMI = 25 || BMI <= 29.5)) {
      this.setState({userStatus: 'Over Weight'});
    } else if (BMI >= 30) {
      this.setState({userStatus: 'Obese'});
    }
    IBW = Math.round(IBW, 2);
    this.setState({
      BMR: BMR,
      IBW: IBW,
      IBF,
      WaterIntake,
      BMI,
      calorieCount,
    });

    // this.post('https://dietplan-model.herokuapp.com/dietplan', {
    //   gender: this.state.user.gender,
    //   age: this.state.user.age,
    //   user: this.state.user.height,
    //   weight: this.state.user.weight,
    //   diabetesType: this.state.prediction.diabetesType,
    //   insulin: this.state.prediction.insulin,
    //   lifeStyle: this.state.prediction.lifeStyle,
    //   symtomsHB: this.state.prediction.symtomsHB,
    //   styleOfEating: this.state.prediction.styleOfEating,
    //   BMI: this.state.BMI,
    //   IBF: this.state.IBF,
    //   WaterIntake: this.state.WaterIntake,
    //   IBW: this.state.IBW,
    //   calorieCount: this.state.calorieCount,
    // });
  };
  //....

  //... post command
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
          });
        //   firestore()
        //     .collection('DietPlan')
        //     .doc(auth().currentUser.id)
        //     .collection('userDietPlan')
        //     .add({
        //       // token: auth().currentUser.accessToken,
        //       email: this.state.user.email,
        //       DietPlan: this.state.completeDietPlan,
        //       createdAt: new Date().getTime(),
        //     });
        })
        .catch((err) => {
          reject(err);
        });
    });
  // dietPlan filter non zero values
  // let temp =

  //-------
  render() {
    return (
      <View style={styles.container}>
        <Text> Name: {this.state.user.name}</Text>
        <Text> Age: {this.state.user.age}</Text>
        <Text> Weight: {this.state.user.weight}</Text>
        <Text> Height: {this.state.user.height}</Text>
        <Text> Gender: {this.state.user.gender}</Text>
        <Text> Email: {this.state.user.email}</Text>
        <Text> BMR: {this.state.BMR}</Text>
        <Text> IBF: {this.state.IBF} </Text>
        <Text> Calorie Count: {this.state.calorieCount} </Text>
        <Text>
          {' '}
          BMI:{this.state.BMI} {'-'}
          {this.state.userStatus}
        </Text>
        <Text> Water Intake: {this.state.WaterIntake} </Text>
        <Text> IBW:{this.state.IBW} </Text>
        <Button
          title="Diet Plan"
          onPress={() => this.props.navigation.navigate('DietPlan')}
        />
        {/* <Text>Diet Plan: {this.state.dietPlan}</Text> */}
        {/* <Breakfast BreakfastVals={this.state.Breakfast} /> */}
        {/* <Button
          title="Genrate New diet Plan"
          onPress={() =>
            navigation.navigate('Chatbot', {
              name: auth().currentUser.displayName,
              id: auth().currentUser.uid,
            })
          }
        /> */}
      </View>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
