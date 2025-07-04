import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import { colors, sizes } from "../styles/Theme";
import { Animated } from "react-native";
import ProductCart from "./ProductCart";

const CARD_WIDTH = sizes.width - 100;
const CARD_HEIGHT = 180;

export const ProductList = ({ list,onPress }) => {
    const av = new Animated.Value(0);
    av.addListener(() => {
        return;
    });
    return (
        <FlatList
            data={list}
            // snapToInterval={CARD_WIDTH + 10}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{ 
                padding:0,
                margin:0,
                overflow:'hidden'
            }}
            decelerationRate={"fast"}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity onPress={()=> onPress(item)}>
                        <ProductCart 
                          key={item.title}
                          category={item}
                          isSelected={""}
                          onPress={()=> onPress(item)}
                        />
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "row",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 20,
        backgroundColor: colors.color_white,
        shadowColor: colors.color_gray,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        alignSelf: "flex-end",
    },
    image_box: {
        flex: 1,
        paddingVertical: 30,
    },
    category_image: {
        flex: 1,
        resizeMode: 'center',
    },
    title_box: {
        left: 24,
        top: 16,
        position: "absolute",
    },
    category: {
        fontSize: 20,
        // //fontFamily: "Mulish-Medium",
        color: colors.color_primary,
    },
    countDetail_container: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    detail: {
        fontSize: 14,
        // //fontFamily: "Mulish-Light",
        color: colors.color_primary,
    },
    button_box: {
        position: "absolute",
        justifyContent: "flex-end",
        bottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: colors.color_primary,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    button_text: {
        fontSize: 16,
        // //fontFamily: "Mulish-Bold",
        color: colors.color_white,
    },
});
