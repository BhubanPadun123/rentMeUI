import * as actionType from "@/src/Redux/actionTypes/index"
import {
    user,
    userLoginType,
    forgetPasswordType
} from "@/src/Redux/actionTypes/dataType"
import {Dispatch} from "redux"
import apiService from "@/utils/baseUrl"
import { KeepDataInLocal } from "@/utils/localStorage"


export const userRegisteredAction=(data:user)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionType.USER_REGISTER_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService("post","/auth/register",data)
        if(response){
            dispatch({
                type:actionType.USER_REGISTER_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionType.USER_REGISTER_ERROR,
                payload:error
            })
        }
    }
}

export const UserLoginAction=(data:userLoginType)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionType.USER_LOGIN_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService("post","/auth/login",data)
        if(response){
            await KeepDataInLocal('token',response?.accessToken)
            await KeepDataInLocal("refreshToken",response?.refreshToken)
            if(response?.userData){
                await KeepDataInLocal("currentUser",JSON.stringify(response.userData))
            }
            dispatch({
                type:actionType.USER_LOGIN_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionType.USER_LOGIN_ERROR,
                payload:error
            })
        }
    }
}
export const ForgetPasswordAction=(data:forgetPasswordType)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionType.FORGET_PASSWORD_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService("post","/auth/forget_password",data)
        if(response){
            dispatch({
                type:actionType.FORGET_PASSWORD_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionType.FORGET_PASSWORD_ERROR,
                payload:error
            })
        }
    }
}

export const ResetForgetPasswordResponse=()=>{
    return (dispatch:Dispatch)=>{
        dispatch({
            type:actionType.RESET_FORGET_PASSWORD_RESPONSE,
            password:{}
        })
    }
}

export const getUserPrivillages=()=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionType.GET_USER_PRIVILLAGES_STATUS,
            payload:{}
        })

        const {response,error} = await apiService('get','/auth/privilages')
        if(response){
            dispatch({
                type:actionType.GET_USER_PRIVILLAGES_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionType.GET_USER_PRIVILLAGES_ERROR,
                payload:error
            })
        }
    }
}