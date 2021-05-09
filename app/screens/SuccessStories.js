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
import * as Animatable from 'react-native-animatable';
import asyncStorage from '@react-native-community/async-storage';
import {handleScheduleNotification} from '../../src/notification.ios';
// import AsyncStorage from '@react-native-community/async-storage';
const blogUrl = 'http://192.168.18.3:3001/api/successStories';
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
    <ScrollView
    contentContainerStyle={styles.scrollView}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <View style = {styles.container}>
    <View style = {styles.header}></View>
  
  <Animatable.View 
  animation = 'fadeInUpBig'
  style= {styles.footer}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item}) => (
              <Text>
              {isAdmin? <Text>
                  id: {item._id} {'\n'}
                </Text> :undefined}
               

                <Text style={styles.textSign}>
                   {item.title}
                  {'\n'}
                </Text>

                <Text style ={styles.InputField}>
                  {item.paragraph}
                  {'\n'}
                </Text>

                {isAdmin ? (
                  <Button
                    onPress={() => {
                      asyncStorage.setItem('currentItem', JSON.stringify(item));
                      navigation.navigate('AdminSuccessStories', item);
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
              title="Edit Stories"
              // onPress={() => navigation.navigate('AdminBlog')}
              onPress={() => {
                handleScheduleNotification();
              }}
            />
          </View>
        ) : (
          <Text> </Text>
        )}
        </Animatable.View>
      </View>
      </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5f9ea0',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textheader: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textfooter: {
    color: 'black',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#5f9ea0',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    //height: Platform.OS === 'android' ? 76 : 50,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
  alignItems : 'center',
  marginTop : 5,
  marginLeft: 50,
  justifyContent: 'center',
  paddingRight: 35,
  },
  login: {
    flexDirection: 'row',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20, 
    marginBottom:30,
  },
  signUp: {
    width: '100%',
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5f9ea0',
  },
  InputFields :{
   fontSize: 18,
   marginTop: 40,
   marginBottom:30,
   marginLeft: 30

  }
});