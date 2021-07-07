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
import { handleScheduleNotification } from "../../src/notification.ios";
// import { deleteStory } from "./CrudApi";
// import AsyncStorage from '@react-native-community/async-storage';
const blogUrl = "http://192.168.18.3:3001/api/blogs";
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
  // const [blogUrl, seblogUrl] = useState("");

  const [showModal, setShowModal] = useState(false);
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);

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
      // alert("Failed to fetch the data from storage");
    }
  };
  readData();
  //fetching data from blogs api
  // console.log(isAdmin);

  useEffect(() => {
    fetch(blogUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);

  //---------
  updateStory = async (id) => {
    var response = await methods.put("blogs/" + id, {
      title,
      paragraph,
      blogUrl,
    });
    console.log("==================");
    console.log(response);
    console.log("============" + title + "==========" + paragraph + id);
  };
  // //-------------- Add Story Method
  addStory = async () => {
    var response = await methods.post("blogs", { title, paragraph });

    console.log("============" + title + "==========" + paragraph);
  };
  //------------
  deleteStory = async (id) => {
    var response = await methods.delete("blogs/" + id, {});
    alert("Successfully deleted");
  };
  //-------------
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
              <View style={styles.header}></View>

              <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                      <Text>
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
                        {"\n"}
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
                            style={{
                              flexDirection: "row",
                            }}
                          >
                            <View
                              style={{
                                flex: 3,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => setShowModal(false)}
                                style={[
                                  styles.signUp,
                                  {
                                    borderColor: "#484C7F",
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
                                    Edit{" "}
                                  </Text>
                                </LinearGradient>
                              </TouchableOpacity>
                              <Modal visible={showModal} transparent={false}>
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
                                  <TextInput
                                    placeholder={item.title}
                                    defaultValue={item.title}
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      setTitle(text);
                                    }}
                                  />
                                  <TextInput
                                    placeholder="Add paragraph"
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                    }}
                                    defaultValue={item.paragraph}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      setParagraph(text);
                                    }}
                                  />
                                  <TextInput
                                    style={{
                                      fontFamily: "IowanOldStyle-Roman",
                                    }}
                                    defaultValue={item.blogUrl}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                      setblogUrl(text);
                                    }}
                                  />
                                  <TouchableOpacity
                                    onPress={this.updateStory(id)}
                                    style={[
                                      styles.signUp,
                                      {
                                        borderColor: "#484C7F",
                                        borderWidth: 0,
                                        marginTop: 0,
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
                                      onPress={() => setShowModal(false)}
                                    >
                                      <LinearGradient
                                        colors={["#484C7F", "#484C7F"]}
                                        style={styles.modalButton}
                                      >
                                        <Text
                                          style={[
                                            styles.textSign,
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
                            </View>
                            <View
                              style={{
                                flex: 3,

                                paddingLeft: 20,
                              }}
                            >
                              <TouchableOpacity
                                // onPress={deleteStory(id)}
                                style={[
                                  styles.signUp,
                                  {
                                    borderColor: "#484C7F",
                                    borderWidth: 0,

                                    // marginTop: 20,
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
                      </Text>
                    )}
                  />
                )}
                {isAdmin ? (
                  <View>
                    <Button
                      title="Edit Blogs"
                      onPress={() => navigation.navigate("AdminBlog")}
                    />
                  </View>
                ) : (
                  <Text> </Text>
                )}
              </Animatable.View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
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
  signUp: {
    width: "200%",
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
});
