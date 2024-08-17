import { configureStore } from "@reduxjs/toolkit";
import PlannerSlices from "../Slices/PlannerSlices";
import SMSSlices from "../Slices/SMSSlices";
import CreatedIconSlices from "../Slices/CreatedIconSlices";

const Store = configureStore({
    reducer:{
        SMS:SMSSlices,
        Planner:PlannerSlices,
        CreatedIcon:CreatedIconSlices
    }
})

export default Store