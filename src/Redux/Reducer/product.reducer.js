import * as actionType from "../action/actionType"


const initialState = {
    addProductStatus: "",
    addProductResponse: [],
    addProductError: null,

    productListStatus: "",
    productListResponse: [],
    productListError: null,

    bookingProductStatus:"",
    bookingProductResponse:[],
    bookingProductError:null,

    bookingListStatus:"",
    bookingListResponse:[],
    bookingListError:null,

    orderStatus:"",
    orderStatusData:[],
    orderStatusError:null,

    orderListStatus:"",
    orderListData:[],
    orderListError:null,

    feedBackBookingStatus:"",
    feedBackBookingResponse:[],
    feedBackBookingError:null,

    singleProductStatus:"",
    singleProductResponse:[],
    singleProductError:null,

    vendorStackStatus:"",
    vendorStackResponse:[],
    vendorStackError:null,

    updateVendorProductStatus:"",
    updateVendorProductResponse:[],
    updateVendorProductError:null,

    deleteVendorProductStatus:"",
    deleteVendorProductResponse:[],
    deleteVendorProductError:null,

    orderInRangeStatus:"",
    orderInRangeResponse:[],
    orderInRangeError:null,

    createNotificationStatus:"",
    createNotificationResponse:[],
    createNotificationError:null,

    getNotificationStatus:"",
    getNotificationResponse:[],
    getNotificationError:null
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_PRODUCT:
            state = {
                ...state,
                addProductError: null,
                addProductResponse: [],
                addProductStatus: "started"
            }
            return state;
        case actionType.ADD_PRODUCT_RESPONSE:
            state = {
                ...state,
                addProductError: null,
                addProductResponse: action.payload,
                addProductStatus: "success"
            }
            return state;
        case actionType.ADD_PRODUCT_ERROR:
            state = {
                ...state,
                addProductError: action.payload,
                addProductResponse: [],
                addProductStatus: "failed"
            }
            return state;
        case actionType.CLEAN_UP_ADD_PRODUCT:
            state = {
                ...state,
                addProductError: null,
                addProductResponse: [],
                addProductStatus: ""
            }
            return state;
        case actionType.GET_ALL_PRODUCT:
            state = {
                ...state,
                productListError: null,
                productListResponse: [],
                productListStatus: "started"
            }
            return state;
        case actionType.GET_ALL_PRODUCT_RESPONSE:
            state = {
                ...state,
                productListError: null,
                productListResponse: action.payload,
                productListStatus: "success"
            }
            return state;
        case actionType.GET_ALL_PRODUCT_ERROR:
            state = {
                ...state,
                productListError: action.payload,
                productListResponse: [],
                productListStatus: "failed"
            }
            return state;
        case actionType.BOOKING_PRODUCT:
            state={
                ...state,
                bookingProductStatus:"started",
                bookingProductResponse:[],
                bookingProductError:null
            }
            return state;
        case actionType.BOOKING_PRODUCT_RESPONSE:
            state={
                ...state,
                bookingProductStatus:"success",
                bookingProductResponse:action.payload,
                bookingProductError:null
            }
            return state;
        case actionType.BOOKING_PRODUCT_ERROR:
            state={
                ...state,
                bookingProductStatus:"failed",
                bookingProductResponse:[],
                bookingProductError:action.payload
            }
            return state;
        case actionType.CLEAN_UP_BOOKING:
            state={
                ...state,
                bookingProductStatus:"",
                bookingProductError:null,
                bookingProductResponse:[]
            }
            return state;
        case actionType.GET_VENDOR_PLACE_ORDER_PRODUCT:
            state={
                ...state,
                bookingListStatus:"started",
                bookingListResponse:[],
                bookingListError:null
            }
            return state;
        case actionType.GET_VENDOR_PLACE_ORDER_PRODUCT_RESPONSE:
            state={
                ...state,
                bookingListStatus:"success",
                bookingListResponse:action.payload,
                bookingListError:null
            }
            return state;
        case actionType.GET_VENDOR_PLACE_ORDER_PRODUCT_ERROR:
            state={
                ...state,
                bookingListStatus:"failed",
                bookingListResponse:[],
                bookingListError:action.payload
            }
            return state;
        case actionType.GET_ORDER_STATUS:
            state={
                ...state,
                orderStatus:"started",
                orderStatusData:[],
                orderStatusError:null
            }
            return state;
        case actionType.GET_ORDER_STATUS_RESPONSE:
            state={
                ...state,
                orderStatus:"success",
                orderStatusData:action.payload,
                orderStatusError:null
            }
            return state;
        case actionType.GET_ORDER_STATUS_ERROR:
            state={
                ...state,
                orderStatus:"failed",
                orderStatusData:[],
                orderStatusError:action.payload
            }
            return state;
        case actionType.CLEAN_UP__ORDER_STATUS:
            state={
                ...state,
                orderStatus:"clean",
                orderStatusData:action.payload,
                orderStatusError:null
            }
            return state;
        case actionType.GET_VENDOR_ORDER_LIST:
            state={
                ...state,
                orderListStatus:"started",
                orderListData:[],
                orderListError:null
            }
            return state;
        case actionType.GET_VENDOR_ORDER_LIST_RESPONSE:
            state = {
                ...state,
                orderListStatus:"success",
                orderListData:action.payload,
                orderListError:null
            }
            return state;
        case actionType.GET_VENDOR_ORDER_LIST_ERROR:
            state={
                ...state,
                orderListStatus:"failed",
                orderListData:[],
                orderListError:action.payload
            }
            return state;
        case actionType.UPDATE_ORDER_STATUS:
            state={
                ...state,
                feedBackBookingStatus:"started",
                feedBackBookingError:null,
                feedBackBookingResponse:[]
            }
            return state;
        case actionType.UPDATE_ORDER_STATUS_RESPONSE:
            state={
                ...state,
                feedBackBookingStatus:"success",
                feedBackBookingResponse:action.payload,
                feedBackBookingError:null
            }
            return state;
        case actionType.UPDATE_ORDER_STATUS_ERROR:
            state={
                ...state,
                feedBackBookingStatus:"failed",
                feedBackBookingResponse:[],
                feedBackBookingError:action.payload
            }
            return state;
        case actionType.CLEAR_UPDATE_ORDER_STATUS:
            state={
                ...state,
                feedBackBookingStatus:"",
                feedBackBookingResponse:[],
                feedBackBookingError:null
            }
        case actionType.GET_SINGLE_PRODUCT:
            state={
                ...state,
                singleProductStatus:"started",
                singleProductResponse:[],
                singleProductError:null
            }
            return state;
        case actionType.GET_SINGLE_PRODUCT_RESPONSE:
            state={
                ...state,
                singleProductStatus:"success",
                singleProductResponse:action.payload,
                singleProductError:null
            }
            return state;
        case actionType.GET_SINGLE_PRODUCT_ERROR:
            state={
                ...state,
                singleProductStatus:"failed",
                singleProductResponse:[],
                singleProductError:action.payload
            }
            return state
        case actionType.SINGLE_PRODUCT_CLEAN:
            state={
                ...state,
                singleProductError:null,
                singleProductResponse:action.payload,
                singleProductStatus:""
            }
            return state;
        case actionType.GET_VENDOR_STOCK:
            state={
                ...state,
                vendorStackStatus:"started",
                vendorStackResponse:[],
                vendorStackError:null
            }
            return state;
        case actionType.GET_VENDOR_STOCK_RESPONSE:
            state={
                ...state,
                vendorStackStatus:"success",
                vendorStackResponse:action.payload,
                vendorStackError:null
            }
            return state;
        case actionType.GET_VENDOR_STOCK_ERROR:
            state={
                ...state,
                vendorStackStatus:"failed",
                vendorStackResponse:[],
                vendorStackError:action.payload
            }
            return state;
        case actionType.UPDATE_VENDOR_PRODUCT:
            state={
                ...state,
                updateVendorProductStatus:"started",
                updateVendorProductResponse:[],
                updateVendorProductError:null
            }
            return state;
        case actionType.UPDATE_VENDOR_PRODUCT_RESPONSE:
            state={
                ...state,
                updateVendorProductStatus:"success",
                updateVendorProductResponse:action.payload,
                updateVendorProductError:null
            }
            return state;
        case actionType.UPDATE_VENDOR_PRODUCT_ERROR:
            state={
                ...state,
                updateVendorProductStatus:"failed",
                updateVendorProductResponse:[],
                updateVendorProductError:action.payload
            }
            return state;
        case actionType.DELETE_VENDOR_PRODUCT:
            state={
                ...state,
                deleteVendorProductStatus:"started",
                deleteVendorProductResponse:[],
                deleteVendorProductError:null
            }
            return state;
        case actionType.DELETE_VENDOR_PRODUCT_RESPONSE:
            state={
                ...state,
                deleteVendorProductStatus:"success",
                deleteVendorProductResponse:action.payload,
                deleteVendorProductError:null
            }
            return state;
        case actionType.DELETE_VENDOR_PRODUCT_ERROR:
            state={
                ...state,
                deleteVendorProductStatus:"failed",
                deleteVendorProductResponse:[],
                deleteVendorProductError:action.payload
            }
            return state;
        case actionType.GET_ORDER_IN_RANGE:
            state={
                ...state,
                orderInRangeStatus:"started",
                orderInRangeResponse:[],
                orderInRangeError:null
            }
            return state;
        case actionType.GET_ORDER_IN_RANGE_RESPONSE:
            state={
                ...state,
                orderInRangeStatus:"success",
                orderInRangeResponse:action.payload,
                orderInRangeError:null
            }
            return state;
        case actionType.GET_ORDER_IN_RANGE_ERROR:
            state={
                ...state,
                orderInRangeStatus:"failed",
                orderInRangeResponse:[],
                orderInRangeError:action.payload
            }
            return state;
        case actionType.CREATE_NOTIFICATION:
            state={
                ...state,
                createNotificationStatus:"started",
                createNotificationResponse:[],
                createNotificationError:null
            }
            return state;
        case actionType.CREATE_NOTIFICATION_RESPONSE:
            state={
                ...state,
                createNotificationStatus:"success",
                createNotificationResponse:action.payload,
                createNotificationError:null
            }
            return state;
        case actionType.CREATE_NOTIFICATION_ERROR:
            state={
                ...state,
                createNotificationStatus:"failed",
                createNotificationResponse:[],
                createNotificationError:action.payload
            }
            return state;
        case actionType.GET_NOTIFICATION:
            state={
                ...state,
                getNotificationStatus:"started",
                getNotificationResponse:[],
                getNotificationError:null
            }
            return state;
        case actionType.GET_NOTIFICATION_RESPONSE:
            state={
                ...state,
                getNotificationStatus:"success",
                getNotificationResponse:action.payload,
                getNotificationError:null
            }
            return state;
        case actionType.GET_NOTIFICATION_ERROR:
            state={
                ...state,
                getNotificationStatus:"failed",
                getNotificationResponse:[],
                getNotificationError:action.payload
            }
            return state;
        default:
            return state
    }
}