import AsyncStorage from "@react-native-async-storage/async-storage"

export const KeepDataInLocal=async(key:string,value:any)=>{
    try {
        await AsyncStorage.setItem(key,value)
    } catch (error) {
        console.log(error)
    }
}
export const getLocalData=async(key:string)=>{
    try {
        const response = await AsyncStorage.getItem(key)
        return response
    } catch (error) {
        return null
    }
}