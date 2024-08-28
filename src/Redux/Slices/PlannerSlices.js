import {createSlice} from '@reduxjs/toolkit';

const PlannerSlices = createSlice({
  name: 'planner',
  initialState: {
    IncomeSlice: [],
    EssentenailSlice: [],
    SavingSlice: [],

    PlannedIncomeSpend: 0,
    PlannedEssentenailsSpend: 0,
    PlannedSavingSpend: 0,

    // ActualIncomeSpend: 0,
    ActualEssentenailsSpend: 0,
    ActualSavingSpend: 0,
  },
  reducers: {
    ReduxAddEssentenail(state, action) {
      state.EssentenailSlice = action.payload;
    },
    ReduxAddIncome(state, action) {
      state.IncomeSlice = action.payload;
    },
    ReduxAddSaving(state, action) {
      state.SavingSlice = action.payload;
    },
    ReduxSavingDelete(state, action) {
      const DeleteById = action.payload.id;
      const updateItem = state.SavingSlice.filter(
        elem => elem.id !== DeleteById,
      );
      state.SavingSlice = updateItem;
    },

    //Planned Spend
    ReduxPlannedIncomeSpend(state, action) {
      const SavedIncome = state.PlannedIncomeSpend = action.payload;
    },
    ReduxPlannedEssentenailsSpend(state, action) {
      const SavedEssentenails = state.PlannedEssentenailsSpend =
        action.payload;
    },
    ReduxPlannedSavingSpend(state, action) {
      const SavedIncome = state.PlannedSavingSpend = action.payload;
    },

    //Actual Spend
    ReduxActualIncomeSpend(state, action) {
      const SavedIncome = state.ActualIncomeSpend = action.payload;
    },
    ReduxActualEssentenailsSpend(state, action) {
      const SavedPlannedEssentenailsSpend = state.ActualEssentenailsSpend =
        action.payload;
    },
    ReduxActualSavingSpend(state, action) {
       console.log("/////////////////noooooooooooob/////////////////////////////////////////////////////",action.payload)
      const SavedIncome = state.ActualSavingSpend = action.payload;
    },
  },
});

export const {
  ReduxAddEssentenail,
  ReduxAddIncome,
  ReduxAddSaving,
  ReduxPlannedIncomeSpend,
  ReduxPlannedEssentenailsSpend,
  ReduxPlannedSavingSpend,
  ReduxActualIncomeSpend,
  ReduxActualEssentenailsSpend,
  ReduxActualSavingSpend
} = PlannerSlices.actions;

export default PlannerSlices.reducer;
