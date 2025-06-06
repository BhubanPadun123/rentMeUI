// components/LocationBar.js

import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert,Image } from "react-native";
import * as Location from "expo-location";
import { colors } from "../styles/Theme";
import Icons from "../utils/Icons";
import tabsImages from "../utils/TabsImages";

export default function LocationBar({ value, onType, placeholder }) {
    const [loading, setLoading] = React.useState(false);

    const fetchLocation = async () => {
        setLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location permission is required.");
                setLoading(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const locationString = JSON.stringify(location);
            onType(locationString); // behave like a TextInput change
        } catch (err) {
            Alert.alert("Error", "Failed to get location.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity onPress={fetchLocation}>
            <View style={styles.container}>
                <TextInput
                    style={{ fontSize: 14 }}
                    placeholder={placeholder}
                    placeholderTextColor={colors.color_gray}
                    value={value}
                    editable={false} // not manually editable
                />
                {loading ? (
                    <Image source={Icons.info} style={{height:20,width:20}} />
                ) : (
                    <Image source={tabsImages.Map} style={{height:20,width:20}} />
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderColor: colors.color_light_gray,
        backgroundColor: colors.color_light_gray,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
