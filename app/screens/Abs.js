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
import YoutubePlayer from "react-native-youtube-sdk";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Abs = ({ navigation }) => {
  return (
    <View>
      <ScrollView>
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
              <FontAwesome name="chevron-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 20 }}>Abs</Text>
            <View />
          </View>

          <View style={styles.header}>
            <Text style={styles.textheader}> Get your 6 pack Abs!</Text>
          </View>
          <View style={styles.footer}>
            <YoutubePlayer
              videoId={"3p8EBPVZ2Iw"}
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
export default Abs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5f9ea0",
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
    flex: 8,
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
    marginTop: 10,
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
