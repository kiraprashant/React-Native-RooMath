import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LightMode from '../../Utli/LightMode';
import FocusSVG from '../../assets/Images/Focus.svg';
import NotFocusSVG from '../../assets/Images/notFocus.svg';
import TipSVG from '../../assets/Images/Tip.svg';
import uuid from "react-native-uuid"
import { useNavigation } from '@react-navigation/native';

const OnIncome = () => {
  const [fields, setFields] = useState([]);
  const Navigation = useNavigation()

  useEffect(()=>{
    const newField = {id:uuid.v4(), name: '', price: '',DeleteBtn:false };
    setFields([...fields, newField]);
  },[])

  const NewScreen = () =>{
    Navigation.navigate("OnEssentials")
  }

  const addField = () => {
    const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false};
    setFields([...fields, newField]);
    console.log(fields)
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = fields.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: value, // Update the specified field with the new value
        };
      }
      // If this is not the index we're updating, return the original object
      return item;
    });
    setFields(updatedFields);

    if (updatedFields[index].name === '' || updatedFields[index].price === '') {
      updatedFields[index].DeleteBtn = false;
    } else if (
      updatedFields[index].name !== '' ||
      updatedFields[index].price !== ''
    ) {
      updatedFields[index].DeleteBtn = true;
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Text>Back</Text>
        <Text style={{color: LightMode.Primary, fontFamily: 'Roboto-Medium'}}>
          Skip
        </Text>
      </View>
      <ScrollView>
      <View style={{paddingHorizontal: 20}}>
        <View>
          <Text
            style={{
              color: LightMode.PrimaryTextColor,
              fontSize: 24,
              fontFamily: 'Roboto-Bold',
            }}>
            Your Monthly Income?
          </Text>
        </View>
        <View>
          <Text>
            <FocusSVG /> <NotFocusSVG /> <NotFocusSVG />
          </Text>
        </View>
        <View style={{paddingBottom: 40}}>
          <Text
            style={{
              color: LightMode.SecondaryTextColor,
              fontSize: 14,
              lineHeight: 30,
              fontFamily: 'Roboto-Regular',
            }}>
            Hey, tell us what you bring in each month, and we'll help you budget
            it right. If you freelance, estimate your average income. Let's get
            that money working for you! 💰😄
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFF8D0',
            padding: 20,
            flexDirection: 'row',
            marginBottom: 20,
          }}>
          <TipSVG />
          <Text
            style={{
              color: LightMode.SecondaryTextColor,
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
              marginLeft: 20,
            }}>
            If you have more than 1 source of income just Add them here.
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: LightMode.PrimaryTextColor,
              fontSize: 14,
              fontFamily: 'Roboto-Medium',
              paddingBottom: 20,
            }}>
            Income
          </Text>
        </View>
      </View>

      {fields.map((elem,i) => {
        return(
        <View
          key={i}
          style={{
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#ECF0F3',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <TextInput 
          value={elem.name}
          onChangeText={(text) => handleFieldChange(i, 'name', text)}
          placeholder="Type Here" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>₹</Text>
            <TextInput style={{}}
             value={elem.price}
             onChangeText={(text) => handleFieldChange(i, 'price', text)}
             keyboardType="numeric"
            placeholder="0" />
          </View>
        </View>
        )
      })}
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <TouchableOpacity onPress={()=> addField()}>
          <Text
            style={{
              color: LightMode.Primary,
              fontFamily: 'Roboto-Medium',
              fontSize: 14,
            }}>
            + Add More
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> console.log(fields)}><Text>Check</Text></TouchableOpacity>
      </View>
      </ScrollView>
      <TouchableOpacity onPress={()=> NewScreen()}style={{backgroundColor:LightMode.Primary,margin:20,padding:16,borderRadius:8,fontSize:14}}><Text style={{color:"#fff",textAlign:"center"}}>Next</Text></TouchableOpacity>
    </View>
  );
};

export default OnIncome;
