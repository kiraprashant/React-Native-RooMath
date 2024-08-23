import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const SelectedList = ({data,SelectedFunction}) => {
    return (
      <TouchableOpacity onPress = {() => SelectedFunction(data.name)} style = {{borderWidth:1,borderColor:"#e4e4e4",padding:12}}>
        <Text> {data.name} </Text>
      </TouchableOpacity>
    )
}

export default SelectedList
