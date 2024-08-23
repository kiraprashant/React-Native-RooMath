import SmsAndroid from 'react-native-get-sms-android';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { ReadAllSMS ,FullDete } from '../../Redux/Slices/SMSSlices';
import IconColor from '../../Utli/IconColor';
import Lightcolors from '../../Utli/LightMode';
import { useSelector } from 'react-redux';


const ReadSmS =async(Dispatch,getIcon) =>{
 
    // const Dispatch = useDispatch()
    const Email = await AsyncStorage.getItem("Email")
    let alldata = []


    const months = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
    
    const ToDayMonthDate = new Date().getMonth();
    const today = new Date().getDate(1)
    const ToDayYearDate = new Date().getFullYear();
    const MonthName = months[ToDayMonthDate]

    const firstmonthdate = new Date(`${ToDayYearDate}-${ToDayMonthDate + 1}-1`).getTime()

    const NewDateSMS = await AsyncStorage.getItem('SMSNewDate'); 

    console.log("SmSNew Data here ......................",NewDateSMS)
  
    const NewIntegerDateSMS = parseInt(NewDateSMS)+10000
    let Fiexed = 0 

    if(NewIntegerDateSMS > 10000){
      Fiexed = NewIntegerDateSMS
      console.log("Already Read SMS" , Fiexed)
    }
    else{
      Fiexed = firstmonthdate
      console.log("Not Read Any Messages" , Fiexed)
    }


    var filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all // timestamp (in milliseconds since UNIX epoch)
      // bodyRegex: '(.*)debited(.*)', // content regex to match
      minDate:Fiexed,
      // maxCount: 1, // count of SMS to return each time
    };
    console.log("Filter Kya Kar Raha Hai ", filter.minDate)
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        // console.log('List: ', smsList);
        var arr = JSON.parse(smsList);

        const filteredSMSList = arr.filter((sms) => {

            // const bodyRegex = /debited.*from your account|Spend on|debited| a\/c|A\/C.*debited/i;
            const bodyRegex = /\bdebited\b|\bSpend on\b|\bspent on\b|\ba\/c\b|\bA\/C\b.*\bdebited\b/i;

            const matches = sms.body.match(bodyRegex);
            console.log("Matches" , sms.body)

            if(matches){
              console.log("is it match")
            }
            else{
              console.log("no its not match ...............")
            }
   
            if(sms.body.includes("due") && Fiexed < sms.date_sent){
              console.log("due should not proced " , Fiexed , sms.date_sent)
              return false
            }

            else if(sms.body.includes("credited") && Fiexed < sms.date_sent){
              console.log("Credited should not proced " , Fiexed , sms.date_sent)
              return false
            }

            else if(matches && Fiexed < sms.date_sent){
              console.log("Yes Fight HAra Kaisa " , Fiexed , sms.date_sent)
              return true
            }

            else if(sms.body.includes("withdrawn") && Fiexed < sms.date_sent){
              console.log("Yes Fight HAra Kaisa " , Fiexed , sms.date_sent)
              return true
            }


            else{
              console.log("No Fight HAra Kaisa " , Fiexed , sms.date_sent)
              return false
            }

           
          });

          const newDataList = filteredSMSList.map((object)=>{
            const newData = {
                id:uuid.v4(),
                body: object.body,
                date_Sent: object.date_sent,
                address: object.address,
                Category:"Others",
                Payment:"UPI",
                Email:Email?Email:"Email@gmail.com",
                Year:ToDayYearDate,
                Month:MonthName,
                Budget:"Nope",
                relation:"from SmS",
                // Icon:{
                //   id:uuid.v4(),
                //   Name:"Others",
                //   TextColor:IconColor.LightApricot.TextColor,
                //   BackgroundColor:IconColor.LightApricot.BackgroundColor,
                //   IconName:"help"
                // }
                Icon:getIcon[0]
              };

            //   console.log(newData.id)
              console.log(new Date().getTime())
              console.log("Messages Dstes " , object.date_sent )

              newData.date_Mini_Second = object.date_sent 
              
              if(object.body.includes("Bank of Maharashtra")){

                const nameAfterToRegex = /credited to\s+([^]+)/i;
                 const Sentmatches = object.body.match(nameAfterToRegex);
                 console.log(Sentmatches);

                 if(Sentmatches){
                   newData.SendTo =  Sentmatches[2]
                //    console.log("araray" , Sentmatches[1])
                 }
                 else{
                   newData.SendTo = "unkown"
                 }
               }
               else{
                 const nameAfterToRegex = /to\s+([\w\s]+)/i;
                 const Sentmatches = object.body.match(nameAfterToRegex);
                 console.log(".........?>>>" ,Sentmatches);

                 if(object.body.toLowerCase().includes("bank card")){
                  newData.SendTo = "paid by using Card"
                 }
                 else if(Sentmatches){
                   newData.SendTo =  Sentmatches[0]
                 }

                 else if(object.body.toLowerCase().includes("withdrawn")){
                  newData.SendTo = "withdrawn By ATM"
                 }
                 else if(object.body.toLowerCase().includes("bank card")){
                  newData.SendTo = "By Card"
                 }
                 else{
                   newData.SendTo = "unkown"
                 }
               }


              if (object.body) {

                const regex = /\b(?:Rs\.?|RS\.?|by|from|INR)\s*(\d+(?:\,.\d{1,2})?)\b/gi;
                const matches = object.body.match(regex);
                const amounts = matches ? matches.map((match) => match.replace(/\b(?:Rs\.?|RS\.?|by|from|INR)\s*/, '').replace(",","")) : [0];
              //   console.log(amounts[0]);
                newData.RS = parseFloat(amounts[0])
                console.log(parseFloat(amounts[0]))

              }

              const months = [
                "January", "February", "March",
                "April", "May", "June",
                "July", "August", "September",
                "October", "November", "December"
              ];

              const date = new Date(object.date);
              // const mindate = date.getTime()
              // console.log(mindate)
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth());
              const year = String(date.getFullYear()); 
              const hours = String(date.getHours()).padStart(2, '0');
              const minutes = String(date.getMinutes()).padStart(2, '0');

              newData.date = `${day} ${months[month]} ${year} at ${hours}:${minutes}`



              return newData;
          })

          settoLocalStorage(newDataList,Dispatch)

        
      },
      
    );

  }

        const settoLocalStorage=async(newDataList,Dispatch)=>{
          try{
            console.log("newDataList :" , newDataList )
            const months = [
              "January", "February", "March",
              "April", "May", "June",
              "July", "August", "September",
              "October", "November", "December"
            ];

            const TodayMonth = new Date().getMonth()
            const TodayMonthName = months[TodayMonth]
            const GetYear = new Date().getFullYear()

            console.log("Today Month Here " , TodayMonth) 
            console.log("Today TodayMonthName Here " , TodayMonthName) 
            console.log("Today Year Here " , GetYear) 
            
          
           if(newDataList.length){
             console.log("New DataList Length" , newDataList.length-1)
             console.log("New DataList Only Date ::" , newDataList[0].date_Mini_Second)
             await AsyncStorage.setItem('SMSNewDate',newDataList[0].date_Mini_Second.toString())
   
             const StroageData =  await AsyncStorage.getItem('SMSExpenese')
            //  console.log("SMS Expense ........................." , StroageData)
             const ParseData = StroageData ? JSON.parse(StroageData) : []
            //  console.log("After PAreseData SMS Expense ........................." , ParseData)
             ParseData.push(...newDataList)
             
    
            //  console.log("Home Data Local Strorage " , ParseData)
    
             const StringData = JSON.stringify(ParseData)
             await AsyncStorage.setItem('SMSExpenese',StringData);
            console.log("getting From SMS Listner")
            // 6) Dispatch(ReadAllSMS(ParseData))
            console.log("Dont Ignore This" , Dispatch)
             OnlyThisMonthExpense(ParseData,Dispatch,TodayMonthName,GetYear)
      
           }

           else{
            const StroageData =  await AsyncStorage.getItem('SMSExpenese')
            //  console.log("SMS Expense ........................." , StroageData)
             const ParseData = StroageData ? JSON.parse(StroageData) : []
             console.log("Let See" , ParseData.length)
            //  Dispatch(ReadAllSMS(ParseData))
             console.log("Dont Ignore This" , Dispatch)
             OnlyThisMonthExpense(ParseData,Dispatch,TodayMonthName,GetYear)
            
             
     
           }

           
          }
           catch(e){
              console.log("Something Went Wrong",e)
           }


        }

        const OnlyThisMonthExpense = (ParseData,Dispatch,TodayMonthName,GetYear) =>{
            Dispatch(FullDete())
             console.log("from Logical Permission" , ParseData.length,TodayMonthName)
            const ThisMonthExpense = ParseData.filter((elem)=> (elem.Month === TodayMonthName) && (elem.Year === GetYear) )
             console.log("from Logical Permission" , ParseData[0].Month)
             Dispatch(ReadAllSMS(ThisMonthExpense))
            
        }

  export default ReadSmS 

  //   const Text = "[AX-HDFCBK] UPDATE: RS 28,000,.00 debited from HDFC Bank XX8458 on 09-OCT-23. Info: ACH D- Indian Clearing Corp-YAU8IM34JQUQ. Avl bal:INR 2,35,448.04"
  
//   const TextTWo = "[AD-HDFCBK] Money Transfer:RS 1,000.00 from HDFC Bank A/c **8458 on 11-10-23 to Mrs SHOBHANA RAMKRISHNAN NAIR1 UPI: 328460943566 Not you? Call 18002586161"
  
//   const TextThree = "Dear UPI user A/C X3960 debited by 29060.0 on date 10Oct23 trf to Prabhunath kedar Refno 328351397329. If not u? call 1800111109. -SBI"
