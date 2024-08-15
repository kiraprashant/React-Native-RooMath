import { createSlice } from "@reduxjs/toolkit";



const PlannerSlices = createSlice({
    name:"planner",
    initialState:{
        IncomeSlice:[],
        EssentenailSlice:[],
        SavingSlice:[]
    },
    reducers:{
        ReduxAddEssentenail(state,action){
          state.EssentenailSlice = [action.payload]
        },
        ReduxAddIncome(state,action){
            state.IncomeSlice = [action.payload]
          },
          ReduxAddSaving(state,action){
            state.SavingSlice = action.payload
            console.log("Redux Array............ " ,state.SavingSlice )
          },
          ReduxSavingDelete(state,action){
            const DeleteById = action.payload.id;     
           const updateItem  = state.SavingSlice.filter((elem) =>  elem.id !== DeleteById)
            state.SavingSlice = updateItem;          
    
          }
    }
})

export const {ReduxAddEssentenail,ReduxAddIncome,ReduxAddSaving} = PlannerSlices.actions

export default PlannerSlices.reducer