import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  showNotification,
  handleCancel,
  handleScheduleNotification,
} from '../../src/notification.ios';

export default function App() {
  // eslint-disable-next-line prettier/prettier
    return (
    <View style={styles.container}>
      <Text> Push notification</Text>
      <TouchableOpacity
        activityOpacity={0.6}
        onPress={() => showNotification('Hi', 'message')}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>Click me to get Notifications </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activityOpacity={0.6}
        onPress={() => handleScheduleNotification('Hi', 'showed after 5 sec')}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to get Notifications after 5 sec
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activityOpacity={0.6} onPress={handleCancel}>
        <View style={styles.button}>
          <Text style={styles.buttonTitle}>
            Click me to cancel all Notifications
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 18,
    backgroundColor: 'blue',
    borderRadius: 24,
    marginTop: 16,
  },
  buttonTitle: {
    color: 'white',
  },
});
