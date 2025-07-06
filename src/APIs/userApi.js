import {
    ref,
    get,
    child,
    getDatabase,
    set
} from "firebase/database"
import {
    getAuth,
    updateProfile,
} from "firebase/auth"
import app from "../../firebaseConfig"
import { db } from "../../firebaseConfig"
import {
    collection,
    doc,
    setDoc,
    query,
    where,
    getDocs,
    getDoc
} from "firebase/firestore"

export const getUserListForProductOrder=(userIds)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            if (userIds.length === 0) return [];
            const users = [];
          
            userIds.map(async(item)=>{
                const userRef = doc(db,"users",item)
                const userSnap = await getDoc(userRef);
                if(userSnap.exists()){
                    users.push({id:userSnap.id,...userSnap.data()})
                }
            })
            resolved(users);
        } catch (error) {
            rejected(error)
        }
    })
}
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
export const updateUser = (updateData,type) => {
    return new Promise(async(resolved, rejected) => {
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if (user && type == "profile") {
                updateProfile(user, {
                    appName: "HomeKart",
                    displayName: updateData.displayName,
                    phoneNumber: updateData.phoneNumber,
                    photoURL: updateData.photoURL,
                }).then((res) => {
                    resolved(res)
                }).catch((err) => {
                    rejected(err)
                })
            }else if(user && type === "info"){
                const userRef = doc(db,"users",user.uid)
                await setDoc(userRef,{
                    ...updateData,
                    userRef:user.uid
                }).then((res)=>{
                    resolved(res)
                }).catch((err)=>{
                    rejected(err)
                })
            }
            if(!user) {
                rejected({
                    message: "user not found"
                })
            }
        } catch (error) {
            rejected(error)
        }
    })
}
export const getUserInfo=()=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if(!user){
                rejected({
                    message:"user does not exist!"
                })
            }
            const userRef = doc(db,"users",user.uid)
            const userSnap = await getDoc(userRef)
            if(userSnap.exists()){
                const userData = userSnap.data()
                resolved(userData)
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