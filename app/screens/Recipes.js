// import {json, response} from 'express';
import React, {useState, useEffect} from 'react';
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
} from 'react-native';
import {LinearGradient} from '../../Setup';
import asyncStorage from '@react-native-community/async-storage';
import {handleScheduleNotification} from '../../src/notification.ios';
// import AsyncStorage from '@react-native-community/async-storage';
const recipesUrl = 'http://192.168.18.3:3001/api/recipes';

// Time out for pull to refresh feature
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Blogs({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [id, setId] = useState('');
  const [dishName, setDishName] = useState('');
  const [method, setMethod] = useState('');
  const [dishUrl, setDishUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
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
      const adminState = await asyncStorage.getItem('isAdmin');

      if (adminState !== null) {
        // console.log(adminState);
        setAdmin(adminState);
      }
    } catch (e) {
      alert('Failed to fetch the data from storage');
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
  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Text>
                <Text>
                  id: {item._id} {'\n'}
                </Text>

                <Text>
                  Dish Nmae: {item.dishName}
                  {'\n'}
                </Text>
                <Text>
                  Ingredients: {item.ingredients}
                  {'\n'}
                </Text>

                <Text>
                  Method: {item.method}
                  {'\n'}
                </Text>

                <Text>
                  Dish URl: {item.dishUrl}
                  {'\n'}
                </Text>
                <Text>
                  Image URl: {item.imgUrl}
                  {'\n'}
                </Text>

                {isAdmin ? (
                  <Button
                    onPress={() => {
                      asyncStorage.setItem('Recipe', JSON.stringify(item));
                      navigation.navigate('AdminRecipe', item);
                    }}
                    title="edit"
                  />
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
              title="Edit Recipe"
              onPress={() => navigation.navigate('AdminRecipe')}
             
            />
          </View>
        ) : (
          <Text> </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
