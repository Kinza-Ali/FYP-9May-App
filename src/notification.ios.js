import PushNotificationIOS from "@react-native-community/push-notification-ios";
import methods from "../app/connect/index";
import auth from "@react-native-firebase/auth";
import asyncStorage from "@react-native-community/async-storage";
import { useState } from "react";
// //------------- Show Notifications --------
// const showNotification = (title, message) => {
//   PushNotificationIOS.presentLocalNotification({
//     alertTitle: title,
//     alertBody: message,
//   });
// };

//------------- Scheduled Notifications -----------

const handleScheduleNotification = () => {
  //------------  Get Notification --------------
  getNotification = async (time, date, uid) => {
    const firedate = new Date();

    var response = await methods.get(
      "notifications/byCreds/" + time + "/" + date + "/" + uid,
      {}
    );
    // console.log(JSON.stringify(response));
    var data = JSON.parse(JSON.stringify(response)).data;
    if (data.length > 0) {
      // console.log('Notification sent');
    } else if (time == "10:01") {
      // console.log('pushing...');
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "Breakfast Time",
        alertBody:
          "Did you have your breakfast? If not it is the time for your breakfast",
        fireDate: firedate.toISOString(),
      });
      
    }
    else if (time == "11:01") {
      // console.log('pushing...');
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: " Drink Water",
        alertBody:
          "Stay Hydrated!!!!",
        fireDate: firedate.toISOString(),
      });
      
    } else if (time == "12:01") {
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "First Snack Time",
        alertBody: "Eat your health snack to stay full :)",
        fireDate: firedate.toISOString(),
      });
    } else if (time == "14:01") {
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "Lunch Time",
        alertBody:
          "Did you have your lunch? If not it is the time for your lunch",
        fireDate: firedate.toISOString(),
      });
    }
    else if (time == "15:01") {
      // console.log('pushing...');
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: " Drink Water",
        alertBody:
          "Stay Hydrated!!!!",
        fireDate: firedate.toISOString(),
      });
      
    }  
    else if (time == "16:01") {
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "Snack Time",
        alertBody: "Eat your health snack to stay full :)",
        fireDate: firedate.toISOString(),
      });
    } else if (time == "19:01") {
      postNotification(time, date, uid);
      PushNotificationIOS.scheduleLocalNotification({
        alertTitle: "Dinner Time",
        alertBody:
          "Did you have your dinner? If not, it is the time for your dinner",
        fireDate: firedate.toISOString(),
      });
    }
    //return  JSON.stringify(response); //response.data;
  };
  //---------------- Post Notification ---------------
  postNotification = async (time, date, uid) => {
    console.log("==================");
    var response = await methods.post("notifications", { time, date, uid });
    console.log(response);
  };
  //-------------- Set Interval ---------------
  setInterval(() => {
    // alert('Notification is being called');
    const date = new Date();
    var currentTime = date;
    var hrs = date.getHours();
    var mins = date.getMinutes();
    // var firedate = date.setSeconds(date.getSeconds() + 5);
    var strDate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    var user = auth().currentUser != undefined ? auth().currentUser.uid : "";
    if (hrs == 10 && mins == 1) {
      var res = getNotification("10:01", strDate, user);
    }
    if (hrs == 11 && mins == 1) {
      var res = getNotification("11:01", strDate, user);
    }

    if (hrs == 12 && mins == 1) {
      var res = getNotification("12:01", strDate, user);
    }

    if (hrs >= 14 && mins == 1) {
      var res = getNotification("14:01", strDate, user);
    }
    if (hrs == 15 && mins == 1) {
      var res = getNotification("15:01", strDate, user);
    }
    if (hrs == 16 && mins == 1) {
      var res = getNotification("16:01", strDate, user);
    }

    if (hrs == 19 && mins == 1) {
      var res = getNotification("19:01", strDate, user);
    }
  }, 10000);
};

// ------------ Cancel Notifications ---------------
// const handleCancel = () => {
//   PushNotificationIOS.removeAllDeliveredNotifications();
// };

//--------------------------------------------------

export { handleScheduleNotification };
