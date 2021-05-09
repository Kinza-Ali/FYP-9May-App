/* eslint-disable prettier/prettier */
import database from '@react-native-firebase/database';


export const submitUser = (id,username, email) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (id != null) {
      key = id;
    } else {
        key = database()
          .ref()
          .push().key;
      }
      let dataToSave = {
        Id: key,
        Username:username,
        Email: email,
      };
      database()
        .ref('users/' + key)
        .update(dataToSave)
        .then(snapshot => {
          resolve(snapshot);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
