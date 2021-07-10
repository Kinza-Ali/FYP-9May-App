import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Neomorph } from 'react-native-neomorph-shadows';
import perfectSize from '../assets/themes/Screen';
import Colors from '../assets/themes/Colors';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default class DietPlan extends Component {
  state = {
    Breakfast: [],
    // Dinner: {},
    // Lunch: {},
    // Snacks: {},
    // name: '',
    // age: '',
    // weight: '',
    // height: '',
    // gender: '',
    // email: '',
    // prediction: {},
    completeDietPlan: [],
    // firestoreDietPlan: {},

    dietPlan: {},
    refreshing: false,
  };
  // const [refreshing, setRefreshing] = React.useState(false);
  constructor(props) {
    super(props);
    // this.readData();
    firestore()
      .collection("DietPlan")
      .doc(auth().currentUser.uid)
      .collection("userDietPlan")
      .orderBy("createdAt", 'asc') //stores on the basis of previous date
      .get()
      .then((snapshot) => {
        snapshot.forEach((docSnap) => {
          this.setState({
            dietPlan: docSnap.data().DietPlan,
            // email:docSnap.data().email
          });
        });
      });


      // firestore()
      // .collection("DietPlan")
      // .doc(auth().currentUser.uid)
      // .collection("userDietPlan")
      // .orderBy("createdAt", "desc") //stores on the basis of previous date
      // .limit(50) //limit for previous messages
      // .get()
      // .then((snapshot) => {
      //   let completeDietPlan = snapshot.docs.map((doc) => {
      //     const firebaseData = doc.data();
      //     const data = {
      //       plan: doc.DietPlan,
      //       // Breakfast: doc.DietPlan.Breakfast,
      //       ...firebaseData,
      //     };
      //     // if (!firebaseData.system) {
      //     //   data.user = {
      //     //     ...firebaseData.user,
      //     //     name: firebaseData.user.name,
      //     //   };
      //     // }
      //     return data;
      //   });
      //   if (completeDietPlan.length > 0) {
      //     this.setState({completeDietPlan,Breakfast});
      //   } 
      //   console.log(Breakfast[0])
      //   // else {
      //   //   this.setState({
      //   //     name,
      //   //     id,
      //   //     messages: [
      //   //       {
      //   //         //id of the message
      //   //         _id: 2,
      //   //         text: `Hello, ${this.props.route.params.name}. I am Mr.Bot,your automated Nutriguide`,
      //   //         createdAt: new Date().getTime(),
      //   //         user: BOT,
      //   //       },
      //   //     ],
      //   //   });
      //   // }
      // })
      // .catch(function (err) {
      //   console.log(err);
      // });
  }

  render() {
    return (
      <View style={styles.container}>



{/* ************************************ DRAWER HEADER!!!!!  ************************** */}

<View style={styles.drawerHeader}>
        <Neomorph 
        style={
            [styles.BackIcons,
        {borderRadius: perfectSize(30), 
        height: perfectSize(56), 
        width: perfectSize(56)  }]}
            >
           <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
             
        </Neomorph>  
            <Text style={{color: Colors.defaultDark, 
            fontWeight: 'bold',
            fontFamily:Colors.fontFamily,
            paddingRight:150,
            fontSize:25
            }}> Diet Plan
           </Text>
    </View>
  
  {/* ****************************** BODY ********************************** */}


        {/* <View style={styles.header}>
        </View> */}
        <ImageBackground
              source={require("../assets/images/berries.jpg")}
              style={styles.image}
            > 
             {/* <Animatable.View animation="fadeInUpBig" style={styles.footer}> */}
        <ScrollView>
        
        <View style={{marginTop: perfectSize(40)}}>
          <View>
            <View style={styles.cardDesigns}>    
                      <Neomorph 
                      // lightShadowColor="#D0E6A5"
                      // darkShadowColor="#D0E6A5" // <- set this
                          swapShadows
                          style={styles.menuItems}
                      >
                     <View style={{flexDirection:'row', paddingLeft:20, marginTop:15}}>
                      <FontAwesome name="coffee" size={20} color="black" />
                  <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: Colors.fontFamily,
                      color: "#484C7F",
                      paddingLeft: 10,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {" "}
                  Breakfast{" "}
                </Text>
                </View> 

                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Breakfast).map((item) => {
                      if (this.state.dietPlan.Breakfast[item])
                        return (
                          <View>
                            <Text
                              style={{
                                margin: 10,
                                marginLeft:30,
                                fontFamily: Colors.fontFamily,
                              }}
                            >
                              {"• " +
                                item +
                                "   " +
                                this.state.dietPlan.Breakfast[item] +
                                "  " +
                                "grams"}
                            </Text>
                          </View>
                        );
                    })
                  : undefined}
                        
                      </Neomorph>        
        </View>
{/* ***************************************************** */}
                      <View style={styles.cardDesigns}>    
                      <Neomorph 
                      // lightShadowColor="#D0E6A5"
                      // darkShadowColor="#D0E6A5" // <- set this
                          swapShadows
                          style={styles.menuItems}
                      >
                        <View style={{flexDirection:'row', paddingLeft:20, marginTop:15}}>
                      <FontAwesome name="cutlery" size={20} color="black" />
                  <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: Colors.fontFamily,
                      color: "#484C7F",
                      paddingLeft: 10,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {" "}
                  Lunch{" "}
                </Text>
                </View>  
                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Lunch).map((item) => {
                      if (this.state.dietPlan.Lunch[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                                marginLeft:30,
                                fontFamily: Colors.fontFamily,
                            }}
                          >
                            {"•	 " +
                              item +
                              "   " +
                              this.state.dietPlan.Lunch[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined} 
                      </Neomorph>        
                      </View>

{/* ***************************************************** */}
                      <View style={styles.cardDesigns}>    
                      <Neomorph 
                      // lightShadowColor="#D0E6A5"
                      // darkShadowColor="#D0E6A5" // <- set this
                          swapShadows
                          style={styles.menuItemsSnacks}
                      >
                           <View style={{flexDirection:'row', paddingLeft:20, marginTop:15}}>
                      <FontAwesome name="apple" size={20} color="black" />
                  <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: Colors.fontFamily,
                      color: "#484C7F",
                      paddingLeft: 10,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {" "}
                  Snacks{" "}
                </Text>
                </View>  
                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Snacks).map((item) => {
                      if (this.state.dietPlan.Snacks[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                                marginLeft:30,
                                fontFamily: Colors.fontFamily,
                            }}
                          >
                            {"•	 " +
                              item +
                              "   " +
                              this.state.dietPlan.Snacks[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined}
                        
                      </Neomorph>        
                      </View>

    {/* ***************************************************** */}
                      <View style={styles.cardDesigns}>    
                      <Neomorph 
                      // lightShadowColor="#D0E6A5"
                      // darkShadowColor="#D0E6A5" // <- set this
                          swapShadows
                          style={styles.menuItems}
                      >
                          <View style={{flexDirection:'row', paddingLeft:20, marginTop:15}}>
                      <FontAwesome name="cutlery" size={20} color="black" />
                  <Text
                  style={[
                    styles.textSign,
                    {
                      fontFamily: Colors.fontFamily,
                      color: "#484C7F",
                      paddingLeft: 10,
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {" "}
                  Dinner{" "}
                </Text>
                </View>  
                {Object.keys(this.state.dietPlan).length > 0
                  ? Object.keys(this.state.dietPlan.Dinner).map((item) => {
                      if (this.state.dietPlan.Dinner[item])
                        return (
                          <Text
                            style={{
                              margin: 10,
                                marginLeft:30,
                                fontFamily: Colors.fontFamily,
                            }}
                          >
                            {"•	 " +
                              item +
                              "  " +
                              this.state.dietPlan.Dinner[item] +
                              " " +
                              "grams"}
                          </Text>
                        );
                    })
                  : undefined}  
                        
                      </Neomorph>        
                      </View>
</View>          
          {/* </Animatable.View> */}
          </View>
        </ScrollView>
        {/* </Animatable.View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily:Colors.fontFamily
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 20,
    // backgroundColor:'#5f9ea0',
  },
  footer: {
    // flex: 3,
    flexDirection:'column',
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,

    // paddingHorizontal: 10,
    // paddingVertical: 10,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  textfooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#5f9ea0",
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
    marginTop: 5,
    marginLeft: 50,
    justifyContent: "center",
    paddingRight: 35,
  },
  login: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
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
    color: "#5f9ea0",
  },
  InputFields: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    // borderRadius: 40,
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
    height: perfectSize(280),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    // alignItems: 'center',
    borderColor:Colors.defaultDark,
    borderRadius: 23,
    // borderWidth:1
  },
  menuItemsSnacks:{
    height: perfectSize(120),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    // alignItems: 'center',
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
  },
cardDesigns: {
  flexDirection: 'row', 
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: perfectSize(40)
}


});
