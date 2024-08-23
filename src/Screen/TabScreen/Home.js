import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, FlatList, ScrollView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DonutChart from '../CustomCarts/DonuntChart';
import Lightcolors from '../../Utli/LightMode';
import ProgressBar from '../CustomCarts/ProgressBar';
import Card from '../../ReuseCmp/Card';
import IconM from 'react-native-vector-icons/MaterialIcons';
import List from '../../ReuseCmp/List';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Essential from '../SubScreen/PlannedVsActual/Essential';
import Saving from '../SubScreen/PlannedVsActual/Saving';
import { useSelector,useDispatch } from 'react-redux';

const Home = () => {
  const Dispatch = useDispatch()
  const Navigation = useNavigation()
  const getSMSData = useSelector((state) => state.SMS.SMSDATA)
  const GetEssential = useSelector((state) => state.Planner.EssentenailSlice)
  const GetSaving = useSelector((state) => state.Planner.SavingSlice)
  const GetIncome = useSelector((state) => state.Planner.IncomeSlice)


  // useEffect(() =>{
  //    console.log("getSMSData////////////// State wala",StateSMS)
  // },[getSMSData])


  console.log("//////////////////////////",GetEssential)

  const [OpenEssentialModal, setOpenEssentialModal] = useState(false);  
  const [OpenSavingModal, setOpenSavingModal] = useState(false);  
  const [StateSMS,setStateSMS] = useState(getSMSData)

  const [StateSpendAmount, setStateSpendAmount] = useState(600);
  const [StateTotalAmount, setStateTotalAmount] = useState(1000);
  const [Scaleboth, setScaleboth] = useState(1);

  const [DemoData, setDemoData] = useState([]);
  const [StartingIndex, setStartingIndex] = useState(0);

  const [MontlySpend, setMontlySpend] = useState(10);
  const [DailySpend, setDailySpend] = useState(20);

  const [PlannedEssentenail, setPlannedEssentenail] = useState(33500);
  const [ActualEssentenail, setActualEssentenail] = useState(45000);

  const [PlannedSaving,setPlannedSaving] = useState()
  const [ActualSaving,setActualSaving] = useState()


  useEffect(() => {

    SplashScreen.hide();
  },[])

  useEffect(() => {
  const getActualEssentail =  getSMSData.reduce((acc,elem) =>{
     if(elem.Budget === "Essentail"){
      console.log(".........../getting here")
     return  acc + elem.RS
     }
     else{
      return acc
     }
    },0)

    console.log("/////////////////////////////",getActualEssentail)

    const getActualSaving =  getSMSData.reduce((acc,elem) =>{
      if(elem.Budget === "Saving"){
      return  acc+elem.RS
      }
      else{
       return acc
      }
     },1000)

     setActualEssentenail(getActualEssentail)
     setActualSaving(getActualSaving)

  },[getSMSData])

  

  useEffect(() =>{
    const SavingPrice = GetSaving.reduce((acc,elem)=> acc + parseInt(elem.price),0)
    console.log(SavingPrice)
    setPlannedSaving(SavingPrice)
  },[GetSaving])

  useEffect(() =>{
    const EssentialPrice = GetEssential.reduce((acc,elem)=> acc + parseInt(elem.price),0)
    console.log(EssentialPrice)
    setPlannedEssentenail(EssentialPrice)
  },[GetEssential])

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

  const Essentialmodalfunction = () =>{
    setOpenEssentialModal(!OpenEssentialModal)
  }

  const Savingmodalfunction = () =>{
    setOpenSavingModal(!OpenSavingModal)
  }


  const PlannerData = [
    {
      Icon: 'Star',
      Name: 'Planned vs Actual',
      Description: 'You are on the right track. Good Job!!!',
      ActualSpend: 40,
      PlannedSpend: 100,
      functionName:()=> modalfunction()
    },
    {
      Name: 'Expense',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      ActualSpend: ActualEssentenail,
      PlannedSpend: PlannedEssentenail,
      functionName:()=> Essentialmodalfunction()
    },
    {
      Name: 'Saving',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      ActualSpend: ActualSaving,
      PlannedSpend: PlannedSaving,
      functionName:()=> Savingmodalfunction()
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
        <TouchableOpacity onPress={()=> Navigation.push("TransactionDetails",{isUpdate: false})}>
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
                    ActualSpend={item.ActualSpend}
                    PlannedSpend={item.PlannedSpend}
                    actualColor="#809AC0"
                    height={5}
                    functionName={item.functionName}
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
              <Text>Recent {ActualEssentenail} and {ActualSaving}</Text>
              <IconM name="refresh" size={20} />
            </View>
            <Text>77,234 {PlannedEssentenail} {PlannedSaving}</Text>
          </View>

          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#d3e6ec',
              borderRadius: 16,
            }}>
              {
               
               getSMSData
                .slice()
                .sort((a, b) => b.date_Mini_Second - a.date_Mini_Second)
                .map((elem,i) => <List key={elem.date_Mini_Second} data = {elem}/>)
              }
  
          </View>
        </View>
      </ScrollView>
      {OpenEssentialModal? <Essential modal = {OpenEssentialModal} modalfunction = {Essentialmodalfunction}/>:""}
      {OpenSavingModal? <Saving modal = {OpenSavingModal} OpenSavingModal = {OpenSavingModal}  Savingmodalfunction = {Savingmodalfunction} />:""}
    </View>
  );
};

export default Home;
