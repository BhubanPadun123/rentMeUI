import * as actionType from "../action/actionType.js"

const initialState={
    customerOrderListStatus:"",
    customerOrderListResponse:[],
    customerOrderListError:null,

    paymentStatus:"",
    paymentResponse:[],
    paymentError:null,

    orderPaymentStatus:"",
    orderPaymentResponse:[],
    orderPaymentError:null
}

export const CustomerReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.GET_CUSTOMER_ORDER:
            state={
                ...state,
                customerOrderListStatus:"started",
                customerOrderListResponse:[],
                customerOrderListError:null
            }
            return state;
        case actionType.GET_CUSTOMER_ORDER_RESPONSE:
            state={
                ...state,
                customerOrderListStatus:"success",
                customerOrderListResponse:action.payload,
                customerOrderListError:null
            }
            return state;
        case actionType.GET_CUSTOMER_ORDER_ERROR:
            state={
                ...state,
                customerOrderListStatus:"failed",
                customerOrderListResponse:[],
                customerOrderListError:action.payload
            }
            return state;
        case actionType.ORDER_PAYMENT:
            state={
                ...state,
                paymentStatus:"started",
                paymentResponse:[],
                paymentError:null
            }
            return state;
        case actionType.ORDER_PAYMENT_RESPONSE:
            state={
                ...state,
                paymentStatus:"success",
                paymentResponse:action.payload,
                paymentError:null
            }
            return state;
        case actionType.ORDER_PAYMENT_ERROR:
            state={
                ...state,
                paymentStatus:"failed",
                paymentResponse:[],
                paymentError:action.payload
            }
            return state;
        case actionType.GET_PAYMENT:
            state={
                ...state,
                orderPaymentStatus:"started",
                orderPaymentResponse:[],
                orderPaymentError:""
            }
            return state;
        case actionType.GET_PAYMENT_RESPONSE:
            state={
                ...state,
                orderPaymentStatus:"success",
                orderPaymentResponse:action.payload,
                orderPaymentError:null
            }
            return state;
        case actionType.GET_PAYMENT_ERROR:
            state={
                ...state,
                orderPaymentStatus:"failed",
                orderPaymentResponse:[],
                orderPaymentError:action.payload
            }
            return state;
        case actionType.CLEAR_PAYMENT:
            state={
                ...state,
                orderPaymentStatus:"",
                orderPaymentError:null,
                orderPaymentResponse:action.payload
            }
            return state;
        default:
            return state
    }
}