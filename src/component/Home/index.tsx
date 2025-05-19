import React from "react";
import {
    View,
    Text,
    Input
} from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import ProductCartHome from "../Cart/ProductHomeCart";
import {
    getProductListAction 
} from "@/src/Redux/actions/product.action";
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch } from "@/src/Redux/Srore";
import { RootState } from "@/src/Redux/Reducer";
import { useNavigation } from "@react-navigation/native";
import Loader_1 from "../Loader/PrimaryLoader";
import { productType } from "@/src/Redux/actionTypes/dataType";

const { height, width } = Dimensions.get('screen')


export default function Home() {
    const dispacth = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    

    React.useEffect(()=>{
        const fetchProductList=async()=>{
            dispacth(getProductListAction(0,6))
        }
        fetchProductList()
    },[])
    const {
        productList
    } = useSelector((state:RootState)=> state.product)
    console.log(productList)
   
    React.useEffect(()=>{
        const checkData=()=>{
            if(productList.status === "failed"){
                if(productList.error?.message){
                    if(productList.error.message.includes("Invalid token")){
                        navigation.navigate("Login" as never)
                    }
                }
            }
        }
        checkData()
    },[
        productList.data,
        productList.error,
        productList.status
    ])
    return (
        <View style={styles.root}>
            <View style={{
                width: '100%',
                alignItems: 'flex-end',
                padding: 4
            }}>
                <Input
                    placeholder="Search...."
                    autoFocus
                //    maxW={10}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',   // important to allow next row if needed
                justifyContent: 'space-between',  // to give even space between two cards
                padding: 10,
            }}>
                {
                    productList.status === "success" && Array.isArray(productList.data) && 
                    productList.data.map((item:productType,index)=>{
                        return(
                            <ProductCartHome 
                               key={index}
                               {...item} 
                            />
                        )
                    })
                }
            </View>
            {
                (
                    productList.status === "started"
                ) && (
                    <Loader_1/>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:50
    }
})