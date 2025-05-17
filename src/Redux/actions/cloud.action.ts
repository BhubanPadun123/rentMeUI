import * as actionTypes from "../actionTypes/index"
import { Dispatch } from "redux"
import apiService from "@/utils/baseUrl"
import { uploadImagesType, ActionUploadImages } from "../actionTypes/dataType"
import axios from "axios"

export const uploadPropertyImagesAction = (data: any) => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: actionTypes.UPLOAD_PROPERTY_IMAGES_STATUS,
            payload: {}
        });

        try {
            const response = await fetch("http://localhost:8080/upload/image", {
                method: "POST",
                body: data,
                // Don't set headers manually for multipart/form-data!
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

            const result = await response.json();

            dispatch({
                type: actionTypes.UPLOAD_PROPERTY_IMAGES_RESPONSE,
                payload: result
            });
        } catch (err) {
            dispatch({
                type: actionTypes.UPLOAD_PROPERTY_IMAGES_ERROR,
                payload: err
            });
        }
    }
};
