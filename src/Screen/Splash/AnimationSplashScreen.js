import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import uuid from 'react-native-uuid';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch,useSelector} from 'react-redux';
import {GetLocaLItem, SavetoLocalStorage,GetplannerFromLocal} from '../LocalStorage/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReduxAddIncome,ReduxAddEssentenail,ReduxAddSaving } from '../../Redux/Slices/PlannerSlices';
import IconColor from '../../Utli/IconColor';
//import { AllAddedIcon,CreatedIconFunction } from '../../Redux/Slices/CreatedIconSlices';
import { AllAddedIcon , CreatedIconFunction} from '../../Redux/Slices/IconSlices';
import ReadSmS from '../SMSPermission/ReadSmS';
import RooMathLogo from "../../assets/Images/Roomath.svg"

const AnimationSplashScreen = () => {
  const Dispatch = useDispatch();
  const Navigation = useNavigation();
  const smsDataRedux = useSelector((state) => state.SMS.SMSDATA);
  const GetIcon = useSelector((state) => state.IconRedux.AllExistingIcon)

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
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 2000);

    const GetIconFunction = async() =>{
      const IconDetails = await GetLocaLItem('ManageTags');

      console.log("//////////////////////////////////// IconDetails" , IconDetails);

      if(IconDetails !== null){
        console.log("//////////////////////////////////// IconDetails" , IconDetails);
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
    
    const ExpenseDetails = async() =>{
      const Permission = await AsyncStorage.getItem('Permission')
      const IconDetails = await GetLocaLItem('ManageTags');
      if(Permission === "Access"){
        if(smsDataRedux > 0){
          console.log(smsDataRedux.length)
            console.log("full data")
        }
       else {
        console.log("Sending Data")
        ReadSmS(Dispatch,IconDetails)
        }
      
      }
    }

    ExpenseDetails()
    GetIconFunction()
    GetPlannerLocalFunction()

    // setTimeout(()=>{
    //   Navigation.navigate("SMSScreen")
    // },300)
    
  },[]);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared!');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  useEffect(() =>{

    const GotoNextNavigation = async() =>{
      const UserEmail = await AsyncStorage.getItem('Email');
      const Usersname = await AsyncStorage.getItem('Name');
      const UserImage = await AsyncStorage.getItem('Image');

      const OnIncome = await AsyncStorage.getItem('OnIncome');
      const OnEssentenails = await AsyncStorage.getItem('OnEssentenails');
      const OnSaving = await AsyncStorage.getItem('OnSaving');
      const OnPermission =  await AsyncStorage.getItem('OnSMSScreen')

      console.log("///////////////////////////////////////////////UserEmail :",UserEmail)
      console.log("///////////////////////////////////////////////Usersname :",Usersname)
      console.log("///////////////////////////////////////////////UserImage :",UserImage)

      if(UserEmail){
        console.log("Login done")
        if(OnPermission !== "Visited"){SplashScreen.hide(); return Navigation.replace("OnSMSScreen")}
       if(OnIncome !== "Visited"){SplashScreen.hide(); return Navigation.replace("OnIncome")}
       if(OnEssentenails !== "Visited"){SplashScreen.hide(); return Navigation.replace("OnEssentials")}
       if(OnSaving !== "Visited"){SplashScreen.hide(); return Navigation.replace("OnSaving")}

       return Navigation.replace("TabNavigation") 
      }else{
        SplashScreen.hide();
        Navigation.replace("Login")
      }
      
    }

    GotoNextNavigation()
  },[])


  return (
    <View style = {{justifyContent:"center",alignItems:"center",flex:1}}>
     <RooMathLogo />
    </View>
  );
};

export default AnimationSplashScreen;
