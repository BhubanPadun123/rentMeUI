import * as actionTypes from "../actionTypes/index"
import { 
    status,
    ActionAddProduct,
    productType,
    BookingPayload,
    ActionBookingProperty
} from "../actionTypes/dataType"

interface productState{
    addProduct:{
        status:status,
        data:productType | [],
        error:any
    },
    productList:{
        status:status,
        data:productType | [],
        error:any
    }
}

const initialState:productState={
    addProduct:{
        status:null,
        data:[],
        error:""
    },
    productList:{
        status:null,
        data:[],
        error:""
    }
}

export const ProductReducer = (state=initialState,action:ActionAddProduct)=>{
    switch(action.type){
        case actionTypes.UPLOAD_PRODUCT_STATUS:
            state={
                ...state,
                addProduct:{
                    status:'started',
                    data:[],
                    error:""
                }
            }
            return state;
        case actionTypes.UPLOAD_PRODUCT_RESPONSE:
            state = {
                ...state,
                addProduct:{
                    status:'success',
                    data:action.payload,
                    error:""
                }
            }
            return state;
        case actionTypes.UPLOAD_PRODUCT_ERROR:
            state={
                ...state,
                addProduct:{
                    status:'failed',
                    data:[],
                    error:action.payload
                }
            }
            return state;
        case actionTypes.CLEAR_UPLOAD_PRODUCT_STORE:
            state={
                ...state,
                addProduct:{
                    status:null,
                    data:[],
                    error:""
                }
            }
        case actionTypes.GET_PRODUCT_LIST_STATUS:
            state={
                ...state,
                productList:{
                    status:'started',
                    data:[],
                    error:""
                }
            }
            return state;
        case actionTypes.GET_PRODUCT_LIST_RESPONSE:
            state={
                ...state,
                productList:{
                    status:'success',
                    data:action.payload,
                    error:""
                }
            }
            return state;
        case actionTypes.GET_PRODUCT_LIST_ERROR:
            state={
                ...state,
                productList:{
                    status:'failed',
                    data:[],
                    error:action.payload
                }
            }
            return state;
        default:
            return state
    }
}
type bookingState={
    booking:{
        status:status,
        data:BookingPayload | [],
        error:any
    }
}
const bookingInitialState:bookingState={
    booking:{
        status:null,
        data:[],
        error:""
    }
}
export const BookingReducer=(state=bookingInitialState,action:ActionBookingProperty)=>{
    switch(action.type){
        case actionTypes.PLACE_BOOKING_STATUS:
            state={
                ...state,
                booking:{
                    status:"started",
                    data:[],
                    error:""
                }
            }
            return state;
        case actionTypes.PLACE_BOOKING_RESPONSE:
            state={
                ...state,
                booking:{
                    status:'success',
                    data:action.payload,
                    error:""
                }
            }
            return state;
        case actionTypes.PLACE_BOOKING_ERROR:
            state={
                ...state,
                booking:{
                    status:'failed',
                    data:[],
                    error:action.payload
                }
            }
            return state;
        default:
            return state
    }
}