import React, { useState, useEffect, useCallback } from "react";
import methods from "../connect/index";
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
  Linking,
} from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import perfectSize from "../assets/themes/Screen";
import Colors from "../assets/themes/Colors";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import asyncStorage from "@react-native-community/async-storage";
import Swipeable from "react-native-gesture-handler/Swipeable";
// import AsyncStorage from '@react-native-community/async-storage';
const baseUrl = "http://localhost:3001/api/blogs/";

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
  const [refreshing, setRefreshing] = useState(false);
  const [activeBlog, setActiveBlog] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

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

  //------------ Read Data --------------
  const readData = async () => {
    try {
      const adminState = await asyncStorage.getItem("isAdmin");

      if (adminState !== null) {
        setAdmin(adminState);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  //fetching data from blogs api
  useEffect(() => {
    readData();
    fetch(baseUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);
  //-------------- Update Story Method -----------
  const updateStory = async (blog) => {
    blogUrl = url;
    var response = await methods.put("blogs/" + blog._id, {
      title: blog.title,
      paragraph: blog.paragraph,
      blogUrl: blog.blogUrl,
    });
    setShowModalUpdate(false);
    onRefresh();
    console.log("==================");

    console.log(response.response);
    console.log("============");
  };
  //-------------- Add Story Method -------------
  addStory = async () => {
    blogUrl = url;
    console.log(
      "============" +
        title +
        "==========" +
        paragraph +
        "-----------" +
        blogUrl
    );
    await methods.post("blogs", { title, paragraph, blogUrl });
    setShowModal(false);
    onRefresh();
    console.log("============" + title + "==========" + paragraph);
  };
  //------------ Delete Story Method ---------
  const deleteStory = async (id) => {
    var response = await methods.delete("blogs/" + id, {});
    onRefresh();
    // alert("Successfully deleted");
    console.log(response);
  };

  //--------- SWIPEABLE ----------------
  const leftSwipe = (progress, dragX) => {};

  return (
    <View style={styles.container}>
      {/* *********************** Header *************************** */}
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
            paddingRight: 150,
            fontSize: 25,
          }}
        >
          {" "}
          Blogs
        </Text>
      </View>

      {/* // ++++++++++++++++++++++++++++++++++ BODY +++++++++++++++++++++++++++++++++ */}
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
                  Edit Blog
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
          {/* ADD Blogs MODAL */}
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
                  Add Blog
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
              <View style={styles.action}>
                <TextInput
                  style={{
                    fontFamily: Colors.fontFamily,
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
                        fontFamily: Colors.fontFamily,
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
                <Swipeable
                  renderLeftActions={(progress, dragX) => {
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
                            }}
                          >
                            <FontAwesome name="trash" size={30} color="black" />
                          </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: perfectSize(30) }}>
                          <TouchableOpacity
                            onPress={() => {
                              setActiveBlog(item);
                              setShowModalUpdate(true);
                            }}
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              paddingLeft: 20,
                            }}
                          >
                            <FontAwesome name="edit" size={30} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }}
                >
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
                                <Text style={styles.textSign}>
                                  {item.title}{" "}
                                </Text>
                                <Text style={styles.InputField}>
                                  {item.paragraph}
                                  {"\n"}
                                </Text>
                                <OpenURLButton url={item.blogUrl}>
                                  Read More...
                                </OpenURLButton>
                                <Text> {"\n"}</Text>
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
                              <Text style={styles.textSign}>{item.title} </Text>
                              <Text style={styles.InputField}>
                                {item.paragraph}
                                {"\n"}
                              </Text>
                              <OpenURLButton url={item.blogUrl}>
                                Read More...
                              </OpenURLButton>
                              <Text> {"\n"}</Text>
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
    right: perfectSize(60),
  },
  menuItems: {
    height: perfectSize(240),
    width: perfectSize(380),
    backgroundColor: Colors.containerBg,
    shadowRadius: 6,
    borderRadius: 23,
    borderColor: Colors.defaultDark,
    borderRadius: 23,
  },
  menuItemsSnacks: {
    height: perfectSize(120),
    width: perfectSize(400),
    backgroundColor: Colors.containerBg,
    shadowRadius: 12,
    borderRadius: 23,
    borderColor: Colors.defaultDark,
    borderRadius: 23,
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
