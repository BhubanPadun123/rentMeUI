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

export const getProductListAction=(start:number,end:number,userId:string)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.GET_PRODUCT_LIST_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService('get',`/v1/product/property/list?start=${start}&end=${end}&userId=${userId}`)
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
        } = await apiService("post",`/v1/product/property/booking?userId=${data.customerRef}`,data)
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

export const clearBookingStorage=()=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.CLEAR_BookING_DATA,
            payload:{}
        })
    }
}

export const getVendorProduct=(_id:string)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.GET_VENDOR_PRODUCT_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService('get',`/v1/manage/vender/product?userId=${_id}`)
        if(response){
            dispatch({
                type:actionTypes.GET_VENDOR_PRODUCT_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_VENDOR_PRODUCT_ERROR,
                payload:error
            })
        }
    }
}

export const getVendorOrderPlaceList=(vendorId:string)=>{
    return async(dispatch:Dispatch)=>{
        dispatch({
            type:actionTypes.GET_VENDOR_PRODUCT_PLACE_ORDER_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiService('get',`/v1/manage/vendor/booking?vendorRef=${vendorId}`)
        if(response){
            dispatch({
                type:actionTypes.GET_VENDOR_PRODUCT_PLACE_ORDER_RESPONSE,
                payload:response
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_VENDOR_PRODUCT_PLACE_ORDER_ERROR,
                payload:error
            })
        }
    }
}