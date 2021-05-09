/* eslint-disable no-shadow */
import React, {useState, useEffect} from 'react';
import {
  MaterialCommunityIcon,
  FontAwesomeIcons,
  Feather,
  LinearGradient,
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  auth,
  firestore,
} from '../../Setup';
import asyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
// import auth from '@react-native-firebase/auth'
import {Picker} from '@react-native-picker/picker';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
export default function SignUp({navigation}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState([]);
  const [checkTextInputChange, setcheckTextInputChange] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [age, setAge] = useState([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [role, setRole] = useState(false);
  //------------  Sign-In Configuration
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  //----------Email and Password authentication with firebase

  createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');

        // eslint-disable-next-line prettier/prettier
        auth().currentUser.updateProfile({ displayName: userName.trim() })
          .then(() => {
            console.log(auth().currentUser);
          });

        navigation.navigate('HomeScreen');

        //---------- firetstore collection

        firestore().collection('Users').add({
          // token: auth().currentUser.accessToken,
          uid: auth().currentUser.uid,
          name: userName,
          email: email,
          age: age,
          weight: weight,
          height: height,
          gender: gender,
          role: 'user',
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
    setLoggedIn(true);
  };

  //-------------------------------------
  function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      setLoggedIn(true);
    }
  }

  //----------- Google Sign Out ---------------
  signOut = async () => {
    try {
      auth()
        .signOut()
        .then(() => alert('You are signed Out! '));
      console.log('signOut');
      setLoggedIn(false);
    } catch (error) {
      alert(error);
    }
    setUserName(null);
  };
  //--------- Email Text Input -------------
  const textInputchange = (email) => {
    if (email.length != 0) {
      setEmail(email), setcheckTextInputChange(true);
    } else {
      setcheckTextInputChange(false);
    }
  };
  // ------- Display User Name -----------
  const displayName = (username) => {
    if (username.length !== 0) {
      setUserName(username);
    }
  };
  // ---------- Password input Field ---
  const handllePasswordChange = (password) => {
    setPassword(password);
  };
  // ---------- Confirm Password input Field ---
  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };
  //-------- Update Security Text Entry -----
  const UpdateSecureTextEntry = () => {
    if (setSecureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
  };
  const UpdateConfirmSecureTextEntry = () => {
    setConfirmSecureTextEntry(false);
  };
  const [pickerValue, setPickerValue] = useState();
  return (
    <ScrollView>
      <View style={styles.container}>
      <Animatable.View 
animation="fadeInUpBig"
style= {styles.footer}>
          <Text style={styles.textfooter}> Full Name </Text>
          <View style={styles.action}>
            <FontAwesomeIcons name="user-circle" color="black" size={25} />
            <TextInput
              placeholder="Your Full Name"
              style={styles.textInput}
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={(username) => displayName(username)}
            />
          </View>
          <Text style={styles.textfooter}>Email</Text>
          <View style={styles.action}>
            <FontAwesomeIcons name="user-o" color="black" size={25} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => textInputchange(email)}
            />
            {checkTextInputChange ? (
              <Feather name="check-circle" color="blue" size={25} />
            ) : null}
          </View>
          <Text style={styles.textfooter}> Age </Text>
          <View style={styles.action}>
            <FontAwesomeIcons name="calendar-check-o" color="black" size={25} />
            <TextInput
              placeholder="Your Age"
              keyboardType= "numeric"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(age) => {
                setAge(age);
              }}
            />
          </View>
          <Text style={styles.textfooter}> Weight </Text>
          <View style={styles.action}>
           {/* <MaterialCommunityIcon name="ruler-vertical" color="black" size={25} /> */}
            <TextInput
              placeholder="Your Weight"
              style={styles.textInput}
              keyboardType= "numeric"
              autoCapitalize="none"
              onChangeText={(weight) => {
                setWeight(weight);
              }}
            />
          </View>
          <Text style={styles.textfooter}> Height </Text>
          <View style={styles.action}>
          <FontAwesomeIcons name="ruler-vertical" color="black" size={25} />
            <TextInput
              placeholder="Height"
              keyboardType= "numeric"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={setHeight}
            />
          </View>
          <Text style={styles.textfooter}> Gender </Text>
          <View style={styles.action}>
            <Picker
              style={styles.picker}
              // style={{ height: 10, width: 300 }}
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <Text style={[styles.textfooter, {marginTop: 20}]}> Password</Text>

          <View style={styles.action}>
            <FontAwesomeIcons name="lock" color="black" size={25} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              // eslint-disable-next-line no-shadow
              onChangeText={(password) => handllePasswordChange(password)}
            />
            <TouchableOpacity onPress={UpdateSecureTextEntry}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="blue" size={20} />
              ) : (
                <Feather name="eye" color="blue" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.Button}>
            <TouchableOpacity onPress={this.createUser}>
              <LinearGradient
                colors={['#5f9ea0', '#5f9ea0']}
                style={styles.login}>
                <Text style={[styles.textSign, {color: 'black'}]}>
                  {' '}
                  REGISTER{' '}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress = {()=> navigation.goBack() }
            style = {[styles.signUp, {borderColor : '#5f9ea0',
            marginTop: 2}]}
            >
          <Text style= {[styles.textSign, {color: 'grey'}]}> Already a Registered User?LOGIN</Text>
          </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}

const styles= StyleSheet.create({
  container : {
    flex :1,
    backgroundColor : '#5f9ea0'
  },
  header: {
    flex : 1,
    justifyContent : 'flex-end',
    paddingHorizontal: 10,
    paddingBottom :10
  },
footer: {
  flex :3, 
  backgroundColor : 'white',
  borderTopLeftRadius : 35,
  borderTopRightRadius : 35,
  paddingHorizontal: 25,
  paddingVertical : 30
  },
  textheader: {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 30
  },
  textfooter: {
    color : 'black',
    fontSize : 18,
    marginTop: 5
  }, 
action: {
flexDirection : 'row',
marginTop: 5,
borderBottomWidth: 1,
borderBottomColor : '#5f9ea0',
paddingBottom : 2,
// paddingTop:40
},
textInput : {
  flex :1, 
  //height: Platform.OS === 'android' ? 76 : 50,
  paddingLeft :10,
  color : 'black',
  marginTop : 20,
},
button :{
  alignItems : 'center',
  marginTop : 50
},
login: {
  width : '100%',
  height : 50,
  justifyContent : 'center',
  alignItems: 'center',
  borderRadius : 10,
  marginTop:20
},
textSign : {
  fontSize : 18,
  fontWeight : 'bold',
  marginTop : 0,
},
picker :{
height:45,
width: 300,
borderColor: 'grey',
borderWidth : 3
}
  });
