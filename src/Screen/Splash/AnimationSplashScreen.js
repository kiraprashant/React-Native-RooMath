import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import uuid from 'react-native-uuid';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {GetLocaLItem, SavetoLocalStorage,GetplannerFromLocal} from '../LocalStorage/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReduxAddIncome,ReduxAddEssentenail,ReduxAddSaving } from '../../Redux/Slices/PlannerSlices';
import IconColor from '../../Utli/IconColor';
import { AllAddedIcon,CreatedIconFunction } from '../../Redux/Slices/CreatedIconSlices';

const AnimationSplashScreen = () => {
  const Dispatch = useDispatch();
  const Navigation = useNavigation();

  const [FirstTag, setFirstTag] = useState(
  
    {
      id:uuid.v4(),
      Name:"Others",
      TextColor:IconColor.SkyBlue.TextColor,
      BackgroundColor:IconColor.SkyBlue.BackgroundColor,
      IconName:"help"
  }
);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    const GetIconFunction = async() =>{
      const IconDetails = await GetLocaLItem('ManageTags');

      console.log("////////////////////////////////////" , IconDetails);

      if(IconDetails){
        console.log("IconDetails")
        Dispatch(AllAddedIcon(IconDetails))
      }
      else{
        console.log("FirstTag")
        Dispatch(CreatedIconFunction(FirstTag))
        SavetoLocalStorage("ManageTags",FirstTag)
      }
    }

    const GetPlannerLocalFunction = async() =>{
      const GetIncome = await GetplannerFromLocal("LocalIncome")
      const GetEssentials = await GetplannerFromLocal("LocalEssentials")
      const GetSaving = await GetplannerFromLocal("LocalSaving")

      if(GetIncome){
         console.log("I have Income ",GetIncome)
         Dispatch(ReduxAddIncome(GetIncome))
      }

      if(GetEssentials){
        console.log("I have GetEssentials ",GetEssentials)
        Dispatch(ReduxAddEssentenail(GetEssentials))
     }

     if(GetSaving){
      console.log("I have GetSaving ",GetSaving)
      Dispatch(ReduxAddSaving(GetSaving))
   }
    

    }
    GetIconFunction()
    GetPlannerLocalFunction()

    setTimeout(()=>{
      Navigation.navigate("SMSScreen")
    },300)
    
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };



  return (
    <View>
      <TouchableOpacity onPress={() => Navigation.navigate('TabNavigation')}>
        <Text>
          {' '}
          SplashScreen{' '}
          <IconMC
            name={FirstTag.NewIcon}
            size={24}
            style={{padding: 12}}
          />{' '}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearStorage()}>
        <Text>
          {' '}
          Clear{' '}
          <IconMC
            name={FirstTag.NewIcon}
            size={24}
            style={{padding: 12}}
          />{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimationSplashScreen;
