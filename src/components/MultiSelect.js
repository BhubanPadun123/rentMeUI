import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
} from "react-native";
import { colors } from "../styles/Theme"; // Adjust according to your structure

export default function MultiSelectDropdown({
    placeholder = "Select options",
    selectedValues = [],
    onValueChange,
    options = [],
}) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSelect = (value) => {
        let updatedValues;
        if (selectedValues.includes(value)) {
            updatedValues = selectedValues.filter((v) => v !== value);
        } else {
            updatedValues = [...selectedValues, value];
        }
        onValueChange(updatedValues);
    };

    const getLabel = (value) => {
        return options.find((opt) => opt.value === value)?.label;
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={() => setIsVisible(true)}
            >
                <Text style={{ fontSize: 14, color: selectedValues.length > 0 ? "#000" : colors.color_gray }}>
                    {selectedValues.length > 0
                        ? selectedValues.map(getLabel).join(", ")
                        : placeholder}
                </Text>
            </TouchableOpacity>

            <Modal transparent visible={isVisible} animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => {
                                const isSelected = selectedValues.includes(item.value);
                                return (
                                    <TouchableOpacity
                                        style={styles.optionItem}
                                        onPress={() => toggleSelect(item.value)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: isSelected ? colors.color_primary : "#000",
                                                fontWeight: isSelected ? "bold" : "normal",
                                            }}
                                        >
                                            {item.label}
                                            {isSelected ? " ✓" : ""}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
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
