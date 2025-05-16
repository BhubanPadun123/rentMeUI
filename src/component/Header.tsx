import React from "react";
import { Box, Text, Button } from "native-base";
import { useNavigation } from "@react-navigation/native"
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
import { ImageBackground } from "react-native";

export const Header = () => {
    const navigator = useNavigation()
    const [currentUser, setCurrentUser] = React.useState<user | null>(null)

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
  
            <Box  py="1" px="3" display={'flex'}
                flexDirection={'row'}
                justifyContent={'end'}
                style={{
                    gap: 4,
                    backgroundColor:'white'
                }}
            >
                {/* <ImageBackground
                source={require("@/assets/images/bg_4.jpg")}
                resizeMode='stretch'
                style={{
                    width:"100%"
                }}
            > */}
                {/* {
                !currentUser && (
                    <Button color={'yellow.600'} rounded={'2xl'} onPress={() => navigator.navigate('Login' as never)} >
                        <MaterialCommunityIcons name="login" size={20} color="white" />
                    </Button>
                )
            }
            <Button color={'yellow.600'} rounded={'2xl'} onPress={() => navigator.navigate('Signup' as never)} >
                <SimpleLineIcons name="logout" size={20} color="white" />
            </Button> */}
                {
                    currentUser && (currentUser.userType === "supper_admin" || currentUser.userType === "vendor") && (
                        <Button color={'yellow.600'} rounded={'2xl'} onPress={() => {
                            navigator.navigate('AddProperty' as never)
                        }}>
                            <FontAwesome6 name="add" size={20} color="white" />
                        </Button>
                    )
                }
                <Button>
                    <Feather name="filter" size={24} color="white" />
                </Button>
                {/* </ImageBackground> */}
            </Box>
        // </ImageBackground>

    );
};
