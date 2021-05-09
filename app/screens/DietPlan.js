import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Breakfast from './Breakfast';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import asyncStorage from '@react-native-community/async-storage';

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
    // firestoreDietPlan: [],
    dietPlan: {},
  };
  constructor(props) {
    super(props);
    this.readData();
    // firestore()
    //   .collection('DietPlan')
    //   .doc(auth().currentUser.uid)
    //   .collection('userDietPlan')
    //   .where('email', '==', auth().currentUser.email)
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.forEach((docSnap) => {
    //       this.setState({
    //         firestoreDietPlan: docSnap.data().DietPlan,
    //       });
    //     });
    //   });
  }
  //....
  readData = async () => {
    try {
      // const Break = await asyncStorage.getItem('Breakfast');
      // const Dinner = await asyncStorage.getItem('Dinner');
      // const Lunch = await asyncStorage.getItem('Lunch');
      // const Snacks = await asyncStorage.getItem('Snacks');
      const dietPlan = await asyncStorage.getItem('dietPlan');

      this.setState({
        // Breakfast: JSON.parse(Break),
        // Lunch: JSON.parse(Lunch),
        // Dinner: JSON.parse(Dinner),
        // Snacks: JSON.parse(Snacks),
        dietPlan: JSON.parse(dietPlan),
      });
      // console.log(this.state.Breakfast);
    } catch (e) {
      alert('Failed to fetch the data from storage');
    }
  };

  render() {
    return (
      <View>
        <Text style={{margin: 10}}> Breakfast: </Text>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Breakfast).map((item) => {
              if (this.state.dietPlan.Breakfast[item])
                return (
                  <Text style={{margin: 10}}>
                    {item +
                      ' ' +
                      this.state.dietPlan.Breakfast[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
        <Text style={{margin: 10}}> Snacks: </Text>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Snacks).map((item) => {
              if (this.state.dietPlan.Snacks[item])
                return (
                  <Text style={{margin: 10}}>
                    {item +
                      ' ' +
                      this.state.dietPlan.Snacks[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
        <Text style={{margin: 10}}> Lunch: </Text>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Lunch).map((item) => {
              if (this.state.dietPlan.Lunch[item])
                return (
                  <Text style={{margin: 10}}>
                    {item +
                      ' ' +
                      this.state.dietPlan.Lunch[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
        <Text style={{margin: 10}}> Dinner: </Text>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Dinner).map((item) => {
              if (this.state.dietPlan.Dinner[item])
                return (
                  <Text style={{margin: 10}}>
                    {item +
                      ' ' +
                      this.state.dietPlan.Dinner[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
        {/* <Breakfast BreakfastVals={this.state.firestoreDietPlan} /> */}
      </View>
    );
  }
}
