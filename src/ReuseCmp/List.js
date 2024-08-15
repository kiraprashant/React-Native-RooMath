import React, { Component } from 'react'
import { Text, View } from 'react-native'
import IconM from 'react-native-vector-icons/MaterialIcons';

const List = () => {
    return (
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom:20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconM
            name="question-mark"
            size={24}
            color="#4F8EF7"
            style={{borderWidth: 1, borderColor: '#f2fbfe', padding: 12,borderRadius:24,backgroundColor:"#f2fbfe"}}
          />
          <View style = {{marginLeft:8}}>
            <Text>Title</Text>
            <Text>Description</Text>
          </View>
        </View>
        <View>
          <Text>43990</Text>
        </View>
      </View>
    )
}

export default List
