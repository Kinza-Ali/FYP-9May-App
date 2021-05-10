import React, {useState, useEffect} from 'react';
import notification, { handleScheduleNotification } from '../../src/notification.ios';
import * as Animatable from 'react-native-animatable';
import {
  Feather,
  LinearGradient,
  FontAwesomeIcons,
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  auth,
  firestore,
} from '../../Setup';
import asyncStorage from '@react-native-community/async-storage';
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
} from 'react-native';

export default function Login({navigation}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [client, setClient] = useState([]);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const [checkTextInputChange, setcheckTextInputChange] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const saveData = async () => {
    try {
      await asyncStorage.setItem('isAdmin', 'true');
      await asyncStorage.setItem('loggedIn', 'true');
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  };

  //------------ Google Sign-In Configuration

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  //--------------- Sign In with email and password auth ----------------------
  signInUser = async () => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account signed in!');
        firestore()
          .collection('Users')
          .where('email', '==', email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((docSnap) => {
              //setAdmin(true);
              // console.log(docSnap.data().role);
              if (docSnap.data().role == 'admin') {
                navigation.navigate('AdminScreen');
                // setAdmin(true);
                saveData();
              } else {
                navigation.navigate('HomeScreen');
              }
            });

          });
        //----------------------------------
        auth()
          .currentUser.updateProfile({
            displayName: auth().currentUser.displayName.trim(),
          })
          .then(() => {
            // console.log(auth().currentUser);
          });
          handleScheduleNotification();
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
    setLoggedIn(true);
  };
  //--------------- ON Auth State Change ----------------------
  function onAuthStateChanged(user) {
    setUser(auth().currentUser);
    // console.log(user);
    if (user) {
      setLoggedIn(true);
    }
  }

  //-----------  Sign Out ---------------
  signOut = async () => {
    try {
      await auth()
        .signOut()
        .then(() => alert('You are signed Out! '));
      console.log('signOut');
      setLoggedIn(false);
      setPassword(null);
      console.log("------------------------");
      console.log(password);
      setEmail('');
      // setUserName(null);
      navigation.navigate('Login');
    } catch (error) {
      // alert(error);
      console.log(error);
    }
  };
  //--------- Email Text Input -------------
  const textInputchange = (email) => {
    if (email.length != 0) {
      setEmail(email), setcheckTextInputChange(true);
    } else {
      setcheckTextInputChange(false);
    }
  };

  // ---------- Password input Field ---
  const handllePasswordChange = (password) => {
    setPassword(password);
  };
  const UpdateSecureTextEntry = () => {
    if (setSecureTextEntry) {
      setSecureTextEntry(false);
    } else {
      setSecureTextEntry(true);
    }
    // setData({
    //   ...data,
    //   secureTextEntry: !data.secureTextEntry,
    // });
  };
  return (
          <View style={styles.container}>
            {/* <StatusBar backgroundColor="#5f9ea0" barStyle="Light-content" /> */}
            <View style={styles.header}>
              <Text style={styles.textheader}>
                Welcome to Health & Nutrition!
              </Text>
            </View>
            <Animatable.View style={styles.footer}
            animation = "fadeInUpBig"

            >
              <Text style={styles.textfooter}>Email</Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="user-o" color="black" size={20} />
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(email) => textInputchange(email)}
                />
                {checkTextInputChange ? (
                  <Feather name="check-circle" color="blue" size={20} />
                ) : null}
              </View>
              <Text style={[styles.textfooter, {marginTop: 35}]}>
                {' '}
                Password
              </Text>
              <View style={styles.action}>
                <FontAwesomeIcons name="lock" color="black" size={20} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
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
              <View style={[styles.Button, {marginTop : 20}]}>
                <TouchableOpacity onPress={this.signInUser}>
                  <LinearGradient
                    colors={['#5f9ea0', '#5f9ea0']}
                    style={styles.login}>
                    <Text style={[styles.textSign, {color: 'black'}]}>
                      {' '}
                      LOGIN{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignUp')}
                  style={[
                    styles.signUp,
                    {borderColor: '#5f9ea0', marginTop: 2},
                  ]}>
                  <LinearGradient
                    colors={['white', 'white']}
                    style={styles.login}>
                    <Text style={[styles.textSign, {color: '#5f9ea0'}]}>
                      {' '}
                      Not a registered User?SIGN UP
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('HomePage')}
                  style={[
                    styles.signUp,
                    {borderColor: '#5f9ea0', borderWidth: 0, marginTop: 0},
                  ]}>
                  <LinearGradient
                    colors={['#5f9ea0', '#5f9ea0']}
                    style={styles.login}>
                    <Text style={[styles.textSign, {color: 'black'}]}>
                      {' '}
                      Continue without LOGIN{' '}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
       
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
  paddingHorizontal: 20,
  paddingVertical : 30,
},
  textheader: {
    color : 'white',
    fontWeight : 'bold',
    fontSize : 30,
    fontFamily: 'times new Roman'
  },
  textfooter: {
    color : 'black',
    fontSize : 18
  }, 
action: {
flexDirection : 'row',
marginTop: 2,
borderBottomWidth: 1,
borderBottomColor : '#01ab9d',
paddingBottom :5,
justifyContent: 'center'
},
textInput : {
  flex :1, 
  //height: Platform.OS === 'android' ? 76 : 50,
  paddingLeft :10,
  color : 'black'
},
button :{
  alignItems : 'center',
  marginTop : 60,
  marginLeft: 50,
  justifyContent: 'center'
},
login: {
  width : '100%',
  height : 60,
  justifyContent : 'center',
  alignItems: 'center',
  borderRadius : 20
},
errorMsg: {
  color: '#FF0000',
  fontSize: 14,
},
textSign : {
  fontSize : 18,
  fontWeight : 'bold'
 
}
});