import { createSlice } from "@reduxjs/toolkit";

const SMSSlices = createSlice({
    name:"SMS",
    initialState:{
        SMS:[]
    },
    reducers:{
        ReadAllSMS(state, action) {
            // console.log("Redux Kira " , action.payload)
            state.SMSDATA = [...state.SMSDATA,...action.payload]
          },
    }
})

const {ReadAllSMS} = SMSSlices.actions

export default SMSSlices.reducer