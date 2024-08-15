import React, {Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Lightcolors from '../../../Utli/LightMode';
import {useNavigation} from '@react-navigation/native';

const ManageTags = () => {
    const Navigation = useNavigation()
    return (
      <View style={{flex:1,backgroundColor:"#fcfdff"}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#ebebeb',
            backgroundColor: '#fff',
          }}>
          <Text>
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <IconM name="arrow-back-ios" />
            </TouchableOpacity>
            Manage Tags
          </Text>
          <Text
            style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
            Skip
          </Text>
        </View>


      </View>
    );
}

export default ManageTags;
