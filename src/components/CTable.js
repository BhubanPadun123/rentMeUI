import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TableComponent = ({ headerData = [], rowData = [] }) => {
    const columnWidth = 120; // set fixed width for columns

    return (
        <ScrollView horizontal>
            <View>
                {/* Header */}
                <View style={styles.row}>
                    {headerData.map((header, index) => (
                        <View
                            key={index}
                            style={[styles.cell, styles.headerCell, { width: columnWidth }]}
                        >
                            <Text style={styles.headerText}>{header}</Text>
                        </View>
                    ))}
                </View>

                {/* Body Rows */}
                {rowData.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, colIndex) => (
                            <View
                                key={colIndex}
                                style={[styles.cell, { width: columnWidth }]}
                            >
                                <Text style={styles.cellText} numberOfLines={2} ellipsizeMode="tail">
                                    {cell}
                                </Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    cell: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    headerCell: {
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    cellText: {
        fontSize: 13,
    },
});

export default TableComponent;
