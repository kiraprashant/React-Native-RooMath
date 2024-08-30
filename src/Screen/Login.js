import React, {useEffect,useState} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,ScrollView} from 'react-native';
import {GoogleSignin,GoogleSigninButton,statusCodes} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
import Logo from "../assets/Images/Roomath.svg"
import LightMode from "../Utli/LightMode"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const [usrEmail,setusrEmail] = useState(null)
    const [Error,SetErr] = useState()
    const Navigation = useNavigation()

    useEffect(()=>{
      SplashScreen.hide();
        GoogleSignin.configure({webClientId:"1039903067617-vq9jctuqdh092auclk1mo3t62akbbaua.apps.googleusercontent.com"});
        //"531970054674-rtrrrgcsu8bktjq6s85omr1i10nkndte.apps.googleusercontent.com"
        // signIn()

        // 531970054674-rtrrrgcsu8bktjq6s85omr1i10nkndte.apps.googleusercontent.com

        //531970054674-rtrrrgcsu8bktjq6s85omr1i10nkndte.apps.googleusercontent.com
      },[])


  const NewScreen = () =>{
    Navigation.navigate("OnIncome")
  }

      const signIn = async () => {

        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setusrEmail(userInfo.user.email);
          const UserEmail = await AsyncStorage.setItem('Email', userInfo.user.email);
          const Usersname = await AsyncStorage.setItem('Name', userInfo.user.name);
          const UserImage = await AsyncStorage.setItem('Image', userInfo.user.photo);

          const OnIncome = await AsyncStorage.getItem('OnIncome');
          const OnEssentenails = await AsyncStorage.getItem('OnEssentenails');
          const OnSaving = await AsyncStorage.getItem('OnSaving');
          const OnPermission =  await AsyncStorage.getItem('OnSMSScreen')

          if(OnPermission !== "Visited"){return Navigation.replace("OnSMSScreen")}
          if(OnIncome !== "Visited"){ return Navigation.replace("OnIncome")}
          if(OnEssentenails !== "Visited"){ return Navigation.replace("OnEsstenails")}
          if(OnSaving !== "Visited"){ return Navigation.replace("OnSaving")}

          return Navigation.replace("TabNavigation")

          console.log(userInfo)
          SetErr("Not Error")

        //   if(OnPermission !== "Visited"){return Navigation.navigate("OnSmSPermission")}
        //   if(OnAsk !== "Visited"){ return Navigation.navigate("OnAskSalary")}
        //   if(OnEssentenails !== "Visited"){ return Navigation.navigate("OnEsstenails")}
        //   if(OnSaving !== "Visited"){ return Navigation.navigate("OnSaving")}
        //   return Navigation.replace('TabNavigation', { screen: 'Home' });

      
          // Navigation.replace("Account")
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("firsty" , error)
            SetErr("statusCodes.SIGN_IN_CANCELLED")
            //Alert(error)
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log(error)
            SetErr("statusCodes.IN_PROGRESS")
            //Alert(error)
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("Second" , error)
            SetErr("statusCodes.PLAY_SERVICES_NOT_AVAILABLE")
            //Alert(error)
          } 
          else{
            console.log("else error" , error)
            SetErr(JSON.stringify(error))
          }
          // else {
          //   // some other error happened
          //   console.log("Third" , error)
          //   SetErr("Developer Err or Any Other Error")
          //   //Alert(error)
          // }
          // NewScreen()
      
        }
      
      
      };

      const Logoff = async()=>{
        try {
            await GoogleSignin.signOut();
            // const data = await AsyncStorage.removeItem('Email');
            // await AsyncStorage.clear();
            // Dispatch(FullDete([]))
  
        } catch (error) {
          console.error(error);
        }

      }


  return (
    <View style={{flex: 1}}>
      <View style={styles.RooMathTitle}>
        <View>
          <View style={{alignItems:"center"}}><Logo /></View>
          <Text>We will do the math for you</Text>
        </View>
      </View>
      <View style={styles.GoogleSection}>
        <TouchableOpacity onPress={()=> signIn()}><Text style={{fontFamily:"Roboto-BlackItalic"}}>Sign in with Google</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> Logoff()}><Text>Logoff</Text></TouchableOpacity>
        <Text>{Error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  RooMathTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  GoogleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});

export default Login;
