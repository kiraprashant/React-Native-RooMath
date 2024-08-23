import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconColor from '../Utli/IconColor';
import { useDispatch } from 'react-redux';
import { ChangeIcon } from '../Redux/Slices/IconSlices';

const ExistingTagsList = ({data,CheckingIcon}) =>{
  const {Name,TextColor,BackgroundColor,IconName,id} = data
  const Dispatch = useDispatch()
    return (
        <View
        style={{
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderColor: '#D8D8D8',
        }}>
        <TouchableOpacity onPress={() => Dispatch(ChangeIcon(data))} style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:20}}>
        <View style = {{flexDirection:"row",alignItems:"center"}}>
          <IconMC
            style={{
              color: TextColor,
              backgroundColor: BackgroundColor,
              borderRadius: 20,
              padding:8
            }}
            name={IconName}
            size={14}
          />
          <Text style={{marginLeft:8}}>{Name}</Text>
        </View>
        {id === CheckingIcon.id ? <View><IconMC name="check" size = {16}/></View>:null}
        </TouchableOpacity>
      </View>
    )
}

export default ExistingTagsList
