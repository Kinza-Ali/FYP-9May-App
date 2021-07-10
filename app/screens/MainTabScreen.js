import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import perfectSize from '../assets/themes/Screen';
import Images from '../assets/themes/Images';
import Colors from '../assets/themes/Colors';


import HomeScreen from './HomeScreen';
import Recipes from './Recipes';
import Workouts from './Workouts';
import Profile from './Profile';
import Nutritionists from './Nutritionists';
import Blogs from './Blogs';
import ChatbotScreen from './Chatbot';
import FullBody from './FullBody';
import Arms from './Arms';
import Abs from './Abs';
import Facial from './Facial';
import Legs from './Legs';
import WarmUp from './WarmUp';
import Shoulders from './Shoulders';
import SuccessStories from './SuccessStories';
import ProfileNew from './ProfileNew';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const WorkoutStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#484C7F"
    inactiveColor={Colors.gray}
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor:Colors.containerBg,

        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileNew"
      component={ProfileNew}
      options={{
        tabBarLabel: "Profile",
        tabBarColor:Colors.containerBg,

        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Recipes"
      component={Recipes}
      options={{
        tabBarLabel: "Recipes",
        tabBarColor:Colors.containerBg,

        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chef-hat" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Blogs"
      component={Blogs}
      options={{
        tabBarLabel: "Blogs",
        tabBarColor:Colors.containerBg,

        tabBarIcon: ({ color }) => (
          <Icon name="ios-book" color={color} size={26}/>
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
      
    }}
  >
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="Chatbot" component={ChatbotScreen} />
    <HomeStack.Screen name="Workouts" component={WorkoutStackScreen} />
    <HomeStack.Screen name="Nutritionists" component={Nutritionists} />
    <HomeStack.Screen name="SuccessStories" component={SuccessStories} />
  </HomeStack.Navigator>
);
//------------
const WorkoutStackScreen = ({ navigation }) => (
  <WorkoutStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <WorkoutStack.Screen
      name="Workouts"
      component={Workouts}
      options={{ title: "Workouts" }}
    />
    <WorkoutStack.Screen name="FullBody" component={FullBody} />
    <WorkoutStack.Screen name="WarmUp" component={WarmUp} />
    <WorkoutStack.Screen name="Facial" component={Facial} />
    <WorkoutStack.Screen name="Legs" component={Legs} />
    <WorkoutStack.Screen name="Arms" component={Arms} />
    <WorkoutStack.Screen name="Shoulders" component={Shoulders} />
    <WorkoutStack.Screen name="Abs" component={Abs} />
  </WorkoutStack.Navigator>
);

//-----------
const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#5f9ea0",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        alignItems: "center",

        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
  </ProfileStack.Navigator>
);
