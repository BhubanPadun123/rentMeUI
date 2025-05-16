import * as actionTypes from "../actionTypes/index"
import { Dispatch } from "redux"
import apiService from "@/utils/baseUrl"
import { uploadImagesType, ActionUploadImages } from "../actionTypes/dataType"

export const uploadPropertyImagesAction = (data: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.UPLOAD_PROPERTY_IMAGES_STATUS,
            payload: {}
        })
        const {
            response,
            error
        } = await apiService('post', "/upload/images", data)
        if (data) {
            dispatch({
                type: actionTypes.UPLOAD_PROPERTY_IMAGES_RESPONSE,
                payload: response
            })
        }
        if (error) {
            dispatch({
                type: actionTypes.UPLOAD_PROPERTY_IMAGES_ERROR,
                payload: error
            })
        }
    }
}