import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const List = (data) => {
  const Navigation = useNavigation(0)
  const { SendTo , RS , date , Icon } = data.data;
  console.log(Icon)

  const GotoAddAndEdit = smsData => {
    //  console.log(data)
    Navigation.navigate('TransactionDetails', {isUpdate: true, smsData});
  };

  return (
    <TouchableOpacity onPress={() => GotoAddAndEdit( data.data)}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10, // Add padding for better spacing
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <IconMC
          name={Icon.IconName?Icon.IconName:"help"}
          size={24}
          color={Icon.TextColor}
          style={{
            borderWidth: 1,
            borderColor: '#f2fbfe',
            padding: 12,
            borderRadius: 24,
            backgroundColor: Icon.BackgroundColor
          }}
        />
        <View style={{ marginLeft: 8, flex: 1 }}>
          <Text numberOfLines={1}  ellipsizeMode="tail" style={{ width: "80%",fontSize:12,fontFamily:"Roboto-Bold"}}>{SendTo}</Text>
          <Text style = {{width:"80%",fontSize:10,fontFamily:"Roboto-Light",color:"#2D3945"}} >{date}</Text>
        </View>
      </View>
      <View style={{ maxWidth: 100, alignItems: 'flex-end',}}>
        <Text style={{ textAlign: 'right', fontSize:12,fontFamily:"Roboto-Bold",color:"red" }}>
          {RS}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default List;