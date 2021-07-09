// import {json, response} from 'express';
import React, { useState, useEffect } from "react";
import methods from "../connect/index";
// import Clipboard from '@react-native-community/clipboard';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  Animated
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import asyncStorage from "@react-native-community/async-storage";
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import {handleScheduleNotification} from '../../src/notification.ios';
// import AsyncStorage from '@react-native-community/async-storage';
const recipesUrl = "http://fca3858760ac.ngrok.io/api/recipes";

// Time out for pull to refresh feature
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Blogs({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [id, setId] = useState("");
  const [dishName, setDishName] = useState("");
  const [method, setMethod] = useState("");
  const [dishUrl, setDishUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalRecipe, setShowModalRecipe] = useState(false);
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeBlog, setActiveBlog] = React.useState("");
  const [activeRecipe, setActiveRecipe]= React.useState("");


  // Pull to refresh method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(recipesUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //------------
  const readData = async () => {
    try {
      const adminState = await asyncStorage.getItem("isAdmin");

      if (adminState !== null) {
        // console.log(adminState);
        setAdmin(adminState);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  //fetching data from blogs api
  // console.log(isAdmin);


  useEffect(() => {
    readData();
    fetch(recipesUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);
  //.......

 //....... ADD RECIPE
  addRecipe = async () => {
    var response = await methods.post("recipes", {
      dishName,
      ingredients,
      method,
      dishUrl,
      imgUrl,
    });
    console.log('==================');
    console.log(response.response);
    console.log(dishName + ingredients+ method+ dishUrl+imgUrl)
    console.log('+++++++++++++++++++++');
  };


//....... UPDATE RECIPE
  const updateRecipe = async (recipe) => {
    var response = await methods.put("recipes/" + recipe._id, {
      dishName: recipe.dishName,
      ingredients:recipe.ingredients,
      method:recipe.method,
      dishUrl:recipe.dishUrl,
      imgUrl:recipe.imgUrl,
    });
    console.log('==================');
    console.log(response.response);
  };


//....... DELETE RECIPE
  const deleteRecipe = async (id) => {
    var response = await methods.delete("recipes/" + id, {});
    alert("Successfully deleted");
    console.log('==================');
    console.log(response);
  };

//............ SWIPEABLE
const leftSwipe = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  // console.log(activeBlog._id)
  // console.log("***************************")
  return (
    // <TouchableOpacity 
    // // onPress={props.handleDelete} 
    // activeOpacity={0.6}>
    //   <View style={styles.deleteBox}>
    //     <Animated.Text style={{transform: [{scale: scale}]}}>
    //       Delete
    //     </Animated.Text>
    //    </View>
    // </TouchableOpacity>
    <View>
    <TouchableOpacity
      onPress={() => deleteRecipe(activeBlog._id)}
    style={{
      backgroundColor: "#B9BBDF",
      width: 50,
      height:50,
      justifyContent: "center",
      alignItems: "center",
      // padding: 10,
      // borderRadius: 100,
    }}
  >
    <FontAwesome name="trash" size={25} 
    // style={{borderRadius:100, color:"#B9BBDF" }}
      color="black" />
  </TouchableOpacity>
  <TouchableOpacity
      onPress={() => {
                setActiveBlog(item)
                setShowModalUpdate(true)
              }}
      style={{
        backgroundColor: "#B9BBDF",
        width: 50,
        height:50,
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        // borderRadius: 100,
      }}
    >
      <FontAwesome name="edit" size={25} 
      // style={{borderRadius:100, color:"#B9BBDF" }}
        color="black" />
    </TouchableOpacity>
    </View>
  );
};

const rightSwipe = (progress, dragX) => {
  // const scale = dragX.interpolate({
  //   inputRange: [0, 100],
  //   outputRange: [0, 1],
  //   extrapolate: 'clamp',
  // });
  console.log(activeBlog._id)
  console.log("***************************")
  return (
    // <TouchableOpacity 
    // // onPress={props.handleDelete} 
    // activeOpacity={0.6}>
    //   <View style={styles.deleteBox}>
    //     <Animated.Text style={{transform: [{scale: scale}]}}>
    //       Delete
    //     </Animated.Text>
    //    </View>
    // </TouchableOpacity>
    <View 
    // style={styles.button}
    >
      <TouchableOpacity onPress={() => {
      setActiveRecipe(item)
      setShowModalRecipe(true)}}
      style={{
        // backgroundColor: "#B9BBDF",
        width: 100,
        height:100,
        justifyContent: "center",
        alignItems: "center",
        // padding: 10,
        // borderRadius: 100,
      }}
      >
        <LinearGradient
          colors={["#B9BBDF", "#B9BBDF"]}
          // style={styles.selectButton}
        >
          <Text style={[styles.textSign, { color: "black" }]}>
            Show Recipe
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

  return (
    <View style={{flex:1}}>
        <View style={styles.container}>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 40,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <FontAwesome name="chevron-left" size={20} color="black" />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                marginRight: 140,
                // alignSelf:"center",
                fontFamily: "IowanOldStyle-Roman",
              }}
            >
              Recipes
            </Text>
          </View>

            <View style={styles.container}>
            {/* <View style={styles.header}></View> */}

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            {isAdmin ? (
              <View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                        paddingRight: 20,
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        style={{
                          backgroundColor: "#B9BBDF",
                          width: 60,
                          height: 60,
                          justifyContent: "center",
                          alignItems: "center",
                          padding: 10,
                          borderRadius: 100,
                        }}
                      >
                        <FontAwesome name="plus" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                    <Modal
                              visible={showModalUpdate}
                              transparent={false}
                            >
                              <ScrollView
                                style={{
                                  width: "100%",
                                  height: "30%",
                                  paddingLeft: 40,
                                }}
                              >
                                <Text style={styles.textSignModal}>
                                  Edit Recipe
                                </Text>
                                <View style={styles.action}>
                                  <TextInput
                                    placeholder={activeBlog.dishName}
                                    defaultValue={activeBlog.dishName}
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.dishName = text
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <View style={styles.action}>
                                  <TextInput
                                    placeholder="Add Ingredients"
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.ingredients}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.ingredients = text
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <View style={styles.action}>
                                  <TextInput
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.method}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.method = text
                                      console.log("TESTING ********")
                                      console.log(objectLol)
                                      console.log("TESTING ********")
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <View style={styles.action}>
                                  <TextInput
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.dishUrl}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.dishUrl = text
                                      console.log("TESTING ********")
                                      console.log(objectLol)
                                      console.log("TESTING ********")
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <View style={styles.action}>
                                  <TextInput
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.imgUrl}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.imgUrl = text
                                      console.log("TESTING ********")
                                      console.log(objectLol)
                                      console.log("TESTING ********")
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <TouchableOpacity
                                  onPress={() => updateRecipe(activeBlog)}
                                  style={[
                                    styles.signUp,
                                    {
                                      borderColor: "#484C7F",
                                      marginTop: 20,
                                      borderColor: "#484C7F",
                                      borderWidth: 0,

                                      paddingRight: 100,
                                      margin: 20,
                                      width: "170%",
                                      paddingLeft: 100,
                                      marginTop: 20,
                                    },
                                  ]}
                                >
                                  <LinearGradient
                                    colors={["#484C7F", "#484C7F"]}
                                    style={styles.login}
                                  >
                                    <Text
                                      style={[
                                        styles.textSign,
                                        {
                                          color: "white",
                                          fontFamily: "IowanOldStyle-Roman",
                                        },
                                      ]}
                                    >
                                      {" "}
                                      Update Recipe{" "}
                                    </Text>
                                  </LinearGradient>
                                </TouchableOpacity>
                                <View style={styles.button}>
                                  <TouchableOpacity
                                    style={{ marginTop: 20 }}
                                    onPress={() => setShowModalUpdate(false)}
                                  >
                                    <LinearGradient
                                      colors={["#484C7F", "#484C7F"]}
                                      style={styles.modalButton}
                                    >
                                      <Text
                                        style={[
                                          styles.textSigns,
                                          { color: "white" },
                                        ]}
                                      >
                                        {" "}
                                        Return{" "}
                                      </Text>
                                    </LinearGradient>
                                  </TouchableOpacity>
                                </View>
                              </ScrollView>
                            </Modal>
                  
                {/* ADD RECIPES MODAL */}

                    <Modal visible={showModal} transparent={false}>
                      <ScrollView
                        style={{
                          width: "100%",
                          height: "30%",

                          alignSelf: "center",
                        }}
                      >
                        <Text style={styles.textSignModal}>Add Recipe</Text>
                        <View style={styles.action}>
                          <TextInput
                            placeholder="Add Dish Name"
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                        
                              setDishName(text);
                            }}
                          />
                        </View>
                        <View style={styles.action}>
                          <TextInput
                            placeholder="Add Ingredients"
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            autoCapitalize="none"
                            onChangeText={(text) => {
                              setIngredients(text);
                            }}
                          />
                        </View>
                        <View style={styles.action}>
                          <TextInput
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            placeholder="Add Method"
                            autoCapitalize="none"
                            onChangeText={(text) => {
                              setMethod(text);
                            }}
                          />
                        </View>
                        <View style={styles.action}>
                          <TextInput
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            placeholder="Add Dish URL"
                            autoCapitalize="none"
                            onChangeText={(text) => {
                              setDishUrl(text);
                            }}
                          />
                        </View>
                        <View style={styles.action}>
                          <TextInput
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            placeholder="Add Image URL"
                            autoCapitalize="none"
                            onChangeText={(text) => {
                              setImgUrl(text);
                            }}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={this.addRecipe}
                          style={[
                            styles.signUp,
                            {
                            //   borderColor: "#484C7F",
                            //   borderWidth: 0,
                              marginTop: 10,
                            //   paddingRight: 100,
                            //   margin: 20,
                            //   width: "170%",
                            //   paddingLeft: 60,
                            //   marginTop: 20,
                            },
                          ]}
                        >
                          <LinearGradient
                            colors={["#484C7F", "#484C7F"]}
                            style={styles.login}
                          >
                            <Text
                              style={[
                                styles.textSign,
                                {
                                  color: "white",
                                  fontFamily: "IowanOldStyle-Roman",
                                  // padding: 20,
                                },
                              ]}
                            >
                            {" "}
                              Add Recipe{" "}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        <View style={styles.button}>
                          <TouchableOpacity
                            onPress={() => setShowModal(false)}
                            style={[
                              styles.signUp,
                              {
                                borderColor: "#484C7F",
                                alignSelf: "center",
                                borderWidth: 0,
                                marginTop: 30,
                                // paddingRight: 100,
                                // margin: 20,
                                // width: "170%",
                                // paddingLeft: 100,
                              },
                            ]}
                          >
                            <LinearGradient
                              colors={["#484C7F", "#484C7F"]}
                              style={styles.modalButton}
                            >
                              <Text
                                style={[styles.textSigns, 
                                { color: "white" }]}
                              >
                                {" "}
                                Return{" "}
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </Modal>

                    {/* SHOW RECIPE */}

                    <Modal visible={showModalRecipe} transparent={false}>
                        <ScrollView
                          style={{
                            width: "100%",
                            height: "30%",
                            paddingLeft: 40,
                          }}
                        >
                          <Text style={styles.textSignModal}>
                            {activeRecipe.dishName}
                          </Text>
                          <Image
                            style={{
                              marginTop: -30,
                              width: 200,
                              height: 135,
                              alignSelf: "center",
                            }}
                            source={{ uri: activeRecipe.dishUrl }}
                          />
                          <Text
                            style={
                              (styles.InputField,
                              {
                                fontFamily: "IowanOldStyle-Roman",
                                fontWeight: "bold",
                                fontSize: 16,
                                marginBottom: 10,
                              })
                            }
                          >
                            {" "}
                            Ingredients:{" "}
                          </Text>
                          <Text
                            style={
                              (styles.InputField,
                              {
                                fontFamily: "IowanOldStyle-Roman",
                                paddingLeft: 30,
                              })
                            }
                          >
                            {activeRecipe.ingredients}
                            {"\n"}
                          </Text>
                          <Text
                            style={
                              (styles.InputField,
                              {
                                fontFamily: "IowanOldStyle-Roman",
                                fontWeight: "bold",
                                fontSize: 16,
                                marginBottom: 10,
                              })
                            }
                          >
                            {" "}
                            Method:{" "}
                          </Text>
                          <Text
                            style={
                              (styles.InputField,
                              {
                                fontFamily: "IowanOldStyle-Roman",
                                paddingLeft: 30,
                              })
                            }
                          >
                            {activeRecipe.method}
                            {"\n"}
                          </Text>

                          <View style={styles.button}>
                            <TouchableOpacity
                              onPress={() => setShowModalRecipe(false)}
                            >
                              <LinearGradient
                                colors={["#484C7F", "#484C7F"]}
                                style={styles.modalButton}
                              >
                                <Text
                                  style={[styles.textSign, { color: "white" }]}
                                >
                                  {" "}
                                  Return{" "}
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          </View>
                        </ScrollView>
                      </Modal>
                  </View>
              ) : (
                <Text> </Text>
              )}
              {loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={data}
                  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <View>


                      {isAdmin? 
                    (
                      <View>
                      <Text style={styles.textSign}>{item.dishName}</Text>

                      <Swipeable renderLeftActions={leftSwipe}
                      renderRightActions={rightSwipe}>
                      <Image
                        style={{
                          marginTop: -30,
                          width: 200,
                          height: 135,
                          alignSelf: "center",
                        }}
                        source={{ uri: item.dishUrl }}
                      />
                      </Swipeable>
                      </View>
                    ): 
                    (<View>
                      <Text style={styles.textSign}>{item.dishName}</Text>

                      <Swipeable 
                      renderRightActions={rightSwipe}>
                      <Image
                        style={{
                          marginTop: -30,
                          width: 200,
                          height: 135,
                          alignSelf: "center",
                        }}
                        source={{ uri: item.dishUrl }}
                      />
                      </Swipeable>
                      </View>
                      )}

                      

                      {/* <View style={styles.button}>
                        <TouchableOpacity onPress={() => {
                        setActiveRecipe(item)
                        setShowModalRecipe(true)}}>
                          <LinearGradient
                            colors={["#484C7F", "#484C7F"]}
                            style={styles.selectButton}
                          >
                            <Text style={[styles.textSign, { color: "white" }]}>
                              Show Recipe
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View> */}

                      {isAdmin ? (
                        <View
                            style={[
                              {
                                // flexDirection: "row",
                                marginTop: 10,
                                // padding: 20,
                              },
                            ]}
                          >
                            {/* <View
                              style={
                                {
                                  // flex: 2,
                                }
                              }
                            >
                              <TouchableOpacity
                        onPress={() => {
                                  setActiveBlog(item)
                                  setShowModalUpdate(true)
                                }}
                        style={{
                          backgroundColor: "#B9BBDF",
                          width: 50,
                          height:50,
                          justifyContent: "center",
                          alignItems: "center",
                          // padding: 10,
                          borderRadius: 100,
                        }}
                      >
                        <FontAwesome name="edit" size={25} 
                        // style={{borderRadius:100, color:"#B9BBDF" }}
                         color="black" />
                      </TouchableOpacity>
                            </View>

                            <View
                              style={{
                                // flex: 1,
                                paddingLeft: 20,
                              }}
                            >
                                <TouchableOpacity
                         onPress={() => deleteRecipe(activeBlog._id)}
                        style={{
                          backgroundColor: "#B9BBDF",
                          width: 50,
                          height:50,
                          justifyContent: "center",
                          alignItems: "center",
                          // padding: 10,
                          borderRadius: 100,
                        }}
                      >
                        <FontAwesome name="trash" size={25} 
                        // style={{borderRadius:100, color:"#B9BBDF" }}
                         color="black" />
                      </TouchableOpacity>
                            </View> */}
                          </View>
                      ) : (
                        <Text></Text>
                      )}
                      </View>
                  )}
                />
              )}
              
            </Animatable.View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: "white",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#484C7F",
    paddingBottom: 2,
    alignSelf:"center"
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
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    // paddingRight: 10,
    // paddingLeft:10,
    // marginBottom: 10,
    // marginTop: 5,
    // alignSelf: "center",
    fontFamily: "IowanOldStyle-Roman",
  },
  textSigns: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: "IowanOldStyle-Roman",
  },
  textSignModal: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 35,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
  signUp: {
    width: "80%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf:'center'
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5f9ea0",
  },
  InputField: {
    fontSize: 18,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 30,
    fontFamily: "IowanOldStyle-Roman",
    lineHeight: 25,
  },

  button: {
    alignItems: "center",
    marginTop: 20,
  },
  modalButton: {
    width: 120,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  selectButton: {
    // width: 160,
    // height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    paddingLeft: 25,
    paddingRight: 10,
    alignSelf: "center",
    // paddingBottom: -80,
  },
});
