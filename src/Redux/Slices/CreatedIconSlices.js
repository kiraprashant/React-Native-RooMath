import { createSlice } from "@reduxjs/toolkit";



const CreatedIconSlices = createSlice({
    name:"Icon",
    initialState:{
        AllExistingIcon:[],
    },
    reducers:{
        AllAddedIcon(state,action){
            state.AllExistingIcon = [...state.AllExistingIcon,...action.payload]
        },
        CreatedIconFunction(state,action){
            state.AllExistingIcon.push(action.payload)
          },
    }
})

export const {AllAddedIcon,CreatedIconFunction} = CreatedIconSlices.actions

export default CreatedIconSlices.reducer