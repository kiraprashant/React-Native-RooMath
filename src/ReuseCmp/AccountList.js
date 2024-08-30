import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const AccountList = ({data}) => {
  const {Name,end,FunctionName} = data
    return (
     <View>
      {
        Name === "Logout"? 
        <TouchableOpacity onPress={() => FunctionName()}>
        <View style={{borderBottomWidth:end?0:1,borderColor:"#f1f7f9",paddingHorizontal:32,paddingVertical:20}}>
        <Text style={{fontSize:12,fontFamily:"Roboto-Medium",color:end?"red":""}}>{Name}</Text>
       </View>
       </TouchableOpacity>
       :
       <View style={{borderBottomWidth:end?0:1,borderColor:"#f1f7f9",paddingHorizontal:32,paddingVertical:20}}>
       <Text style={{fontSize:12,fontFamily:"Roboto-Medium",color:end?"red":""}}>{Name}</Text>
      </View>
      }

       </View> 
    )

}

export default AccountList
