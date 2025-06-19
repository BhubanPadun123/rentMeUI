import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEarning } from "../Redux/action/product";
import Loader from "../components/Loader";
import { colors } from "../styles/Theme";


export default function PlatformEarning({ navigation }) {
    const dispatch = useDispatch()

    useEffect(() => {
        fetchUserData()
    }, [])

    const {
        getEarningStatus,
        getEarningResponse,
        getEarningError
    } = useSelector((state) => state.product)

    async function fetchUserData() {
        const data = await AsyncStorage.getItem("currentUser")
        if (data) {
            const userData = JSON.parse(data)
            if (userData && userData.hasOwnProperty('userType') && userData.userType === "supper_admin") {
                dispatch(getEarning())
            }
        }
    }

    function RenderItem({ item }) {
        console.log(item)
        return (
            <View style={styles.cart}>
                <Text style={styles.text}>Cutomer Ref: {item.customerRef && item.customerRef}</Text>
                <Text style={styles.text}>Payment Ref: {item._id && item._id}</Text>
                <Text style={styles.text}>Razorpay Ref: {item.paymentId && item.paymentId}</Text>
                <Text style={styles.text}>Property Ref: {item.productRef && item.productRef}</Text>
                <Text style={styles.text}>Payment Date : {item.updatedAt && formatDate(item.updatedAt)}</Text>
            </View>
        )
    }
    function formatDate(input) {
        const date = new Date(input);

        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const yy = String(date.getFullYear()).slice(2);

        const hh = String(date.getHours()).padStart(2, '0');
        const min = String(date.getMinutes()).padStart(2, '0');
        const ss = String(date.getSeconds()).padStart(2, '0');

        return `${dd}-${mm}-${yy},${hh}-${min}-${ss}`;
    }

    return (
        <View style={styles.root}>
            <Text style={styles.header}>
                Platform Earning Collection
            </Text>
            {
                getEarningStatus === "success" &&
                Array.isArray(getEarningResponse) &&
                getEarningResponse.length > 0 && (
                    <Text style={styles.header}>
                        Total Earning : Rs- {getEarningResponse.length * 49}
                    </Text>
                )
            }
            {
                getEarningStatus === "success" &&
                    Array.isArray(getEarningResponse) &&
                    getEarningResponse.length === 0 ? (
                    <Text style={styles.emptyCollction}>Earning Collection Empty!</Text>
                ) : (
                    <FlatList
                        data={getEarningResponse}
                        keyExtractor={(item) => item._id}
                        renderItem={RenderItem}
                    />
                )
            }
            {
                getEarningStatus === "failed" && (
                    <Text style={styles.emptyCollction}>{JSON.stringify(getEarningError)}</Text>
                )
            }
            {
                getEarningStatus === "started" && (
                    <Loader />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.color_primary,
        fontWeight: 'bold'
    },
    emptyCollction: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.color_secondary,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        marginTop: 100
    },
    cart: {
        borderWidth: 1,
        borderColor: colors.color_primary,
        borderRadius: 4,
        marginHorizontal: 10,
        marginVertical: 4,
        padding: 4
    },
    text: {
        fontSize: 14,
        color: colors.color_secondary,
        padding: 4,
        backgroundColor: colors.color_light_gray
    }
})