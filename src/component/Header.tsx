import React from "react";
import { Box, Text, Button, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native"
import {
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome6,
    Feather
} from '@expo/vector-icons'
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Reducer";
import { getLocalData } from "@/utils/localStorage";
import {
    user
} from "@/src/Redux/actionTypes/dataType"
import { Dimensions, ImageBackground } from "react-native";
import { useAppContext } from "./AppContex";

type propsTypes = {
    handleClickFilter: () => void;
    updateRouteName: (name: string) => void
}

export const Header = (props: propsTypes) => {
    const navigator = useNavigation()
    const [currentUser, setCurrentUser] = React.useState<user | null>(null)
    const {
        routeName
    } = useAppContext()
    // const routeName = useRoute().name

    React.useEffect(() => {
        const fetchData = async () => {
            let data = await getLocalData("currentUser").then((res) => {
                let currentUser = typeof (res) === "string" && JSON.parse(res)
                return currentUser
            }).catch((err) => {
                return null
            })
            setCurrentUser(data)
        }
        fetchData()
    }, [])

    return (

        <Box py="1" px="3" display={'flex'}
            flexDirection={'row'}
            justifyContent={'end'}
            style={{
                gap: 4,
                backgroundColor: 'white'
            }}
        >
            {
                currentUser && (currentUser.userType === "supper_admin" || currentUser.userType === "vendor") && (
                    <Button color={'yellow.600'} rounded={'2xl'} onPress={() => {
                        navigator.navigate('AddProperty' as never)
                    }}>
                        <FontAwesome6 name="add" size={20} color="white" />
                    </Button>
                )
            }
            {
                routeName && routeName === "Home" && (
                    <Button onPress={props.handleClickFilter} >
                        <Feather name="filter" size={24} color="white" />
                    </Button>
                )
            }
        </Box>
    );
};
