import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import {
  Profile,
  HomeScreen,
  Recipes,
  Blogs,
  ChatbotScreen,
  Workouts,
  Nutritionists,
  SuccessStories,
  Shoulders,
  WarmUp,
  Facial,
  Arms,
  Abs,
  FullBody,
  Legs,
} from "../../Setup";
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const WorkoutStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    activeColor="#484C7F"
    barStyle={{ backgroundColor: "black" }}
  >
    <Tab.Screen
      name="HomeScreen"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#B9BBDF",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: "Profile",
        tabBarColor: "#B9BBDF",
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
        tabBarColor: "#B9BBDF",
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
        tabBarColor: "#B9BBDF",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-book" color={color} size={26} />
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
      headerTintColor: "white",
      headerTitleStyle: {
        alignItems: "center",
        fontWeight: "bold",
        fontFamily: "IowanOldStyle-Roman",
      },
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
