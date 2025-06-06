import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { colors } from "../styles/Theme";
import Icons from "../utils/Icons";

export default function CardSmall({ text, iconName , onSelect}) {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.card}>
                <View style={styles.icon_container}>
                    <Image source={Icons.info} style={{height:20,width:20}} />
                </View>
                <View style={styles.section_container}>
                    <Text style={styles.section_text}>{text}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 24,
        marginBottom: 16,
        backgroundColor: colors.color_white,
        justifyContent: "center",
        
    },
    section_container: {
        flex: 1,
        justifyContent:"center"
    },
    icon_container: {
    },
    icon: {
        padding: 4,
    },
    section_text: {
        fontSize: 14,
        // //fontFamily: "Mulish-Medium",
    },
});
