import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const PlannerList = ({data}) => {
  const {Name, Price,Future,end,Link} = data;
  const Navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => Navigation.push(Link)}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: end?0:1,
        paddingHorizontal:12,
        borderColor: '#e0eef2',
      }}>
      <Text style = {{fontFamily:"Roboto-Medium"}}>{Name}</Text>
      <Text style = {{justifyContent:"center",alignItems:"center"}}>{Price} {Future?Future:""} <IconM name = "arrow-forward-ios" /></Text>
    </View>
    </TouchableOpacity>
  );
};

export default PlannerList;
