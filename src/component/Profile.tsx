import React from "react";
import {
    Button,
    Box,
    View,
    Text,
    Container
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


export default function ProfileScreen(){
    return(
        <View style={styles.root}>
            <Box
              w={"100%"}
              justifyContent={'flex-end'}
              alignItems={'end'}
              p={0}
            >
                <UserAbout/>
            </Box>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        minHeight:height,
        width:"100%"
    }
})