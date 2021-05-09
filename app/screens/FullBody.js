// import React, {useState, useEffect} from 'react';
// import {Text, SafeAreaView, View, Button,StatusBar,StyleSheet} from 'react-native';
// import YoutubePlayer from 'react-native-youtube-sdk';
// const FullBody=({navigation})=> {
// return(
//   <View style = {styles.container}>
//   <StatusBar backgroundColor ='#009387' barStyle="Light-content"/>
//     <View style = {styles.header}>
// <Text style ={styles.textheader}> Try this Full Body Workout!</Text>
// </View>
// <View style= {styles.footer}>
//   <YoutubePlayer 
//     videoId ={'oAPCPjnU1wA'}
//     autoPlay={false}
//     fullscreen ={false}
//     showfullscreenButton={true}
//     showSeekBar ={true}
//     //startTime={5}
//     style={{width: "100%", height: 200}}
//     onError={e=> console.log(e)}
//     onChangeState={e=> console.log(e)}
//     onChangeFullScreen ={e=> console.log(e)}
//     />
//  </View>
//  </View>
  
//   );
// };
// export default FullBody;
// const styles= StyleSheet.create({
//   container : {
//     flex :1,
//     backgroundColor : '#01ab9d'
//   },
//   text: {
//     fontSize : 18,
//   fontWeight : 'bold'
//   },
//   header: {
//     flex : 1,
//     justifyContent : 'flex-start',
//     paddingHorizontal: 10,
//     paddingBottom :10
//   },
// footer: {
//   flex :3, 
//   backgroundColor : 'white',
//   borderTopLeftRadius : 35,
//   borderTopRightRadius : 35,
//   paddingHorizontal: 20,
//   paddingVertical : 30,
// },
//   textheader: {
//     color : 'white',
//     fontWeight : 'bold',
//     fontSize : 30,
//     fontFamily: 'times new Roman',
//     marginTop:40
//   },
//   textfooter: {
//     color : 'black',
//     fontSize : 18
//   }, 
// action: {
// flexDirection : 'row',
// marginTop: 2,
// borderBottomWidth: 1,
// borderBottomColor : '#01ab9d',
// paddingBottom :5,
// justifyContent: 'center'
// },
// textInput : {
//   flex :1, 
//   //height: Platform.OS === 'android' ? 76 : 50,
//   paddingLeft :10,
//   color : 'black'
// },
// button :{
//   alignItems : 'center',
//   marginTop : 60,
//   marginLeft: 50,
//   justifyContent: 'center'
// },
// login: {
//   width : '100%',
//   height : 60,
//   justifyContent : 'center',
//   alignItems: 'center',
//   borderRadius : 20
// },
// errorMsg: {
//   color: '#FF0000',
//   fontSize: 14,
// },
// textSign : {
//   fontSize : 18,
//   fontWeight : 'bold'
 
// }
// });
