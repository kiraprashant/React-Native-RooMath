import React, {useState,useEffect} from 'react';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AccountList from '../../ReuseCmp/AccountList';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Logo from "../../assets/Images/User.svg"
import {Text , View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';




const Account = () => {
  const Navigation = useNavigation()

const [Name,setName] = useState()
const [Email,setEmail] = useState()
const [UserImage,setUserImage] = useState()

useEffect(()=>{
    GoogleSignin.configure({webClientId:"1039903067617-vq9jctuqdh092auclk1mo3t62akbbaua.apps.googleusercontent.com"});
  },[])


  useEffect(() =>{

    const GetDetails = async() =>{
      const UserEmail = await AsyncStorage.getItem('Email');
      const Usersname = await AsyncStorage.getItem('Name');
      const LocalUserImage = await AsyncStorage.getItem('Image');
    
      setName(Usersname)
      setEmail(UserEmail)
      setUserImage(LocalUserImage)
    }
  
    GetDetails()
    console.log("Emsil", UserImage)
  
  },[Name,Email,UserImage])

  const Logout = async() =>{
    try{
      await GoogleSignin.signOut();
      // AsyncStorage.clear()
      Navigation.replace("Login")
    }
  
    catch(e){
  console.log(e)
    }
  }

  const data = [
    {
      Name: 'Help',
      Link: '',
      FunctionName:()=> Logout()
    },
    {
      Name: 'Rate us',
      Link: '',
      FunctionName:()=> Logout()
    },
    {
      Name: 'About us',
      Link: '',
      FunctionName:()=> Logout()
    },
    {
      Name: 'Logout',
      Link: '',
      FunctionName:()=> Logout(),
      end: 'done',
    },
  ];

  return (
    <View style={{flex: 1, padding: 8, backgroundColor: '#fff'}}>
      <Text style={{fontFamily: 'Roboto-Bold', fontSize: 24, marginBottom: 16}}>
        {' '}
        Account Details{' '}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#f1f7f9',
          padding: 12,
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 20,
          marginBottom: 20,
        }}>
        {
          UserImage?
        <Image source={{ uri:UserImage}} style = {{  width: 50, height: 50,borderRadius:50}} resizeMode="cover"/>
        :
        <Image
        source={require('../../../Asset/User.png')} // Adjust the path according to your project structure
        resizeMode="contain" // Optionally, set the resize mode
      />
        }
        {/* <IconM
          name="person-4"
          size={48}
          style={{
            borderWidth: 1,
            borderColor: '#f1f7f9',
            borderRadius: 50,
            padding: 8,
          }}
        /> */}
        <View style={{marginLeft: 8}}>
          <Text style={{fontFamily:"Roboto-Medium",fontSize:16}}>{Name}</Text>
          <Text style = {{fontSize:12}}>{Email}</Text>
        </View>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#f1f7f9',
          borderRadius: 16,
        }}>
          {data.map((elem,i)=>  <AccountList key={i} data = {elem}/> )}
        </View>
    </View>
  );
};

export default Account;
