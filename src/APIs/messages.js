import app,{db} from "../../firebaseConfig"
import {
    ref,
    push,
    serverTimestamp,
    onValue
} from "firebase/database"


export const sendMessage=(data)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            if(data.message.trim()==""){
                rejected({message:"Message content should not be empty!"})
            }
            const messageRef = ref(db,`messages/${data.sendTo}`)
            await push(messageRef,{
                senderName:data.senderName,
                sendTo:data.sendTo,
                text:data.text,
                timestamp:serverTimestamp(),
                read:false
            })
            resolved({
                message:"Message has been send to the respective person!"
            })
        } catch (error) {
            rejected(error)
        }
    })
}

export const getMessage=(data)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            const messageRef = ref(db,`messages/${data.uid}`)
            const subscribe = onValue(messageRef,(snapshot)=>{
                const data = snapshot.val()
                const loadedMessages = []
                if(data){
                    Object.entries(data).forEach((key)=>{
                        loadedMessages.push({id:key,...data[key]})
                    })
                }
                loadedMessages.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
                resolved(loadedMessages)
            })
        } catch (error) {
            rejected(error)
        }
    })
}