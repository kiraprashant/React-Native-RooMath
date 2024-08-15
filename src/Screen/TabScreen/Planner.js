import React, {Component} from 'react';
import {Text, View} from 'react-native';
import PlannerList from '../../ReuseCmp/PlannerList';

const Planner = () => {
  const data = [
    {
      Name: 'Income',
      Price: 1000000,
      Link: 'IncomeScreen',
    },
    {
      Name: 'Essential Expense',
      Price: 45000,
      Link: 'AddEssentinalsScreen',
    },
    {
      Name: 'Savings',
      Price: 35000,
      Link: 'AddSavingScreen',
      end:"done"
    },
  ];

  const FuturePlan = [
    {
      Future:"Pending",
      Name: 'Splits',
      Price: 0,
      Link: 'Splits',
    },
    {
      Future:"Items",
      Name: 'Future Expense',
      Price: 1,
      Link: 'Splits',
      end:"done"
    },
  ]

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 24}}>Budget Planner </Text>
        <Text style={{marginBottom: 20}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris cursus
          nisl nec scelerisque sagittis. Fusce tempor velit nec dolor euismod
          volutpat.
        </Text>
      </View>
      <Text style={{paddingHorizontal: 20, marginBottom: 8}}>
        Update This Month’s Budget
      </Text>
      <View
        style={{
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: '#e0eef2',
          borderRadius: 20,
          marginBottom:20
        }}>
        {data.map((elem, i) => (
          <PlannerList key={i} data={elem} />
        ))}
      </View>

      <Text style={{paddingHorizontal: 20, marginBottom: 8}}>
        Update This Month’s Budget
      </Text>
      <View
        style={{
          marginHorizontal: 8,
          borderWidth: 1,
          borderColor: '#e0eef2',
          borderRadius: 20,
          marginBottom:20
        }}>
        {FuturePlan.map((elem, i) => (
          <PlannerList key={i} data={elem} />
        ))}
      </View>

    </View>
  );
};

export default Planner;
