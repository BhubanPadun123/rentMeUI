import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopoverModal = ({ visible, onClose, children, title }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                <View style={styles.modalContainer}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        minWidth: 250,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#000',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
});

export default PopoverModal;
