import React, {useState,useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import Lightcolors from '../../../Utli/LightMode';
import {useNavigation,useRoute} from '@react-navigation/native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconColor from '../../../Utli/IconColor';
import ExistingTagsList from '../../../ReuseCmp/ExistingTagsList';
import { useSelector,useDispatch } from 'react-redux';


const ManageTags = () => {
  const Navigation = useNavigation();
  const Dispatch = useDispatch()
  const Route = useRoute()
  const getIcon = useSelector((state) => state.IconRedux.AllExistingIcon)
  const userIcon = useSelector((state) => state.IconRedux.SelectedIconRedux)
  const [ExistingIcon,setExistingIcon] = useState(getIcon)

useEffect(()=>{
  setExistingIcon(getIcon)
},[getIcon])
 
  console.log(".......//////..........." , ExistingIcon)

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
          Manage Tags
        </Text>
        <TouchableOpacity onPress={()=> Navigation.push("NewTags")}><Text style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
          + Create New
        </Text>
        </TouchableOpacity>  
      </View>
      <View style={{flex: 1, padding: 20}}>
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
        />
        <TouchableOpacity><Text style={{paddingLeft: 20}}>Existing Tags</Text></TouchableOpacity>
        <View
          style={{borderWidth: 1, borderColor: '#D8D8D8', borderRadius: 16}}>

            {
              ExistingIcon.map((elem,i) => <ExistingTagsList key = {i} data = {elem} CheckingIcon = {userIcon}/>)
            }

    

        </View>
      </View>
    </View>
  );
};

export default ManageTags;
