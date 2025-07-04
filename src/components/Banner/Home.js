import React from "react";
import { homeText } from "../../utils/text";
import {
    StyleSheet
} from "react-native"


import {
    Card
} from "@rneui/themed"


export function InfoCart(){
    return(
        <Card containerStyle={{
            borderRadius:10,
            backgroundColor:"#826012",
            borderWidth:0,
            padding:0
        }}>
            <Card.Title style={{
                color:"white",
                letterSpacing:1.5,
                fontSize:10,
                lineHeight:20
            }}>
                {
                    homeText.assamese_c_1
                }
            </Card.Title>
            <Card.Divider/>
            <Card.Title style={{
                fontSize:20
            }}>
                {
                    homeText.titleAssames
                }
            </Card.Title>
        </Card>
    )
}