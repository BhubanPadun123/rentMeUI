import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Platform,
    ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { colors, sizes } from '../styles/Theme';

const Loader = () => {

    return (
        <View style={styles.overlay}>
            <ActivityIndicator
                size="large"
                color={colors.color_primary}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width:sizes.width,
        height:sizes.height,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        ...Platform.select({
            android: {
                elevation: 10,
            },
        }),
    }
});

export default Loader;
