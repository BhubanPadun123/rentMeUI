import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { ScrollView, useTheme } from "native-base";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface propsType {
    navItem: React.ReactNode;
}

export default function CContainer(props: propsType) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Header />

            {/* Fixed Background */}
            <ImageBackground
                source={require("@/assets/images/bg_3.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                {/* Scrollable Foreground Content */}
                <ScrollView 
                   height={Dimensions.get('screen').height}
                   mb={20}
                >
                    {props.navItem}
                </ScrollView>
            </ImageBackground>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
    },
});
