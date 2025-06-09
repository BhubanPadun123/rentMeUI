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
    getDoc,
    orderBy,
    limit,
    getDocs,
    updateDoc
} from "firebase/firestore"

export const updateBooking=(orderId,status)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            if(!orderId){
                rejected({message:"Order id missing!"})
            }
            const bookingRef = doc(db,"booking",orderId)
            await updateDoc(bookingRef,{
                bookingStatus:status
            })
            resolved({message:"order status updated successfully!"})
        } catch (error) {
            rejected(error)
        }
    })
}

export const getVendorProducts=(vendorId)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            const vendorRef = collection(db,"booking")
            const q = query(vendorRef,where('vendorRef',"==",vendorId))
            const querySnapshot = await getDocs(q)

            const products = []
            querySnapshot.forEach((doct)=>{
                products.push({id:doct.id,...doct.data()})
            })

            resolved(products)
        } catch (error) {
            rejected(error)
        }
    })
}

export const getCustomerBookingList = (customerId) => {
    return new Promise(async (resolved, rejected) => {
        try {
            const customerRef = collection(db, "booking")
            const q = query(customerRef, where('customerRef', '==', customerId))
            const querySnapshot = await getDocs(q)
            const bookings = []

            querySnapshot.forEach((doc) => {
                bookings.push({ id: doc.id, ...doc.data() });
            });
            resolved(bookings)
        } catch (error) {
            rejected(error)
        }
    })
}

export const getCustomerBookingStatus = (orderId) => {
    return new Promise(async (resolved, rejected) => {
        try {

        } catch (error) {
            rejected(error)
        }
    })
}
export const handleBokingApi = (data) => {
    return new Promise(async (resolved, rejected) => {
        try {
            const bookingRef = doc(db, "booking", data.orderId,)
            await setDoc(bookingRef, {
                ...data
            }).then((res) => {
                resolved({
                    message: "Placed booking successfully!",
                    res
                })
            }).catch((err) => {
                rejected({
                    message: "Error while placed the booking",
                    err
                })
            })
        } catch (error) {
            rejected(error)
        }
    })
}