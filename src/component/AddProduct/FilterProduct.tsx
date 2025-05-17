import React from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import {
    Box,
    Text,
    Button,
    VStack,
    Center,
    Icon,
    Slider,
    Radio,
    Select,
    HStack,
    Checkbox,
    Divider
} from 'native-base';
import {
    AntDesign,
    MaterialIcons
} from "@expo/vector-icons"

const { width, height } = Dimensions.get('screen');

interface Props {
    visible: boolean;
    onClose: () => void;
    filterRentAmount: number;
    handleChangeFilterRent: (e: number) => void;
    occupancyList: string[];
    occupancy: string[];
    onSelectOccupancy: (e: string[]) => void;
    propertyTypes: string[];
    propertytype: string[];
    onSelectPropertyType: (e: string[]) => void
}

const FilterDrawer: React.FC<Props> = ({
    visible,
    onClose,
    filterRentAmount,
    handleChangeFilterRent,
    occupancy,
    occupancyList,
    onSelectOccupancy,
    propertyTypes,
    propertytype,
    onSelectPropertyType
}) => {
    if (!visible) return null;

    return (
        <Pressable style={[StyleSheet.absoluteFill, { borderRadius: 2 }]}>
            <Animated.View
                entering={SlideInRight}
                exiting={SlideOutRight}
                style={styles.drawerContainer}
            >
                <VStack
                    space={2}
                    p={2}
                >
                    <View style={{
                        padding: 8,
                        alignItems: 'flex-end',
                        backgroundColor: "gray"
                    }}>
                        <Pressable onPress={onClose}>
                            <AntDesign name="close" size={30} color="white" />
                        </Pressable>
                    </View>
                    <Center
                        width={"100%"}
                        backgroundColor={'tertiary.900'}
                        borderRadius={10}
                        mt={4}
                    >
                        <VStack
                            width={"100%"}
                            padding={4}
                            space={4}
                        >
                            <Text
                                fontSize={'lg'}
                                pt={4}
                                textAlign={'center'}
                                color={'white'}
                            >
                                Rent/Month
                            </Text>
                            <Text
                                fontSize={"lg"}
                                textAlign={'center'}
                                color={"white"}
                            >
                                {
                                    `Min:1K to Max:${filterRentAmount}K`
                                }
                            </Text>
                            <Slider
                                defaultValue={filterRentAmount}
                                size="sm"
                                colorScheme="green"
                                w="90%"
                                maxW="300"
                                minValue={1}
                                maxValue={10}
                                onChange={(e) => {
                                    handleChangeFilterRent(e)
                                }}
                            >
                                <Slider.Track bg="green.100">
                                    <Slider.FilledTrack bg="green.600" />
                                </Slider.Track>
                                <Slider.Thumb borderWidth="0" bg="transparent">
                                    <Icon as={MaterialIcons} name="park" color="green.600" size="xl" />
                                </Slider.Thumb>
                            </Slider>
                        </VStack>
                    </Center>

                    <Center
                        width={"100%"}
                        backgroundColor={"warning.500"}
                        borderRadius={10}
                    >
                        <VStack
                            space={1}
                        >
                            <Text
                                fontSize={'lg'}
                                pt={4}
                                textAlign={'center'}
                                color={'white'}
                            >
                                Room Occupancy
                            </Text>
                            <Divider />
                            <Checkbox.Group
                                value={occupancy}
                                onChange={onSelectOccupancy}
                            >
                                {
                                    occupancyList.map((item, index) => (
                                        <Checkbox key={index} value={item} color={'white'} colorScheme={"green"}>
                                            <Text fontWeight={'bold'} color={"white"}>{item}</Text>
                                        </Checkbox>
                                    ))
                                }
                            </Checkbox.Group>
                        </VStack>
                    </Center>

                    <Center
                        bg={'text.300'}
                        borderRadius={10}
                    >
                        <VStack
                            space={2}
                        >
                            <Box
                                p={2}
                                w={'full'}
                            >
                                <Text
                                    fontSize={"lg"}
                                    color={"white"}
                                    fontWeight={"bold"}
                                >
                                    Proprty Type
                                </Text>
                            </Box>
                            <Divider bg={"red.100"} colorScheme={"red"} color={"red.100"} />
                            <Checkbox.Group
                               value={propertytype}
                               onChange={onSelectPropertyType}
                            >
                                {
                                    propertyTypes.map((item, index) => (
                                        <Checkbox key={index} value={item} colorScheme={"green"} >
                                            <Text
                                                color={'white'}
                                                fontWeight={"bold"}
                                                fontStyle={"normal"}
                                                // fontSize={"md"}
                                            >
                                                {item.toUpperCase()}
                                            </Text>
                                        </Checkbox>
                                    ))
                                }
                            </Checkbox.Group>
                        </VStack>
                    </Center>
                    <Button>
                        <Text>
                            Apply
                        </Text>
                    </Button>
                </VStack>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    drawerContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: height,
        width: width * 0.8,
        backgroundColor: '#fff',
        zIndex: 2000,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: height },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default FilterDrawer;
