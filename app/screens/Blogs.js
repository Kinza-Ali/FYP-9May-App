// import {json, response} from 'express';
import React, { useState, useEffect, useCallback } from "react";
import methods from "../connect/index";
// import Clipboard from '@react-native-community/clipboard';
import {
  Text,
  SafeAreaView,
  View,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import asyncStorage from "@react-native-community/async-storage";
// import { handleScheduleNotification } from "../../src/notification.ios";
// // import { deleteStory } from "./CrudApi";
// // import AsyncStorage from '@react-native-community/async-storage';
const baseUrl ='http://213ee72b0857.ngrok.io/api/blogs';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};
export default function Blogs({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [url, setUrl] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);
  const [activeBlog, setActiveBlog] = React.useState("");

  // Pull to refresh method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(baseUrl)
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
      // alert("Failed to fetch the data from storage");
    }
  };


  //fetching data from blogs api
  // console.log(isAdmin);

  useEffect(() => {
    readData()
    fetch(baseUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

  //---------
  const updateStory = async (blog) => {
    blogUrl = url;
    var response = await methods.put("blogs/" + blog._id, {
      title: blog.title,
      paragraph: blog.paragraph,
      blogUrl: blog.blogUrl
    });
    console.log("==================");
    
    console.log(response.response);
    console.log("============");
  };
  // //-------------- Add Story Method
  addStory = async () => {
    blogUrl = url;
    await methods.post("blogs", { title, paragraph, blogUrl });

    console.log("============" + title + "==========" + paragraph);
  };
  //------------
 const deleteStory = async (id) => {
    var response = await methods.delete("blogs/" + id, {});
    alert("Successfully deleted");
    console.log(response)
  };
  //-------------
  return (
    <View style={{ flex: 1 }}>
      
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
                fontFamily: "IowanOldStyle-Roman",
              }}
            >
              Blogs
            </Text>
            <View />
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
                                <Text style={styles.textSignModal}>
                                  Edit Story
                                </Text>
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
                                <View style={styles.action}>
                                  <TextInput
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                      fontSize: 20,
                                      paddingBottom: 20,
                                      paddingTop: 20,
                                    }}
                                    defaultValue={activeBlog.blogUrl}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      let objectLol = {...activeBlog}
                                      objectLol.blogUrl = text
                                      console.log("TESTING ********")
                                      console.log(objectLol)
                                      console.log("TESTING ********")
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

                    <Modal visible={showModal} transparent={false}>
                      <ScrollView
                        style={{
                          width: "100%",
                          height: "30%",

                          alignSelf: "center",
                        }}
                      >
                        <Text style={styles.textSignModal}>Add Story</Text>
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
                        <View style={styles.action}>
                          <TextInput
                            style={{
                              fontFamily: "IowanOldStyle-Roman",
                              fontSize: 20,
                              paddingBottom: 20,
                              paddingTop: 20,
                            }}
                            placeholder="Add Blog Url"
                            autoCapitalize="none"
                            onChangeText={(text) => {
                              setUrl(text);
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
                        <View style={styles.button}>
                          <TouchableOpacity
                            onPress={() => setShowModal(false)}
                            style={[
                              styles.signUp,
                              {
                                borderColor: "#484C7F",
                                alignSelf: "center",
                                borderWidth: 0,
                                marginTop: 20,
                                paddingRight: 100,
                                // margin: 20,
                                width: "170%",
                                paddingLeft: 100,
                              },
                            ]}
                          >
                            <LinearGradient
                              colors={["#484C7F", "#484C7F"]}
                              style={styles.modalButton}
                            >
                              <Text
                                style={[styles.textSigns, { color: "white" }]}
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
                        <Text style={styles.textSign}>
                          {item.title}
                          {"\n"}
                        </Text>

                        <Text style={styles.InputField}>
                          {item.paragraph}
                          {"\n"}
                        </Text>
                        <OpenURLButton url={item.blogUrl}>
                          Read More...
                        </OpenURLButton>
                        <Text>{"\n"}</Text>
                        {isAdmin ? (
                          // <Button
                          //   onPress={() => {
                          //     asyncStorage.setItem(
                          //       "currentItem",
                          //       JSON.stringify(item)
                          //     );
                          //     navigation.navigate("AdminBlog", item);
                          //   }}
                          //   title="edit"
                          // />
                          <View
                            style={[
                              {
                                // flexDirection: "row",
                                marginTop: 10,
                                // padding: 20,
                              },
                            ]}
                          >
                            <View
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
                                style={[
                                  styles.signUp,
                                  {
                                    borderColor: "#484C7F",
                                    alignItems: "flex-end",
                                  },
                                ]}
                              >
                                <LinearGradient
                                  colors={["#484C7F", "#484C7F"]}
                                  style={styles.login}
                                >
                                  <Text
                                    style={[
                                      styles.textSigns,
                                      { color: "white" },
                                    ]}
                                  >
                                    {" "}
                                    Edit{" "}
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>
                            </View>
                            

                            <View
                              style={{
                                // flex: 1,

                                paddingLeft: 20,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => deleteStory(activeBlog._id)}
                                style={[
                                  styles.signUp,
                                  {
                                    borderColor: "#484C7F",
                                    alignItems: "flex-end",
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
                                      { color: "white" },
                                    ]}
                                  >
                                    {" "}
                                    Delete{" "}
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>
                            </View>
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
    // justifyContent: "flex-end",
    paddingHorizontal: 10,
    // paddingBottom: 10,
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
    marginTop: 0,
    borderBottomWidth: 1,
    alignSelf: "center",
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
    alignSelf: "center",
    paddingLeft: 10,
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
  InputField: {
    fontSize: 18,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 30,
    lineHeight: 25,
    fontFamily: "IowanOldStyle-Roman",
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
    width: 160,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 10,
    alignSelf: "center",
    paddingBottom: -80,
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
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#484C7F",
    paddingBottom: 2,
    // paddingTop:40,
    alignSelf: "center",
  },
});
