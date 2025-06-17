import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Alert,
    FlatList
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVendorStockAction,getAllProductAction } from "../Redux/action/product";
import { useSelector,useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { colors } from "../styles/Theme";
import { getOrderInRangeAction } from "../Redux/action/product";
import TableComponent from "../components/CTable";
import { bookingStatus } from "../utils/utils";


export default function Record() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [userInfo,setUserInfo] = useState(null);
    const [vendorProduct,setVendorProdect] = useState([])
    const [start,setStart] = useState(0)
    const [orderList,setOrderList] = useState([])


    const {
        vendorStackError,
        vendorStackResponse,
        vendorStackStatus,

        orderInRangeError,
        orderInRangeResponse,
        orderInRangeStatus
    } = useSelector((state) => state.product)

    useEffect(()=>{
        fetchUserData()
    },[])

    useEffect(()=>{
        if(vendorStackStatus === "success" && vendorStackResponse){
            setVendorProdect(vendorStackResponse)
        }
    },[vendorStackStatus])
    useEffect(()=>{
        if(orderInRangeStatus === "success" && orderInRangeResponse){
            setOrderList(orderInRangeResponse)
        }
    },[orderInRangeStatus])

    function RenderVendorItem({item}){
        const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
        const total = metaData && metaData.hasOwnProperty('total') ? metaData.total : null
        return(
            <View style={styles.cartContainer}>
                <Text style={{
                    fontSize:20,
                    color:colors.color_secondary,
                    padding:4,
                    fontWeight:'bold',
                    textAlign:'center'
                }}>{item && item.productTitle && item.productTitle}</Text>
                <Text style={{
                    fontSize:14,
                    color:colors.color_primary
                }}>Total number of available property for future booking :  {total}</Text>
            </View>
        )
    }

    async function fetchUserData() {
        const user = await AsyncStorage.getItem("currentUser")
        if (user) {
            const userData = JSON.parse(user)
            setUserInfo(userData)
            if (userData && userData.hasOwnProperty('_id') && userData.hasOwnProperty('userType')) {
                if(userData.userType==="owner"){
                    dispatch(getVendorStockAction(userData._id))
                }
                if(userData.userType==="supper_admin" || userData.userType==="admin"){
                    // await dispatch(getAllProductAction(start,start+5))
                    await dispatch(getOrderInRangeAction(start,start+5))
                }
            }
        }
    } 
    function handleFetchNext(start){
        if(!start) return
        const end = start + 5
        dispatch(getOrderInRangeAction(start,end))
        setStart(end)
    }

    function RenderOrder({item,index}){
        const bookingDate = item && item.hasOwnProperty('bookingDate') ? JSON.parse(item.bookingDate) : null
        const bookingCode = item && item.hasOwnProperty('bookingStatus') ? item.bookingStatus : null
        const status = bookingCode ? bookingStatus(bookingCode) : ""
        const name = bookingDate && bookingDate.hasOwnProperty('userName') ? bookingDate.userName : ""
        const PhoneNumber = bookingDate && bookingDate.hasOwnProperty('userContactNumber') ? bookingDate.userContactNumber : ""
        const email = bookingDate && bookingDate.hasOwnProperty('userEmail') ? bookingDate.userEmail : ""
        if(!bookingDate) return null
        return(
            <View style={styles.cartContainer}>
                <TableComponent 
                   headerData={["SL_No","Name","PhoneNumber","Email","Status"]}
                   rowData={[
                    [index+1,name,PhoneNumber,email,status]
                   ]}
                />
            </View>
        )
    }

    return (
        <View>
            {
                vendorProduct && vendorProduct.length > 0 && userInfo && userInfo.hasOwnProperty('userType') &&  userInfo.userType === "owner" && (
                    <FlatList 
                        data={vendorProduct}
                        keyExtractor={(item)=> item._id}
                        renderItem={RenderVendorItem}
                    />
                )
            }
            {
                orderList && orderList.length > 0 && userInfo && userInfo.hasOwnProperty('userType') &&  (
                    userInfo.userType === "supper_admin" ||
                    userInfo.userType === "admin"
                ) && (
                    <FlatList 
                        data={orderList}
                        keyExtractor={(item)=> item._id}
                        renderItem={RenderOrder}
                        onEndReached={()=> {
                            if(orderList.length < 9) return
                            handleFetchNext(start+5)
                        }}
                    />
                )
            }
            {
                (
                    vendorStackStatus==="started" ||
                    orderInRangeStatus === "started"
                ) && (
                    <Loader/>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    cartContainer:{
        borderWidth:1,
        borderColor:colors.color_primary,
        marginHorizontal:20,
        marginVertical:8,
        padding:4,
        backgroundColor:colors.color_light_gray
    },
    name:{
        fontFamily:20,
        color:colors.color_secondary,
        fontWeight:'bold'
    }
});
