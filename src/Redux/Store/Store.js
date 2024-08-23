import { configureStore } from "@reduxjs/toolkit";
import PlannerSlices from "../Slices/PlannerSlices";
import SMSSlices from "../Slices/SMSSlices";
import CreatedIconSlices from "../Slices/CreatedIconSlices";
import IconSlices from "../Slices/IconSlices";

const Store = configureStore({
    reducer:{
        SMS:SMSSlices,
        Planner:PlannerSlices,
        CreatedIcon:CreatedIconSlices,
        IconRedux:IconSlices
    }
})

export default Store