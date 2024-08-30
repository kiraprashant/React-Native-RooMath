import React, {useEffect} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import SMSREAD from '../../assets/Images/SMSREAD.svg';
import Lightcolors from '../../Utli/LightMode';
import SmsAndroid from 'react-native-get-sms-android';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReadSmS from '../SMSPermission/ReadSmS';
import {request, PERMISSIONS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { useDispatch , useSelector } from 'react-redux';


const SMSScreen = () => {
    const Navigation = useNavigation()
    const Dispatch = useDispatch()
    const getIcon = useSelector((state) => state.IconRedux.AllExistingIcon)


    useEffect(()=>{

        const tempo = async() =>{
          // const StroageData =  await AsyncStorage.getItem('SMSExpenese')
          // const ParseData = StroageData ? JSON.parse(StroageData) : []
          // console.log("this is first length",ParseData.length)
  
           
          // ParseData.map((elem)=> console.log(elem.RS))
  
  
          // const NewDateSMS = await AsyncStorage.removeItem('SMSNewDate'); 
          // const Remove =  await AsyncStorage.removeItem('SMSExpenese')
        }
        tempo()
      },[])
  
      const AskingPermission = async(permissions) =>{
          const granted = await request(permissions)
      
          if(granted === "granted"){
            const Permission =  await AsyncStorage.setItem('Permission',"Access")
            const Onpermission =  await AsyncStorage.setItem('OnSMSScreen',"Visited")
            ReadSmS(Dispatch,getIcon)
            // Navigation.replace("OnAskSalary")
              console.log(granted)
          }
      
          else{
              console.log("permission Denied ")
              const Permission =  await AsyncStorage.setItem('Permission',"Denied")
              const Onpermission =  await AsyncStorage.setItem('OnSMSScreen',"Visited")
              Navigation.replace("OnAskSalary")
              console.log(granted)
          }
          Navigation.replace("OnIncome")
      }

    const Clear = async() =>{
      try{
        const data = await AsyncStorage.clear()
      }
      catch(e){
        console.log("delete failed ",e)
      }
    }
  return (
    <View style = {{padding:20,flex:1,backgroundColor:"#fff"}}>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
      <SMSREAD />
      <Text style={{textAlign:"center",fontSize:24,marginBottom:8}}>Automated Expense Tracking</Text>
      <Text style={{textAlign:"center",lineHeight:20}}>
        We track your SMS to automatically record transaction as and when it
        happens. Don’t worry we your data is safe and we don’t store your SMS
        data.
      </Text>
      </View>
    </View>
        <TouchableOpacity
       onPress={()=> AskingPermission(PERMISSIONS.ANDROID.READ_SMS)}
        style={{
          backgroundColor: Lightcolors.Primary,
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

export default SMSScreen;
