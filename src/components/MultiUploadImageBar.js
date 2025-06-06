import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { colors } from "../styles/Theme";
import Icons from "../utils/Icons";
import { showTopMessage } from "../utils/ErrorHandler";
import {uploadImagesToCloudinary} from "../APIs/uploadImage"

export default function ImagePickerBar({ value = [], onType, placeholder }) {
    const [loading, setLoading] = React.useState(false);
    const [images,setImages] = React.useState([])

    const pickImages = async () => {
        setLoading(true);
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Media library access is required.");
                setLoading(false);
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                selectionLimit: 5
            });
            if (result.assets) {
                const selectedUris = result.assets.map((asset) => asset.uri)
                const uploadPromises = selectedUris.map(uri => uploadImagesToCloudinary(uri));
                const uploadedUrls = await Promise.all(uploadPromises);

                onType(JSON.stringify(uploadedUrls))
                setImages(uploadedUrls)
                showTopMessage("uploaded all selected images","success")
            }
        } catch (error) {
            showTopMessage("Image select failed","danger")
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={pickImages} disabled={loading}>
                <View style={styles.container}>
                    <TextInput
                        style={{ fontSize: 14 }}
                        placeholder={placeholder}
                        placeholderTextColor={colors.color_gray}
                        value={value.length + " image(s) selected"}
                        editable={false}
                    />
                    {loading ? (
                        <Image source={Icons.info} style={{height:20,width:20}} />
                    ) : (
                        <Image source={Icons.camera} style={{height:20,width:20}} />
                    )}
                </View>
            </TouchableOpacity>

            {/* Preview of selected images */}
            {images.length > 0 && (
                <ScrollView horizontal style={styles.previewContainer}>
                    {images.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={styles.imageThumb} />
                    ))}
                </ScrollView>
            )}
        </View>
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
    previewContainer: {
        flexDirection: "row",
        marginTop: 8,
    },
    imageThumb: {
        width: 60,
        height: 60,
        marginRight: 8,
        borderRadius: 10,
    },
});
