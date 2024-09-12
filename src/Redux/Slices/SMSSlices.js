import {createSlice} from '@reduxjs/toolkit';

const smsSlice = createSlice({
  name: 'sms',
  initialState: {
    SMSDATA: [],
    message: 'Initial message',
    SinglesSMSData: [],
    DeletedSMS:0
  },
  reducers: {
    ReadAllSMS(state, action) {
      // console.log("Redux Kira " , action.payload)
      state.SMSDATA = [...state.SMSDATA, ...action.payload];
    },
    SMSAddtoRedux(state, action) {
      state.SMSDATA.push(action.payload);
    },
    SMSDeleteById(state, action) {
      console.log(action.payload);
      const DeleteById = action.payload.id;

      // const exist = state.SMSDATA.find((x) => x.Id === DeleteByTime.Id);
      const updateItem = state.SMSDATA.filter(elem => elem.id !== DeleteById);

      state.SMSDATA = updateItem;
      state.DeletedSMS ++
    },
    SMSFind(state, action) {
      state.SinglesSMSData = action.payload;
      // console.log(state.SinglesSMSData)
    },
    ReduxUpdateSMS(state, action) {
      const myID = action.payload.id;
      console.log(myID);

      const updateItem = state.SMSDATA.map(x =>
        x.id === myID ? {...action.payload} : x,
      );

      state.SMSDATA = updateItem;
    },
    BUlkUpdateSMS(state, action) {
      state.SMSDATA = action.payload;
    },
    sortData: state => {
      // Sort the data in ascending order based on the "date_Mini_Second" property
      state.SMSDATA.sort((a, b) => b.date_Mini_Second - a.date_Mini_Second);
    },
    FullDete: (state, action) => {
      state.SMSDATA = [];
    },
  },
});

export const {
  ReadAllSMS,
  SMSDeleteById,
  SMSFind,
  ReduxUpdateSMS,
  SMSAddtoRedux,
  sortData,
  FullDete,
  BUlkUpdateSMS,
} = smsSlice.actions;

export default smsSlice.reducer;
