import React, {useEffect,useState} from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import ProgressBar from '../../../CustomCarts/ProgressBar';
import { useSelector } from 'react-redux';

const PAList = ({data,GetEssentialFunction}) => {
  const getSMS = useSelector ((state) => state.SMS.SMSDATA)
  const [StateActual,setStateActual] = useState()
  const [StatePlanned,setStatePlanned] = useState()

  console.log(data)
  useEffect(() => {
    const GetActual = getSMS.reduce((acc,elem) => {
      if((elem.Budget === data.Budget) && (elem.relation === data.name) ){
         return acc + parseInt(elem.RS) 
      }
      else{
       return acc
      }
    },0)
    setStateActual(GetActual)
    setStatePlanned(data.price)
  },[getSMS])

  
  return (
    <TouchableOpacity
      onPress={() =>GetEssentialFunction(StateActual,StatePlanned,data.name)}
      style={{
        borderWidth: 1,
        borderColor: '#f1f6ff',
        padding: 20,
        height: 154,
        width:160,
        marginRight:16,
        marginBottom:16,
        backgroundColor:"#f1f6ff",
        borderRadius:16
      }}>
      <View>
        <Text style={{fontFamily: 'Roboto-Medium'}}>{data.name}</Text>
        <Text style={{fontSize:10}}>Next Due on 24th Jan</Text>
      </View>
      <View style={{marginTop: 'auto'}}>
        <Text>₹ {StateActual} / {parseInt(StatePlanned)}</Text>
        <ProgressBar
          actual={StateActual} // Actual progress value (percentage)
          expected={StatePlanned} // Expected progress value (percentage)
          height={5} // Height of the progress bar
          actualColor={'#809AC0'} // Fill color for the actual value
        />
      </View>
    </TouchableOpacity>
  );
};

export default PAList;
