import React from "react";
import {
    View,
    Text,
    Input
} from "native-base"
import { StyleSheet, Dimensions } from "react-native";
import ProductCartHome from "../Cart/ProductHomeCart";

const { height, width } = Dimensions.get('screen')


export default function Home() {
    return (
        <View style={styles.root}>
            <View style={{
                width: '100%',
                alignItems: 'flex-end',
                padding: 4
            }}>
                <Input
                    placeholder="Search...."
                    autoFocus
                //    maxW={10}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',   // important to allow next row if needed
                justifyContent: 'space-between',  // to give even space between two cards
                padding: 10,
            }}>
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
                <ProductCartHome />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:50
    }
})