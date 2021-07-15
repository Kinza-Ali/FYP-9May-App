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
  Animated,
  Linking
} from "react-native";

import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import asyncStorage from "@react-native-community/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { error } from "react-native-gifted-chat/lib/utils";
// import {handleScheduleNotification} from '../../src/notification.ios';
// import AsyncStorage from '@react-native-community/async-storage';
const recipesUrl = "http://32bd3a008ef7.ngrok.io/api/recipes";

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
  const [activeRecipe, setActiveRecipe] = React.useState("");

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
    })
    .then(()=>{
      setShowModal(false);
      onRefresh();
      console.log("==================");
      console.log(response.response);
      console.log(dishName + ingredients + method + dishUrl + imgUrl);
      console.log("+++++++++++++++++++++");
    })
    .catch((error)=> {
      console.log(error);
    });
    
  };

  //....... UPDATE RECIPE
  const updateRecipe = async (recipe) => {
    var response = await methods.put("recipes/" + recipe._id, {
      dishName: recipe.dishName,
      ingredients: recipe.ingredients,
      method: recipe.method,
      dishUrl: recipe.dishUrl,
      imgUrl: recipe.imgUrl,
    });
    setShowModalUpdate(false);
    onRefresh();
    console.log("==================");
    console.log(response.response);
  };

  //....... DELETE RECIPE
  const deleteRecipe = async (id) => {
    var response = await methods.delete("recipes/" + id, {});
    alert("Successfully deleted");
    onRefresh();
    console.log("==================");
    console.log(response);
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
        <Neomorph
          style={[
            styles.BackIcons,
            {
              borderRadius: perfectSize(30),
              height: perfectSize(56),
              width: perfectSize(56),
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
        </Neomorph>
        <Text
          style={{
            color: Colors.defaultDark,
            fontWeight: "bold",
            fontFamily: Colors.fontFamily,
            paddingRight: 140,
            fontSize: 25,
          }}
        >
          {" "}
          Recipes
        </Text>
      </View>
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
          <Modal visible={showModalUpdate} transparent={false}>
            <ScrollView
              style={{
                width: "100%",
                height: "30%",
                paddingLeft: 40,
              }}
            >
              <View style={styles.drawerHeader}>
                <Neomorph
                  style={[
                    styles.BackIcons,
                    {
                      borderRadius: perfectSize(30),
                      height: perfectSize(56),
                      width: perfectSize(56),
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setShowModalUpdate(false)}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                  </TouchableOpacity>
                </Neomorph>
                <Text
                  style={{
                    color: Colors.defaultDark,
                    fontWeight: "bold",
                    fontFamily: Colors.fontFamily,
                    paddingRight: 80,
                    fontSize: 25,
                  }}
                >
                  {" "}
                  Edit Recipes
                </Text>
              </View>

              <View style={styles.action}>
                <TextInput
                  placeholder={activeBlog.dishName}
                  defaultValue={activeBlog.dishName}
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.dishName = text;
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Add Ingredients"
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  defaultValue={activeBlog.ingredients}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.ingredients = text;
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  defaultValue={activeBlog.method}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.method = text;
                    console.log("TESTING ********");
                    console.log(objectLol);
                    console.log("TESTING ********");
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  defaultValue={activeBlog.dishUrl}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.dishUrl = text;
                    console.log("TESTING ********");
                    console.log(objectLol);
                    console.log("TESTING ********");
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  defaultValue={activeBlog.imgUrl}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.imgUrl = text;
                    console.log("TESTING ********");
                    console.log(objectLol);
                    console.log("TESTING ********");
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
                        fontFamily: Colors.fontFamily,
                      },
                    ]}
                  >
                    {" "}
                    Update Recipe{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
              <View style={styles.drawerHeader}>
                <Neomorph
                  style={[
                    styles.BackIcons,
                    {
                      borderRadius: perfectSize(30),
                      height: perfectSize(56),
                      width: perfectSize(56),
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                  </TouchableOpacity>
                </Neomorph>
                <Text
                  style={{
                    color: Colors.defaultDark,
                    fontWeight: "bold",
                    fontFamily: Colors.fontFamily,
                    paddingRight: 80,
                    fontSize: 25,
                  }}
                >
                  {" "}
                  Add Recipes
                </Text>
              </View>

              <View style={styles.action}>
                <TextInput
                  placeholder="Add Dish Name"
                  style={{
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                        fontFamily: Colors.fontFamily,
                        // padding: 20,
                      },
                    ]}
                  >
                    {" "}
                    Add Recipe{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </Modal>

          {/* SHOW RECIPE */}

          <Modal visible={showModalRecipe} transparent={false}>
          <View style={styles.drawerHeader}>
          <Neomorph
                  style={[
                    styles.BackIcons,
                    {
                      borderRadius: perfectSize(30),
                      height: perfectSize(56),
                      width: perfectSize(56),
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setShowModalRecipe(false)}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                  </TouchableOpacity>
                </Neomorph>
          </View>
            <ScrollView
              style={{
                width: "100%",
                height: "30%",
                paddingLeft: 2,
                paddingRight:5
              }}
            >
              <Text style={styles.textSignModal}>{activeRecipe.dishName}</Text>
              <Image
                style={{
                  marginTop: 10,
                  width: 200,
                  height: 135,
                  alignSelf: "center",
                  marginBottom:20
                }}
                source={{ uri: activeRecipe.imgUrl}}
              />
              <Text
                style={
                  (styles.InputField,
                  {
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
                    paddingLeft: 30,
                  })
                }
              >
                {activeRecipe.method}
                {"\n"}
              </Text>
            </ScrollView>
          </Modal>
        </View>
      ) : (
            <View>
            <Modal visible={showModalRecipe} transparent={false}>
          <View style={styles.drawerHeader}>
          <Neomorph
                  style={[
                    styles.BackIcons,
                    {
                      borderRadius: perfectSize(30),
                      height: perfectSize(56),
                      width: perfectSize(56),
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => setShowModalRecipe(false)}>
                    <FontAwesome name="arrow-left" size={20} color="black" />
                  </TouchableOpacity>
                </Neomorph>
          </View>
            <ScrollView
              style={{
                width: "100%",
                height: "30%",
                paddingLeft: 2,
                paddingRight:5
              }}
            >
              <Text style={styles.textSignModal}>{activeRecipe.dishName}</Text>
              <Image
                style={{
                  marginTop: 10,
                  width: 200,
                  height: 135,
                  alignSelf: "center",
                  marginBottom:20
                }}
                source={{ uri: activeRecipe.imgUrl}}
              />
              <Text
                style={
                  (styles.InputField,
                  {
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
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
                    fontFamily: Colors.fontFamily,
                    paddingLeft: 30,
                  })
                }
              >
                {activeRecipe.method}
                {"\n"}
              </Text>
            </ScrollView>
          </Modal>
          </View>
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
              {isAdmin ? (
                <View>
                  <ScrollView>
                    <View style={{ marginTop: perfectSize(30) }}>
                      <View>
                        <Swipeable
                          renderLeftActions={(dragX, progress) => {
                            const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    // console.log(activeBlog._id)
    // console.log("***************************")
    return (
      <View style={{ marginTop: perfectSize(50) }}>
        <View>
          <TouchableOpacity
            onPress={() => deleteRecipe(item._id)}
            style={{
              // backgroundColor: "#B9BBDF",
              // width: 50,
              // height:50,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
              // borderRadius: 100,
            }}
          >
            <FontAwesome
              name="trash"
              size={30}
              // style={{borderRadius:100, color:"#B9BBDF" }}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: perfectSize(40) }}>
          <TouchableOpacity
            onPress={() => {
              setActiveBlog(item);
              setShowModalUpdate(true);
            }}
            style={{
              // backgroundColor: "#B9BBDF",
              // width: 50,
              // height:50,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 20,
              // borderRadius: 100,
            }}
          >
            <FontAwesome
              name="edit"
              size={30}
              // style={{borderRadius:100, color:"#B9BBDF" }}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
       }}
                renderRightActions={(dragX, progress)=> {
                    const scale = dragX.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 1],
                  extrapolate: "clamp",
                });
                    return (
                  <View style={{ marginTop: perfectSize(90) }}>
                    <TouchableOpacity
                      onPress={() => {
                        setActiveRecipe(item);
                        setShowModalRecipe(true);
                      }}
                      style={{
                        // backgroundColor: "#B9BBDF",
                        // width: 100,
                        // height:100,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight: 20,
                        // padding: 10,
                        // borderRadius: 100,
                      }}
                    >
                      <FontAwesome
                        name="eye"
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                );
                    }}
                  >
                          <View style={styles.cardDesigns}>
                            <Neomorph
                              swapShadows
                              style={styles.menuItems}
                            >
                              <View
                                style={{
                                  flexDirection: "column",
                                  paddingLeft: 20,
                                  marginTop: 15,
                                }}
                              >
                                <Text style={styles.textSign}>
                                  {item.dishName}
                                </Text>
                                <Image
                                  style={{
                                    marginTop: 2,
                                    width: 200,
                                    height: 135,
                                    alignSelf: "center",
                                  }}
                                  source={{ uri: item.imgUrl}}
                                />
                              </View>
                            </Neomorph>
                          </View>
                        </Swipeable>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              ) : (
                <View>
                  <ScrollView>
                    <View style={{ marginTop: perfectSize(50) }}>
                      <View>
                        <Swipeable renderRightActions={(dragX, progress)=> {
                            const scale = dragX.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0, 1],
                            extrapolate: "clamp",
                          });
                              return (
                            <View style={{ marginTop: perfectSize(90) }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setActiveRecipe(item);
                                  setShowModalRecipe(true);
                                  console.log("okkkkk");
                                }}
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                  paddingRight: 20,
                                }}
                              >
                                <FontAwesome
                                  name="eye"
                                  size={30}
                                  color="black"
                                />
                              </TouchableOpacity>
                            </View>
                          );
                          }}>
                          <View style={styles.cardDesigns}>
                            <Neomorph
                              swapShadows
                              style={styles.menuItems}
                            >
                              <View
                                style={{
                                  flexDirection: "column",
                                  paddingLeft: 20,
                                  marginTop: 15,
                                }}
                              >
                                <Text style={styles.textSign}>
                                  {item.dishName}
                                </Text>

                                <Image
                                  style={{
                                    marginTop: 2,
                                    width: 200,
                                    height: 135,
                                    alignSelf: "center",
                                  }}
                                  source={{ uri: item.imgUrl}}
                                />
                              </View>
                            </Neomorph>
                          </View>
                        </Swipeable>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              )}

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
                </View>
              ) : (
                <Text></Text>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    fontFamily: Colors.fontFamily,
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
    alignSelf: "center",
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
    fontFamily: Colors.fontFamily,
  },
  textSigns: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    fontFamily: Colors.fontFamily,
  },
  textSignModal: {
    fontSize: 30,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 35,
    fontFamily: Colors.fontFamily,
    alignSelf: "center",
  },
  signUp: {
    width: "80%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
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
    fontFamily: Colors.fontFamily,
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

  // NEW................................................

  drawerHeader: {
    height: perfectSize(50),
    width: "100%",
    marginTop: perfectSize(50),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  user: {
    height: perfectSize(50),
    width: "100%",
    // marginTop: perfectSize(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    color: Colors.defaultDark,
    fontSize: perfectSize(15),
    alignSelf: "center",
  },
  headerEndSection: {
    height: perfectSize(60),
    width: perfectSize(60),
    borderRadius: perfectSize(30),
    backgroundColor: "#B9BBDF",
    shadowRadius: 20,
    // borderRadius: perfectSize(23),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerNotificationIcon: {
    height: perfectSize(25),
    width: perfectSize(25),
    tintColor: Colors.defaultDark,
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
    height: perfectSize(240),
    width: perfectSize(380),
    backgroundColor: Colors.containerBg,
    shadowRadius: 6,
    borderRadius: 23,
    // alignItems: 'center',
    borderColor: Colors.defaultDark,
    borderRadius: 23,
    // borderWidth:1
  },
  menuItemsSnacks: {
    height: perfectSize(120),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    // alignItems: 'center',
    borderColor: Colors.defaultDark,
    borderRadius: 23,
    // borderWidth:1
  },
  menuIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.backgroundColor,
    // shadowRadius: 10,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  BackIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.containerBg,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcons: {
    height: perfectSize(50),
    width: perfectSize(50),
    backgroundColor: Colors.redDotColor,
    shadowRadius: 5,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  ageIcons: {
    height: perfectSize(50),
    width: perfectSize(100),
    borderRadius: perfectSize(18),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  icon: {
    height: perfectSize(25),
    width: perfectSize(25),
    marginBottom: 4,
  },
  Modalicon: {
    height: perfectSize(150),
    width: perfectSize(150),
    marginBottom: 4,
    marginTop: 100,
    borderRadius: 150,
    borderColor: "#D7E1F3",
    borderWidth: 10,
  },
  dietIcon: {
    height: perfectSize(60),
    width: perfectSize(60),
    marginBottom: 4,
  },
  textIcon: {
    fontFamily: Colors.fontFamily,
    fontWeight: "bold",
    fontSize: perfectSize(22),
    marginTop: perfectSize(5),
  },

  footer: {
    height: perfectSize(50),
    width: perfectSize(300),
    backgroundColor: Colors.backgroundColor,
    shadowRadius: 10,
    borderRadius: 23,
    marginTop: perfectSize(23),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  footerIcon: {
    height: perfectSize(18),
    width: perfectSize(18),
    tintColor: Colors.headerTextColor,
  },
  cardDesigns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: perfectSize(10),
  },
});
