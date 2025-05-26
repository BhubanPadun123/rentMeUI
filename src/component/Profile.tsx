import React from "react";
import {
    Button,
    Box,
    View,
    Text,
    Container,
    VStack,
    Center
} from "native-base"
import {
    StyleSheet,
    Dimensions
} from "react-native"

const {
    height,
    width
} = Dimensions.get('screen')
import UserAbout from "./Common/UserAbout";
import { useRoute } from "@react-navigation/native";
import { useAppContext } from "./AppContex";
import { productType } from "../Redux/actionTypes/dataType";
import ProductCartHome from "./Cart/ProductHomeCart";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../Redux/Srore";
import {
    getVendorProduct,
    getVendorOrderPlaceList
} from "../Redux/actions/product.action";
import Loader_1 from "./Loader/PrimaryLoader";
import { useNavigation } from "@react-navigation/native";


export default function ProfileScreen() {
    const routeName = useRoute().name
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const {
        updateRouteName,
        updateCurrentUser,
        currentUser
    } = useAppContext()
    console.log(currentUser)
    const {
        vendorProductList,
        order_in_place_list
    } = useSelector((state: RootState) => state.product)
    console.log(order_in_place_list)

    React.useEffect(()=>{
        updateRouteName(routeName)
    },[routeName])
    React.useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) {
                navigation.navigate('Login' as never)
            }
            console.log(currentUser)
            if (currentUser?._id) {
                await dispatch(getVendorProduct(currentUser?._id))
                await dispatch(getVendorOrderPlaceList(currentUser?._id))
            }
        }
        fetchData()
    }, [])

    return (
        <View style={styles.root}>
            <View
                justifyContent={'flex-end'}
                alignItems={'end'}
                p={0}
            >
                <UserAbout
                    updateCurrentUser={updateCurrentUser}
                    currentUser={currentUser}
                />
            </View>
            <VStack>
                {
                    currentUser && (currentUser.userType === "vendor" || currentUser.userType === "admin" || currentUser.userType === "supper_admin") && vendorProductList.status == "success" && Array.isArray(vendorProductList.data) && (
                        <VStack
                            space={4}
                        >
                            <Center
                                bg={"amber.500"}
                                mt={4}
                            >
                                <Text
                                    textAlign={"center"}
                                    color={"white"}
                                    fontSize={"lg"}
                                >
                                    Your uploaded property list
                                </Text>
                            </Center>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',   // important to allow next row if needed
                                    justifyContent: 'space-between',  // to give even space between two cards
                                    padding: 10,
                                }}
                            >
                                {
                                    vendorProductList.data.map((item: productType, index: number) => (
                                        <ProductCartHome
                                            key={index}
                                            callingType='vendor'
                                            product={item}
                                        />
                                    ))
                                }
                            </View>
                        </VStack>
                    )
                }
                {
                    currentUser && (currentUser.userType === "vendor" || currentUser.userType === "admin" || currentUser.userType === "supper_admin") && vendorProductList.status == "success" && (
                        <VStack
                            space={4}
                        >
                            <Center
                                bg={"amber.500"}
                                mt={2}
                            >
                                <Text
                                    textAlign={"center"}
                                    color={"white"}
                                    fontSize={"lg"}
                                >
                                    Your Booking Property List.
                                </Text>
                            </Center>
                        </VStack>
                    )
                }
                {
                    currentUser  && (currentUser.userType === "vendor" || currentUser.userType === "admin" || currentUser.userType === "supper_admin")  && order_in_place_list.status === "success" && Array.isArray(order_in_place_list.data) && (
                        <VStack
                            space={4}
                        >
                            <Center
                                bg={"amber.500"}
                                mt={2}
                            >
                                <Text
                                    textAlign={"center"}
                                    color={"white"}
                                    fontSize={"lg"}
                                >
                                    Product list which are order in place.Need to update confirmation status.
                                </Text>
                            </Center>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',   // important to allow next row if needed
                                    justifyContent: 'space-between',  // to give even space between two cards
                                    padding: 10,
                                }}
                            >
                                {
                                    order_in_place_list.data.map((item: productType, index: number) => (
                                        <ProductCartHome
                                            key={index}
                                            callingType='confirm'
                                            product={item}
                                        />
                                    ))
                                }
                            </View>
                        </VStack>
                    )
                }
            </VStack>
            {
                (
                    vendorProductList.status === "started" ||
                    order_in_place_list.status === "started"
                ) && (
                    <Loader_1 />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        minHeight: height,
    }
})