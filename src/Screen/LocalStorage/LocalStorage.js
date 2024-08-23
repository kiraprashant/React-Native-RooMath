import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavetoLocalStorage = async(StorageName,data) =>{
    try{
      const existingData = await AsyncStorage.getItem(StorageName);
      const parsedExistingData = existingData ? JSON.parse(existingData) : [];
  
  // Append the new data to the existing array
      const updatedData = Array.isArray(parsedExistingData)
    ? [...parsedExistingData, data]
    : [data];
  
  // Save the data to AsyncStorage
  await AsyncStorage.setItem(StorageName, JSON.stringify(updatedData));
    }
    catch(e){
      console.log("Something Went Wrong in SavetoLocalStorage ",e)
    }
    }

    const UpdatetoLocalStorage = async(StorageName,data) =>{
        try{
    
        console.log("Update Local Storrage " , data)
        const existingData = await AsyncStorage.getItem(StorageName);
        const parsedData = JSON.parse(existingData);
    
        const updateItem = parsedData.map((x) =>x.id === data.id ? data : x);
    // Save the data to AsyncStorage
    await AsyncStorage.setItem(StorageName, JSON.stringify(updateItem));
      }
      catch(e){
        console.log("Something Went Wrong UpdatetoLocalStorage",e)
      }
    }
    


const RemoveLocalItem = async(StorageName,data) =>{

    const dataTimeToDelete = data.id
    console.log("ListLayout " , dataTimeToDelete)
 
      try {
        // Retrieve existing data from AsyncStorage
        const existingData = await AsyncStorage.getItem(StorageName);
        if (!existingData) {
          console .log("Here")
          return; // No data found, nothing to remove
        }

        console .log("another Here")
    
        // Parse the existing data and filter out objectsToRemove
        const parsedData = JSON.parse(existingData);
        const updatedData = parsedData.filter(item => item.id != dataTimeToDelete);
    
        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem(StorageName, JSON.stringify(updatedData));
    
        // console.log('Array of objects removed successfully.');
      } catch (error) {
        console.error('Error removing objects from AsyncStorage:', error);
      }
    };
    const GetLocaLItem = async (StorageName) => {
      try {
        const storedData = await AsyncStorage.getItem(StorageName);
        if (storedData !== null) {
          const ParseBudget = JSON.parse(storedData);
          return ParseBudget;
        } else {
          return null;
        }
      } catch (error) {
        // Handle any potential errors when accessing AsyncStorage
        console.error('Error retrieving data from AsyncStorage:', error);
        return null;
      }
    }

    const PlannerSaveToLocal = async(StorageName,data) =>{
      try{
        await AsyncStorage.setItem(StorageName, JSON.stringify(data));
      }
      catch(e){
        console.log("Something Went Wrong in SavetoLocalStorage ",e)
      }
    }

    const GetplannerFromLocal = async(StorageName) =>{
      try {
        const storedData = await AsyncStorage.getItem(StorageName);
        if (storedData !== null) {
          const ParseBudget = JSON.parse(storedData);
          return ParseBudget;
        } else {
          return null;
        }
      } catch (error) {
        // Handle any potential errors when accessing AsyncStorage
        console.error('Error retrieving data from AsyncStorage:', error);
        return null;
      }
    }

 export {SavetoLocalStorage,RemoveLocalItem,UpdatetoLocalStorage,GetLocaLItem,PlannerSaveToLocal,GetplannerFromLocal}