import React, { Component } from "react";
import {
    Box,
    View,
    Text,
    Image,
    Divider,
    Stack,
    Center,
    VStack,
    Heading,
    HStack,
    Button,
    useToast
} from "native-base"
import {
    SafeAreaView,
    StyleSheet,
    Dimensions
} from "react-native"
import {
    FontAwesome,
    Zocial,
    AntDesign,
    FontAwesome5,
    FontAwesome6,
    MaterialIcons,
    Foundation,
    Octicons,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import { RouteProp, useRoute } from '@react-navigation/native';
import { BookingPayload, productType, user } from "@/src/Redux/actionTypes/dataType";
import { formatDateTime } from "@/utils/helper";
import MapView from "react-native-maps"
import { bookingProperty } from "@/src/Redux/actions/product.action";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/src/Redux/Srore";
import { RootState } from "@/src/Redux/Reducer";
import Loader_1 from "../Loader/PrimaryLoader";
import { getLocalData } from "@/utils/localStorage";
import { useNavigation } from "@react-navigation/native";


type RootStackParamList = {
    Products: productType
}
type ProductsRouteProp = RouteProp<RootStackParamList, 'Products'>;

const {
    height,
    width
} = Dimensions.get('screen')

function ViewProduct() {
    const route = useRoute<ProductsRouteProp>();
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation()
    const toast = useToast()
    const {
        postAt,
        productTitle,
        productType,
        propertyOccupancy,
        metaData,
        availableStatus
    } = route.params
    const {
        date,
        time
    } = formatDateTime(postAt)
    const {
        booking
    } = useSelector((state: RootState) => state.booking)
    console.log(booking)
    React.useEffect(()=>{
        const checkResponse=()=>{
            if(booking.status === "failed"){
                if(booking.error?.message){
                    if(booking.error.message.includes("Invalid token")){
                        toast.show({
                            display:booking.error.message,
                            description:booking.error.message
                        })
                        navigation.navigate("Login" as never)
                    }
                }
                if(booking.error?.message ){
                    console.log(booking.error.message)
                    toast.show({
                        display:booking.error.message,
                        description:booking.error.message
                    })
                }
            }
            if(booking.status === "success"){
                toast.show({
                    description:"Successfully placed your property booking,we will update withing 24 hour!!"
                })
            }
        }
        checkResponse()
    },[
        booking.data,
        booking.error,
        booking.status
    ])
    const orderPlace = async () => {
        let userInfo = await getLocalData("currentUser")
        if (userInfo) {
            let userData: user = JSON.parse(userInfo)
            if (userData?._id && route.params?._id) {
                const data: BookingPayload = {
                    vendorRef: route.params._id,
                    customerRef: userData._id,
                    bookingStatus: "created",
                    bookingDate: `${new Date()}`,
                    message: "",
                    rating: "",
                    review: ""
                }
                dispatch(bookingProperty(data))
            }
        } else {
            navigation.navigate("Login" as never)
        }
    }
    return (
        <SafeAreaView style={styles.root}>
            <View style={styles.imageContainer}>
                <Image shadow={2} source={{
                    uri: 'https://wallpaperaccess.com/full/317501.jpg'
                }}
                    alt="Alternate Text"
                    size={'2xl'}
                />
                <Box style={styles.imgCountContainer}>
                    {
                        metaData.propertyImages.map((item, index) => {
                            return (
                                <Dots key={index} isActive={true} />
                            )
                        })
                    }
                </Box>
            </View>
            <VStack
                space={2}
                alignItems={'center'}
                p={2}
            >
                <VStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={'full'}
                    space={2}
                >
                    <Text
                        fontSize={'sm'}
                        textAlign={'center'}
                        padding={2}
                        bg={'warmGray.300'}
                        borderRadius={10}
                        fontWeight={'bold'}
                        letterSpacing={1.5}
                    >
                        Posted At: {`${date} - ${time}`}
                    </Text>
                    <FontAwesome name="home" size={50} color="white" />
                    <Divider />
                    <Heading
                        bg={'gray.400'}
                        p={2}
                        m={1}
                        borderRadius={8}
                        textAlign={'center'}
                        color={'white'}
                    >
                        {
                            productTitle.toUpperCase()
                        }
                    </Heading>
                    <Text
                        textAlign={'left'}
                        flexWrap={'wrap'}
                        fontSize={'md'}
                        letterSpacing={1.2}
                        w={'full'}
                        bg={'gray.500'}
                        color={"white"}
                        // maxH={80}
                        // minH={40}
                        p={2}
                        borderRadius={10}
                        overflowY={'scroll'}
                    >
                        {metaData.description}
                    </Text>
                    <HStack
                        bg={"gray.400"}
                        alignItems={'center'}
                        w={'full'}
                        borderRadius={10}
                        p={2}
                    >
                        <Zocial name="statusnet" size={20} color="green" />
                        <Text
                            fontSize={'md'}
                            color={"white"}
                        >
                            Property Available Status :
                        </Text>
                        <Text
                            textAlign={'center'}
                            fontSize={"md"}
                            fontWeight={"bold"}
                            color={"white"}
                        >
                            {availableStatus ? "Available" : "Fully Occupy"}
                        </Text>
                    </HStack>
                </VStack>
                <View style={styles.propertyIntro}>
                    <FontAwesome6 name="house-tsunami" size={50} color="white" />
                    <Divider
                        bg={'amber.500'}
                        thickness={2}
                        mx={2}
                        orientation='horizontal'
                    />
                    <Text
                        fontSize={'lg'}
                        textAlign={'center'}
                        fontWeight={'bold'}
                        color={"white"}
                    >
                        Available Aminities
                    </Text>
                    <Box
                        p={8}
                        flexDir={'row'}
                        width={'full'}
                        justifyContent={'space-around'}
                        flexWrap={'wrap'}
                        style={{ rowGap: 8 }}
                    >
                        {
                            metaData.availableAminities.length > 0 &&
                            metaData.availableAminities.map((item, index) => {
                                return (
                                    <Stack
                                        key={index}
                                        borderWidth={1}
                                        borderColor={'white'}
                                        bg={"amber.100"}
                                        borderRadius={4}
                                        maxW={'1/2'}
                                        minW={"30%"}
                                    >
                                        <Center
                                            display={'flex'}
                                            flexDir={'column'}
                                        >
                                            <Text
                                                textAlign={'center'}
                                                fontSize={"md"}
                                                fontWeight={"bold"}
                                                color={"violet.600"}
                                            >
                                                {
                                                    item.count
                                                }
                                            </Text>
                                            <FontAwesome5 name="chair" size={30} color="green" />
                                            <Text
                                                fontSize={"md"}
                                                fontWeight={'bold'}
                                                color={'red.800'}
                                            >
                                                {
                                                    item.name
                                                }
                                            </Text>
                                        </Center>
                                    </Stack>
                                )
                            })
                        }
                    </Box>
                </View>
            </VStack>
            <VStack p={2} space={4} alignItems="center">
                <Center w='full' bg='gray.400' rounded="md" shadow={3} pt={4} pb={4} >
                    <HStack space={4}>
                        <FontAwesome name="rupee" size={50} color="white" />
                        <Heading color={'white'} textAlign={'center'}>Property Rent Info</Heading>
                    </HStack>
                    <Divider bg={'yellow.800'} />
                    <HStack space={4} p={2}>
                        <Text fontSize={"lg"} color={"white"} >Security Deposite Amount :-</Text>
                        <Text fontSize={"lg"} color={"white"} >Rs.{metaData.rentInfo.depositeAmount}</Text>
                    </HStack>
                    <HStack space={4} p={2}>
                        <Text fontSize={"lg"} color={"white"} >Rent Amount/Month :-</Text>
                        <Text fontSize={"lg"} color={"white"} >Rs.{metaData.rentInfo.rent_per_month}</Text>
                    </HStack>
                </Center>
                <Center w="full" bg="gray.400" rounded="md" shadow={3} pt={4} pb={4}>
                    <HStack>
                        <Foundation name="telephone" size={50} color="white" />
                        <Heading color={'white'} textAlign={'center'}>Owner Contact Info</Heading>
                    </HStack>
                    <Divider color={"warmGray.700"} />
                    <HStack space={4} p={2} >
                        <Text fontSize={"lg"} color={"white"} >Name:-</Text>
                        <Text fontSize={"lg"} color={"white"} textAlign={'left'} >{metaData.vendorContactInfo.name}</Text>
                    </HStack>
                    <HStack space={4} p={2} >
                        <Text fontSize={"lg"} color={"white"} >Email:-</Text>
                        <Text fontSize={"lg"} color={"white"} textAlign={'left'} >{metaData.vendorContactInfo.email}</Text>
                    </HStack>
                    <HStack space={4} p={2} >
                        <Text fontSize={"lg"} color={"white"} textAlign={'left'} >Contact Number:-</Text>
                        <Text fontSize={"lg"} color={"white"} textAlign={'left'} >{metaData.vendorContactInfo.contactNumber}</Text>
                    </HStack>
                </Center>
            </VStack>
            <VStack space={4} p={4}>
                <Button onPress={orderPlace}>
                    Booking
                </Button>
            </VStack>
            {
                (
                    booking.status === "started"
                ) && (
                    <Loader_1 />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        minHeight: "100%",
        width: width,
    },
    imageContainer: {
        width: "100%",
        height: "auto",
        maxHeight: 400,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    imgCountContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        padding: 4
    },
    contentWrapper: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        gap: 10
    },
    propertyIntro: {
        // width: "90%",
        backgroundColor: "gray",
        borderRadius: 20,
        alignItems: 'center'
    }
})

interface DotsProps {
    isActive: boolean
}
export const Dots = (props: DotsProps) => {
    return (
        <View
            style={{
                height: 10,
                width: 10,
                backgroundColor: props.isActive ? "red" : "white",
                borderRadius: "100%"
            }}
        />
    )
}

export default ViewProduct