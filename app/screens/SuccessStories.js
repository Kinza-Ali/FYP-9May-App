// import {json, response} from 'express';
import React, { useState, useEffect, Fragment } from "react";
import methods from "../connect/index";
// import Clipboard from '@react-native-community/clipboard';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";

import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";

import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import asyncStorage from "@react-native-community/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Avatar, Card } from "react-native-paper";
// import AsyncStorage from '@react-native-community/async-storage';
const blogUrl = "http://cfbe9d0112df.ngrok.io/api/successStories";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Blogs({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeBlog, setActiveBlog] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  // Pull to refresh method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(blogUrl)
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
    fetch(blogUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

  addStory = async () => {
    var response = await methods.post("successStories", { title, paragraph });
    setShowModal(false);
    onRefresh();
  };
  const updateStory = async (blog) => {
    var response = await methods.put("successStories/" + blog._id, {
      title: blog.title,
      paragraph: blog.paragraph,
    });
    setShowModalUpdate(false);
    onRefresh();
  };
  const deleteStory = async (id) => {
    var response = await methods.delete("successStories/" + id, {});
    // alert("Successfully deleted");
    onRefresh();
  };

  //............ SWIPEABLE
  const leftSwipe = (progress, dragX) => {

  };

  return (
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
            paddingRight: 80,
            fontSize: 25,
          }}
        >
          {" "}
          Success Stories
        </Text>
      </View>

      {/* // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}

      {/* <Animatable.View animation="fadeInUpBig" style={styles.footer}> */}
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
                // backgroundColor: "#B9BBDF",
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 100,
              }}
            >
              <Neomorph
                darkShadowColor={Colors.blackColor}
                // lightShadowColor='white'
                swapShadows
                style={styles.headerEndSection}
              >
                <FontAwesome name="plus" size={30} color="black" />
              </Neomorph>
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
                  Edit Success Stories
                </Text>
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder={activeBlog.title}
                  defaultValue={activeBlog.title}
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.title = text;
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Add paragraph"
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  defaultValue={activeBlog.paragraph}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    let objectLol = { ...activeBlog };
                    objectLol.paragraph = text;
                    setActiveBlog(objectLol);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => updateStory(activeBlog)}
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
                    Update Story{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </Modal>

          {/* ADD Success Stories MODAL */}

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
                    paddingRight: 120,
                    fontSize: 25,
                  }}
                >
                  {" "}
                  Add Story
                </Text>
              </View>

              <View style={styles.action}>
                <TextInput
                  placeholder="Add title"
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setTitle(text);
                  }}
                />
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Add paragraph"
                  style={{
                    fontFamily: Colors.fontFamily,
                    fontSize: 20,
                    paddingBottom: 20,
                    paddingTop: 20,
                  }}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setParagraph(text);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={this.addStory}
                style={[
                  styles.signUp,
                  {
                    borderColor: "#484C7F",
                    borderWidth: 0,
                    marginTop: 0,
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
                        // padding: 20,
                      },
                    ]}
                  >
                    {" "}
                    Add Story{" "}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
              {isAdmin ? (
                <Swipeable renderLeftActions={(progress,dragX) => {
                      const scale = dragX.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 1],
                      extrapolate: "clamp",
                    });
                    return (
                      <View style={{ marginTop: perfectSize(100) }}>
                        <View>
                          <TouchableOpacity
                            onPress={() => deleteStory(item._id)}
                            style={{
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

                        <View style={{ marginTop: perfectSize(30) }}>
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
                }}>
                  <ScrollView>
                    <View style={{ marginTop: perfectSize(50) }}>
                      <View>
                        <View style={styles.cardDesigns}>
                          <Neomorph
                            // lightShadowColor="#D0E6A5"
                            // darkShadowColor="#D0E6A5" // <- set this
                            swapShadows
                            style={styles.menuItems}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                paddingLeft: 20,
                                marginTop: 15,
                              }}
                            >
                              <View>
                                <Avatar.Image
                                  source={{
                                    uri:
                                      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                                  }}
                                  size={30}
                                  backgroundColor="#B9BBDF"
                                  containerStyle={{
                                    marginBottom: 200,
                                  }}
                                />

                                <Text style={styles.textSign}>
                                  {item.title}
                                </Text>

                                <Text style={styles.InputField}>
                                  {item.paragraph}
                                  {"\n"}
                                </Text>
                              </View>
                            </View>
                          </Neomorph>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </Swipeable>
              ) : (
                <ScrollView>
                  <View style={{ marginTop: perfectSize(30) }}>
                    <View>
                      <View style={styles.cardDesigns}>
                        <Neomorph
                          // lightShadowColor="#D0E6A5"
                          // darkShadowColor="#D0E6A5" // <- set this
                          swapShadows
                          style={styles.menuItems}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              paddingLeft: 20,
                              marginTop: 15,
                            }}
                          >
                            <View>
                              <Avatar.Image
                                source={{
                                  uri:
                                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                                }}
                                size={30}
                                backgroundColor="#B9BBDF"
                                containerStyle={{
                                  marginBottom: 200,
                                }}
                              />

                              <Text style={styles.textSign}>{item.title}</Text>

                              <Text style={styles.InputField}>
                                {item.paragraph}
                                {"\n"}
                              </Text>
                            </View>
                          </View>
                        </Neomorph>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              )}
            </View>
          )}
        />
      )}
      {/* </Animatable.View> */}
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
    // paddingTop:40,
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
    // alignSelf: "center",
    // paddingLeft: 10,
    paddingRight: 10,
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
  modalButton: {
    width: 120,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  signUp: {
    width: "150%",
    height: 40,
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
  InputFields: {
    fontSize: 18,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 30,
    fontFamily: Colors.fontFamily,
  },
  textSignModal: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 35,
    paddingLeft: 10,
    fontFamily: Colors.fontFamily,
    alignSelf: "center",
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
    marginBottom: perfectSize(20),
  },
});
