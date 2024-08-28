import React, {Component} from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import ProgressBar from '../Screen/CustomCarts/ProgressBar';
import IconM from 'react-native-vector-icons/MaterialIcons';

const Card = ({
  ActualSpend,
  PlannedSpend,
  actualColor,
  Name,
  Description,
  Icon,
  functionName,
  OverSpend
}) => {
  return (
    <View>
      {Icon ? (
        <View
          style={{
            height: 165,
            width: 152,
            padding: 16,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconM name="star-outline" size={24} color="#9CB4D7" />
          <Text style={{paddingBottom: 8, fontSize: 14}}>{Name}</Text>
          <Text style={{fontSize: 10, textAlign: 'center'}}>{Description}</Text>
        </View>
      ) : (
       <TouchableOpacity onPress={()=> functionName()}>
        <View
          style={{
            flex:1,
            height: 195,
            width: 172,
            borderWidth: 1,
            borderColor: '#d9edf3',
            padding: 16,
            borderRadius: 20,
            marginRight: 8,
            backgroundColor: '#fff',
          }}>
            <Text style={{paddingBottom: 8, fontSize: 14}}>{Name} {OverSpend}</Text>
            <Text style={{fontSize: 12}}>{Description}</Text>
            <View style={{marginTop: 'auto'}}>
              <Text style={{fontSize: 14}}>
                ₹ {ActualSpend} / ₹ {PlannedSpend}
              </Text>
              <ProgressBar
                actual={ActualSpend} // Actual progress value (percentage)
                expected={PlannedSpend} // Expected progress value (percentage)
                height={5} // Height of the progress bar
                actualColor={actualColor} // Fill color for the actual value
              />
            </View>
          </View>
          </TouchableOpacity>
    
      )}
    </View>
  );
};

export default Card;
