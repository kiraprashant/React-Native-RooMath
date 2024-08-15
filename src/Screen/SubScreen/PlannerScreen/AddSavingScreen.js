import React, {useEffect,useState} from 'react';
import {Text, View,TextInput,TouchableOpacity} from 'react-native';
import Lightcolors from '../../../Utli/LightMode';
import uuid from "react-native-uuid"
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AddSavingScreen = () => {

    const [fields,setFields] = useState([])
    const Navigation = useNavigation()
    useEffect(() => {
        const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false};
        setFields([...fields, newField]);
      }, []);

      const addField = () => {
        const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false};
        setFields([...fields, newField]);

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
    <View style={{flex:1,backgroundColor:"#fff"}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth:1,
          borderColor:"#ebebeb"
        }}>
        <Text><TouchableOpacity onPress={()=> Navigation.goBack()}><IconM name = "arrow-back-ios" /></TouchableOpacity>Saving</Text>
        <Text style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
          Skip
        </Text>
      </View>
      <View>
      {fields.map((elem, i) => {
          return (
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
                onChangeText={text => handleFieldChange(i, 'name', text)}
                placeholder="Type Here"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>₹</Text>
                <TextInput
                  style={{}}
                  value={elem.price}
                  onChangeText={text => handleFieldChange(i, 'price', text)}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
            </View>
          );
        })}
                  <TouchableOpacity onPress={() => addField()}>
            <Text
              style={{
                color: Lightcolors.Primary,
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                marginHorizontal:20,
                marginTop:16,
              }}>
              + Add More
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddSavingScreen;