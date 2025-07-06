import React, { useRef, useState } from 'react';
import {
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    Text
} from 'react-native';
import Loader from './Loader';
const { width, height } = Dimensions.get('window');

export default function ImageSlider({ images }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading,setLoading] = useState(false)

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const renderSlider = (fullScreen = false) => (
        <View style={fullScreen ? styles.fullscreenWrapper : styles.container}>
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.9} onPress={() => setIsFullScreen(true)}>
                        <Image
                            source={{ uri: item }}
                            style={fullScreen ? styles.fullscreenImage : styles.image}
                            onLoad={(e)=> {
                                setLoading(true)
                            }}
                            onLoadStart={()=>{
                                setLoading(true)
                            }}
                            onLoadEnd={()=>{
                                setLoading(false)
                            }}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === activeIndex ? styles.activeDot : {},
                        ]}
                    />
                ))}
            </View>
            {
                isLoading && (
                    <Loader/>
                )
            }
        </View>
    );

    return (
        <>
            {renderSlider(false)}

            <Modal visible={isFullScreen} transparent={true}>
                <View style={styles.modalOverlay}>
                    {renderSlider(true)}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsFullScreen(false)}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 0,
    },
    image: {
        width: width,
        height: 250,
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'pink',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'white',
        width: 10,
        height: 10,
    },
    fullscreenWrapper: {
        backgroundColor: '#000',
    },
    fullscreenImage: {
        width: width,
        height: height,
        resizeMode: 'contain',
        backgroundColor: '#000',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#000',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    closeText: {
        color: '#fff',
        fontSize: 28,
    },
});
