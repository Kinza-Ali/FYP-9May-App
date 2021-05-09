import React from 'react';
import {View, Text} from 'react-native';

const Breakfast = (props) => {
  const dt = JSON.stringify(props.BreakfastVals);
  return (
    <View>
      <Text>Diet Plan</Text>
      <Text> {dt}</Text>
    </View>
  );
};
export default Breakfast;
