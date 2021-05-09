import React from "react";
import { Text, View } from "react-native";
const Card = ({ leftText, rightText }) => (
    <View
      style={{
        backgroundColor:  '#94b8b8',
        borderRadius: 10,
        alignSelf: "center",
        height: 50,
        shadowOpacity: 0.5,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 0 },
        padding: 10,
        width: 300,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{leftText}</Text>
      <Text>{rightText}</Text>
    </View>
  );
  
  export default Card;