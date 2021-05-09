import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, SafeAreaView, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import BlogScreen from './app/api/BlogsCrud';
import AdminBlog from './app/screens/AdminBlog';
import AdminRecipe from './app/screens/AdminRecipe';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import HomeScreen from './app/screens/HomeScreen';
// import BlogsCrud from './app/api/BlogsCrud';
import DietPlan from './app/screens/DietPlan';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AdminSuccessStories,
  SuccessStories,
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  Recipes,
  Workouts,
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
  AdminScreen,
  // BlogsCrud,
} from './Setup';
Icon.loadFont();
// const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  // eslint-disable-next-line prettier/prettier
  return (    
    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5f9ea0',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            alignItems: 'center',

            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{title: 'SignUp'}}
        />
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{title: 'HOMEPAGE'}}
        />
        <Stack.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={({title: 'AdminScreen'}, {headerLeft: null})}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({title: 'HomeScreen'}, {headerLeft: null})}
        />

        <Stack.Screen
          name="Recipes"
          component={Recipes}
          options={{title: 'Recipes'}}
        />
        <Stack.Screen
          name="Workouts"
          component={Workouts}
          options={{title: 'Workouts'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="DietPlan"
          component={DietPlan}
          options={{title: 'DietPlan'}}
        />
        <Stack.Screen
          name="AdminBlog"
          component={AdminBlog}
          options={{title: 'AdminBlog'}}
        />

        {/* <Stack.Screen
          name="BlogsCrud"
          component={BlogsCrud}
          options={{title: 'BlogsCrud'}}
        /> */}
        <Stack.Screen
          name="Blogs"
          component={Blogs}
          options={{title: 'Blogs'}}
        />
        <Stack.Screen
          name="AdminSuccessStories"
          component={AdminSuccessStories}
          options={{title: 'AdminSuccessStories'}}
        />
        <Stack.Screen
          name="SuccessStories"
          component={SuccessStories}
          options={{title: '  SuccessStories'}}
        />
        <Stack.Screen
          name="Chatbot"
          component={ChatbotScreen}
          options={{title: 'Chatbot'}}
        />
        <Stack.Screen
          name="Nutritionists"
          component={Nutritionists}
          options={{title: 'Nutritionists'}}
        />
        <Stack.Screen
          name="FullBody"
          component={FullBody}
          options={{title: 'FullBody'}}
        />
        <Stack.Screen name="Abs" component={Abs} options={{title: 'Abs'}} />
        <Stack.Screen name="Arms" component={Arms} options={{title: 'Arms'}} />
        <Stack.Screen name="Legs" component={Legs} options={{title: 'Legs'}} />
        <Stack.Screen
          name="AdminRecipe"
          component={AdminRecipe}
          options={{title: 'AdminRecipe'}}
        />
        <Stack.Screen
          name="Facial"
          component={Facial}
          options={{title: 'Facial'}}
        />
        <Stack.Screen
          name="WarmUp"
          component={WarmUp}
          options={{title: 'Warm Up'}}
        />
        <Stack.Screen
          name="Shoulders"
          component={Shoulders}
          options={{title: 'Shoulders'}}
        />

        {/* <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{title: 'Notification'}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
