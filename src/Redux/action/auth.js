import * as actionType from "./actionType"
import axios from "axios"
import {apiPath} from "../../utils/utils"
import { apiRequest } from "../../utils/apiUtils"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const userRegisterAction=(userData)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.USER_REGISTER,
            payload:{}
        })
        try {
            const {response,error} = await apiRequest("post",`/${apiPath.auth}/register`,userData)
            if(response){
                dispatch({
                    type:actionType.USER_REGISTER_RESPONSE,
                    payload:response.data
                })
            }
            if(error){
                dispatch({
                    type:actionType.USER_REGISTER_ERROR,
                    payload:error.message ? error.message : error
                })
            }
        } catch (error) {
            dispatch({
                type:actionType.USER_REGISTER_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}
export const clearUpregisterAction=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionType.CLEAN_UP_REGISTER,
            payload:{}
        })
    }
}
export const userLoginAction=(userData)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.USER_LOGIN,
            payload:{}
        })
        try {
            const {response,error} = await apiRequest("post",`/${apiPath.auth}/login`,userData)
            if(response){
                await AsyncStorage.setItem("userToken",response.data.accessToken)
                await AsyncStorage.setItem("refreshToken",response.data.refreshToken)
                await AsyncStorage.setItem("currentUser",JSON.stringify(response.data.userData))
                await AsyncStorage.setItem('userMetaData',JSON.stringify(response.data.userData))
                dispatch({
                    type:actionType.USER_LOGIN_RESPONSE,
                    payload:response.data
                })
            }
            if(error){
                dispatch({
                    type:actionType.USER_LOGIN_ERROR,
                    payload:error.message ? error.message : error
                })
            }
        } catch (error) {
            dispatch({
                type:actionType.USER_LOGIN_ERROR,
                payload:error.message ? error.message : error
            })
        }
        
    }
}
export const cleanUpLogin=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionType.CLEAN_UP_REGISTER,
            payload:{}
        })
    }
}
export const updateUserMetaDataAction=(metaData,id)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.UPDATE_USER_METADATA,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest("put",`/${apiPath.auth}/profile/update/${id}`,{metaData})
        if(response){
            dispatch({
                type:actionType.UPDATE_USER_METADATA_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionType.UPDATE_USER_METADATA_EROR,
                payload:error.message ? error.message : error
            })
        }
    }
}
export const cleanupUpdate=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionType.CLEAN_UP_UPDATE,
            payload:{}
        })
    }
}