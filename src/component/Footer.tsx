import React from "react";
import { Box, Text, Button } from "native-base";
import {
    Feather,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons'
import {useNavigation} from "@react-navigation/native"

type propTypes={
    updateRouteName:(name:string)=> void
}

export const Footer = (props:propTypes) => {
    const navigator = useNavigation()
    const onPressProfile=()=>{
        navigator.navigate("Profile" as never)
    }
    return (
        <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            py="2"
            bg="gray.700"
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-around'}
        >
            <Button>
                <MaterialIcons name="add-shopping-cart" size={24} color="white" />
            </Button>
            <Button onPress={()=> navigator.navigate('Home' as never)}>
                <Feather name="home" size={24} color="white" />
            </Button>
            <Button onPress={onPressProfile} >
                <AntDesign name="user" size={24} color="white" />
            </Button>
        </Box>
    );
};
