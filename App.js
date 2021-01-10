import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "./Pages/Profile Page/profile-page.js";
import { HolidayRequest } from "./Pages/Profile Page/Holiday Request/holiday-request.js"
import { ReportComplaint } from './Pages/Profile Page/Report Complaint/report-complaint.js';
import { ManagerialView } from './Pages/Managerial View/managerial-view.js';
import { SubordinateList } from './Pages/Managerial View/View Subordinates/view-subordinates.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StandardStyles } from './StandardStyles.js';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Employee Management System' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Holiday Request" component={HolidayRequest} />
        <Stack.Screen name="Report Complaint" component={ReportComplaint} />
        <Stack.Screen name="Managerial View" component={ManagerialView} />
        <Stack.Screen name="Subordinate List" component={SubordinateList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen({ navigation }) {
  const [isEmployee, setIsEmployee] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [id, setId] = useState(null);

  return (
    <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Welcome,
        </Text>
        <Text style={styles.heading}>
          please input your ID number.
        </Text>
      </View>
      <View style={styles.userInput}>
        <TextInput
          keyboardType="numeric"
          style={styles.textInput}
          onChangeText={(text) => {
            setId(text);
          }}
        />
        <Button
          title="Submit"
          onPress={() => {
            console.log(id);
            fetch('http://192.168.0.32:3000')
            .then(response => response.json())
            .then(data => console.log(data));
          }}
        />
      </View>
      {isEmployee && (<View style={styles.buttons}>
        <Button
          title="View Your Profile"
          onPress={() => {
            navigation.navigate('Profile')
          }}
        />
      </View>)}
      {isManager && (<View style={styles.buttons}>
        <Button
          title="Managerial View"
          onPress={() => {
            navigation.navigate('Managerial View')
          }}
        />
      </View>)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  buttons: {
    marginBottom: 10,
    marginTop: 10
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  }
})
