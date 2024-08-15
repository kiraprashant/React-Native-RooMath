import React, { useState } from 'react'
import { Text, View,Image,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'



function AnalysisCard({backgroundColor,width,aspectratio,index,MyImage,Link}){
    console.log(backgroundColor,width,aspectratio,MyImage,Link)
    const Navigation = useNavigation()
    const GotoAnayisisCategory = (Link) =>{
      Navigation.navigate(Link)
    }
    return (
      <View style={{
        marginBottom:30,
        marginTop:index === 2 ? 60:0
      }}>
           <TouchableOpacity onPress={()=> GotoAnayisisCategory(Link)}><Image source={MyImage}/></TouchableOpacity>  
      </View>
    )
}

export default AnalysisCard