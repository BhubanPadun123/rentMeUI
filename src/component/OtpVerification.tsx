import {
    Center,
    Button,
    Stack,
    Box,
    FormControl,
    Input
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import {
    AntDesign
} from "@expo/vector-icons"

const { height, width } = Dimensions.get('screen')

interface stateData {
    num1:string
    num2:string
    num3:string
    num4:string
    num5:string
    num6:string,
    isError:boolean
}


export default function OTP_Verification() {
    const [state, setState] = React.useState<stateData>({
        num1:"",
        num2:"",
        num3:"",
        num4:"",
        num5:"",
        num6:"",
        isError:false
    })

    return (
        <Center>
            <Stack space={4} w="75%" maxW="300px" mx="auto">
                <FormControl isInvalid={state.isError}>
                    <Box style={{
                        display:"flex",
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        gap:4
                    }}>
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num1}
                            maxW={10}
                            autoFocus
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num1:e
                                }))
                            }}
                        />
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num2}
                            maxW={10}
                            autoFocus
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num2:e
                                }))
                            }}
                        />
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num3}
                            maxW={10}
                            autoFocus
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num3:e
                                }))
                            }}
                        />
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num4}
                            maxW={10}
                            autoFocus
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num4:e
                                }))
                            }}
                        />
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num5}
                            maxW={10}
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num5:e
                                }))
                            }}
                        />
                        <Input
                            size="lg"
                            color={'white'}
                            value={state.num6}
                            maxW={10}
                            onChangeText={(e) => {
                                setState((prevState)=>({
                                    ...prevState,
                                    num6:e
                                }))
                            }}
                        />
                    </Box>
                    <FormControl.ErrorMessage leftIcon={<AntDesign name="warning" size={24} color="red" />}>
                        Email address not valid!!.
                    </FormControl.ErrorMessage>
                </FormControl>
                <Button>SUBMIT</Button>
            </Stack>;
        </Center>
    )
}
