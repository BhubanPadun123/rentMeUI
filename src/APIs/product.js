import {
    getAuth
} from "firebase/auth"
import app, { db } from "../../firebaseConfig"
import {
    collection,
    doc,
    setDoc,
    query,
    where,
    getDoc
} from "firebase/firestore"
import {generateRandomId} from "../utils/RandomId"

export const addProduct=(productData)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if(!user) rejected({message:"User does not exist"})
            const data = {
                ...productData,
                "vendorRef":user?.uid,
                "id":generateRandomId()
            }
            console.log(data)
            const productRef = doc(db,"products",data.id);
            await setDoc(productRef,{
                ...data
            }).then((response)=>{
                resolved({
                    message:"Property posted successfully!"
                })
            }).catch((err)=>{
                rejected({
                    message:"Error while post the property!",
                    error:err
                })
            })
        } catch (error) {
            rejected(error)
        }
    })
}