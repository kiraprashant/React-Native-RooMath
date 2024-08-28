import React, {useState, useRef, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import Lightcolors from '../../../Utli/LightMode';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import SelectedList from '../../../ReuseCmp/SelectedList';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { ChangeIcon } from '../../../Redux/Slices/IconSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavetoLocalStorage,UpdatetoLocalStorage,RemoveLocalItem} from '../../LocalStorage/LocalStorage';
import { SMSAddtoRedux,ReduxUpdateSMS,SMSDeleteById} from '../../../Redux/Slices/SMSSlices';

const TransactionDetails = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const Dispatch = useDispatch();
  const GetIcon = useSelector(state => state.IconRedux.AllExistingIcon);
  const userIcon = useSelector((state) => state.IconRedux.SelectedIconRedux)
  const EssentailRelation = useSelector(
    state => state.Planner.EssentenailSlice,
  );
  const SavingRelation = useSelector(state => state.Planner.SavingSlice);
  const isUpdateMode = route.params.isUpdate;
  const ref_input2 = useRef();

  //  console.log('GetIcon ///////////////////////////////////////', GetIcon);
  

  const data = [
    {
      Name: 'Nope',
    },
    {
      Name: 'Essentail',
    },
    {
      Name: 'Saving',
    },
  ];

  const [Myid, setMyid] = useState(
    isUpdateMode ? route.params.smsData.id : uuid.v4(),
  );
  const [SendTo, setSendTo] = useState(
    isUpdateMode ? route.params.smsData.SendTo : '',
  );
  const [Price, setPrice] = useState(
    isUpdateMode ? route.params.smsData.RS.toString() : '',
  );
  const [selectedPayment, setselectedPayment] = useState(
    isUpdateMode ? route.params.smsData.Payment : 'Cash',
  );
  const [selectedBudget, setselectedBudget] = useState(
    isUpdateMode ? route.params.smsData.Budget : 'Nope',
  );
  const [selectedCategory, setselectedCategory] = useState(
    isUpdateMode ? route.params.smsData.Category : 'Others',
  );
  const [selectedIcon, setselectedIcon] = useState(
    isUpdateMode ? route.params.smsData.Icon : 'information-outline',
  );
  const [body, setbody] = useState(
    isUpdateMode ? route.params.smsData.body : 'Offline Transation',
  );
  const [address, setaddress] = useState(
    isUpdateMode ? route.params.smsData.Category : 'Me',
  );
  const [date, setdate] = useState(
    isUpdateMode ? route.params.smsData.date : '',
  );
  const [dateMiniSecond, setdateMiniSecond] = useState(
    isUpdateMode ? route.params.smsData.date_Mini_Second : '',
  );
  const [dateSent, setdateSent] = useState(
    isUpdateMode ? route.params.smsData.date_Sent : '132456748976',
  );
  const [month, setmonth] = useState(
    isUpdateMode ? route.params.smsData.Month : '',
  );
  const [Year, setYear] = useState(
    isUpdateMode ? route.params.smsData.Year : '',
  );
  const [relation, setrelation] = useState(
    isUpdateMode ? route.params.smsData.relation : '',
  );
  const [BudgetOption, setBudgetOption] = useState(false);

  const [IconSet, setIconSet] = useState(
    isUpdateMode ? route.params.smsData.Icon : GetIcon[0]
  );

  useEffect(() =>{
    Dispatch(ChangeIcon(IconSet))
  },[IconSet])

  console.log("........./////////............ mic testing",GetIcon[0])


  const SelectedFunction = data => {
    console.log(data);
    setrelation(data);
  };

  const GoBack = () =>{
    Navigation.goBack()
  }

  const DeleteByID = (data) =>{
   console.log(data)
   Dispatch(SMSDeleteById(data))
   RemoveLocalItem("SMSExpenese",data)
   GoBack()
  }

  const AddToExpense = async () => {
    const Email = await AsyncStorage.getItem('Email');
    // GoBack();

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date();

    const T = new Date().getTime();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth());
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const data = {
      id: Myid,
      SendTo: SendTo,
      RS: parseFloat(Price),
      Budget: selectedBudget,
      Category: selectedCategory,
      Email: Email,
      Month: months[month],
      date_Mini_Second: T,
      date_Sent: T,
      Year: parseInt(year),
      body: 'offline Transaction',
      address: 'Me',
      date: `${day} ${months[month]} ${year} at ${hours}:${minutes}`,
      Payment: selectedPayment,
      relation: relation,
      address: 'Me',
      Icon: userIcon,
    };

    console.log("//////////////////data//////////" , data);

    
    Dispatch(SMSAddtoRedux(data));
    SavetoLocalStorage('SMSExpenese',data)
    GoBack()


  };

  const UpdateExpense = async () => {
    const Email = await AsyncStorage.getItem('Email');
    const data = {
      id: Myid,
      SendTo: SendTo,
      RS: parseFloat(Price),
      Budget: selectedBudget,
      Category: selectedCategory,
      Email: Email,
      Month: month,
      date_Mini_Second: dateMiniSecond,
      date_Sent: dateSent,
      Year: parseInt(Year),
      body: body,
      address: 'Me',
      date: date,
      Payment: selectedPayment,
      relation: relation,
      address: 'Me',
      Icon: userIcon,
    };

    console.log(data)
    GoBack();
    // console.log(data);
    UpdatetoLocalStorage('SMSExpenese', data);
    Dispatch(ReduxUpdateSMS(data));
  };

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
          Transaction Details
        </Text>
        <TouchableOpacity onPress={() => {isUpdateMode?UpdateExpense():AddToExpense()}} style={{color: Lightcolors.Primary, fontFamily: 'Roboto-Medium'}}>
         <Text>{isUpdateMode?"Update":"Save"}</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, marginBottom: 8}}>
        <View
          style={{
            backgroundColor: '#fcfdff',
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#D9EDF3',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Amount</Text>
          <TextInput
            style={{
              width: '100%',
              textAlign: 'center',
              fontSize: 40,
              padding: 0,
            }}
            value={Price}
            ref={ref_input2}
            onChangeText={text => setPrice(text)}
            placeholder="0"
          />

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#D8D8D8',
              width: '100%',
              textAlign: 'center',
              borderRadius: 8,
            }}
            value={SendTo}
            ref={ref_input2}
            onChangeText={text => setSendTo(text)}
            placeholder="0"
          />
        </View>
      </View>

      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            backgroundColor: '#fcfdff',
            padding: 20,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#D9EDF3',
          }}>
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 10}}>Was this Planned in your Budget?</Text>
            <View style={{flexDirection: 'row'}}>
              {data.map((elem, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setselectedBudget(elem.Name)}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#d8d8d8',
                      padding: 12,
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      backgroundColor:
                        selectedBudget === elem.Name ? '#f0f8ff' : '#fff',
                    }}>
                    <Text style={{textAlign: 'center'}}>{elem.Name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {selectedBudget !== 'Nope' ? (
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 10}}>Select Budget</Text>
              <TouchableOpacity
                onPress={() => setBudgetOption(true)}
                style={{
                  borderWidth: 1,
                  padding: 12,
                  borderRadius: 8,
                  borderColor: '#e4e4e4',
                }}>
                <Text>{relation}</Text>
              </TouchableOpacity>
              {BudgetOption ? (
                <View style={{marginTop: 12}}>
                  {selectedBudget === 'Saving'
                    ? SavingRelation.map((elem, i) => (
                        <SelectedList
                          key={i}
                          data={elem}
                          SelectedFunction={SelectedFunction}
                        />
                      ))
                    : null}

                  {selectedBudget === 'Essentail'
                    ? EssentailRelation.map((elem, i) => (
                        <SelectedList
                          key={i}
                          data={elem}
                          SelectedFunction={SelectedFunction}
                        />
                      ))
                    : null}
                </View>
              ) : null}
            </View>
          ) : null}

          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 10}}>Tags</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#D8D8D8',
                width: '100%',
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
                paddingVertical: 14,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconMC
                  name={userIcon.IconName}
                  color={userIcon.TextColor}
                  size={16}
                  style={{backgroundColor:userIcon.BackgroundColor, borderRadius: 20,padding:8}}
                />
                <Text> {IconSet.Name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => Navigation.navigate('ManageTags', {})}>
                <Text>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {isUpdateMode !== 'Offline Transation' ? (
        <View style={{padding: 20, marginBottom: 8}}>
          <View
            style={{
              backgroundColor: '#fcfdff',
              padding: 20,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#D9EDF3',
            }}>
            <Text>From SMS {isUpdateMode}</Text>
            <Text>{body}</Text>
          </View>
        </View>
      ) : (
        ''
      )}
      <View>
        <TouchableOpacity onPress={()=> DeleteByID(route.params.smsData)}>
        <Text style={{fontSize: 12, color: 'red', textAlign: 'center'}}>
          Delete this Transaction
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionDetails;
