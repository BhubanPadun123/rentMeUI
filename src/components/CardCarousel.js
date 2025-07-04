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
import {
    Card
} from "@rneui/themed"

const CARD_WIDTH = sizes.width - 100;
const CARD_HEIGHT = 180;
import ProductCart from "./ProductCart";

export const CardCarousel = ({ list, onSelectCategory, type = "catagory" }) => {
    const av = new Animated.Value(0);
    av.addListener(() => {
        return;
    });
    return (
        <FlatList
            data={list}
            horizontal
            snapToInterval={CARD_WIDTH + 10}
            decelerationRate={"fast"}
            showsHorizontalScrollIndicator={true}
            initialNumToRender={3}
            keyExtractor={(item) => item.name || item._id}
            renderItem={({ item, index }) =>
                type === "catagory" ? (
                    <TouchableOpacity
                        style={{
                            marginLeft: index === 0 ? 0 : 2,
                        }}
                        onPress={() => onSelectCategory(item, "catagoryClick")}
                    >
                        <Card
                            containerStyle={{
                                padding: 8,
                                width: sizes.width / 3,
                                minHeight: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: index > 0 && "#d9d0c7"
                            }}
                        >
                            <Card.Title
                                style={{
                                    padding: 0,
                                    textAlign: 'center',
                                    fontWeight: "bold",
                                    fontSize: 10
                                }}
                            >
                                {item.name}
                            </Card.Title>
                            <Card.Image
                                source={item.image}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                            <View style={styles.countDetail_container}>
                                <Text style={styles.detail}>
                                    {item.count}
                                    {"  and More"}
                                </Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={{
                            marginLeft: index === 0 ? 0 : 2,
                        }}
                        onPress={() => onSelectCategory(item)}
                    >
                        <ProductCart
                            key={item.title}
                            category={item}
                            isSelected={""}
                            onPress={onSelectCategory}
                        />
                    </TouchableOpacity>
                )
            }
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
