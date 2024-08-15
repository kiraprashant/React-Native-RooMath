import React, {Component, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AnalysisCard from '../../ReuseCmp/AnalysisCard';

function Analysis() {
  const Navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  //   const AnalysisCarousel = [
  //     {
  //       id:1,
  //       MyImage:require("../../Assets/Analysis/MainAnalysis/AnalysisCarousel.png")
  //     },
  //     {
  //       id:2,
  //       MyImage:require("../../Assets/Analysis/MainAnalysis/BurgerCarousel.png")
  //     }
  //   ]

  const items = [
    {
      id: 1,
      aspectratio: 150 / 200,
      color: '#ffcd32',
      MyImage: require('../../../Asset/Analysis/Report.png'),
      Link: 'ExpenseByCategory',
    },
    {
      id: 2,
      aspectratio: 170 / 250,
      color: '#ff5632',
      MyImage: require('../../../Asset/Analysis/Crorepatti.png'),
      Link: 'ExpenseByCategory',
    },
    {
      id: 3,
      aspectratio: 150 / 250,
      color: 'red',
      MyImage: require('../../../Asset/Analysis/Clothes.png'),
      Link: 'ExpenseByCategory',
    },

    {
      id: 4,
      aspectratio: 650 / 200,
      color: 'blue',
      MyImage: require('../../../Asset/Analysis/Snacks.png'),
      Link: 'ExpenseByCategory',
    },
    {
      id: 5,
      aspectratio: 650 / 200,
      color: 'blue',
      MyImage: require('../../../Asset/Analysis/Home.png'),
      Link: 'ExpenseByCategory',
    },
    {
      id: 6,
      aspectratio: 650 / 200,
      color: 'blue',
      MyImage: require('../../../Asset/Analysis/Camera.png'),
      Link: 'ExpenseByCategory',
    },
    {
      id: 7,
      aspectratio: 650 / 200,
      color: 'blue',
      MyImage: require('../../../Asset/Analysis/Cars.png'),
      Link: 'ExpenseByCategory',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#F8FBFE'}}>
      <ScrollView>
        <View
          style={{flex: 1, backgroundColor: '#F8FBFE', marginHorizontal: 20}}>
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Roboto-Bold',
                paddingBottom:12,
                marginTop: 20,
              }}>
              Analysis
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              cursus nisl nec scelerisque sagittis. Fusce tempor velit nec dolor
              euismod volutpat.
            </Text>
          </View>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            {/* Left Side */}

            <View style={{marginRight: 10}}>
              {items
                .filter((_, i) => i % 2 === 0)
                .map((item, i) => (
                  <AnalysisCard
                    Link={item.Link}
                    width={158}
                    MyImage={item.MyImage}
                    index={item.id}
                    key={item.id}
                  />
                ))}
            </View>
            <View style={{marginLeft: 10}}>
              {items
                .filter((_, i) => i % 2 !== 0)
                .map((item, i) => (
                  <AnalysisCard
                    Link={item.Link}
                    width={158}
                    MyImage={item.MyImage}
                    index={item.id}
                    key={item.id}
                  />
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  firstBox: {
    borderWidth: 1,
    padding: 20,
    width: 200,
  },
  CardContent: {},
});

export default Analysis;
