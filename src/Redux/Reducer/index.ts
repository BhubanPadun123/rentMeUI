import {combineReducers} from "redux"
import { UserReducer } from "./user"
import { CloudReducer } from "./cloud.reducer";


const rootReducer = combineReducers({
    user:UserReducer,
    cloud:CloudReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer