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
import { get } from "react-native/Libraries/Utilities/PixelRatio";
// import AsyncStorage from '@react-native-community/async-storage';
// const blogUrl = 'http://192.168.18.3:3001/api/blogs';

export default function AdminRecipe({ navigation, props }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState(true);
  const [id, setId] = useState("");
  const [dishName, setDishName] = useState("");
  const [newDishName, setNewDishName] = useState("");
  const [method, setMethod] = React.useState(null);
  const [newMethod, setNewMethod] = React.useState(null);
  const [dishUrl, setDishUrl] = React.useState(null);
  const [newDishUrl, setNewDishUrl] = React.useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [newIngredients, setNewIngredients] = useState("");

  let currentData = { _id: "12345", title: "food", paragraph: "sbfcjhdsbvh" };
  const readData = async () => {
    try {
      const currentItem = await asyncStorage.getItem("Recipe");
      currentData = JSON.parse(currentItem);
      setNewDishName(currentData.dishName);
      setId(currentData._id);
      setNewMethod(currentData.method);
      setNewDishUrl(currentData.dishUrl);
      setNewImgUrl(currentData.imgUrl);
      setNewIngredients(currentData.ingredients);
      //   console.log(currentData);
      // console.log('==============');
      // const date = new Date();
      // var currentTime = date.toLocaleTimeString();
      // console.log(currentTime);
    } catch (e) {
      // alert("Failed to fetch the data from storage");
    }
  };
  readData();
  // const {id, title, paragraph} = this.navigation.props;
  getRecipe = async () => {
    var response = await methods.get("recipes", { id: "1" });
    // console.log('==================');
    // console.log(response);
  };
  // //-------------- Add Story Method
  addRecipe = async () => {
    var response = await methods.post("recipes", {
      dishName,
      ingredients,
      method,
      dishUrl,
      imgUrl,
    });
  };
  updateRecipe = async () => {
    var response = await methods.put("recipes/" + id, {
      dishName,
      ingredients,
      method,
      dishUrl,
      imgUrl,
    });
  };
  deletRecipe = async () => {
    var response = await methods.delete("recipes/" + id, {});
    alert("Successfully deleted");
    // console.log('==================');
    // console.log(response);
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
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}> Add Recipe</Text>
        <TextInput
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add DishName"
          autoCapitalize="none"
          onChangeText={(text) => {
            setDishName(text);
          }}
        />
        <TextInput
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add Ingredients"
          onChangeText={setIngredients}
          autoCapitalize="none"
        />
        <TextInput
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add Method"
          onChangeText={setMethod}
          autoCapitalize="none"
        />
        <TextInput
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add DishUrl"
          onChangeText={setDishUrl}
          autoCapitalize="none"
        />
        <TextInput
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add Image Url"
          onChangeText={setImgUrl}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={this.addRecipe}
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
            <Text
              style={[
                styles.textSign,
                { color: "white", fontFamily: "IowanOldStyle-Roman" },
              ]}
            >
              {" "}
              Add Recipe{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      {/* try to fetch data and only update few of it */}
      <ScrollView>
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}>
          {" "}
          Update Recipe
        </Text>
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
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          placeholder="Add Recipe"
          onChangeText={setDishName}
          defaultValue={newDishName}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Add Ingredients"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newIngredients}
          autoCapitalize="none"
          onChangeText={setIngredients}
        />
        <TextInput
          placeholder="Add Method"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newMethod}
          autoCapitalize="none"
          onChangeText={setMethod}
        />
        <TextInput
          placeholder="Add DishUrl"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newDishUrl}
          autoCapitalize="none"
          onChangeText={setDishUrl}
        />
        <TextInput
          placeholder="Add Image"
          style={{ fontFamily: "IowanOldStyle-Roman" }}
          defaultValue={newImgUrl}
          autoCapitalize="none"
          onChangeText={setImgUrl}
        />
        <TouchableOpacity
          onPress={this.updateRecipe}
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
              Update Recipe{" "}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView>
        <Text style={{ fontFamily: "IowanOldStyle-Roman" }}>
          {" "}
          Delete Recipe
        </Text>
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
          onPress={this.deletRecipe}
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
            <Text
              style={[
                styles.textSign,
                { color: "white", fontFamily: "IowanOldStyle-Roman" },
              ]}
            >
              {" "}
              Delete Recipe{" "}
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
              Go to Home{" "}
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
