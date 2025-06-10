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
import CardSmall from "./CardSmall";

const windowWidth = Dimensions.get("window").width;

const ProductCart = ({ category, isSelected, onPress }) => {
    const metaData = category.hasOwnProperty('metaData') ? JSON.parse(category.metaData) : null
    const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : null

    return (
        <TouchableOpacity
            style={[styles.button, isSelected ? styles.selectedButton : null]}
            onPress={onPress}
        >
            <View
                style={{
                    flex: 1,
                    display: 'flex',
                    width: "100%",
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    overflow:'hidden'
                }}
            >
                <View style={styles.image_box}>
                    <Image
                        source={{ uri: images && images[0] && images[0] }}
                        style={styles.category_image}
                        resizeMode='stretch'
                    />
                </View>
                <View style={styles.content_container}>
                    <Text style={[
                        styles.text,
                        isSelected ? styles.selectedText : null]}>
                        {category.title}
                    </Text>
                    <View
                        style={{
                            width: "100%",
                            height: 2,
                            backgroundColor: colors.color_secondary
                        }}
                    />
                    {
                        category && category.description && category.description && (
                            <Text style={{
                                // marginTop:4,
                                fontSize:12,
                                color:colors.color_primary,
                                backgroundColor:colors.color_light_gray,
                                padding:4,
                                borderRadius:10
                            }}>
                                {
                                    category && category.description && category.description
                                }
                            </Text>
                        )
                    }
                    {
                        category && category.town && category.town && (
                            <Text style={{
                                // marginTop:4,
                                fontSize:14,
                                color:colors.color_primary,
                                backgroundColor:colors.color_light_gray,
                                padding:4,
                                borderRadius:10
                            }}> Town:
                                {
                                    category && category.town && category.town
                                }
                            </Text>
                        )
                    }
                    <View
                        style={{
                            width: "100%",
                            height: 2,
                            backgroundColor: colors.color_secondary
                        }}
                    />
                    {
                        metaData && metaData.rent && metaData.rent && (
                            <Text style={{
                                // marginTop:4,
                                fontSize:10,
                                color:colors.color_primary,
                                backgroundColor:colors.color_light_gray,
                                padding:4,
                                borderRadius:10
                            }}> Rent/Month:
                                {
                                    metaData && metaData.rent && metaData.rent
                                }
                            </Text>
                        )
                    }
                    {
                        metaData && metaData.deposite && metaData.deposite && (
                            <Text style={{
                                // marginTop:4,
                                fontSize:10,
                                color:colors.color_primary,
                                backgroundColor:colors.color_light_gray,
                                padding:4,
                                borderRadius:10
                            }}> Deposite:
                                {
                                    metaData && metaData.deposite && metaData.deposite
                                }
                            </Text>
                        )
                    }
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
        flexDirection: 'column',
        overflow:'hidden'
    },
    selectedButton: {
        backgroundColor: colors.color_primary,
    },
    text: {
        color: colors.color_primary,
        fontSize: 14,
        textAlign: "center",
        fontWeight: 'bold'
    },
    selectedText: {
        color: colors.color_white
    },
    icon: {
        flex: 1,
    },
    image_box: {
        width: "60%",
        overflow: 'hidden'
    },
    category_image: {
        height: '100%',
        width: "100%"
    },
    content_container: {
        flex: 1,
        width: "50%",
        borderLeftWidth: 1,
        borderLeftColor: colors.color_primary,
        alignItems: 'center',
        gap:2
    }
});

export default ProductCart;
