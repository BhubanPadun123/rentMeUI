import * as actionType from "./actionType.js"
import { apiPath } from "../../utils/utils"
import { apiRequest } from "../../utils/apiUtils"


export const getCustomerOrderListAction=(customerRef)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.GET_CUSTOMER_ORDER,
            payload:{}
        })

        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.customer}/order_detail?customerRef=${customerRef}`)
        if(response){
            dispatch({
                type:actionType.GET_CUSTOMER_ORDER_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionType.GET_CUSTOMER_ORDER_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const paymentAction=(data)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.ORDER_PAYMENT,
            payload:{}
        })

        const {
            response,
            error
        } = await apiRequest('post',`${apiPath.customer}/payment`,data)
        if(response){
            dispatch({
                type:actionType.ORDER_PAYMENT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionType.ORDER_PAYMENT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}
export const getPaymentDataAction=(orderRef)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionType.GET_PAYMENT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest("get",`${apiPath.customer}/payment_detail/${orderRef}`)
        if(response){
            dispatch({
                type:actionType.GET_PAYMENT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionType.GET_PAYMENT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const cleanPaymentData=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionType.CLEAR_PAYMENT,
            payload:[]
        })
    }
}