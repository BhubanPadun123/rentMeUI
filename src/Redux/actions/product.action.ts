import * as actionTypes from "@/src/Redux/actionTypes/index"
import {
    productType,
    BookingPayload
} from "../actionTypes/dataType"
import { Dispatch } from "redux"
import apiService from "@/utils/baseUrl"



export const productUploadAction=(data:productType)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.UPLOAD_PRODUCT_STATUS,
            payload:{}
        })

        const {
            error,
            response
        } = await apiService('post',"/v1/product/property/post",data)
        if(error){
            dispatch({
                type:actionTypes.UPLOAD_PRODUCT_ERROR,
                payload:error
            })
        }
        if(response){
            dispatch({
                type:actionTypes.UPLOAD_PRODUCT_RESPONSE,
                payload:response
            })
        }

    }
}

export const clearAddProduct=()=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.CLEAR_UPLOAD_PRODUCT_STORE,
            payload:{}
        })
    }
}

export const getProductListAction=(start:number,end:number)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.GET_PRODUCT_LIST_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService('get',`/v1/product/property/list?start=${start}&end=${end}`)
        if(response){
            dispatch({
                type:actionTypes.GET_PRODUCT_LIST_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_PRODUCT_LIST_ERROR,
                payload:error
            })
        }
    }
}

export const bookingProperty=(data:BookingPayload)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.PLACE_BOOKING_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService("post",'/v1/product/property/booking',data)
        if(response){
            dispatch({
                type:actionTypes.PLACE_BOOKING_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionTypes.PLACE_BOOKING_ERROR,
                payload:error
            })
        }
    }
}