import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ItemList = ({ data, renderItem, ListEmptyComponent }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <View key={index}>
                        {renderItem({ item, index })}
                    </View>
                ))
            ) : (
                ListEmptyComponent || <Text style={styles.emptyText}>No items available</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});

export default ItemList;
