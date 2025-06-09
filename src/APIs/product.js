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
    getDocs
} from "firebase/firestore"
import { generateRandomId } from "../utils/RandomId"

export const getProductByIds = (ids) => {
    return new Promise(async (resolved, rejected) => {
        try {
            if (!Array.isArray(ids) || ids.length === 0) resolved([])
            const chunkSize = 10;
            const results = []
            for (let i = 0; i < ids.length; i++) {
                const chunk = ids.slice(i, i + chunkSize);
                const q = query(
                    collection(db, 'products'),
                    where('__name__', 'in', chunk)
                );
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() });
                });
            }
            resolved(results)
        } catch (error) {
            rejected(error)
        }
    })
}

export const getFirstProducts = () => {
    return new Promise(async (resolved, rejected) => {
        try {
            const productRef = collection(db, "products")
            const q = query(productRef, orderBy('createdAt'), limit(10))
            const querySnapshot = await getDocs(q)
            const lastVisit = querySnapshot.docs[querySnapshot.docs.length - 1]
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            resolved({
                lastVisit,
                data
            })

        } catch (error) {
            rejected(error)
        }
    })
}

export const addProduct = (productData) => {
    return new Promise(async (resolved, rejected) => {
        try {
            const auth = getAuth(app)
            const user = auth.currentUser
            if (!user) rejected({ message: "User does not exist" })
            const data = {
                ...productData,
                "vendorRef": user?.uid,
                "id": generateRandomId()
            }
            const productRef = doc(db, "products", data.id);
            const stockRef = doc(db, "stock", user.uid);
            await setDoc(productRef, {
                ...data
            }).then((response) => {
                resolved({
                    message: "Property posted successfully!"
                })
            }).catch((err) => {
                rejected({
                    message: "Error while post the property!",
                    error: err
                })
            })
            await setDoc(stockRef, {
                availableStock: productData.total,
                isAvailable: true,
                totalStock: productData.total,
                vendorRef: user.uid
            })
        } catch (error) {
            rejected(error)
        }
    })
}