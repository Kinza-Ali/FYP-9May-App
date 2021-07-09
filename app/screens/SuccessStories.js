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
  TextInput
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import asyncStorage from "@react-native-community/async-storage";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { handleScheduleNotification } from "../../src/notification.ios";
import { Avatar, Card } from "react-native-paper";
// import AsyncStorage from '@react-native-community/async-storage';
const blogUrl = "http://fca3858760ac.ngrok.io/api/successStories";
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
  };
  const updateStory = async (blog) => {
    var response = await methods.put("successStories/" + blog._id, {
      title: blog.title,
      paragraph: blog.paragraph,
    });
  };
  const deleteStory = async (id) => {
    var response = await methods.delete("successStories/" + id, {});
    alert("Successfully deleted");
  };

  //............ SWIPEABLE
const leftSwipe = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
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
      // width: 50,
      // height:50,
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
        // width: 50,
        // height:50,
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
                marginRight: 120,
                fontFamily: "IowanOldStyle-Roman",
              }}
            >
              Success Stories
            </Text>
          </View>
          <View style={styles.container}>
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
                            <View style={{
                              flexDirection:'row'
                            }}>
                              {/* <View style={styles.button}> */}
                                <TouchableOpacity
                                  onPress={() => setShowModalUpdate(false)}
                                  style={{
                                    backgroundColor: "#484C7F",
                                    width: 30,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // padding: 10,
                                    borderRadius: 100,
                                    marginTop:35,
                                    marginRight:5
                                  }}
                                >
                                 <FontAwesome name="arrow-circle-left" size={25} color="white" />
                                </TouchableOpacity>
                            {/* </View> */}
                                <Text style={styles.textSignModal}>
                                  Edit Success Stories
                                </Text>
                                </View>

                                <View style={styles.action}>
                                  <TextInput
                                    placeholder={activeBlog.title}
                                    defaultValue={activeBlog.title}
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.title = text
                                      setActiveBlog(objectLol);
                                    }}
                                  />
                                </View>
                                <View style={styles.action}>
                                  <TextInput
                                    placeholder="Add paragraph"
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.paragraph}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.paragraph = text
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
                                          fontFamily: "IowanOldStyle-Roman",
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
                      <View style={{
                              flexDirection:'row',
                              marginLeft:20
                            }}>
                              {/* <View style={styles.button}> */}
                                <TouchableOpacity
                                  onPress={() => setShowModal(false)}
                                  style={{
                                    backgroundColor: "#484C7F",
                                    width: 30,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // padding: 10,
                                    borderRadius: 100,
                                    marginTop:35,
                                    marginRight:5
                                  }}
                                >
                                 <FontAwesome name="arrow-circle-left" size={25} color="white" />
                                </TouchableOpacity>
                            {/* </View> */}
                                <Text style={styles.textSignModal}>
                                Add Story
                                </Text>
                                </View>
                      
                        <View style={styles.action}>
                          <TextInput
                            placeholder="Add title"
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
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
                              fontFamily: "IowanOldStyle-Roman",
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
                                  fontFamily: "IowanOldStyle-Roman",
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
                      {isAdmin? (
                        <Swipeable renderLeftActions={leftSwipe}>
                        <Card>
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
                      
                      <Text style={styles.textSign}>{item.title} 
                       </Text>
                       
                      <Text style={styles.InputField}>
                        {item.paragraph}
                        {"\n"}
                      </Text>

                      </View>
                      
                      </Card>
                      </Swipeable>
                    
                      
                      )
                      :(
                         <Card>
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

                      <Text style={styles.textSign}>{item.title}
                      </Text>
                      
                      <Text style={styles.InputField}>
                        {item.paragraph}
                        {"\n"}
                      </Text>

                      </View>
                      </Card>)}
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
    fontFamily: "IowanOldStyle-Roman",
  },
  textSignModal: {
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 35,
    paddingLeft:10,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
});
