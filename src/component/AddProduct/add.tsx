// RegisterProperty.tsx
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
    Box,
    Button,
    FormControl,
    Input,
    Select,
    CheckIcon,
    Text,
    TextArea,
    VStack,
    Heading,
    Center,
    Image
} from 'native-base';
import * as ImagePicker from "expo-image-picker"
import { uploadImagesType } from '@/src/Redux/actionTypes/dataType';
import Loader_1 from '../Loader/PrimaryLoader';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/src/Redux/Srore';
import {
    uploadPropertyImagesAction
} from "@/src/Redux/actions/cloud.action"
import { RootState } from '@/src/Redux/Reducer';
import { useNavigation } from '@react-navigation/native';

const RegisterProperty = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigation()
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        type: '',
        price: '',
        description: '',
    });
    const [image, setImage] = useState<any>(null);

    React.useEffect(() => {
        const uploadImage = async () => {
            if (image && Array.isArray(image)) {
                const galleryData = new FormData();
                for (let i = 0; i < image.length; i++) {
                    galleryData.append('images', {
                        uri: image[i].uri || image[i],
                        name: `image_${i}.jpg`,
                        type: 'image/jpeg',
                    } as any);
                }

                await dispatch(uploadPropertyImagesAction(galleryData));
            }
        };
        uploadImage();
        return () => {
            setImage(null);
        };
    }, [image]);


    const {
        propertyImages
    } = useSelector((state: RootState) => state.cloud)

    React.useEffect(() => {
        const handleCheckData = () => {
            if (propertyImages.status === "failed") {
                const {
                    error
                } = propertyImages
                if (error?.message) {
                    if (error.message.includes("Invalid token")) {
                        navigate.navigate("Login" as never)
                    }
                }
            }
        }
        handleCheckData()
    }, [propertyImages.data, propertyImages.error, propertyImages.status])

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        console.log('Submitted:', formData);
        // Submit to backend
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
            selectionLimit: 5
        });

        if (!result.canceled) {
            let data: any = []
            if (result.assets && Array.isArray(result.assets)) {
                result.assets.map((item) => {
                    data.push(item.uri)
                })
            }
            setImage(data)
        }
    };

    return (
        <Center>
            <Box safeArea p="4" w="90%" maxW="500" py="8">
                <Heading size="lg" mb="4">
                    Register Your Property
                </Heading>
                <VStack space={4}>
                    <FormControl isRequired>
                        <FormControl.Label>Property Title</FormControl.Label>
                        <Input
                            placeholder="e.g. 2BHK Flat in Mumbai"
                            value={formData.title}
                            onChangeText={(val) => handleInputChange('title', val)}
                            color={"white"}
                            fontSize={20}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Town</FormControl.Label>
                        <Input
                            placeholder='Enter town Name'
                            color={"white"}
                            fontSize={20}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>District</FormControl.Label>
                        <Input
                            placeholder='Enter District Name'
                            color={"white"}
                            fontSize={20}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Pin-Code</FormControl.Label>
                        <Input
                            placeholder='Enter PIN Number'
                            color={"white"}
                            fontSize={20}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label>Address</FormControl.Label>
                        <Input
                            placeholder="Full address of the property"
                            onChangeText={(val) => handleInputChange('address', val)}
                            value={formData.address}
                            h={20}
                            w="100%"
                            color="white"
                            multiline={true}
                            textAlignVertical="top"
                            fontSize={20}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Property Type</FormControl.Label>
                        <Select
                            width={"container"}
                            accessibilityLabel="Choose Type"
                            placeholder="Choose Type"
                            _selectedItem={{ bg: 'teal.600', endIcon: <CheckIcon size="5" /> }}
                            mt={1}
                            onValueChange={(val) => handleInputChange('type', val)}
                            variant='outline'
                            color={"white"}
                            fontSize={20}
                        >
                            <Select.Item label="Apartment" value="apartment" />
                            <Select.Item label="Store" value="store" />
                            <Select.Item label="Independent House" value="house" />
                            <Select.Item label="PG / Room" value="pg" />
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label>Expected Rent (₹)/Month</FormControl.Label>
                        <Input
                            keyboardType="numeric"
                            placeholder="e.g. 12000"
                            onChangeText={(val) => handleInputChange('price', val)}
                            fontSize={20}
                            color={"white"}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label>Taking Deposite Amount?</FormControl.Label>
                        <Select
                            width={"container"}
                            accessibilityLabel="Choose Type"
                            placeholder="Choose Type"
                            _selectedItem={{ bg: 'teal.600', endIcon: <CheckIcon size="5" /> }}
                            mt={1}
                            onValueChange={(val) => handleInputChange('type', val)}
                            variant='outline'
                            color={"white"}
                            fontSize={20}
                        >
                            <Select.Item label="Yes" value="yes" />
                            <Select.Item label="No" value="No" />
                        </Select>
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label>Deposite Amount (₹)</FormControl.Label>
                        <Input
                            keyboardType="numeric"
                            placeholder="e.g. 12000"
                            onChangeText={(val) => handleInputChange('price', val)}
                            fontSize={20}
                            color={"white"}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Description</FormControl.Label>
                        <Input
                            placeholder="Full address of the property"
                            onChangeText={(val) => handleInputChange('address', val)}
                            value={formData.address}
                            h={20}
                            w="100%"
                            color="white"
                            multiline={true}
                            textAlignVertical="top"
                            fontSize={20}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Upload Property Image</FormControl.Label>
                        <Button colorScheme="primary" onPress={pickImage} >Choose Image</Button>
                        {/* Integrate Image Picker here */}
                    </FormControl>

                    <Button mt="6" colorScheme="teal" onPress={handleSubmit}>
                        Submit Property
                    </Button>
                </VStack>
            </Box>
            {
                propertyImages.status === "started" && (
                    <Loader_1 />
                )
            }
        </Center>
    );
};

export default RegisterProperty;
