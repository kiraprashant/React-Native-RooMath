import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Touchable, ScrollView} from 'react-native';
import Lightcolors from '../../../Utli/LightMode';
import uuid from 'react-native-uuid';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {ReduxAddSaving,DeletePlannerSlices} from '../../../Redux/Slices/PlannerSlices';
import {PlannerSaveToLocal,BUlkUpdateLocalSMS,PlannerDelete} from '../../LocalStorage/LocalStorage';
import { BUlkUpdateSMS } from '../../../Redux/Slices/SMSSlices';

import Modal from 'react-native-modal';


const AddSavingScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);


  const [fields, setFields] = useState([]);
  const [Holdfields, setHoldFields] = useState();

  
  const GetSaving = useSelector(state => state.Planner.SavingSlice);
  const getSMSData = useSelector(state => state.SMS.SMSDATA);


  const PlannedEssentenailsSpend = useSelector((state) => state.Planner.PlannedEssentenailsSpend)
  const PlannedIncomeSpend = useSelector((state) => state.Planner.PlannedIncomeSpend) 

  const Navigation = useNavigation();
  const Dispatch = useDispatch();

  useEffect(() => {
    if (GetSaving.length > 0) {
      setFields(GetSaving);
    } else {
      const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false,Budget:"Saving"};
      setFields([...fields, newField]);
    }
  }, [GetSaving]);

  const addField = () => {
    const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false,Budget:"Saving"};
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

  const SaveIncome = () => {
    const SaveData = fields.filter(elem => elem.DeleteBtn === true);
    const GetSaving = SaveData.reduce((acc,elem) => acc+parseInt(elem.price),0)
    if(PlannedIncomeSpend >= (PlannedEssentenailsSpend+GetSaving) ){
       Dispatch(ReduxAddSaving(SaveData));
       PlannerSaveToLocal('LocalSaving', SaveData);
       Navigation.goBack();
    }
    else{
      console.log("nope")
      setModalVisible(true)
    }
  };

  const DeleteEss = data => {
    console.log(data);
    // Dispatch(DeletePlannerSlices(data))
    // const DeleteId = fields.filter((elem,i) => elem.id !== data.id)
    const gotlength = getSMSData.filter(
      (elem, i) => elem.relation === data.name && elem.Budget === data.Budget,
    );
    setDeleteModal(true);
    console.log(gotlength.length);
    //setFields(DeleteId)
    setHoldFields(data)
  };

  const ConfirmDelete = async() =>{
    const DeleteId = fields.filter((elem,i) => elem.id !== Holdfields.id)
     console.log("ConfirmDelete called");

    const UpdateSMSValue =  getSMSData.map((elem,i) => {
      if(elem.relation === Holdfields.name && elem.Budget === Holdfields.Budget){
       return {...elem,Budget:"Nope",relation:""}
      }else{
       return elem
      }
    })
    Dispatch(BUlkUpdateSMS(UpdateSMSValue))
    Dispatch(DeletePlannerSlices(Holdfields))
    
    PlannerDelete("LocalSaving",Holdfields)
    BUlkUpdateLocalSMS("SMSExpenese",Holdfields)


    setFields(DeleteId)
    setDeleteModal(false)
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          <Text style={{textAlign: 'center'}}>
            Your Saving reached the limit
          </Text>
        </View>
      </Modal>

      <Modal
        isVisible={DeleteModal}
        onBackdropPress={() => setDeleteModal(false)}>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          <Text style={{textAlign: 'center'}}>
            which Transaction Details in Actual will automatic normal
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setDeleteModal(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ConfirmDelete()}
              style={{
                backgroundColor: 'red',
                paddingHorizontal: 20,
                paddingVertical: 8,
              }}>
              <Text style={{color: '#fff'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
        }}>
        <Text>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <IconM name="arrow-back-ios" />
          </TouchableOpacity>
          Saving
        </Text>
        <TouchableOpacity onPress={() => SaveIncome()}>
          <Text
            style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView>
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
              <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity onPress={() => elem.DeleteBtn?DeleteEss(elem):null}>
                  <IconMC name="minus-circle" color={elem.DeleteBtn?"#a50000":"#f3bebe"} size={18} />
                </TouchableOpacity>
                <TextInput
                 style={{color:"#000"}}
                  value={elem.name}
                  onChangeText={text => handleFieldChange(i, 'name', text)}
                  placeholder="Type Here"
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>₹</Text>
                <TextInput
                  style={{color:"#000"}}
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
              marginHorizontal: 20,
              marginTop: 16,
            }}>
            + Add More
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddSavingScreen;
