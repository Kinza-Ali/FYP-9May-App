import * as React from 'react';
import App from './App';
import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/Login';
import SignUpScreen from './app/screens/Signup';
import Recipes from './app/screens/Recipes';
import Workouts from './app/screens/Workouts';
import Profile from './app/screens/Profile';
import Nutritionists from './app/screens/Nutritionists';
import Blogs from './app/screens/Blogs';
import ChatbotScreen from './app/screens/Chatbot';
import Home from './app/screens/HomePage';
import FullBody from './app/screens/FullBody';
import Arms from './app/screens/Arms';
import Abs from './app/screens/Abs';
import Facial from './app/screens/Facial';
import Legs from './app/screens/Legs';
import WarmUp from './app/screens/WarmUp';
import Shoulders from './app/screens/Shoulders';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import AdminSuccessStories from './app/screens/AdminSuccessStories';
import SuccessStories from './app/screens/SuccessStories';
import * as Animatable from 'react-native-animatable';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AdminScreen from './app/screens/AdminScreen';
import asyncStorage from '@react-native-community/async-storage';
import AdminBlog from './app/screens/AdminBlog';
import AdminRecipe from './app/screens/AdminRecipe';
import Start from './app/screens/Start';
import DietPlan from './app/screens/DietPlan';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AboutUs from './app/screens/AboutUs';

// import MaterialCommunityIcon from 'react-native-vector-icons';
//.......saveData
const saveData = async (key, keyVal) => {
  try {
    await asyncStorage.setItem('key', keyVal);
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
};
//....... readData
const readData = async (key) => {
  try {
    const temp = await asyncStorage.getItem('key');
    this.setState({value: JSON.parse(temp)});
    // console.log(this.state.prediction);
  } catch (e) {
    alert('Failed to fetch the data from storage');
  }
};

// import NotificationScreen from './app/screens/Notifications'
export {
  Animatable,
  AdminBlog,
  AdminRecipe,
  Start,
  Icon,
  DietPlan,
  AdminSuccessStories,
  SuccessStories,
  asyncStorage,
  HomeScreen,
  LoginScreen,
  AdminScreen,
  SignUpScreen,
  Recipes,
  Workouts,
  AboutUs,
  Profile,
  Nutritionists,
  Blogs,
  ChatbotScreen,
  Home,
  FullBody,
  Abs,
  Arms,
  Facial,
  Legs,
  WarmUp,
  Shoulders,
  FontAwesomeIcons,
  Feather,
  LinearGradient,
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  auth,
  firestore,
  saveData,
  readData,
}
