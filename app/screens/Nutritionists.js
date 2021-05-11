import React from 'react';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../assets/Card';
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
import {NavigationContainer} from '@react-navigation/native';

const Nutritionists = ({navigation}) => (
  <View style={styles.container}>
    <View style={{ marginTop:20, backgroundColor:'#5f9ea0',height:33}} >
    <TouchableOpacity title ="ChatBot" onPress = {()=> navigation.goBack()
      
    }>
    <FontAwesomeIcons name="chevron-left" color="black" size={20} style={{marginTop:7}}/>
    </TouchableOpacity>
    </View> 
    <View style={styles.header}>
      <Text style={styles.textheader}> Contact Our Nutritionists</Text>
    </View>
    <View style={styles.footer}>
    <Card leftText="Nutritionist Name " rightText= "xyz" />
    <Card leftText="Contact No" rightText= "xyz" />
    <Card leftText="Email" rightText= "xyz@xyz.com" />
    
    </View>
  </View>
);
export default Nutritionists;
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
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'times new Roman',
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
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 50,
    justifyContent: 'center',
  },
  login: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
