import React, {Component} from 'react';
import {View, Text,ScrollView,StyleSheet} from 'react-native';
import Breakfast from './Breakfast';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import asyncStorage from '@react-native-community/async-storage';
import Card from '../assets/Card';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from '../../Setup';
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
  };
  constructor(props) {
    super(props);
    // this.readData();
    firestore()
      .collection('DietPlan')
      .doc(auth().currentUser.uid)
      .collection('userDietPlan')
      .where('email', '==', auth().currentUser.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            dietPlan: docSnap.data().DietPlan,
          });
        });
      });
  }
  //....
  // readData = async () => {
  //   try {
  //     // const Break = await asyncStorage.getItem('Breakfast');
  //     // const Dinner = await asyncStorage.getItem('Dinner');
  //     // const Lunch = await asyncStorage.getItem('Lunch');
  //     // const Snacks = await asyncStorage.getItem('Snacks');
  //     const dietPlan = await asyncStorage.getItem('dietPlan');

  //     this.setState({
  //       // Breakfast: JSON.parse(Break),
  //       // Lunch: JSON.parse(Lunch),
  //       // Dinner: JSON.parse(Dinner),
  //       // Snacks: JSON.parse(Snacks),
  //       dietPlan: JSON.parse(dietPlan),
  //     });
  //     // console.log(this.state.Breakfast);
  //   } catch (e) {
  //     alert('Failed to fetch the data from storage');
  //   }
  // };

  render() {
    return (
      <ScrollView>
      <View style = {styles.container}>
        <View style = {styles.header}></View>
      
      <Animatable.View 
      animation = 'fadeInUpBig'
      style= {styles.footer}>
         <LinearGradient
                  colors={['#5f9ea0', '#5f9ea0']}
                  style={styles.login}>
                
             <Text style={[styles.textSign, {color: 'white'}]}>
                    {' '}
                    Breakfast {' '}
                  </Text>
                </LinearGradient>
        
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Breakfast).map((item) => {
              if (this.state.dietPlan.Breakfast[item])
                return (
                  <Text style={{margin: 10}}>
                    {'-> '+item +
                      ' ' +
                      this.state.dietPlan.Breakfast[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
          <LinearGradient
                  colors={['#5f9ea0', '#5f9ea0']}
                  style={styles.login}>
                
             <Text style={[styles.textSign, {color: 'white'}]}>
                    {' '}
                    Snacks {' '}
                  </Text>
                </LinearGradient>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Snacks).map((item) => {
              if (this.state.dietPlan.Snacks[item])
                return (
                  <Text style={{margin: 10}}>
                    {'-> '+item +
                      ' ' +
                      this.state.dietPlan.Snacks[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
          <LinearGradient
                  colors={['#5f9ea0', '#5f9ea0']}
                  style={styles.login}>
                
             <Text style={[styles.textSign, {color: 'white'}]}>
                    {' '}
                    Lunch {' '}
                  </Text>
                </LinearGradient>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Lunch).map((item) => {
              if (this.state.dietPlan.Lunch[item])
                return (
                  <Text style={{margin: 10}}>
                    {'-> '+item +
                      ' ' +
                      this.state.dietPlan.Lunch[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
          <LinearGradient
                  colors={['#5f9ea0', '#5f9ea0']}
                  style={styles.login}>
                
             <Text style={[styles.textSign, {color: 'white'}]}>
                    {' '}
                    Dinner {' '}
                  </Text>
                </LinearGradient>
        {Object.keys(this.state.dietPlan).length > 0
          ? Object.keys(this.state.dietPlan.Dinner).map((item) => {
              if (this.state.dietPlan.Dinner[item])
                return (
                  <Text style={{margin: 10}}>
                    {'-> '+item +
                      ' ' +
                      this.state.dietPlan.Dinner[item] +
                      ' ' +
                      'grams'}
                  </Text>
                );
            })
          : undefined}
        {/* <Breakfast BreakfastVals={this.state.firestoreDietPlan} /> */}
      </Animatable.View>
      </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f9ea0',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
    // backgroundColor:'#5f9ea0',
    
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textfooter: {
    color: 'black',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#5f9ea0',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
  alignItems : 'center',
  marginTop : 5,
  marginLeft: 50,
  justifyContent: 'center',
  paddingRight: 35,
  },
  login: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20, 
  },
  signUp: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5f9ea0',
  },
  InputFields :{
   fontSize: 15,
   fontWeight: 'bold',
   marginTop: 5,
   marginLeft: 30

  }
});
