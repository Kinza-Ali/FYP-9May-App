import React, { useState, useEffect } from "react";
import asyncStorage from "@react-native-community/async-storage";
import methods from "../connect/index";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import { get } from "react-native/Libraries/Utilities/PixelRatio";
// import AsyncStorage from '@react-native-community/async-storage';
const blogUrl = "http://cfbe9d0112df.ngrok.io/api/blogs";

export default function AdminBlog({ navigation, props }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState(true);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [paragraph, setParagraph] = React.useState("");
  const [newParagraph, setNewParagraph] = React.useState("");

  let currentData = { _id: "12345", title: "food", paragraph: "sbfcjhdsbvh" };
  const readData = async () => {
    try {
      const currentItem = await asyncStorage.getItem("currentItem");
      currentData = JSON.parse(currentItem);
      setNewParagraph(currentData.paragraph);
      setId(currentData._id);
      setNewTitle(currentData.title);
    } catch (e) {
      // alert("Failed to fetch the data from storage");
    }
  };
  readData();

  getStory = async () => {
    var response = await methods.get("blogs", { id: "1" });
  };
  // //-------------- Add Story Method
  addStory = async () => {
    var response = await methods.post("blogs", { title, paragraph });

    console.log("============" + title + "==========" + paragraph);
  };
  updateStory = async () => {
    var response = await methods.put("blogs/" + id, {
      title,
      paragraph,
    });
    console.log("==================");
    console.log(response);
    console.log("============" + title + "==========" + paragraph + id);
  };
  deleteStory = async (id) => {
    var response = await methods.delete("blogs/" + id, {});
    alert("Successfully deleted");
  };
  getParagraph = () => {
    readData();
    setParagraph(currentData.paragraph);
    // return currentData.paragraph;
  };
  onTextChangeParagraph = (text) => {
    setParagraph(text);
  };
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}> Add Story</Text>
        <TextInput
          placeholder="Add Title"
          //   style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          placeholder="Add paragraph"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          onChangeText={setParagraph}
          // onChangeText={textsetParagraph(text)}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={this.addStory}
          style={[
            styles.signUp,
            { borderColor: "#484C7F", borderWidth: 0, marginTop: 0 },
          ]}
        >
          <LinearGradient colors={["#484C7F", "#484C7F"]} style={styles.login}>
            <Text style={[styles.textSign, { color: "white" }]}>
              {" "}
              Add Story{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      {/* try to fetch data and only update few of it */}
      <ScrollView>
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}> Update Story</Text>
        <TextInput
          placeholder="Enter Id"
          defaultValue={id}
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          autoCapitalize="none"
          onChangeText={(text) => {
            setId(text);
          }}
        />
        <TextInput
          placeholder="Add Title"
          onChangeText={setTitle}
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newTitle}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Add paragraph"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newParagraph}
          autoCapitalize="none"
          onChangeText={(text) => {
            setParagraph(text);
          }}
        />
        <TouchableOpacity
          onPress={this.updateStory}
          style={[
            styles.signUp,
            { borderColor: "#484C7F", borderWidth: 0, marginTop: 0 },
          ]}
        >
          <LinearGradient colors={["#484C7F", "#484C7F"]} style={styles.login}>
            <Text
              style={[
                styles.textSign,
                { color: "white", fontFamily: "IowanOldStyle-Roman" },
              ]}
            >
              {" "}
              Update Story{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}> Delete Story</Text>
        <TextInput
          placeholder="Enter Id"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          value={id}
          autoCapitalize="none"
          onChangeText={(text) => {
            setId(text);
          }}
        />
        <TouchableOpacity
          onPress={this.deleteStory}
          style={[
            styles.signUp,
            { borderColor: "#484C7F", borderWidth: 0, marginTop: 0 },
          ]}
        >
          <LinearGradient colors={["#484C7F", "#484C7F"]} style={styles.login}>
            <Text style={[styles.textSign, { color: "white" }]}>
              {" "}
              Delete Story{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AdminScreen", { option: "update" })
          }
          style={[
            styles.signUp,
            {
              borderColor: "#484C7F",
              borderWidth: 0,
              marginTop: 0,
              fontFamily: "IowanOldStyle-Roman",
            },
          ]}
        >
          <LinearGradient colors={["#484C7F", "#484C7F"]} style={styles.login}>
            <Text style={[styles.textSign, { color: "white" }]}>
              {" "}
              Go to HomeScreen{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#484C7F",
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
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "times new Roman",
  },
  textfooter: {
    color: "white",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#484C7F",
    paddingBottom: 5,
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: "white",
  },
  button: {
    alignItems: "center",
    marginTop: 60,
    marginLeft: 50,
    justifyContent: "center",
  },
  login: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    fontFamily: "IowanOldStyle-Roman",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "IowanOldStyle-Roman",
  },
});
