import * as actionType from "./actionType"
import axios from "axios"
import { baseUrl, apiPath} from "../../utils/utils"


export const userLoginAction=(userData)=>{
    console.log(userData)
    return async(dispatch)=>{
        dispatch({
            type:actionType.USER_LOGIN,
            payload:{}
        })
        try {
            const apiData = await axios.post(`${baseUrl}/${apiPath.auth}/login`,userData)
            dispatch({
                type:actionType.USER_LOGIN_RESPONSE,
                payload:apiData.data
            })
        } catch (error) {
            dispatch({
                type:actionType.USER_LOGIN_ERROR,
                payload:error.message ? error.message : error
            })
        }
        
    }
}