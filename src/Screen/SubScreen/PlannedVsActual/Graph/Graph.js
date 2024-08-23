import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import List from '../../../../ReuseCmp/List';
import BarChart from '../../../CustomCarts/BarChart';
import IconM from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

const Graph = ({StateActual, StatePlanned, ChangingView,RelationList}) => {
  const GetEssential = useSelector((state) => state.SMS.SMSDATA)
  const [StateEssetenailCategory,setStateEssetenailCategory] = useState([])

  useEffect(() =>{
    const getCategoryEss = GetEssential.filter((elem,i) =>{
      if(elem.relation === RelationList){
         return elem
      }
    })

    console.log("/////////............////////" ,getCategoryEss)
    setStateEssetenailCategory(getCategoryEss)
  },[GetEssential])
  return (
    <View style={{flex: 1}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <TouchableOpacity onPress={() => ChangingView()}><IconM name="arrow-back-ios" /></TouchableOpacity>
        <Text>{RelationList}</Text>
      </View>
      <BarChart StateActual={StateActual} StatePlanned={StatePlanned} />

      <View style={{marginVertical: 40}}>
        {
          StateEssetenailCategory.map((elem,i) =>  <List key = {i} data = {elem} />)
        }
         
      </View>
      <Text style={{textAlign: 'center'}}>+ Add More Transaction</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f8ff',
  },
  barContainer: {
    alignItems: 'center',
  },
  bar: {
    width: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  expectedBar: {
    backgroundColor: '#d4ffcd', // Color for the Expected bar
  },
  plannedBar: {
    backgroundColor: '#cbefff', // Color for the Planned bar
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  barValue: {
    color: '#fff',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  bottomText: {
    width: 70,
    textAlign: 'center',
    marginHorizontal: 8,
  },
});

export default Graph;
