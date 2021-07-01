import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, SafeAreaView, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./app/screens/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RootStackScreen from "./app/screens/RootStackScreen";
import Start from "./app/screens/Start";
import MainTabScreen from "./app/screens/MainTabScreen";
import asyncStorage from "@react-native-community/async-storage";
import {
  Login,
  DietPlan,
  HomeScreen,
  ChatbotScreen,
  Workouts,
  LoginScreen,
  Icon,
  Recipes,
  Nutritionists,
  AboutUs,
  SuccessStories,
  SignUpScreen,
  Home,
  AdminBlog,
  AdminRecipe,
  AdminScreen,
  AdminSuccessStories,
} from "./Setup";
// Icon.loadFont();
// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const readData = async () => {
    try {
      const loggedIn = await asyncStorage.getItem("loggedIn");
      const admin = await asyncStorage.getItem("isAdmin");
      setLoggedIn(loggedIn);
      if (admin) {
        setAdmin(admin);
      }
      console.log("========");
      console.log(isAdmin);
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };
  readData();
  return (
    <NavigationContainer>
      {loggedIn ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="AboutUs" component={AboutUs} />
          <Drawer.Screen name="Start" component={Start} />

          <Drawer.Screen name="HomeScreen" component={HomeScreen} />

          <Drawer.Screen name="AdminBlog" component={AdminBlog} />
          <Drawer.Screen name="AdminRecipe" component={AdminRecipe} />
          <Drawer.Screen
            name="AdminSuccessStories"
            component={AdminSuccessStories}
          />

          <Drawer.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={({ title: "AdminScreen" }, { headerLeft: null })}
          />

          <Drawer.Screen name="DietPlan" component={DietPlan} />
          {/* <Drawer.Screen name="Recipes" component={Recipes} /> */}

          {/* <Drawer.Screen name="Settings" component={Settingscreen} /> */}
        </Drawer.Navigator>
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
  );
}
