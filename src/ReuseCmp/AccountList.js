import React, { Component } from 'react'
import { Text, View } from 'react-native'

const AccountList = ({data}) => {
  const {Name,end} = data
    return (
        <View style={{borderBottomWidth:end?0:1,borderColor:"#f1f7f9",paddingHorizontal:32,paddingVertical:20}}>
        <Text style={{fontSize:12,fontFamily:"Roboto-Medium",color:end?"red":""}}>{Name}</Text>
       </View>
    )

}

export default AccountList
