import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Lightcolors from '../../../Utli/LightMode';
import {TextInput} from 'react-native-gesture-handler';

const TransactionDetails = () => {

// const data = [
//     {
//         Name:"Nope"
//     },
//     {
//         Name:"Essentail"
//     },
//     {
//         Name:"Saving"
//     }
// ]

  const Navigation = useNavigation();
  return (
    <View style={{flex: 1,backgroundColor:"#fcfdff"}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
          backgroundColor:"#fff"
        }}>
        <Text>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <IconM name="arrow-back-ios" />
          </TouchableOpacity>
          Transaction Details
        </Text>
        <Text style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
          Skip
        </Text>
      </View>
      <View style={{padding: 20, marginBottom: 8}}>
        <View
          style={{
            backgroundColor: '#fcfdff',
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#D9EDF3',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Amount</Text>
          <Text>14,009</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D8D8D8',
              width: '100%',
              textAlign: 'center',
              borderRadius: 8,
            }}
            placeholder="what are you Spending On"
          />
        </View>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: '#fcfdff',
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#D9EDF3',
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 10}}>Was this Planned in your Budget?</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#D8D8D8',
                width: '100%',
                borderRadius: 8,
              }}
              placeholder="what are you Spending On"
            />
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 10}}>Select Budget</Text>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style = {{flex:1,borderWidth:1,borderColor:"#d8d8d8",padding:12,borderTopLeftRadius:8,borderBottomLeftRadius:8}}><Text style = {{textAlign:"center"}}>Nope</Text></TouchableOpacity>  
              <TouchableOpacity style = {{flex:1,borderWidth:1,borderColor:"#d8d8d8",padding:12}}><Text style = {{textAlign:"center"}}>Essential</Text></TouchableOpacity>  
              <TouchableOpacity style = {{flex:1,borderWidth:1,borderColor:"#d8d8d8",padding:12,borderTopRightRadius:8,borderBottomRightRadius:8}}><Text style = {{textAlign:"center"}}>Saving</Text></TouchableOpacity>  
            </View>
          </View>

          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 10}}>Tags</Text>
            <View 
               style={{
                borderWidth: 1,
                borderColor: '#D8D8D8',
                width: '100%',
                borderRadius: 8,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                paddingHorizontal:8,
                paddingVertical:14
              }}
            >
                <Text>Others</Text>
                <TouchableOpacity onPress={()=> Navigation.push("ManageTags")}><Text>Change</Text></TouchableOpacity>
            </View>
          </View>

        </View>
      </View>

      <View style={{padding: 20, marginBottom: 8}}>
            <View
              style={{
                backgroundColor: '#fcfdff',
                padding: 20,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#D9EDF3',
              }}>
              <Text>From SMS</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                porta convallis facilisis. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. 
              </Text>
            </View>
          </View>

        <View><Text style = {{fontSize:12,color:"red",textAlign:"center"}}>Delete this Transaction</Text></View>

    </View>
  );
};

export default TransactionDetails;
