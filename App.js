/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './src/Screen/Login';
import OnIncome from './src/Screen/OnboardingScreen/OnIncome';
import OnEssentials from './src/Screen/OnboardingScreen/OnEssentials';
import OnSaving from './src/Screen/OnboardingScreen/OnSaving';

import TabNavigation from './src/Screen/TabScreen/TabNavigation';
import IncomeScreen from './src/Screen/SubScreen/PlannerScreen/AddIncomeScreen';
import AddEssentinalsScreen from './src/Screen/SubScreen/PlannerScreen/AddEssentinalsScreen';
import AddSavingScreen from './src/Screen/SubScreen/PlannerScreen/AddSavingScreen';
import FutureExpense from './src/Screen/SubScreen/PlannerScreen/FutureExpense';
import Splits from './src/Screen/SubScreen/PlannerScreen/Splits';
import TransactionDetails from './src/Screen/SubScreen/HomeScreen.js/TransactionDetails';
import ManageTags from './src/Screen/SubScreen/HomeScreen.js/ManageTags';
import NewTags from './src/Screen/SubScreen/HomeScreen.js/NewTags';

function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TabNavigation">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          
          />
          <Stack.Screen
            name="OnIncome"
            component={OnIncome}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="OnEssentials"
            component={OnEssentials}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="OnSaving"
            component={OnSaving}
            options={{headerShown: false}}
          />
             <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
             <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetails}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />


             <Stack.Screen
              name="IncomeScreen"
              component={IncomeScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
             <Stack.Screen
              name="AddEssentinalsScreen"
              component={AddEssentinalsScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="AddSavingScreen"
              component={AddSavingScreen}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="Splits"
              component={Splits}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="FutureExpense"
              component={FutureExpense}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
            <Stack.Screen
              name="ManageTags"
              component={ManageTags}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />
              <Stack.Screen
              name="NewTags"
              component={NewTags}
              options={{headerShown: false, animation: 'slide_from_right'}}
            />

            
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
