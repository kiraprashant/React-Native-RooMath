import { configureStore } from "@reduxjs/toolkit";
import PlannerSlices from "../Slices/PlannerSlices";
import SMSSlices from "../Slices/SMSSlices";

const Store = configureStore({
    reducer:{
        SMS:SMSSlices,
        Planner:PlannerSlices
    }
})

export default Store