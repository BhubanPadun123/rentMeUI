import { getAuth } from "firebase/auth";
import React from "react";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TouchableOpacity
} from "react-native";
import { colors } from "../styles/Theme";
import CardAppointmentSmall from "../components/CardAppointmentSmall";
import Loader from "../components/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { getNotificationAction } from "../Redux/action/product";


export default function NotificationsScreen({ navigation }) {
    const dispatch = useDispatch()
    const [appointmentList, setAppointmentList] = useState([]);
    const [userInfo, setUserInfo] = useState(null)


    useEffect(() => {
        fetchUserData()
    }, [])

    const {
        getNotificationError,
        getNotificationResponse,
        getNotificationStatus
    } = useSelector((state) => state.product)


    async function fetchUserData() {
        const data = await AsyncStorage.getItem('currentUser')
        if (data) {
            const userData = JSON.parse(data)
            setUserInfo(userData)
            dispatch(getNotificationAction(userData._id))
        } else {
            gotToLogin()
        }
    }



    function gotToLogin() {
        navigation.navigate("LoginScreen");
    }

    function goToLocation(path){
        if(!path) return
        navigation.navigate(path)
    }

    function RenderItem({ item }) {
        return (
            <TouchableOpacity style={styles.cartContainer} onPress={()=> {
                if(item && item.hasOwnProperty('redirectLink')){
                    goToLocation(item.redirectLink)
                }
            }}>
                <Text style={{
                    fontSize: 24,
                    color: colors.color_white,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>{item && item.hasOwnProperty('title') && item.title}</Text>
                <Text style={{
                    fontSize: 14,
                    color: colors.color_secondary,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {item && item.hasOwnProperty('message') && item.message}
                </Text>
            </TouchableOpacity>
        )
    }


    return (
        <View style={styles.container}>
            {
                getNotificationStatus === "success" && getNotificationResponse && Array.isArray(getNotificationResponse) && (
                    <FlatList
                        data={getNotificationResponse}
                        keyExtractor={(item) => item._id}
                        renderItem={RenderItem}
                    />
                )
            }
            {
                getNotificationStatus === "started" && (
                    <Loader />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cartContainer: {
        borderWidth: 1,
        borderColor: colors.color_primary,
        minHeight: 50,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: colors.color_light_gray,
        overflow: 'hidden',
        borderRadius: 4
    }
});
