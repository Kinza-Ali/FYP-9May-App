// import {json, response} from 'express';
import React, {useState, useEffect, Fragment} from 'react';
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
const blogUrl = 'http://192.168.18.3:3001/api/blogs';
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Blogs({navigation}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isAdmin, setAdmin] = useState();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  //-----------
  const [refreshing, setRefreshing] = React.useState(false);

  // Pull to refresh method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch(blogUrl)
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
    fetch(blogUrl)
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
                  Title: {item.title}
                  {'\n'}
                </Text>

                <Text>
                  Paragraph: {item.paragraph}
                  {'\n'}
                </Text>

                {isAdmin ? (
                  <Button
                    onPress={() => {
                      asyncStorage.setItem('currentItem', JSON.stringify(item));
                      navigation.navigate('AdminBlog', item);
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
              title="Edit Blogs"
              // onPress={() => navigation.navigate('AdminBlog')}
              onPress={() => {
                handleScheduleNotification();
              }}
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
