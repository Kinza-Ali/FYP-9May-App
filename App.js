import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerContent } from "./app/screens/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
// SCREENS FOR NAV ********
import Start from "./app/screens/Start";
import MainTabScreen from "./app/screens/MainTabScreen";
import DietPlan from "./app/screens/DietPlan";
import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/Login";
import AboutUs from "./app/screens/AboutUs";
import Loader from "./app/screens/Loader";
import Blogs from "./app/screens/Blogs";
import Recipes from "./app/screens/Recipes";
import SuccessStories from "./app/screens/SuccessStories";
// ADMIN SCREENS FOR NAV ********
import AdminScreen from "./app/screens/AdminScreen";

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AdminStack = () => (
  <RootStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AdminScreen"
  >
    <RootStack.Screen name="AdminScreen" component={AdminScreen} />
    <RootStack.Screen name="Blogs" component={Blogs} />
    <RootStack.Screen name="Recipes" component={Recipes} />
    <RootStack.Screen name="SuccessStories" component={SuccessStories} />
  </RootStack.Navigator>
)

const UserScreens = () => (
  <Drawer.Navigator
    initialRouteName="MainTabScreen"
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Drawer.Screen name="MainTabScreen" component={MainTabScreen} />
    <Drawer.Screen name="AboutUs" component={AboutUs} />
    <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    <Drawer.Screen name="DietPlan" component={DietPlan} />
  </Drawer.Navigator>
)

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Loader" screenOptions={{ headerShown: false }}>          
        <RootStack.Screen name="Loader" component={Loader} />
        <RootStack.Screen name="Start" component={Start} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="AdminScreen" component={AdminStack} />
        <RootStack.Screen name="UserScreens" component={UserScreens} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
