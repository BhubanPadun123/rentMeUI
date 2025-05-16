import React from 'react';
import { HStack, Spinner, Text, Box } from 'native-base';
import {Dimensions} from "react-native"

const {height,width} = Dimensions.get('window')

const Loader_1 = () => {
    return (
        <Box 
           flex={1} 
           justifyContent="center" 
           alignItems="center" 
           bg="white"
           position={'absolute'} 
           height={"100%"} 
           width={width}
           zIndex={10}
        >
            <HStack space={4} justifyContent="center" alignItems="center" flexDir={'column'}>
                <Spinner color="primary.500" size="lg" />
                <Text fontSize="lg" color="primary.500">Loading...</Text>
            </HStack>
        </Box>
    );
};

export default Loader_1;
