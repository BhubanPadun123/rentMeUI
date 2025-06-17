import { combineReducers } from "redux"
import { AuthReducer } from "./auth.reducer";
import { ProductReducer } from "./product.reducer";
import { CustomerReducer } from "./customer.reducer";


const rootReducer = combineReducers({
    auth:AuthReducer,
    product:ProductReducer,
    customer:CustomerReducer
})

export default rootReducer

