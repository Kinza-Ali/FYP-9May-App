import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import YoutubePlayer from "react-native-youtube-sdk";
import * as Animatable from "react-native-animatable";
const Arms = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {/* <View
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
              <FontAwesome name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 20 }}>Arms</Text>
            <View />
          </View> */}

          <View style={styles.header}>
            <Text style={styles.textheader}> Shred your arms fat!</Text>
          </View>
          <View style={styles.footer}>
            <YoutubePlayer
              videoId={"W3BGPrhgs6Q"}
              autoPlay={false}
              fullscreen={false}
              showfullscreenButton={true}
              showSeekBar={true}
              //startTime={2}
              style={{ width: "100%", height: 200 }}
              onError={(e) => console.log(e)}
              onChangeState={(e) => console.log(e)}
              onChangeFullScreen={(e) => console.log(e)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Arms;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9BBDF",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 5,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    fontFamily: "times new Roman",
    marginTop: 10,
    fontFamily: "IowanOldStyle-Roman",
    alignSelf: "center",
  },
  textfooter: {
    color: "black",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 2,
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
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
