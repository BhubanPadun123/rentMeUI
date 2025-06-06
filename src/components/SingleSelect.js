import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
} from "react-native";
import { colors } from "../styles/Theme";

export default function DropdownSelect({
    placeholder = "Select an option",
    selectedValue,
    onValueChange,
    options = [],
}) {
    const [isVisible, setIsVisible] = useState(false);

    const handleSelect = (value) => {
        onValueChange(value);
        setIsVisible(false);
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setIsVisible(true)}
            >
                <Text style={{ fontSize: 14, color: selectedValue ? "#000" : colors.color_gray }}>
                    {selectedValue
                        ? options.find((opt) => opt.value === selectedValue)?.label
                        : placeholder}
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={isVisible} animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.optionItem}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text style={{ fontSize: 14 }}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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
    },
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        width: "80%",
        maxHeight: "60%",
    },
    optionItem: {
        paddingVertical: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
});
