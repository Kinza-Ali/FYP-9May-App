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
// export default function App() {
//   // eslint-disable-next-line prettier/prettier
//   return (
//     // <NavigationContainer initialRouteName="Start">
//     //   <Stack.Navigator
//     //     screenOptions={{
//     //       headerStyle: {
//     //         backgroundColor: '#5f9ea0',
//     //       },
//     //       headerTintColor: 'white',
//     //       headerTitleStyle: {
//     //         alignItems: 'center',

//     //         fontWeight: 'bold',
//     //       },
//     //     }}>

//     //     <Stack.Screen
//     //       name="Start"
//     //       component={Start}
//     //       options={{title: 'Start'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Login"
//     //       component={LoginScreen}
//     //       // options={{headerShown: false}}
//     //     />
//     //     <Stack.Screen
//     //       name="SignUp"
//     //       component={SignUpScreen}
//     //       options={{title: 'SignUp'}}
//     //     />
//     //     <Stack.Screen
//     //       name="HomePage"
//     //       component={Home}
//     //       options={{title: 'HOMEPAGE'}}
//     //     />
//     //     <Stack.Screen
//     //       name="AdminScreen"
//     //       component={AdminScreen}
//     //       options={({title: 'AdminScreen'}, {headerLeft: null})}
//     //     />
//     //     <Stack.Screen
//     //       name="HomeScreen"
//     //       component={HomeScreen}
//     //       options={({title: 'HomeScreen'}, {headerLeft: null})}
//     //     />

//     //     <Stack.Screen
//     //       name="Recipes"
//     //       component={Recipes}
//     //       options={{title: 'Recipes'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Workouts"
//     //       component={Workouts}
//     //       options={{title: 'Workouts'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Profile"
//     //       component={Profile}
//     //       options={{title: 'Profile'}}
//     //     />
//     //     <Stack.Screen
//     //       name="DietPlan"
//     //       component={DietPlan}
//     //       options={{title: 'DietPlan'}}
//     //     />
//     //     <Stack.Screen
//     //       name="AdminBlog"
//     //       component={AdminBlog}
//     //       options={{title: 'AdminBlog'}}
//     //     />

//     //     {/* <Stack.Screen
//     //       name="BlogsCrud"
//     //       component={BlogsCrud}
//     //       options={{title: 'BlogsCrud'}}
//     //     /> */}
//     //     <Stack.Screen
//     //       name="Blogs"
//     //       component={Blogs}
//     //       options={{title: 'Blogs'}}
//     //     />
//     //     <Stack.Screen
//     //       name="AdminSuccessStories"
//     //       component={AdminSuccessStories}
//     //       options={{title: 'AdminSuccessStories'}}
//     //     />
//     //     <Stack.Screen
//     //       name="SuccessStories"
//     //       component={SuccessStories}
//     //       options={{title: '  SuccessStories'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Chatbot"
//     //       component={ChatbotScreen}
//     //       options={{title: 'Chatbot'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Nutritionists"
//     //       component={Nutritionists}
//     //       options={{title: 'Nutritionists'}}
//     //     />
//     //     <Stack.Screen
//     //       name="FullBody"
//     //       component={FullBody}
//     //       options={{title: 'FullBody'}}
//     //     />
//     //     <Stack.Screen name="Abs" component={Abs} options={{title: 'Abs'}} />
//     //     <Stack.Screen name="Arms" component={Arms} options={{title: 'Arms'}} />
//     //     <Stack.Screen name="Legs" component={Legs} options={{title: 'Legs'}} />
//     //     <Stack.Screen
//     //       name="AdminRecipe"
//     //       component={AdminRecipe}
//     //       options={{title: 'AdminRecipe'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Facial"
//     //       component={Facial}
//     //       options={{title: 'Facial'}}
//     //     />
//     //     <Stack.Screen
//     //       name="WarmUp"
//     //       component={WarmUp}
//     //       options={{title: 'Warm Up'}}
//     //     />
//     //     <Stack.Screen
//     //       name="Shoulders"
//     //       component={Shoulders}
//     //       options={{title: 'Shoulders'}}
//     //     />

//     //     {/* <Stack.Screen
//     //       name="Notifications"
//     //       component={NotificationScreen}
//     //       options={{title: 'Notification'}}
//     //     /> */}
//     //   </Stack.Navigator>
//     // </NavigationContainer>

//   );
// }
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
          <Drawer.Screen name="AboutUs" component={AboutUs} />
          <Drawer.Screen name="Start" component={Start} />

          {/* <Drawer.Screen name="HomeScreen" component={HomeScreen} /> */}

          <Drawer.Screen name="AdminBlog" component={AdminBlog} />
          <Drawer.Screen name="AdminRecipe" component={AdminRecipe} />
          <Drawer.Screen
            name="AdminSuccessStories"
            component={AdminSuccessStories}
          />
          {/* {isAdmin ? ( */}
          <Drawer.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={({ title: "AdminScreen" }, { headerLeft: null })}
          />
          {/* ) : ( */}
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          {/* )} */}
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
