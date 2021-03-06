import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
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
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Neomorph } from 'react-native-neomorph-shadows';
import perfectSize from '../assets/themes/Screen';
import Images from '../assets/themes/Images';
import Colors from '../assets/themes/Colors';


const Workouts = ({ navigation }) => {
  return (

    <View style={styles.container}>

    
    {/* ************************************ DRAWER HEADER!!!!!  ************************** */}
    
          <View style={styles.drawerHeader}>
            <Neomorph 
            style={
                [styles.BackIcons,
            {borderRadius: perfectSize(30), 
            height: perfectSize(56), 
            width: perfectSize(56)        }]}
                >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                   <FontAwesome name="arrow-left" size={20} color="black" />
                 </TouchableOpacity>
                 
            </Neomorph>  
                <Text style={{color: Colors.defaultDark, 
                fontWeight: 'bold',
                fontFamily:Colors.fontFamily,
                paddingRight:80,
                paddingLeft:30,
                fontSize:25
                }}> 
                Pick Your Workout!
               </Text>
        </View>
      
      {/* ****************************** BODY ********************************** */}
    
        <ScrollView   
            //  refreshControl={
            //   <RefreshControl refreshing={this.state.refreshing} onRefresh={() => onRefresh} />
            // }
            >
        
        <View style={{marginTop: perfectSize(50)}}>
            <View style={{flexDirection: 'row', alignItems: 'center',
             justifyContent: 'space-around'}}>
                        
                       <Neomorph 
                        // lightShadowColor="#D0E6A5"
                        // darkShadowColor="#D0E6A5" // <- set this
                            swapShadows
                            style={styles.menuItems}
                        >
                            <TouchableOpacity
                            style={{
                                marginTop: perfectSize(42),
                            }}
                            onPress={() => navigation.navigate("FullBody")}
                      >
                        <Image
                          source={Images.FullBody}
                         style={[styles.dietIcon]}
                                    />
                      </TouchableOpacity>
                      <Text 
                      style={styles.textIcon}>
                            FullBody</Text>
                          
                        </Neomorph>
            {/* {**************************************************************************}   */}            
                        <Neomorph 
                        // lightShadowColor="#D0E6A5"
                        // darkShadowColor="#D0E6A5" // <- set this
                            swapShadows
                            style={styles.menuItems}
                        >
                            <TouchableOpacity
                            style={{
                                marginTop: perfectSize(42),
                            }}
                            onPress={() => navigation.navigate("Arms")}
                      >
                        <Image
                          source={Images.Arms}
                         style={[styles.dietIcon]}
                                    />
                      </TouchableOpacity>
                      <Text 
                      style={styles.textIcon}>
                            Arms Workout</Text>
                          
                        </Neomorph>
                        </View>
            {/* {**************************************************************************}   */}
            {/* {**************************************************************************}   */}
        
    
    
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
            marginTop: perfectSize(70)}}>
                        
                        <Neomorph 
                        //  lightShadowColor="#D0E6A5"
                        //  darkShadowColor="#D0E6A5" // <- set this
                             swapShadows
                             style={styles.menuItems}
                         >
                             <TouchableOpacity
                             style={{
                                 marginTop: perfectSize(42),
                             }}
                             onPress={() => navigation.navigate("Abs")}
                       >
                         <Image
                           source={Images.Abs}
                          style={[styles.dietIcon]}
                                     />
                       </TouchableOpacity>
                       <Text 
                      style={styles.textIcon}>
                             Abs Workout</Text>
                           
                         </Neomorph>
                        
                         <Neomorph 
                        //  lightShadowColor="#D0E6A5"
                        //  darkShadowColor="#D0E6A5" // <- set this
                             swapShadows
                             style={styles.menuItems}
                         >
                             <TouchableOpacity
                             style={{
                                 marginTop: perfectSize(42),
                             }}
                             onPress={() => navigation.navigate("Legs")}
                       >
                         <Image
                           source={Images.Legs}
                          style={[styles.dietIcon]}
                                     />
                       </TouchableOpacity>
                       <Text 
                       style={styles.textIcon}>
                             Legs Workout</Text>
                           
                         </Neomorph>
                         </View>
    
            {/* {**************************************************************************}   */}
            {/* {**************************************************************************}   */}

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
            marginTop: perfectSize(70)}}>
                        
                        <Neomorph 
                        //  lightShadowColor="#D0E6A5"
                        //  darkShadowColor="#D0E6A5" // <- set this
                             swapShadows
                             style={styles.menuItems}
                         >
                             <TouchableOpacity
                             style={{
                                 marginTop: perfectSize(42),
                             }}
                             onPress={() => navigation.navigate("Shoulders")}
                       >
                         <Image
                           source={Images.Shoulders}
                          style={[styles.dietIcon]}
                                     />
                       </TouchableOpacity>
                       <Text 
                      style={styles.textIcon}>
                             Shoulders Workout</Text>
                           
                         </Neomorph>
                        
                         <Neomorph 
                        //  lightShadowColor="#D0E6A5"
                        //  darkShadowColor="#D0E6A5" // <- set this
                             swapShadows
                             style={styles.menuItems}
                         >
                             <TouchableOpacity
                             style={{
                                 marginTop: perfectSize(42),
                             }}
                             onPress={() => navigation.navigate("Facial")}
                       >
                         <Image
                           source={Images.Facial}
                          style={[styles.dietIcon]}
                                     />
                       </TouchableOpacity>
                       <Text 
                       style={styles.textIcon}>
                            Facial Workout</Text>
                           
                         </Neomorph>
                         </View>



            {/* {**************************************************************************}   */}
            {/* {**************************************************************************}   */}

                         <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
            marginTop: perfectSize(70)}}>
                        
                        <Neomorph 
                        //  lightShadowColor="#D0E6A5"
                        //  darkShadowColor="#D0E6A5" // <- set this
                             swapShadows
                             style={styles.menuItems}
                         >
                             <TouchableOpacity
                             style={{
                                 marginTop: perfectSize(42),
                             }}
                             onPress={() => navigation.navigate("WarmUp")}
                       >
                         <Image
                           source={Images.WarmUp}
                          style={[styles.dietIcon]}
                                     />
                       </TouchableOpacity>
                       <Text 
                      style={styles.textIcon}>
                             Warm Up</Text>
                           
                         </Neomorph>
                         </View>
                </View>
    </ScrollView>
        </View>


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   
  );
};


export default Workouts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily:Colors.fontFamily
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
    width: "90%",
    alignSelf: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "IowanOldStyle-Roman",
    width: "85%",
    textAlign: 'center'
  },
  textfooter: {
    color: "black",
    fontSize: 18,
    fontFamily: "IowanOldStyle-Roman",
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#484C7F",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: "black",
  },
  button: {
    alignItems: "center",
    marginTop: 70,
  },
  login: {
    flexDirection: "row",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "IowanOldStyle-Roman",
  },
  signUp: {
    width: "100%",
    height: 30,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#484C7F",
  },

// NEW................................................

drawerHeader: {
  height: perfectSize(50),
  width: '100%',
  marginTop: perfectSize(50),
  flexDirection: 'row',
  alignItems: 'center',
  paddingLeft:20,
  justifyContent: 'space-between'
},
user :{
  height: perfectSize(50),
  width: '100%',
  // marginTop: perfectSize(50),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly'
},
headerText: {
  color: Colors.defaultDark,
  fontSize: perfectSize(15),
  alignSelf:'center'
},
headerEndSection: {
  height: perfectSize(30), 
  width: perfectSize(90), 
  backgroundColor: Colors.backgroundColor, 
  shadowRadius: 10, 
  borderRadius: perfectSize(23),
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly'
},
headerNotificationIcon: {
  height: perfectSize(25),
  width: perfectSize(25), 
  tintColor: Colors.defaultDark
},
dot: {
  height: 10,
  width: 10, 
  borderRadius: 23, 
},
headerDate: {
  fontFamily: Colors.fontFamily,
  color: Colors.defaultDark,
  fontSize: perfectSize(22),
  // textAlign: 'right',
  right: perfectSize(60),
  // marginTop: perfectSize(23)
},
menuItems: {
  height: perfectSize(180),
  width: perfectSize(174),
  backgroundColor: Colors.containerBg,
  shadowRadius: 8,
  borderRadius: 23,
  alignItems: 'center',
  borderColor:Colors.defaultDark,
  borderRadius: 23,
  // borderWidth:1
},
menuIcons: {
  height: perfectSize(50),
  width: perfectSize(50),
  backgroundColor: Colors.backgroundColor,
  shadowRadius: 10,
  borderRadius: 23,
  alignItems: 'center',
  justifyContent: 'center'
},
ModalIcons: {
  height: perfectSize(50),
  width: perfectSize(50),
  backgroundColor: Colors.backgroundColor,
  // shadowRadius: 10,
  borderRadius: 23,
  alignItems: 'center',
  justifyContent: 'center'
},
BackIcons: {
  height: perfectSize(50),
  width: perfectSize(50),
  backgroundColor: Colors.containerBg,
  shadowRadius: 5,
  borderRadius: 23,
  alignItems: 'center',
  justifyContent: 'center'
},
crossIcons: {
  height: perfectSize(50),
  width: perfectSize(50),
  backgroundColor: Colors.redDotColor,
  shadowRadius: 5,
  borderRadius: 23,
  alignItems: 'center',
  justifyContent: 'center'
},
ageIcons: {
  height: perfectSize(50),
  width: perfectSize(100),
  borderRadius: perfectSize(18),
  backgroundColor: Colors.backgroundColor,
  shadowRadius: 10,
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection:'row',
},
icon: {
  height: perfectSize(25),
  width: perfectSize(25),
  marginBottom:4
},
Modalicon: {
  height: perfectSize(150),
  width: perfectSize(150),
  marginBottom:4,
  marginTop:100,
  borderRadius:150,
  borderColor:'#D7E1F3',
  borderWidth:10
},
dietIcon:{
  height: perfectSize(60),
  width: perfectSize(60),
  marginBottom:4 
},
textIcon: {
  fontFamily:Colors.fontFamily,
  fontWeight: 'bold',
   fontSize: perfectSize(22),
    marginTop: perfectSize(5)
},

footer: {
  height: perfectSize(50),
  width: perfectSize(300),
  backgroundColor: Colors.backgroundColor,
  shadowRadius: 10,
  borderRadius: 23,
  marginTop: perfectSize(23),
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'row'
},
footerIcon: {
  height: perfectSize(18),
  width: perfectSize(18),
  tintColor: Colors.headerTextColor
}


});
