import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    View,
} from "react-native";
import { colors } from "../styles/Theme";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const Category = ({ category, isSelected, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, isSelected ? styles.selectedButton : null]}
            onPress={onPress}
        >
            <View
               style={{
                flex:1,
                display:'flex',
                width:"100%",
                flexDirection:'row',
                justifyContent:'space-around'
               }}
            >
                <View style={styles.image_box}>
                    <Image
                        source={category.image}
                        style={styles.category_image}
                        resizeMode='center'
                    />
                </View>
                <View style={styles.content_container}>
                    <Ionicons
                        name={category.icon}
                        size={36}
                        color={
                            isSelected
                                ? colors.color_white
                                : colors.color_primary
                        }
                        // style={styles.icon}
                    />
                    <Text style={[
                        styles.text,
                        isSelected ? styles.selectedText : null]}>
                        {category.name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: colors.color_primary,
        borderWidth: 1,
        width: windowWidth - 20,
        height: windowWidth / 2,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
    },
    selectedButton: {
        backgroundColor: colors.color_primary,
    },
    text: {
        color: colors.color_primary,
        fontSize: 14,
        textAlign: "center"
    },
    selectedText: {
        color: colors.color_white
    },
    icon: {
        flex: 1,
    },
    image_box: {
        width:"60%",
        overflow:'hidden'
    },
    category_image: {
        height:'100%',
        width:"100%"
    },
    content_container: {
        flex: 1,
        width: "50%",
        borderLeftWidth: 1,
        borderLeftColor: colors.color_primary
    }
});

export default Category;
