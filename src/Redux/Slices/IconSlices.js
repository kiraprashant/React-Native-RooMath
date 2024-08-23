import { createSlice } from "@reduxjs/toolkit";
import IconColor from "../../Utli/IconColor";



const IconSlices = createSlice({
    name:"Icon",
    initialState:{
        AllExistingIcon:[],
        SelectedIconRedux:{}
    },
    reducers:{
        AllAddedIcon(state,action){
            state.AllExistingIcon = [...state.AllExistingIcon,...action.payload]
        },
        CreatedIconFunction(state,action){
            state.AllExistingIcon.push(action.payload)
          },
        ChangeIcon(state,action){
          state.SelectedIconRedux = action.payload
        }
    }
})

export const {AllAddedIcon,CreatedIconFunction,ChangeIcon} = IconSlices.actions

export default IconSlices.reducer