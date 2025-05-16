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
    Button
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

const {
    height,
    width
} = Dimensions.get('screen')

class ViewProduct extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    render(): React.ReactNode {
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
                        <Dots isActive={false} />
                        <Dots isActive={true} />
                    </Box>
                </View>
                <VStack
                    space={2}
                    alignItems={'center'}
                    p={2}
                >
                    <Center style={styles.propertyIntro}>
                        <FontAwesome name="home" size={50} color="white" />
                        <Divider
                            bg={'amber.500'}
                            thickness={2}
                            mx={2}
                            orientation='horizontal'
                        />
                        <Heading>
                            Jonai Happy Paying Home
                        </Heading>
                        <Text
                            textAlign={'left'}
                            flexWrap={'wrap'}
                            p="4"
                            fontSize={'md'}
                        >
                            Cleaning room with effortable rent.Welcome to working man and women
                        </Text>
                        <Text
                            fontSize={'sm'}
                            textAlign={'center'}
                            width={"full"}
                            padding={2}
                        >
                            Posted At: 12/05/2025
                        </Text>

                        <Box
                            p={8}
                        >
                            <Stack>

                            </Stack>
                            <Stack
                                borderWidth={1}
                                borderColor={'white'}
                                width={"xs"}
                                bg={"amber.100"}
                                borderRadius={10}
                            >
                                <Center
                                    display={'flex'}
                                    flexDir={'row'}
                                >
                                    <Zocial name="statusnet" size={20} color="green" />
                                    <Text
                                        p={4}
                                        fontSize={'md'}
                                    >
                                        Property Available Status :
                                    </Text>
                                    <Text
                                        textAlign={'center'}
                                        fontSize={"md"}
                                        fontWeight={"bold"}
                                    >
                                        Yes
                                    </Text>
                                </Center>
                            </Stack>
                        </Box>
                    </Center>
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
                            <Stack
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
                                        1
                                    </Text>
                                    <FontAwesome5 name="chair" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Chair's
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        1
                                    </Text>
                                    <MaterialIcons name="bed" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Bed's
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        1
                                    </Text>
                                    <MaterialIcons name="table-restaurant" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Table
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        1
                                    </Text>
                                    <FontAwesome name="coffee" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Filter
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <Foundation name="lightbulb" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Bulb's
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <Octicons name="container" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Almira
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>

                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="fan" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Air-Fan
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <FontAwesome6 name="restroom" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Clean-Toilet
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <MaterialIcons name="bedroom-child" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Parking-Place
                                    </Text>
                                </Center>
                            </Stack>
                            <Stack
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
                                        4
                                    </Text>
                                    <MaterialCommunityIcons name="slot-machine-outline" size={30} color="green" />
                                    <Text
                                        fontSize={"md"}
                                        fontWeight={'bold'}
                                        color={'red.800'}
                                    >
                                        Waching-Machine
                                    </Text>
                                </Center>
                            </Stack>
                        </Box>
                    </View>
                </VStack>
                <VStack p={2} space={4} alignItems="center">
                    <Center w='full' bg="indigo.300" rounded="md" shadow={3} pt={4} pb={4} >
                        <HStack space={4}>
                            <FontAwesome name="rupee" size={50} color="white" />
                            <Heading color={'white'} textAlign={'center'}>Property Rent Info</Heading>
                        </HStack>
                        <Divider bg={'yellow.800'} />
                        <HStack space={4} p={2}>
                            <Text fontSize={"lg"} color={"white"} >Security Deposite Amount :-</Text>
                            <Text fontSize={"lg"} color={"white"} >Rs.2000</Text>
                        </HStack>
                        <HStack space={4} p={2}>
                            <Text fontSize={"lg"} color={"white"} >Rent Amount/Month :-</Text>
                            <Text fontSize={"lg"} color={"white"} >Rs.2000</Text>
                        </HStack>
                    </Center>
                    <Center w="full" bg="indigo.500" rounded="md" shadow={3} pt={4} pb={4}>
                        <HStack>
                          <Foundation name="telephone" size={50} color="white" />
                          <Heading color={'white'} textAlign={'center'}>Owner Contact Info</Heading>
                        </HStack>
                        <Divider color={"warmGray.700"} />
                        <HStack space={4} p={2} >
                            <Text fontSize={"lg"} color={"white"} >Email:-</Text>
                            <Text fontSize={"lg"} color={"white"} textAlign={'left'} >bhubanpadun15m37@gmail.com</Text>
                        </HStack>
                        <HStack space={4} p={2} >
                            <Text fontSize={"lg"} color={"white"} textAlign={'left'} >Contact Number:-</Text>
                            <Text fontSize={"lg"} color={"white"} textAlign={'left'} >9387220065</Text>
                        </HStack>
                    </Center>
                </VStack>
                <VStack space={4} p={4}>
                    <Button>
                        Connect Owner
                    </Button>
                    <Button>
                        Booking
                    </Button>
                </VStack>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        minHeight: height,
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
        backgroundColor: 'pink',
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