import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useScrollToTop } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from "./Pages/Profile Page/profile-page.js";
import { HolidayRequest } from "./Pages/Profile Page/Holiday Request/holiday-request.js"
import { ReportComplaint } from './Pages/Profile Page/Report Complaint/report-complaint.js';
import { ManagerialView } from './Pages/Managerial View/managerial-view.js';
import { SubordinateList } from './Pages/Managerial View/View Subordinates/view-subordinates.js';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StandardStyles } from './StandardStyles.js';
import { TextInput } from 'react-native-gesture-handler';
import { AdminView } from './Pages/Admin View/admin-view.js';

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
        <Stack.Screen name="Admin View" component={AdminView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export function HomeScreen({ navigation }) {
  // roles
  const [isEmployee, setIsEmployee] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // credentials
  const [id, setId] = useState(null);
  const [password, setPassword] = useState(null);
  // db fields
  const [salary, setSalary] = useState(0);
  const [isOnHoliday, setIsOnHoliday] = useState(null);
  const [holidaysLeft, setHolidaysLeft] = useState(null);
  const [name, setName] = useState(null);

  return (
    <ScrollView contentContainerStyle={StandardStyles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Welcome
        </Text>
      </View>
      <View style={styles.userInput}>
        <View style={styles.credentials}>
          <Text style={styles.credentialsInput}>
            ID Number:
          </Text>
          <TextInput
            maxLength={15}
            autoCompleteType="username"
            keyboardType="numeric"
            style={styles.textInput}
            onChangeText={(text) => {
              setId(text);
            }}
          />
        </View>
        <View style={styles.credentials}>
          <Text style={styles.credentialsInput}>
            Password:
          </Text>
          <TextInput
            maxLength={25}
            autoCompleteType="password"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <View style={styles.credentialsButton}>
          <Button
            title="Submit"
            onPress={() => {

              //const _data = { id: id };

              fetch('http://192.168.0.32:3000/api/users/'+ id, {
                method: 'GET',
                //body: JSON.stringify(_data),
                headers: { "Content-Type": "application/json; charset=UTF-8", },
              })
                .then(response => response.json())
                .then(data => {
                  console.log("UserData: ", data.userData);
                  setIsEmployee(data.userData.is_employee == 1);
                  setIsManager(data.userData.is_manager == 1);
                  setIsAdmin(data.userData.is_admin == 1);
                  setSalary(data.userData.salary);
                  setIsOnHoliday(data.userData.is_on_holiday == 1);
                  setHolidaysLeft(data.userData.holidays_left);
                  setName(data.userData.name);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            }}
          />
        </View>
      </View>
      <View style={styles.navigation}>
        {isEmployee && (<View style={styles.buttons}>
          <Button
            title="View Your Profile"
            onPress={() => {
              navigation.navigate('Profile', {
                salary: salary,
                isOnHoliday: isOnHoliday,
                holidaysLeft: holidaysLeft,
                name: name
              })
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
        {isAdmin && (<View style={styles.buttons}>
          <Button
            title="Admin View"
            onPress={() => {
              navigation.navigate('Admin View')
            }}
          />
        </View>)}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    flex: 1
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  buttons: {
    marginBottom: 10,
    marginTop: 10
  },
  userInput: {
    marginBottom: 0,
    flex: 1
  },
  credentials: {
    marginBottom: 10
  },
  credentialsInput: {
    fontWeight: 'bold'
  },
  credentialsButton: {
    marginTop: 15
  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  navigation: {
    justifyContent: 'center',
    flex: 98
  }
})
