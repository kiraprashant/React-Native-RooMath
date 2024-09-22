import React, {useEffect,useState} from 'react';
import {Text, View,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import Lightcolors from '../../../Utli/LightMode';
import uuid from "react-native-uuid"
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector , useDispatch} from 'react-redux';
import { ReduxAddIncome } from '../../../Redux/Slices/PlannerSlices';
import { PlannerSaveToLocal } from '../../LocalStorage/LocalStorage';
import Modal from 'react-native-modal';



const AddIncomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  

    const [fields,setFields] = useState([])
    const [Holdfields, setHoldFields] = useState();
    const GetIncome = useSelector((state) => state.Planner.IncomeSlice) 

    const PlannedEssentenailsSpend = useSelector((state) => state.Planner.PlannedEssentenailsSpend) 
    const PlannedSavingSpend = useSelector((state) => state.Planner.PlannedSavingSpend) 

    const Navigation = useNavigation()
    const Dispatch = useDispatch()
    useEffect(() => {
      if(GetIncome.length > 0){
        console.log("Yes I Ihave Income",GetIncome)
        setFields(GetIncome)
      }
     else {
        console.log("Nope i dont have Income")
        const newField = {id:uuid.v4(), name: '', price: '',DeleteBtn:false,Budget:"Income" };
        setFields([...fields, newField]);
      }
      }, []);

      const addField = () => {
        const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false,Budget:"Income"};
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

      const SaveIncome = ()=>{
        const SaveData = fields.filter((elem)=> elem.DeleteBtn === true)
        const PlannedIncome = SaveData.reduce((acc,elem) => acc+parseInt(elem.price) ,0)
        if(PlannedIncome >= (PlannedEssentenailsSpend+PlannedSavingSpend) )
        {
        Dispatch(ReduxAddIncome(SaveData))
        PlannerSaveToLocal("LocalIncome",SaveData)
        Navigation.goBack()
        }
        else{
          console.log("Nope")
          setModalVisible(true)
        }
      }

      const DeleteEss = data => {
        console.log(data);
        // Dispatch(DeletePlannerSlices(data))
        // const DeleteId = fields.filter((elem,i) => elem.id !== data.id)
        // const gotlength = getSMSData.filter(
        //   (elem, i) => elem.relation === data.name && elem.Budget === data.Budget,
        // );
        setDeleteModal(true);
        // console.log(gotlength.length);
        //setFields(DeleteId)
        setHoldFields(data)
      };

      const ConfirmDelete = () =>{
        const DeleteId = fields.filter((elem,i) => elem.id !== Holdfields.id)
        setFields(DeleteId)
        setDeleteModal(false)
      }

  return (
    <View style={{flex:1,backgroundColor:"#fff"}}>
          <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{backgroundColor: '#fff', padding: 20}}>
          <Text style={{textAlign: 'center'}}>
             Are You Sure You want to delete 
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
          borderBottomWidth:1,
          borderColor:"#ebebeb"
        }}>
        <Text><TouchableOpacity onPress={()=> Navigation.goBack()}><IconM name = "arrow-back-ios" /></TouchableOpacity>Income</Text>
        <TouchableOpacity onPress={()=> SaveIncome()}><Text style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
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
                  style={{color:"#000",width:80}}
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
                marginTop:16
              }}>
              + Add More
            </Text>
          </TouchableOpacity>
          </ScrollView>
      </View>
    </View>
  );
};

export default AddIncomeScreen;
