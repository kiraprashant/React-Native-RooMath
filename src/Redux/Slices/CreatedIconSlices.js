import { createSlice } from "@reduxjs/toolkit";



const CreatedIconSlices = createSlice({
    name:"Icon",
    initialState:{
        AllExistingIcon:[],
    },
    reducers:{
        CreatedIconFunction(state,action){
            state.AllExistingIcon.push(action.payload)
          },
    }
})

export const {CreatedIconFunction} = CreatedIconSlices.actions

export default CreatedIconSlices.reducer