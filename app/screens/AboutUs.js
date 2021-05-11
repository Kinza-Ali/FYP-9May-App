import React from "react";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Nutritionists = ({ navigation }) => (
  <View>
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            marginHorizontal: 0,
            height: 40,
            marginTop: 40,
            marginBottom: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#5f9ea0",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesome name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={{ color: "#fff", fontSize: 20, paddingRight: 160 }}>
            About us
          </Text>
        </View>
        <ScrollView>
          <View>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.textheader}> About Us</Text>
              </View>
              <View style={styles.footer}>
                <Text style={styles.textfooter}>
                  Email us at: xyz@gmail.com
                </Text>
                {/* <Text style={styles.textfooter}> Contact No: xyz</Text>
      <Text style={styles.textfooter}> Email: xyz@xyz.com</Text> */}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  </View>
);
export default Nutritionists;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f9ea0",
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
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "times new Roman",
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
    justifyContent: "center",
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: "black",
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
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
