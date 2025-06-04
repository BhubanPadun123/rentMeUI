import {
    ref,
    get,
    child,
    getDatabase
} from "firebase/database"
import {
    getAuth,
    updateProfile
} from "firebase/auth"
import app from "../../firebaseConfig"

import { showTopMessage } from "../utils/ErrorHandler"
import parseContentData from "../utils/ParseContentData"

export const getUser = () => {
    return new Promise((resolved, rejected) => {
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if(user){
                resolved(user)
            }else{
                rejected({
                    message:"user does not exist"
                })
            }
        } catch (error) {
            rejected(error)
        }
    })
}
export const updateUser = () => {
    return new Promise((resolved, rejected) => {
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if (user) {
                updateProfile(user, {
                    appName: "HomeKart",
                    displayName: "Bhuban Padun",
                    phoneNumber: "9387220065",
                    photoURL: "https://example.com/bhuban-photo.jpg",
                }).then((res) => {
                    resolved(res)
                }).catch((err) => {
                    rejected(err)
                })
            } else {
                rejected({
                    message: "user not found"
                })
            }
        } catch (error) {
            rejected(error)
        }
    })
}