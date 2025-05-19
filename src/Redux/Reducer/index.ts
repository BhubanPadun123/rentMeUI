import {combineReducers} from "redux"
import { UserReducer } from "./user"
import { CloudReducer } from "./cloud.reducer";
import {
     ProductReducer,
     BookingReducer
} from "./product.reducer";


const rootReducer = combineReducers({
    user:UserReducer,
    cloud:CloudReducer,
    product:ProductReducer,
    booking:BookingReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer