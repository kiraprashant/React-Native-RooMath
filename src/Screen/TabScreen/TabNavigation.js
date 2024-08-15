import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Lightcolors from '../../Utli/LightMode';

import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

// import Home from '../Home';
// // import Planner from '../Planner';
// import Analysis from '../Analysis';
// import Account from '../Account';
import Home from './Home';
import Account from './Account';
import Analysis from './Analysis';
import Planner from './Planner';

const Tab = createBottomTabNavigator();



function TabNavigation() {


  const CustomTabBarButton = ({label, icon, focused, height, Width}) => {
    return (
      <Animated.View style={[styles.Navgroup, {}]}>
        <Ionicons
          style={{backgroundColor:focused?"rgba(0, 107, 94,.15)":Lightcolors.PrimaryTextColor,paddingHorizontal:20,paddingTop:3,paddingBottom:3,borderRadius:100}}
          name={icon}
          size={20}
          color={focused ? Lightcolors.Primary : Lightcolors.SecondaryTextColor} // Red for unfocused tabs
        />
        <Text
          style={{
            fontWeight: focused ? 700 : 500,
            color: focused ? Lightcolors.PrimaryTextColor : Lightcolors.SecondaryTextColor,
            fontSize: 14,
            marginTop: 4,
          }}>
          {label}
        </Text>
      </Animated.View>
    );
  };

  return (
    <React.Suspense fallback={<Text style={{fontSize: 200}}>Loading...</Text>}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor:Lightcolors.Primary, height: 70},
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <CustomTabBarButton
                label="home"
                icon={
                  focused
                    ? 'home'
                    : 'home-outline'
                }
                height={30}
                Width={30}
                focused={focused}
              />
            ),
          }}
        />
    
    
        <Tab.Screen
          name="Planner"
          component={Planner}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <CustomTabBarButton
                label="Planner"
                icon={
                  focused
                    ? 'cellphone'
                    : 'cellphone'
                }
                height={30}
                Width={30}
                focused={focused}
              />
            ),
          }}
        />

<Tab.Screen
          name="Analysis"
          component={Analysis}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <CustomTabBarButton
                label="Analysis"
                icon={
                  focused
                    ? 'chart-bar'
                    : 'chart-bar'
                }
                height={30}
                Width={30}
                focused={focused}
              />
            ),
          }}
        />

<Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <CustomTabBarButton
                label="Account"
                icon={
                  focused
                    ? 'account'
                    : 'account-outline'
                }
                height={30}
                Width={30}
                focused={focused}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  Navgroup: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
});

export default TabNavigation;