import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectIconColorList = ({data, SelectIconColorFunc, NewIconTextColor}) => {
  const {TextColor, BackgroundColor} = data;
  return (
    <TouchableOpacity
      onPress={() => SelectIconColorFunc(TextColor, BackgroundColor)}
      style={{
        padding: 12,
        borderRadius: 20,
        backgroundColor: BackgroundColor,
        marginRight: 8,
      }}>
      <IconMC name="check" color={NewIconTextColor === TextColor?TextColor:BackgroundColor} size={16} />
    </TouchableOpacity>
  );
};

export default SelectIconColorList;
