// components/ImageButton.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const ImageButton = ({ title, imageSource, onPress, style = {},renderChild }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View style={styles.content}>
                {renderChild && renderChild}
                <Image source={imageSource} style={styles.image} resizeMode="contain" />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ImageButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
        width:"45%"
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        textAlign:'center'
    },
});
