import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './Login';
import SignUpScreen from './Signup';
import Recipes from './Recipes';
import Nutritionists from './Nutritionists';
import Blogs from './Blogs';
import Home from './HomePage';
import FullBody from './FullBody';
import Arms from './Arms';
import Abs from './Abs';
import Facial from './Facial';
import Legs from './Legs';
import WarmUp from './WarmUp';
import Shoulders from './Shoulders';
import SuccessStories from './SuccessStories';
import Start from './Start';
import AboutUs from './AboutUs';
const RootStack = createStackNavigator();
const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Start"
  >
    <RootStack.Screen name="Start" component={Start} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
    <RootStack.Screen name="HomePage" component={Home} />
    {/* <RootStack.Screen
      name="AdminScreen"
      component={AdminScreen}
      options={({ title: "AdminScreen" }, { headerLeft: null })}
    /> */}
    {/* <RootStack.Screen name="HomeScreen" component={HomeScreen} /> */}
    {/* <RootStack.Screen name="Workouts" component={Workouts} /> */}
    {/* <RootStack.Screen name="DietPlan" component={DietPlan} /> */}
    {/* <RootStack.Screen name="AdminBlog" component={AdminBlog} /> */}
    {/* <RootStack.Screen */}
    {/* name="AdminSuccessStories" 
      component={AdminSuccessStories}
    /> */}
    {/* <RootStack.Screen name="Chatbot" component={ChatbotScreen} /> */}
    <RootStack.Screen name="SuccessStories" component={SuccessStories} />
    <RootStack.Screen name="Nutritionists" component={Nutritionists} />
    <RootStack.Screen name="Blogs" component={Blogs} />
    <RootStack.Screen name="Recipes" component={Recipes} />
    {/* <RootStack.Screen name="AdminRecipe" component={AdminRecipe} /> */}
    <RootStack.Screen name="WarmUp" component={WarmUp} />
    <RootStack.Screen name="Facial" component={Facial} />
    <RootStack.Screen name="Legs" component={Legs} />
    <RootStack.Screen name="Arms" component={Arms} />
    <RootStack.Screen name="Shoulders" component={Shoulders} />
    <RootStack.Screen name="Abs" component={Abs} />
    <RootStack.Screen name="FullBody" component={FullBody} />
    <RootStack.Screen name="AboutUs" component={AboutUs} />
    {/* <RootStack.Screen name ='Profile' component={Profile}/> */}
  </RootStack.Navigator>
);
export default RootStackScreen;
