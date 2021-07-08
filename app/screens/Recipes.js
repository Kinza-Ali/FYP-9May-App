// import {json, response} from 'express';
import React, { useState, useEffect } from "react";
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
  Dimensions,
  Image,
  Modal,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import * as Animatable from "react-native-animatable";
import asyncStorage from "@react-native-community/async-storage";
// import {handleScheduleNotification} from '../../src/notification.ios';
// import AsyncStorage from '@react-native-community/async-storage';
const recipesUrl = "http://213ee72b0857.ngrok.io/api/recipes";

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
  const [showModal, setShowModal] = useState(false);
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);

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
  readData();
  //fetching data from blogs api
  // console.log(isAdmin);

  useEffect(() => {
    fetch(recipesUrl)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => alert(error))
      .finally(setLoading(false));
  }, []);
  //.......

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
                marginRight: 160,
                fontFamily: "IowanOldStyle-Roman",
              }}
            >
              Recipes
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollView}>
            {/* <View style={styles.container}> */}
            <View style={styles.header}></View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <FlatList
                  data={data}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <ScrollView>
                      <Text style={styles.textSign}>{item.dishName}</Text>
                      <Image
                        style={{
                          marginTop: -30,
                          width: 200,
                          height: 135,
                          alignSelf: "center",
                        }}
                        source={{ uri: item.dishUrl }}
                      />
                      <View style={styles.button}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                          <LinearGradient
                            colors={["#484C7F", "#484C7F"]}
                            style={styles.selectButton}
                          >
                            <Text style={[styles.textSign, { color: "white" }]}>
                              Show Recipe
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>

                      <Modal visible={showModal} transparent={false}>
                        <ScrollView
                          style={{
                            width: "100%",
                            height: "30%",
                            paddingLeft: 40,
                          }}
                        >
                          <Text style={styles.textSignModal}>
                            {item.dishName}
                          </Text>
                          <Image
                            style={{
                              marginTop: -30,
                              width: 200,
                              height: 135,
                              alignSelf: "center",
                            }}
                            source={{ uri: item.dishUrl }}
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
                            {item.ingredients}
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
                            {item.method}
                            {"\n"}
                          </Text>

                          <View style={styles.button}>
                            <TouchableOpacity
                              onPress={() => setShowModal(false)}
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

                      {isAdmin ? (
                        <Button
                          onPress={() => {
                            asyncStorage.setItem(
                              "Recipe",
                              JSON.stringify(item)
                            );
                            navigation.navigate("AdminRecipe", item);
                          }}
                          title="edit"
                        />
                      ) : (
                        <Text></Text>
                      )}
                    </ScrollView>
                  )}
                />
              )}
              {isAdmin ? (
                <View>
                  <Button
                    title="Edit Recipe"
                    onPress={() => navigation.navigate("AdminRecipe")}
                  />
                </View>
              ) : (
                <Text> </Text>
              )}
            </Animatable.View>
            {/* </View> */}
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
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 5,
    // alignSelf: "center",
    fontFamily: "IowanOldStyle-Roman",
  },
  textSignModal: {
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20,
    marginBottom: 10,
    marginTop: 35,
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
});
