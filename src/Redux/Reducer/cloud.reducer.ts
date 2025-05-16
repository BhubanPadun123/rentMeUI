import * as actionTypes from "../actionTypes/index"
import {
    uploadImagesType,
    status,
    ActionUploadImages
} from "../actionTypes/dataType"

interface cloudState{
    propertyImages:{
        status:status,
        data:uploadImagesType | [],
        error:any
    }
}

const initialState:cloudState={
    propertyImages:{
        status:null,
        data:[],
        error:null
    }
}

export const CloudReducer=(state=initialState,action:ActionUploadImages)=>{
    switch(action.type){
        case actionTypes.UPLOAD_PROPERTY_IMAGES_STATUS:
            state={
                ...state,
                propertyImages:{
                    status:'started',
                    data:[],
                    error:null
                }
            }
            return state;
        case actionTypes.UPLOAD_PROPERTY_IMAGES_RESPONSE:
            state = {
                ...state,
                propertyImages:{
                    status:'success',
                    data:action.payload,
                    error:null
                }
            }
            return state;
        case actionTypes.UPLOAD_PROPERTY_IMAGES_ERROR:
            state = {
                ...state,
                propertyImages:{
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