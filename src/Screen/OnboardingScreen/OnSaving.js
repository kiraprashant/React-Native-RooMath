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
import uuid from 'react-native-uuid';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {
  ReduxAddEssentenail,
  ReduxAddSaving,
} from '../../Redux/Slices/PlannerSlices';
import {PlannerSaveToLocal} from '../LocalStorage/LocalStorage';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';


const OnSaving = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);


  const [fields, setFields] = useState([]);
  const [Holdfields, setHoldFields] = useState();

  const [recommendSaving, setrecommendSaving] = useState(0);
  const [TotalSaving,setTotalSaving] = useState(0)
  const GetSaving = useSelector(state => state.Planner.SavingSlice);
  const GetIncome = useSelector(state => state.Planner.IncomeSlice);
  const GetEssentials = useSelector(state => state.Planner.EssentenailSlice)
  const getSMSData = useSelector(state => state.SMS.SMSDATA);;

  const Navigation = useNavigation();
  const Dispatch = useDispatch();

  useEffect(() => {
    const GetIncomePrice = GetIncome.reduce(
      (acc, elem) => acc + parseInt(elem.price),
      0,
    );
    const GetEssentialsPrice = GetEssentials.reduce(
      (acc, elem) => acc + parseInt(elem.price),
      0,
    );
   

    console.log(
      `.................../,${GetIncomePrice} - ${GetEssentialsPrice} = ${
        ((GetIncomePrice - GetEssentialsPrice)) * 0.6
      }`,
    );
    console.log((GetIncomePrice - GetEssentialsPrice))

    setrecommendSaving(parseInt(((GetIncomePrice - GetEssentialsPrice)) * 0.5))
    setTotalSaving(GetIncomePrice - GetEssentialsPrice)

    
  }, [GetIncome,GetEssentials]);

  useEffect(() => {
    if (GetSaving.length > 0) {
      setFields(GetSaving);
    } else {
      console.log('Nope i dont have GetSaving');
      const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false,Budget:"Saving"};
      setFields([...fields, newField]);
    }
  }, [GetSaving]);

  const NewScreen = async() => {
    const SaveData = fields.filter(elem => elem.DeleteBtn === true);
    
    console
    const SavingDataprice = SaveData.reduce((acc,elem) => acc + parseInt(elem.price),0)
    console.log(SavingDataprice)

    if(TotalSaving < SavingDataprice){
      setModalVisible(true)
      return false
    }

    Dispatch(ReduxAddSaving(SaveData));
    PlannerSaveToLocal('LocalSaving', SaveData);
    const OnSaving = await AsyncStorage.setItem('OnSaving',"Visited");
    Navigation.replace('TabNavigation');
  };

  const addField = () => {
    const newField = {id: uuid.v4(), name: '', price: '', DeleteBtn: false,Budget:"Saving"};
    setFields([...fields, newField]);
    console.log(fields);
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
    <View style={{flex: 1}}>
     <Modal isVisible={isModalVisible} onBackdropPress = {()=> setModalVisible(false)}>
        <View style={{backgroundColor:"#fff",padding:20}}>
          <Text style={{textAlign:"center"}}>You excexed more than you total Balance</Text>
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
        }}>
        <TouchableOpacity onPress={() => Navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
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
              Average Monthly Saving?
            </Text>
          </View>
          <View>
            <Text>
              <NotFocusSVG /> <NotFocusSVG /> <FocusSVG />
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
              Set aside some cash for your future plans – whether it's a
              vacation, a new phone, or retirement. Just make sure you keep it
              in a different account so you don't end up spending it
              accidentally! 😉💰
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
              Based on our calculation we recommend to Save around ₹ {recommendSaving} every month. {TotalSaving}
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
              Saving
            </Text>
          </View>
        </View>

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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => elem.DeleteBtn?DeleteEss(elem):null}>
                  <IconMC
                    name="minus-circle"
                    color={elem.DeleteBtn ? '#a50000' : '#f3bebe'}
                    size={18}
                  />
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
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <TouchableOpacity onPress={() => addField()}>
            <Text
              style={{
                color: LightMode.Primary,
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
              }}>
              + Add More
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(fields)}>
            <Text>Check</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => NewScreen()}
        style={{
          backgroundColor: LightMode.Primary,
          margin: 20,
          padding: 16,
          borderRadius: 8,
          fontSize: 14,
        }}>
        <Text style={{color: '#fff', textAlign: 'center'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnSaving;
