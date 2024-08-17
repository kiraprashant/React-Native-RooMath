import React, { Component } from 'react'
import { Text, View } from 'react-native'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconColor from '../Utli/IconColor';

const ExistingTagsList = () =>{
    return (
        <View
        style={{
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: '#D8D8D8',
        }}>
        <View style = {{flexDirection:"row",paddingHorizontal:20,alignItems:"center"}}>
          <IconMC
            style={{
              color: IconColor.LightPink.TextColor,
              backgroundColor: IconColor.LightPink.BackgroundColor,
              borderRadius: 20,
              padding:8
            }}
            name="help"
            size={14}
          />
          <Text style={{marginLeft:8}}>Others</Text>
        </View>
      </View>
    )
}

export default ExistingTagsList
