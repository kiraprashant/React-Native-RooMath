import React, {  } from 'react'
import { Text, View , TouchableOpacity } from 'react-native'
import PAList from '../List/PAList'
import { useSelector } from 'react-redux'

const BudgetEssential = ({GetEssentialFunction}) => {
  const GetEssential = useSelector((state) => state.Planner.EssentenailSlice)

    return (
        <View>
        <View
          style={{
            marginVertical: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>Expense</Text>
          <TouchableOpacity>
            <Text>Edit Budget</Text>
          </TouchableOpacity>
        </View>
       
        <View style={{marginBottom: 10}}>
          <Text style={{lineHeight: 30}}>
            These are the must-pay bills: rent, home loan, groceries, school
            fees, and such. We won't even mention the fun stuff like dining
            out and parties! 😉
          </Text>
        </View>
        <View style={{flexDirection:'row',flexWrap:"wrap"}}>
          {
            GetEssential.map((elem,i) => <PAList key={i} data = {elem} GetEssentialFunction = {GetEssentialFunction}/>)
          }
        </View>
        </View>
        
    )
}

export default BudgetEssential
