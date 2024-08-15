import React, {Component} from 'react';
import {Text, View} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import AccountList from '../../ReuseCmp/AccountList';

const Account = () => {
  const data = [
    {
      Name: 'Help',
      Link: '',
    },
    {
      Name: 'Rate us',
      Link: '',
    },
    {
      Name: 'About us',
      Link: '',
    },
    {
      Name: 'Logout',
      Link: '',
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
        <IconM
          name="person-4"
          size={48}
          style={{
            borderWidth: 1,
            borderColor: '#f1f7f9',
            borderRadius: 50,
            padding: 8,
          }}
        />
        <View style={{marginLeft: 8}}>
          <Text style={{fontFamily:"Roboto-Medium",fontSize:16}}>User ka Naam</Text>
          <Text style = {{fontSize:12}}>username@email.com</Text>
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
