import React from "react";
import {
    View,
    Text,
    VStack,
    HStack,
    Divider,
    FormControl,
    Checkbox,
    Input,
    Button
} from "native-base"
import { user, productType } from "@/src/Redux/actionTypes/dataType";
import {
    Dimensions
} from "react-native"

const {
    height,
    width
} = Dimensions.get('screen')

type PropTypes = {
    user: user[] | [];
    product: productType
}

function UpdateProductOrderStatus(props: PropTypes) {
    const {
        user,
        product
    } = props
    return (
        <View
            minH={height}
        >
            <VStack
                bg={'teal.600'}
                mt={4}
            >
                <Text
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={"md"}
                    textAlign={'center'}
                    letterSpacing={1.5}
                >
                    {
                        'Please update property booking confirmation status'.toUpperCase()
                    }
                </Text>
                <Divider />
                <Text
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={'sm'}
                    textAlign={'center'}
                    letterSpacing={1.5}
                >
                    {
                        `There is/are ${user.length} customer booking in your property `.toUpperCase()
                    }
                </Text>
                <Text
                    color={'red.900'}
                    fontWeight={"bold"}
                    fontSize={'xs'}
                    textAlign={'center'}
                    letterSpacing={1.5}
                >
                    {
                        `Please make confirm only one customer`.toUpperCase()
                    }
                </Text>
            </VStack>
            {
                user.length > 0 &&
                user.map((u, index) => {
                    return (
                        <VStack key={index}
                            space={4}
                            mt={4}
                            bg={'trueGray.800'}
                            padding={"2"}
                        >
                            <View
                              p={4}
                              bg={'warmGray.600'}
                              borderRadius={"md"}
                            >
                                <Text
                                   color={"white"}
                                   fontSize={"sm"}
                                   textAlign={"center"}
                                >{index+1}</Text>
                                <Text
                                    color={"white"}
                                    fontSize={"sm"}
                                    textAlign={"center"}
                                >
                                    {
                                        'Customer information'.toUpperCase()
                                    }
                                </Text>
                            </View>
                            <HStack
                                borderRadius={"md"}
                            >
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >
                                    Name:
                                </Text>
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >{u.userName}</Text>
                            </HStack>
                            <HStack
                                borderRadius={"md"}
                            >
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >
                                    Email:
                                </Text>
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >{u.userEmail}</Text>
                            </HStack>
                            <HStack
                                borderRadius={"md"}
                            >
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >
                                    Phone Number:
                                </Text>
                                <Text
                                    color={"white"}
                                    letterSpacing={2}
                                >{u.userContactNumber}</Text>
                            </HStack>
                            <FormControl isRequired alignItems={'center'} >
                                <FormControl.Label color={"white"}>Select Status</FormControl.Label>
                                <Checkbox.Group 
                                   style={{
                                    gap:4
                                   }}
                                >
                                    <Checkbox value="Yes">
                                        <Text
                                          color={"white"}
                                        >
                                            Confirm
                                        </Text>
                                    </Checkbox>
                                    <Checkbox value="No">
                                        <Text
                                          color={"white"}
                                        >
                                            Reject
                                        </Text>
                                    </Checkbox>
                                </Checkbox.Group>
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label color={"white"}>Message</FormControl.Label>
                                <Input 
                                   multiline
                                   fontSize={"md"}
                                   color={'white'}
                                   letterSpacing={1.5}
                                />
                            </FormControl>
                            <Button>
                                Update
                            </Button>
                        </VStack>
                    )
                })
            }
        </View>
    )
}

export default UpdateProductOrderStatus