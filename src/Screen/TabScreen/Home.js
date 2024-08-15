import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, FlatList, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DonutChart from '../CustomCarts/DonuntChart';
import Lightcolors from '../../Utli/LightMode';
import ProgressBar from '../CustomCarts/ProgressBar';
import Card from '../../ReuseCmp/Card';
import IconM from 'react-native-vector-icons/MaterialIcons';
import List from '../../ReuseCmp/List';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const Navigation = useNavigation()

  const [StateSpendAmount, setStateSpendAmount] = useState(600);
  const [StateTotalAmount, setStateTotalAmount] = useState(1000);
  const [Scaleboth, setScaleboth] = useState(1);

  const [DemoData, setDemoData] = useState([]);
  const [StartingIndex, setStartingIndex] = useState(0);

  const [MontlySpend, setMontlySpend] = useState(10);
  const [DailySpend, setDailySpend] = useState(20);

  const [actual, setActual] = useState(33500);
  const [expected, setExpected] = useState(45000);

  const data = [
    {
      totalAmount: 3000,
      spentAmount: MontlySpend,
    },
    {
      totalAmount: 1000,
      spentAmount: DailySpend,
    },
    // Add more data objects as needed
  ];

  const PlannerData = [
    {
      Icon: 'Star',
      Name: 'Planned vs Actual',
      Description: 'You are on the right track. Good Job!!!',
      DailySpend: 40,
      MonthlySpend: 100,
    },
    {
      Name: 'Expense',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      DailySpend: 40,
      MonthlySpend: 100,
    },
    {
      Name: 'Saving',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      DailySpend: 60,
      MonthlySpend: 100,
    },
    {
      Name: 'Income',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      DailySpend: 40,
      MonthlySpend: 120,
    },
  ];

  useEffect(() => {
    setDemoData(data);
  }, [DailySpend, MontlySpend]);

  const ChangeProgress = () => {
    setStateSpendAmount(Math.random() * 1000);
    setMontlySpend(Math.random() * 3000);
    setDailySpend(Math.random() * 1000);

    console.log(StateSpendAmount);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fcfdff'}}>
      <View style={{position: 'absolute', bottom: 20, right: 20, zIndex: 100}}>
        <TouchableOpacity onPress={()=> Navigation.push("TransactionDetails")}>
          <IconM
            name="add"
            size={48}
            style={{
              backgroundColor: Lightcolors.Primary,
              color: '#fff',
              padding: 12,
              borderRadius: 50,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            height: 400,
            justifyContent: 'center',
            backgroundColor: Lightcolors.Primary,
            paddingBottom: 20,
          }}>
          <View
            style={{
              backgroundColor: Lightcolors.Primary,
            }}>
            <FlatList
              contentContainerStyle={{}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={DemoData}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                const index = Math.round(
                  x / e.nativeEvent.layoutMeasurement.width,
                );
                setStartingIndex(index);
              }}
              renderItem={({item}) => (
                <DonutChart
                  TextColor="#fff"
                  totalAmount={item.totalAmount}
                  spentAmount={item.spentAmount}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              {DemoData.map((elem, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 8,
                      backgroundColor:
                        StartingIndex === i ? '#fff' : 'rgba(255,255,255,.5)',
                      margin: 4,
                    }}></View>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#f8fcff',
              marginLeft: 20,
              marginTop: -40,

              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              marginBottom: 20,
            }}>
            <LinearGradient
              style={{
                paddingVertical: 20,
                borderWidth: 1,
                borderColor: '#d3e6ec',
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
              colors={['#ECF6FF','#D9EDF3', '#FFFFFF']}>
              <FlatList
                contentContainerStyle={{}}
                // pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={PlannerData}
                renderItem={({item}) => (
                  <Card
                    Name={item.Name}
                    Description={item.Description}
                    Icon={item.Icon}
                    DailySpend={item.DailySpend}
                    MontlySpend={item.MonthlySpend}
                    actualColor="#809AC0"
                    height={5}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </LinearGradient>
          </View>
        </View>
        <View style={{padding: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                justifyContent: 'center',
              }}>
              <Text>Recent</Text>
              <IconM name="refresh" size={20} />
            </View>
            <Text>77,234</Text>
          </View>

          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#d3e6ec',
              borderRadius: 16,
            }}>
            <List />
            <List />
            <List />

            {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconM
              name="question-mark"
              size={24}
              color="#4F8EF7"
              style={{borderWidth: 1, borderColor: '#f2fbfe', padding: 12,borderRadius:24,backgroundColor:"#f2fbfe"}}
            />
            <View style = {{marginLeft:8}}>
              <Text>Title</Text>
              <Text>Description</Text>
            </View>
          </View>
          <View>
            <Text>43990</Text>
          </View>
        </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
