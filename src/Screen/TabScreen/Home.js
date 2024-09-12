import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, FlatList, ScrollView, Alert} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DonutChart from '../CustomCarts/DonuntChart';
import Lightcolors from '../../Utli/LightMode';
import ProgressBar from '../CustomCarts/ProgressBar';
import Card from '../../ReuseCmp/Card';
import IconM from 'react-native-vector-icons/MaterialIcons';
import List from '../../ReuseCmp/List';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Essential from '../SubScreen/PlannedVsActual/Essential';
import Saving from '../SubScreen/PlannedVsActual/Saving';
import {useSelector, useDispatch} from 'react-redux';
import {
  ReduxPlannedEssentenailsSpend,
  ReduxPlannedSavingSpend,
  ReduxPlannedIncomeSpend,
  ReduxActualEssentenailsSpend,
  ReduxActualIncomeSpend,
  ReduxActualSavingSpend,
  ReduxAddSaving,
} from '../../Redux/Slices/PlannerSlices';
import {request, PERMISSIONS } from 'react-native-permissions';
import ReadSmS from '../SMSPermission/ReadSmS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const Dispatch = useDispatch();
  const Navigation = useNavigation();
  const getSMSData = useSelector(state => state.SMS.SMSDATA);
  const getTotalDelete = useSelector(state => state.SMS.DeletedSMS);

  const getIcon = useSelector((state) => state.IconRedux.AllExistingIcon)
  const GetEssential = useSelector(state => state.Planner.EssentenailSlice);
  const GetSaving = useSelector(state => state.Planner.SavingSlice);
  const GetIncome = useSelector(state => state.Planner.IncomeSlice);

  const GetEssentialPlannedBudget = useSelector(
    state => state.Planner.PlannedEssentenailsSpend,
  );
  const GetSavingPlannedBudget = useSelector(
    state => state.Planner.PlannedSavingSpend,
  );

  const GetEssentialActualBudget = useSelector(
    state => state.Planner.ActualEssentenailsSpend,
  );
  const GetSavingActualBudget = useSelector(
    state => state.Planner.ActualSavingSpend,
  );

  const GetDefaultIncome = useSelector((state) => state.Planner.PlannedIncomeSpend)

  // useEffect(() =>{
  //    console.log("getSMSData////////////// State wala",StateSMS)
  // },[getSMSData])

  console.log('//////////////////////////????????', GetEssential[0]);

  const [OpenEssentialModal, setOpenEssentialModal] = useState(false);
  const [OpenSavingModal, setOpenSavingModal] = useState(false);
  const [StateSMS, setStateSMS] = useState(getSMSData);

  const [StateSpendAmount, setStateSpendAmount] = useState(600);
  const [StateTotalAmount, setStateTotalAmount] = useState(1000);
  const [Scaleboth, setScaleboth] = useState(1);


  const [DemoData, setDemoData] = useState([]);
  const [StartingIndex, setStartingIndex] = useState(0);

  const [MontlySpend, setMontlySpend] = useState(0);
  const [DailySpend, setDailySpend] = useState(0);

  const [PlannedEssentenail, setPlannedEssentenail] = useState(0);
  const [ActualEssentenail, setActualEssentenail] = useState(0);

  const [PlannedSaving, setPlannedSaving] = useState(0);
  const [ActualSaving, setActualSaving] = useState(0);

  const [TotalIncome, setTotalIncome] = useState(0);

  const [OnlyNopeExpense, setOnlyNopeExpense] = useState(0);

  const [CheckOverSpendEss, setCheckOverSpendEss] = useState(0);

  const [FinalTotal, setFinalTotal] = useState(0);

  const [CheckOverSpendSaving, setCheckOverSpendSaving] = useState();

  const [StateCalculatePerDay,setStateCalculatePerDay] = useState(0)
  const [SpendPerDay,setSpendPerDay] = useState(0)

  const [MonthTrsactionAmount,setMonthTrsactionAmount] = useState(0)
  const [StateDeteleTotalSMS,setStateDeteleTotalSMS] = useState(getTotalDelete)


  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() =>{
    setStateDeteleTotalSMS(getTotalDelete)
  },[StateDeteleTotalSMS,getTotalDelete])

  useEffect(() =>{
    
    const getTodayDate = new Date().getDate()
    console.log("getTodayDategetTodayDategetTodayDategetTodayDategetTodayDate",getTodayDate)


    const GetTodaySpend = getSMSData.reduce((acc,elem) =>{
      const ChechingDate = elem.date_Sent
      if((new Date(ChechingDate).getDate() === getTodayDate) && elem.Budget === "Nope"){
       return acc = acc + elem.RS
      }else{
        return acc
      }
    },0)

    const TotalTransactionAmount = getSMSData.reduce((acc,elem) => acc = acc + elem.RS,0)

    setMonthTrsactionAmount(TotalTransactionAmount)

    setSpendPerDay(GetTodaySpend)
  },[getSMSData])


  useEffect(() => {
    const getActualEssentail = getSMSData.reduce((acc, elem) => {
      if (elem.Budget === 'Essentail') {
        console.log('.........../getting here');
        return acc + elem.RS;
      } else {
        return acc;
      }
    }, 0);

    console.log('/////////////////////////////', getActualEssentail);

    const getActualSaving = getSMSData.reduce((acc, elem) => {
      if (elem.Budget === 'Saving') {
        return acc + elem.RS;
      } else {
        return acc;
      }
    }, 0);

    // setActualEssentenail(getActualEssentail);
    setActualSaving(getActualSaving);
//     if(ActualSaving >= GetSavingPlannedBudget)
// {
//   Dispatch(ReduxActualSavingSpend(getActualSaving));
// }
    Dispatch(ReduxActualEssentenailsSpend(getActualEssentail));
     Dispatch(ReduxActualSavingSpend(getActualSaving));
  }, [getSMSData, GetEssentialActualBudget, GetSavingActualBudget,ActualSaving]);

  useEffect(() => {
    const getIncomeTotal = GetIncome.reduce(
      (acc, elem) => acc + parseInt(elem.price),
      0,
    );

    const NonEssentenailAndNonSaving = getSMSData.reduce(
      (acc, elem) => (elem.Budget === 'Nope' ? acc + parseInt(elem.RS) : acc),
      0,
    );


    // setCheckingTotal(
    //   parseInt(getIncomeTotal) -
    //     (parseInt(GetEssentialTotal) +
    //       parseInt(GetSavingTotal) +
    //       parseInt(NonEssentenailAndNonSaving)),
    // );
   
    setTotalIncome(getIncomeTotal);
    Dispatch(ReduxPlannedIncomeSpend(getIncomeTotal))
    setOnlyNopeExpense(NonEssentenailAndNonSaving);
  }, [getSMSData, GetIncome, GetSaving, GetEssential,OnlyNopeExpense,]);

  useEffect(() => {
    const SavingPrice = GetSaving.reduce(
      (acc, elem) => acc + parseInt(elem.price),
      0,
    );
    console.log(SavingPrice);
    setPlannedSaving(SavingPrice);
    Dispatch(ReduxPlannedSavingSpend(SavingPrice));
  }, [GetSaving]);

  useEffect(() => {
    const EssentialPrice = GetEssential.reduce(
      (acc, elem) => acc + parseInt(elem.price),
      0,
    );
    console.log(EssentialPrice);
    setPlannedEssentenail(EssentialPrice);
    Dispatch(ReduxPlannedEssentenailsSpend(EssentialPrice));
  }, [GetEssential]);

  useEffect(() => {
    const thisCatogery123 = GetEssential.map(data => {
      const EssentionCatogery = getSMSData.reduce((total, elem) => {
        if (elem.Budget === data.Budget && elem.relation === data.name) {
          return total + elem.RS;
        } else {
          return total;
        }
      }, 0);

      if (EssentionCatogery > parseInt(data.price)) {
        console.log('value of EssentailsCutFinal ', EssentionCatogery);
        setCheckOverSpendEss(
          prevEssentailCutFinal => prevEssentailCutFinal + EssentionCatogery,
        );
        return EssentionCatogery;
      } else {
        console.log('value of EssentailsCutFinal ', parseInt(data.price));
        setCheckOverSpendEss(
          prevCheckOverSpendEss => prevCheckOverSpendEss + parseInt(data.price),
        );
        return parseInt(data.price);
      }

      // Return the result of the reduce operation for each element in EssentenailsState
    });

    const datasum = thisCatogery123.reduce((total, sum) => {
      return total + sum;
    }, 0);

    setCheckOverSpendEss(datasum);
    // const adding = GetEssentialActualBudget - GetEssentialPlannedBudget
    // const more = adding > 0 ? adding : 0
  }, [
    getSMSData,
    GetEssential,
    GetEssentialActualBudget,
    GetEssentialPlannedBudget,
    
  ]);

  useEffect(() => {
    const thisCatogery123 = GetSaving.map(data => {
      const EssentionCatogery = getSMSData.reduce((total, elem) => {
        if (elem.Budget === data.Budget && elem.relation === data.name) {
          return total + elem.RS;
        } else {
          return total;
        }
      }, 0);

      if (EssentionCatogery > parseInt(data.price)) {
        console.log('value of EssentailsCutFinal ', EssentionCatogery);
        setCheckOverSpendSaving(
          prevEssentailCutFinal => prevEssentailCutFinal + EssentionCatogery,
        );
        return EssentionCatogery;
      } else {
        console.log('value of EssentailsCutFinal ', parseInt(data.price));
        setCheckOverSpendSaving(
          prevCheckOverSpendEss => prevCheckOverSpendEss + parseInt(data.price),
        );
        return parseInt(data.price);
      }

      // Return the result of the reduce operation for each element in EssentenailsState
    });

    const datasum = thisCatogery123.reduce((total, sum) => {
      return total + sum;
    }, 0);

    setCheckOverSpendSaving(datasum);
  }, [getSMSData, GetSaving, GetSavingActualBudget, GetSavingPlannedBudget,]);

  useEffect(() => {
    gotoCutSum();
    CalculatePerDay();
  }, [
    //,
    // getSMSData,
    // GetSaving,
    GetSavingActualBudget,
    GetSavingPlannedBudget,
    // GetEssential,
    GetEssentialActualBudget,
    GetEssentialPlannedBudget,
    MontlySpend,
    FinalTotal,
    //OnlyNopeExpense,
    GetDefaultIncome,
    StateCalculatePerDay,
    StateDeteleTotalSMS
  ]);

  useEffect(() =>{
    gotoCutSum();
    console.log("//////////////////////////////////////Ye ohh raha hai kya")
    CalculatePerDay();
  },[StateCalculatePerDay])


  const Essentialmodalfunction = () => {
    setOpenEssentialModal(!OpenEssentialModal);
  };

  const Savingmodalfunction = () => {
    setOpenSavingModal(!OpenSavingModal);
  };

  const PlannerData = [
    {
      Icon: 'Star',
      Name: 'Planned vs Actual',
      Description: 'You are on the right track. Good Job!!!',
      ActualSpend: 40,
      PlannedSpend: 100,
      functionName: () => modalfunction(),
      OverSpend:"",
    },
    {
      Name: 'Expense',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      ActualSpend: GetEssentialActualBudget,
      PlannedSpend: GetEssentialPlannedBudget,
      functionName: () => Essentialmodalfunction(),
      OverSpend:CheckOverSpendEss
    },
    {
      Name: 'Saving',
      Description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla elit magna, molestie in finibus.',
      ActualSpend: GetSavingActualBudget,
      PlannedSpend: GetSavingPlannedBudget,
      functionName: () => Savingmodalfunction(),
      OverSpend:CheckOverSpendSaving
    },
  ];

  useEffect(() => {
    setDemoData(data);
    console.log("//////////////////////////////////////////ChartUpdating",data)
  }, [MontlySpend,StateCalculatePerDay,SpendPerDay,OnlyNopeExpense,getSMSData,FinalTotal,getTotalDelete,StateDeteleTotalSMS]);



  const gotoCutSum = () => {

    const calculation =
      (parseInt(CheckOverSpendEss) + parseInt(CheckOverSpendSaving));

    setFinalTotal(parseInt(GetDefaultIncome) - calculation);
    setMontlySpend(calculation)

    console.log("calculation calculation calculation calculation :",calculation)

    // const indianFormat = new Intl.NumberFormat('en-IN', {
    //   style: 'currency',
    //   currency: 'INR',
    // });

    
  };

  const CalculatePerDay = () =>{
    const date = new Date();
    const Today = new Date().getDate();
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const remainingDay = lastDay + 1 - Today;
    console.log('Last Day of Month ', lastDay);
    console.log('remainingDay ', remainingDay);
    console.log("FinalTotal" , FinalTotal)
    // const PerCalculation = indianFormat.format(
    //   Math.floor(MontlySpend / remainingDay),
    // );

    console.log("OnlyNopeExpenseOnlyNopeExpenseOnlyNopeExpense", OnlyNopeExpense)

    const PerCalculation = Math.floor((FinalTotal-parseInt(OnlyNopeExpense)) / remainingDay)
    setStateCalculatePerDay(PerCalculation)
  }

  const data = [
    {
      totalAmount: FinalTotal,
      spentAmount: parseInt(OnlyNopeExpense),
      Name: 'Monthly',
    },
    {
      totalAmount: StateCalculatePerDay,
      spentAmount: SpendPerDay,
      NonEssentenail:0,
      Name: 'Daily',
    },
    // Add more data objects as needed
  ];

  const GotoPermissionPage = async(permissions) =>{
    const granted = await request(permissions)
      
    if(granted === "granted"){
      const Permission =  await AsyncStorage.setItem('Permission',"Access")
      const Onpermission =  await AsyncStorage.setItem('OnSMSScreen',"Visited")
      ReadSmS(Dispatch,getIcon)
      // Navigation.replace("OnAskSalary")
        console.log(granted)
    }

    else{
        console.log("permission Denied ")
        const Permission =  await AsyncStorage.setItem('Permission',"Denied")
        const Onpermission =  await AsyncStorage.setItem('OnSMSScreen',"Visited")
        Navigation.replace("OnAskSalary")
        console.log(granted)
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fcfdff'}}>
      <View style={{position: 'absolute', bottom: 20, right: 20, zIndex: 100}}>
        <TouchableOpacity
          onPress={() =>
            Navigation.push('TransactionDetails', {isUpdate: false})
          }>
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
                  NonEssentenail={item.NonEssentenail}
                  Name={item.Name}
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
              colors={['#ECF6FF', '#D9EDF3', '#FFFFFF']}>
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
                    OverSpend={item.OverSpend}
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
               <TouchableOpacity onPress={() => GotoPermissionPage(PERMISSIONS.ANDROID.READ_SMS)}> 
              <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text style={{fontSize:12}}>
                {StateCalculatePerDay} ß {StateDeteleTotalSMS} Recent {getTotalDelete}
              </Text>
              <IconM name="refresh" size={20} />
            </View>
            </TouchableOpacity>
            </View>
            
            <Text style={{fontSize:12}}>
           {MonthTrsactionAmount}

            </Text>
          </View>

          <View
            style={{
              padding: 20,
              borderWidth: 1,
              borderColor: '#d3e6ec',
              borderRadius: 16,
            }}>
            {getSMSData
              .slice(0,50)
              .sort((a, b) => b.date_Mini_Second - a.date_Mini_Second)
              .map((elem, i) => (
                <List key={elem.date_Mini_Second} data={elem} />
              ))}
          </View>
        </View>
      </ScrollView>
      {OpenEssentialModal ? (
        <Essential
          modal={OpenEssentialModal}
          modalfunction={Essentialmodalfunction}
        />
      ) : (
        ''
      )}
      {OpenSavingModal ? (
        <Saving
          modal={OpenSavingModal}
          OpenSavingModal={OpenSavingModal}
          Savingmodalfunction={Savingmodalfunction}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default Home;

// const thisCatogery123 = EssentenailsState.map(data => {
//   const EssentionCatogery = smsDataRedux.reduce((total, elem) => {
//     if (
//       elem.Budget === data.Name &&
//       elem.relation === data.Item &&
//       elem.Month === data.CreatedMonth &&
//       elem.Year === data.CreatedYear
//     ) {
//       return total + elem.RS;
//     } else {

//       return total; // You need to return the accumulator in the else case
//     }
//   }, 0); // Initialize the accumulator with 0

//   if(EssentionCatogery > data.IncomeAndExpense){
//     console.log("value of EssentailsCutFinal " , EssentionCatogery )
//     setEssentailCutFinal((prevEssentailCutFinal)=> prevEssentailCutFinal + EssentionCatogery)
//     return EssentionCatogery

//   }
//   else{
//     console.log("value of EssentailsCutFinal " , data.IncomeAndExpense )
//     setEssentailCutFinal((prevEssentailCutFinal)=> prevEssentailCutFinal + data.IncomeAndExpense)
//     return data.IncomeAndExpense
//   }

//   // Return the result of the reduce operation for each element in EssentenailsState
// });
