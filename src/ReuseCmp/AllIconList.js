import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const AllIconList = ({IconName, SelectNewIconFunc, NewIcon}) => {
  return (
    <View style={{margin: 8}}>
      <TouchableOpacity
        onPress={() => SelectNewIconFunc(IconName)}
        style={{
          backgroundColor: NewIcon === IconName ? '#ececec' : '#fff',
          borderRadius: 24,
        }}>
        <IconMC name={IconName} size={24} style={{padding: 12}} />
      </TouchableOpacity>
    </View>
  );
};

export default AllIconList;
