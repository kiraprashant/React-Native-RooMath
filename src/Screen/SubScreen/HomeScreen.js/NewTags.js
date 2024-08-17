import React, {useState,useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightcolors from '../../../Utli/LightMode';
import IconColor from '../../../Utli/IconColor';
import {useNavigation} from '@react-navigation/native';
import SelectIconColorList from '../../../ReuseCmp/SelectIconColorList';
import AllIconList from '../../../ReuseCmp/AllIconList';
import { useSelector,useDispatch } from 'react-redux';
import { CreatedIconFunction } from '../../../Redux/Slices/CreatedIconSlices';

const NewTags = () => {
  const Navigation = useNavigation();
  const Dispatch = useDispatch()
  const getIcon = useSelector((state) => state.CreatedIcon.AllExistingIcon)

  const [NewTagName,setNewTagName] = useState()
  const [NewIconTextColor,setNewIconTextColor] = useState()
  const [NewIconBGColor,setNewIconBGColor] = useState()
  const [NewIcon,setNewIcon] = useState()

  useEffect(()=>{
    console.log("working data //////////////////////////////", getIcon)
  },[getIcon])

  const SelectIconColorFunc = (Textcolor,BGColor) =>{
    setNewIconTextColor(Textcolor)
    setNewIconBGColor(BGColor)
  }

  const SelectNewIconFunc = (Icon) =>{
    setNewIcon(Icon)
  }

  const SaveIcon = () =>{
    const data = {
      NewTagName:NewTagName,
      NewIconTextColor:NewIconTextColor,
      NewIconBGColor:NewIconBGColor,
      NewIcon:NewIcon
    }
    console.log("data ",data)
    Dispatch(CreatedIconFunction(data))

    setNewTagName("")
    setNewIconTextColor("")
    setNewIconBGColor("")
    setNewIcon("")

  } 

  const [IconColor, setIconColor] = useState([
    {
      name: 'LightPink',
      TextColor: '#BF9292',
      BackgroundColor: '#FFC2C2',
    },
    {
      name: 'LightApricot',
      TextColor: '#BFA892',
      BackgroundColor: '#FFE0C2',
    },
    {
      name: 'LightLimeGreen',
      TextColor: '#A1BF92',
      BackgroundColor: '#D6FFC2',
    },
    {
      name: 'MintGreen',
      TextColor: '#92BFB2',
      BackgroundColor: '#C2FFED',
    },
    {
      name: 'SkyBlue',
      TextColor: '#92B2BF',
      BackgroundColor: '#C2EDFF',
    },
    {
      name: 'Lavender',
      TextColor: '#A192BF',
      BackgroundColor: '#D6C2FF',
    },
    {
      name: 'PalePink',
      TextColor: '#BF92AD',
      BackgroundColor: '#FFC2E7',
    },
  ]);

  const iconNames = [
    'home-outline',
    'lightbulb-outline',
    'car-outline',
    'food-outline',
    'shield-outline',
    'calendar-outline',
    'phone-outline',
    'wrench-outline',
    'credit-card-outline',
    'paw-outline',
    'briefcase-outline',
    'printer-outline',
    'calendar-outline',
    'bank-outline',
    'credit-card-outline',
    'application-outline',
    'arm-flex-outline',
    'bacteria-outline',
    'badge-account-horizontal-outline',
    'badge-account-outline',
    'baby-bottle-outline',
    'baby-face-outline',
    'backspace-outline',
    'backspace-reverse-outline',
    'ballot-outline',
    'baseball-diamond-outline',
    'basket-outline',
    'bathtub-outline',
    'battery-outline',
    'bed-outline',
    'bell-outline',
    'bookmark-outline',
    'bottle-soda-outline',
    'bowl-mix-outline',
    'bug-outline',
    'bullhorn-variant-outline',
    'car-outline',
    'card-account-details-outline',
    'card-account-details-outline',
    'chat-outline',
    'ceiling-light-outline',
    'chart-box-outline',
    'clock-outline',
    'cloud-outline',
    'coffee-outline',
    'cog-outline',
    'compass-outline',
    'contacts-outline',
    'controller-classic-outline',
    'cross-outline',
    'cup-outline',
    'crown-outline',
    'cube-outline',
    'cursor-default-outline',
    'database-outline',
    'face-woman-outline',
    'file-outline',
    'fit-to-page-outline',
    'flag-variant-outline',
    'image-outline',
    'information-outline',
    'phone-outline',
    'wifi-strength-outline',
    'vote-outline',
    'video-outline',
  ];



  return (
    <View style={{flex: 1, backgroundColor: '#fcfdff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
          backgroundColor: '#fff',
        }}>
        <Text>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <IconM name="arrow-back-ios" />
          </TouchableOpacity>
          New Tag
        </Text>
        <TouchableOpacity onPress={() => SaveIcon()}><Text style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
          Save
        </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={{flex: 1, padding: 20}}>
        <Text style={{fontSize: 12}}>New Tag Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#D8D8D8',
            width: '100%',
            borderRadius: 8,
            paddingLeft: 20,
            marginBottom: 20,
          }}
          placeholder="Search"
          value={NewTagName}
          onChangeText={text => setNewTagName(text)}
          

        />

        <View>
          <Text style={{fontSize: 12}}>Select Color</Text>
          <View style={{flexDirection: 'row', marginTop: 4, marginBottom: 16}}>
            {IconColor.map((elem, i) => (
              <SelectIconColorList key={i} data={elem} SelectIconColorFunc = {SelectIconColorFunc} NewIconTextColor = {NewIconTextColor}/>
            ))}
          </View>
        </View>
        <Text style={{}}>Select icon</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D8D8D8',
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap:"wrap"
          }}>
          {iconNames.map((elem, i) => (
            <AllIconList key={i} IconName={elem} SelectNewIconFunc = {SelectNewIconFunc} NewIcon = {NewIcon}/>
          ))}
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default NewTags;
