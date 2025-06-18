import * as actionTypes from "./actionType"
import { apiPath } from "../../utils/utils"
import { apiRequest } from "../../utils/apiUtils"

export const addProductAction=(data)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.ADD_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest("post",`${apiPath.product}/add`,data)
        if(response){
            dispatch({
                type:actionTypes.ADD_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.ADD_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const cleanUpAddProductAction=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.CLEAN_UP_ADD_PRODUCT,
            payload:{}
        })
    }
}

export const getAllProductAction=(start,end)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_ALL_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest("get",`${apiPath.product}/list?start=${start}&end=${end}`)
        if(response){
            dispatch({
                type:actionTypes.GET_ALL_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_ALL_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const bookingProductAction=(data)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.BOOKING_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest("post",`${apiPath.product}/booking`,data)
        if(response){
            dispatch({
                type:actionTypes.BOOKING_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.BOOKING_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}
export const clearBookingAction=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.CLEAN_UP_BOOKING,
            payload:{}
        })
    }
}

export const getVendorProductPlaceBookingAction=(vendorRef)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_VENDOR_PLACE_ORDER_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/booking?vendorRef=${vendorRef}`)
        if(response){
            dispatch({
                type:actionTypes.GET_VENDOR_PLACE_ORDER_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_VENDOR_PLACE_ORDER_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const getOrderStatusAction=(id,uid)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_ORDER_STATUS,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/status?orderId=${id}&uid=${uid}`)
        if(response){
            dispatch({
                type:actionTypes.GET_ORDER_STATUS_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_ORDER_STATUS_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const cleanUpOrderStatusAction=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.GET_ORDER_STATUS,
            payload:{}
        })
    }
}

export const getVendorOrderListAction=(vendorRef)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_VENDOR_ORDER_LIST,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/order_details?vendorRef=${vendorRef}`)
        if(response){
            dispatch({
                type:actionTypes.GET_VENDOR_ORDER_LIST_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_VENDOR_ORDER_LIST_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const updateOrderStatusAction=(orderId,status,pid,metaData)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.UPDATE_ORDER_STATUS,
            payload:{}
        })
        const data = {
            bookingRef:orderId,
            status:status,
            pid:pid,
            metaData:metaData
        }
        const {
            response,
            error
        } = await apiRequest('put',`${apiPath.manage}/update_booking`,data)
        if(response){
            dispatch({
                type:actionTypes.UPDATE_ORDER_STATUS_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.UPDATE_ORDER_STATUS_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const clearUpdateOrderStatus=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.CLEAR_UPDATE_ORDER_STATUS,
            payload:{}
        })
    }
}

export const getSingleProductAction=(id)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_SINGLE_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/metaData?userId=${id}`)
        if(response){
            dispatch({
                type:actionTypes.GET_SINGLE_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_SINGLE_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const clearSingleProductClear=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.SINGLE_PRODUCT_CLEAN,
            payload:{}
        })
    }
}

export const getVendorStockAction=(userId)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_VENDOR_STOCK,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/stock?userId=${userId}`)

        if(response){
            dispatch({
                type:actionTypes.GET_VENDOR_STOCK_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_VENDOR_STOCK_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const updateVendorProductAction=(data)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.UPDATE_VENDOR_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('put',`${apiPath.manage}/product`,data)
        if(response){
            dispatch({
                type:actionTypes.UPDATE_VENDOR_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.UPDATE_VENDOR_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const deleteVendorProduct=(productId)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.DELETE_VENDOR_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('delete',`${apiPath.manage}/product?productId=${productId}`)
        if(response){
            dispatch({
                type:actionTypes.DELETE_VENDOR_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.DELETE_VENDOR_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const getOrderInRangeAction=(start,end)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_ORDER_IN_RANGE,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/all_order?start=${start}&end=${end}`)

        if(response){
            dispatch({
                type:actionTypes.GET_ORDER_IN_RANGE_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_ORDER_IN_RANGE_ERROR,
                payload:error
            })
        }
    }
}

export const createNotificationAction=(data)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.CREATE_NOTIFICATION,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('post',`${apiPath.manage}/notification`,data)
        if(response){
            dispatch({
                type:actionTypes.CREATE_NOTIFICATION_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.CREATE_NOTIFICATION_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const getNotificationAction=(userRef)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_NOTIFICATION,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.manage}/notification?userRef=${userRef}`)
        if(response){
            dispatch({
                type:actionTypes.GET_NOTIFICATION_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_NOTIFICATION_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const deleteNotification=(id)=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.DELETE_NOTIFICATION,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('delete',`${apiPath.manage}/notification?id=${id}`)
        if(response){
            dispatch({
                type:actionTypes.DELETE_NOTIFICATION_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.DELETE_NOTIFICATION_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const clearNotification=()=>{
    return (dispatch)=>{
        dispatch({
            type:actionTypes.CLEAR_NOTIFICATION,
            payload:{}
        })
    }
}

export const getEarning=()=>{
    return async(dispatch)=>{
        dispatch({
            type:actionTypes.GET_EARNING,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.customer}/payment`)
        if(response){
            dispatch({
                type:actionTypes.GET_EARNING_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_EARNING_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}

export const getAllSpecifictProductAction=(town,type)=>{
    return async (dispatch)=>{
        dispatch({
            type:actionTypes.GET_ALL_AREA_PRODUCT,
            payload:{}
        })
        const {
            response,
            error
        } = await apiRequest('get',`${apiPath.product}/area?town=${town}&type=${type}`)
        if(response){
            dispatch({
                type:actionTypes.GET_ALL_AREA_PRODUCT_RESPONSE,
                payload:response.data
            })
        }
        if(error){
            dispatch({
                type:actionTypes.GET_ALL_AREA_PRODUCT_ERROR,
                payload:error.message ? error.message : error
            })
        }
    }
}