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
    Image,
    Checkbox,
    HStack,
    useToast
} from 'native-base';
import * as ImagePicker from "expo-image-picker"
import {
    uploadImagesType,
    productType,
    user
} from '@/src/Redux/actionTypes/dataType';
import Loader_1 from '../Loader/PrimaryLoader';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from '@/src/Redux/Srore';
import {
    uploadPropertyImagesAction
} from "@/src/Redux/actions/cloud.action"
import {
    productUploadAction,
    clearAddProduct
} from '@/src/Redux/actions/product.action';
import { RootState } from '@/src/Redux/Reducer';
import { useNavigation,useRoute } from '@react-navigation/native';
import * as constant from "@/utils/constant"
import * as Location from "expo-location"
import { useAppContext } from '../AppContex';
import {
    FontAwesome6
} from "@expo/vector-icons"
import { getLocalData } from '@/utils/localStorage';

type availableAminities = {
    name: string;
    count: string
}
type propertyImages = {
    url: string
}
type propertyOccupancy = {
    occupancy: string
}
type peropertyForm = {
    productTitle: string;
    productType: string;
    postAt: string;
    availableStatus: boolean;
    metaData: {
        description: string;
        availableAminities: availableAminities[];
        rentInfo: {
            depositeAmount: string;
            rent_per_month: string;
        };
        vendorContactInfo: {
            name: string;
            email: string;
            contactNumber: string;
        };
        addressInfo: {
            pinCode: string;
            district: string;
            state: string;
            town: string;
            localAdd: string;
        };
        geoLocation: any;
        propertyImages: propertyImages[]
    };
    propertyOccupancy: propertyOccupancy[]
}

type stateData = {
    pType: string[];
    takeDeposite: boolean;
    occupancy: string[],
    aminitiesList: string[]
}
const RegisterProperty = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigation()
    const toast = useToast()
    const routeName = useRoute().name
    const {updateRouteName} = useAppContext()
    updateRouteName(routeName)
    const [formData, setFormData] = useState<peropertyForm>({
        productTitle: "",
        productType: "",
        postAt: `${new Date()}`,
        availableStatus: true,
        metaData: {
            description: "",
            availableAminities: [],
            rentInfo: {
                depositeAmount: "",
                rent_per_month: ""
            },
            vendorContactInfo: {
                name: "",
                email: "",
                contactNumber: ""
            },
            addressInfo: {
                pinCode: "",
                district: "",
                state: "",
                town: "",
                localAdd: ""
            },
            geoLocation: null,
            propertyImages: [
                { url: "https://res.cloudinary.com/dli3rzw0s/image/upload/v1735446728/trailer_j4teed.png" },
                { url: "https://res.cloudinary.com/dli3rzw0s/image/upload/v1735446728/trailer_j4teed.png" },
                { url: "https://res.cloudinary.com/dli3rzw0s/image/upload/v1735446728/trailer_j4teed.png" },
                { url: "https://res.cloudinary.com/dli3rzw0s/image/upload/v1735446728/trailer_j4teed.png" },
                { url: "https://res.cloudinary.com/dli3rzw0s/image/upload/v1735446728/trailer_j4teed.png" },

            ]
        },
        propertyOccupancy: []
    });
    const [state, setState] = React.useState<stateData>({
        pType: [],
        takeDeposite: false,
        occupancy: [],
        aminitiesList: []
    })
    const [image, setImage] = useState<any>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loadLocation, setLoadLocation] = useState<boolean>(false)
    React.useEffect(() => {
        const uploadImage = async () => {
            if (image) {
                const formData = new FormData();
                formData.append('image', {
                    uri: image.uri,
                    name: image.fileName || 'photo.jpg',
                    type: image.type || 'image/jpeg',
                } as any);
                await dispatch(uploadPropertyImagesAction(formData));
            }
        };

        uploadImage();
        return () => {
            setImage(null);
        };
    }, [image]);

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        setLoadLocation(true)
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLoadLocation(false)
        setLocation(location);
        setFormData((prevForm) => ({
            ...prevForm,
            metaData: {
                ...prevForm.metaData,
                geoLocation: location
            }
        }))
    }


    const {
        propertyImages
    } = useSelector((state: RootState) => state.cloud)
    const {
        addProduct
    } = useSelector((state: RootState) => state.product)

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
            if (addProduct.status === "failed") {
                toast.show({
                    description: addProduct.error?.message
                })
                dispatch(clearAddProduct())
                if (addProduct.error?.message) {
                    if (addProduct.error.message.includes("Invalid token")) {
                        navigate.navigate("Login" as never)
                    }
                }
                if (addProduct.error && typeof (addProduct.error) === "string") {
                    toast.show({
                        description: addProduct.error,
                    })
                }
            }
            if(addProduct.status === "success"){
                toast.show({
                    description:"Product Added successfully!!"
                })
            }
        }
        handleCheckData()
    }, [
        propertyImages.data,
        propertyImages.error,
        propertyImages.status,
        addProduct.data,
        addProduct.error,
        addProduct.status
    ])

    const handleSubmit = async () => {
        let user = await getLocalData("currentUser")
        if (user) {
            const userData = JSON.parse(user)
            const data: productType = {
                vendorRef: userData._id,
                productTitle: formData.productTitle,
                productType: formData.productType,
                postAt: formData.postAt,
                availableStatus: true,
                metaData: {
                    description: JSON.parse(JSON.stringify(formData.metaData.description)),
                    availableAminities: JSON.parse(JSON.stringify(formData.metaData.availableAminities)),
                    rentInfo: JSON.parse(JSON.stringify(formData.metaData.rentInfo)),
                    vendorContactInfo: {
                        name: userData.userName,
                        email: userData.userEmail,
                        contactNumber: userData.userContactNumber
                    },
                    addressInfo: JSON.parse(JSON.stringify(formData.metaData.addressInfo)),
                    geoLocation: JSON.parse(JSON.stringify(formData.metaData.geoLocation)),
                    propertyImages: JSON.parse(JSON.stringify(formData.metaData.propertyImages))
                },
                propertyOccupancy: JSON.parse(JSON.stringify(formData.propertyOccupancy))
            }
            dispatch(productUploadAction(data))
        } else {
            navigate.navigate("Loagin" as never)
        }
        // const data:productType={
        //     vendorRef:
        // }
        // dispatch(productUploadAction(formData))
    };

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1
        });

        if (!result.canceled) {
            let data: any = []
            if (result.assets && Array.isArray(result.assets)) {
                result.assets.map((item, index) => {
                    data.push(item.uri)
                });
            }
            setImage(data)
        }
    };

    const aminitiesCount=(val:string):string=>{
        let count:string = ""
        const {
            availableAminities
        } = formData.metaData
        availableAminities.map((item)=>{
            if(item.name===val){
                count = item.count
                return
            }
        })
        return count 
    }

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
                            value={formData.productTitle}
                            onChangeText={(val) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    productTitle: val
                                }))
                            }}
                            color={"white"}
                            fontSize={20}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Property Type</FormControl.Label>
                        <Checkbox.Group
                            flexDir={'row'}
                            justifyContent={'space-around'}
                            value={state.pType}
                            onChange={(e) => {
                                let val = e[0]
                                if (state.pType.includes(val)) {
                                    setState((prevState) => ({
                                        ...prevState,
                                        pType: []
                                    }))
                                    setFormData((prevForm) => ({
                                        ...prevForm,
                                        productType: ""
                                    }))
                                } else {
                                    setState((prevState) => ({
                                        ...prevState,
                                        pType: [val]
                                    }))
                                    setFormData((prevForm) => ({
                                        ...prevForm,
                                        productType: val
                                    }))
                                }
                            }}

                        >
                            {
                                constant.propertyTpes.map((item, index) => (
                                    <Checkbox key={index} value={item} colorScheme={"green"} >
                                        <Text
                                            color={"white"}
                                            fontWeight={'bold'}
                                            fontSize={"md"}
                                        >
                                            {
                                                item.toUpperCase()
                                            }
                                        </Text>
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            Description about the property*
                        </FormControl.Label>
                        <Input
                            placeholder='Enter description about property*'
                            multiline
                            color={"white"}
                            fontSize={20}
                            value={formData.metaData.description}
                            onChangeText={(e) => {
                                setFormData((prevForm) => ({
                                    ...prevForm,
                                    metaData: {
                                        ...prevForm.metaData,
                                        description: e
                                    }
                                }))
                            }}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            Available Aminities in your Property.
                        </FormControl.Label>
                        <Checkbox.Group
                            justifyContent={'center'}
                            style={{
                                gap: 4
                            }}
                            value={state.aminitiesList}
                            onChange={(e) => {
                                let len: number = Array.isArray(e) && e.length || 0
                                let val = e[len]
                                if (state.aminitiesList.includes(val)) {
                                    let listAfterRemove = state.aminitiesList.filter(i => i !== val)
                                    setState((prevState) => ({
                                        ...prevState,
                                        aminitiesList: listAfterRemove
                                    }))
                                    let { availableAminities } = formData.metaData
                                    let filterData = availableAminities.filter(i => i.name !== val).filter(i => i.name !== undefined)
                                    setFormData((prevForm) => ({
                                        ...prevForm,
                                        metaData: {
                                            ...prevForm.metaData,
                                            availableAminities: filterData
                                        }
                                    }))
                                } else {
                                    setState((prevState) => ({
                                        ...prevState,
                                        aminitiesList: e
                                    }))
                                    let newData: availableAminities[] = []
                                    let checkCount=(name:string):string=>{
                                        let count:string = "0"
                                        if(formData.metaData.availableAminities.length){
                                            formData.metaData.availableAminities.map((d)=>{
                                                if(d.name === name){
                                                    count = d.count
                                                }
                                            })
                                        }
                                        return count
                                    }
                                    if (Array.isArray(e) && e.length > 0) {
                                        e.map((i) => {
                                            let newItem: availableAminities = {
                                                name: i,
                                                count: checkCount(i)
                                            }
                                            newData.push(newItem)
                                        })
                                    }
                                    setFormData((prevForm) => ({
                                        ...prevForm,
                                        metaData: {
                                            ...prevForm.metaData,
                                            availableAminities: newData
                                        }
                                    }))
                                }
                            }}
                        >
                            {
                                constant.aminities.map((item, index) => (
                                    <Checkbox key={index} value={item} colorScheme={"green"} >
                                        <HStack
                                            space={4}
                                        >
                                            <Text
                                                color={"white"}
                                                fontWeight={'bold'}
                                                fontSize={"md"}
                                            >
                                                {
                                                    item.toUpperCase()
                                                }
                                            </Text>
                                            {
                                                state.aminitiesList.includes(item) && (
                                                    <Input
                                                        placeholder='Enter Quantity'
                                                        value={aminitiesCount(item)}
                                                        color={"white"}
                                                        textAlign={"center"}
                                                        onChangeText={(e)=>{
                                                            const reg = /^\d+$/
                                                            const isNumber = reg.test(e)
                                                            if(isNumber){
                                                                let updateItem:availableAminities={
                                                                    name:item,
                                                                    count:e
                                                                }
                                                                let updatedList:availableAminities[] = []
                                                                formData.metaData.availableAminities.map((i)=>{
                                                                    if(i.name === item){
                                                                        updatedList.push(updateItem)
                                                                    }else{
                                                                        updatedList.push(i)
                                                                    }
                                                                })
                                                                setFormData((prevForm)=>({
                                                                    ...prevForm,
                                                                    metaData:{
                                                                        ...prevForm.metaData,
                                                                        availableAminities:updatedList
                                                                    }
                                                                }))
                                                            }
                                                        }}
                                                    />
                                                )
                                            }
                                        </HStack>
                                    </Checkbox>
                                ))
                            }
                        </Checkbox.Group>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            Property Rent Details
                        </FormControl.Label>
                        <HStack
                            space={2}
                        >
                            <Text
                                color={"white"}
                            >
                                Are you take security deposite?
                            </Text>
                            <Checkbox value='Yes' onChange={(e) => {
                                setState((prevState) => ({
                                    ...prevState,
                                    takeDeposite: e
                                }))
                            }} />
                        </HStack>
                        {
                            state.takeDeposite && (
                                <VStack
                                    mt={2}
                                    space={4}
                                >
                                    <Text
                                        color={"white"}
                                    >
                                        Security Deposite Amount.
                                    </Text>
                                    <Input
                                        placeholder='Enter Deposite Amount'
                                        value={formData.metaData.rentInfo.depositeAmount}
                                        onChangeText={(e) => {
                                            setFormData((prevForm) => ({
                                                ...prevForm,
                                                metaData: {
                                                    ...prevForm.metaData,
                                                    rentInfo: {
                                                        ...prevForm.metaData.rentInfo,
                                                        depositeAmount: e
                                                    }
                                                }
                                            }))
                                        }}
                                        fontSize={20}
                                        color={"white"}
                                    />
                                </VStack>
                            )
                        }
                        <VStack
                            mt={2}
                            space={4}
                        >
                            <Text
                                color={"white"}
                            >
                                Rent Amount/Month.
                            </Text>
                            <Input
                                placeholder='Enter Monthly Rent Amount'
                                value={formData.metaData.rentInfo.rent_per_month}
                                onChangeText={(e) => {
                                    setFormData((prevForm) => ({
                                        ...prevForm,
                                        metaData: {
                                            ...prevForm.metaData,
                                            rentInfo: {
                                                ...prevForm.metaData.rentInfo,
                                                rent_per_month: e
                                            }
                                        }
                                    }))
                                }}
                                fontSize={20}
                                color={"white"}
                            />
                        </VStack>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            Property owner info
                        </FormControl.Label>
                        <VStack
                            space={4}
                        >
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    Owner Full Name *
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Owner Full Name'
                                    value={formData.metaData.vendorContactInfo.name}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                vendorContactInfo: {
                                                    ...prevForm.metaData.vendorContactInfo,
                                                    name: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    Owner Email *
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Owner Email'
                                    value={formData.metaData.vendorContactInfo.email}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                vendorContactInfo: {
                                                    ...prevForm.metaData.vendorContactInfo,
                                                    email: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    Owner Contact Number *
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Owner Contact Number'
                                    value={formData.metaData.vendorContactInfo.contactNumber}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                vendorContactInfo: {
                                                    ...prevForm.metaData.vendorContactInfo,
                                                    contactNumber: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                        </VStack>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>
                            Property Address info
                        </FormControl.Label>
                        <VStack
                            space={4}
                        >
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    PinCode*
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Area PinCode'
                                    value={formData.metaData.addressInfo.pinCode}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                addressInfo: {
                                                    ...prevForm.metaData.addressInfo,
                                                    pinCode: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    District*
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Distrct Name'
                                    value={formData.metaData.addressInfo.district}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                addressInfo: {
                                                    ...prevForm.metaData.addressInfo,
                                                    district: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    State*
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter State Name'
                                    value={formData.metaData.addressInfo.state}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                addressInfo: {
                                                    ...prevForm.metaData.addressInfo,
                                                    state: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    Town*
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Town Name'
                                    value={formData.metaData.addressInfo.town}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                addressInfo: {
                                                    ...prevForm.metaData.addressInfo,
                                                    town: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text
                                    color={"white"}
                                >
                                    Local Address details*
                                </Text>
                                <Input
                                    color={"white"}
                                    fontSize={20}
                                    placeholder='Enter Local Address'
                                    multiline
                                    value={formData.metaData.addressInfo.localAdd}
                                    onChangeText={(e) => {
                                        setFormData((prevForm) => ({
                                            ...prevForm,
                                            metaData: {
                                                ...prevForm.metaData,
                                                addressInfo: {
                                                    ...prevForm.metaData.addressInfo,
                                                    localAdd: e
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Box>
                        </VStack>
                    </FormControl>
                    {
                        state.pType.length > 0 && state.pType[0] === "residental" && (
                            <FormControl isRequired>
                                <FormControl.Label>
                                    Occupancy Type
                                </FormControl.Label>
                                <Center>
                                    <Checkbox.Group
                                        value={state.occupancy}
                                        onChange={(e) => {
                                            setState((prevState) => ({
                                                ...prevState,
                                                occupancy: e
                                            }))
                                            setFormData((prevForm) => ({
                                                ...prevForm,
                                                propertyOccupancy: e
                                            }))
                                        }}
                                    >
                                        {
                                            constant.roomOccupancy.map((item, index) => (
                                                <Checkbox key={index} value={item} colorScheme={"green"} >
                                                    <Text
                                                        color={"white"}
                                                        fontWeight={'bold'}
                                                        fontSize={"md"}
                                                    >
                                                        {
                                                            item.toUpperCase()
                                                        }
                                                    </Text>
                                                </Checkbox>
                                            ))
                                        }
                                    </Checkbox.Group>
                                </Center>
                            </FormControl>
                        )
                    }
                    <FormControl isRequired >
                        <FormControl.Label>
                            Property GeoLocation
                        </FormControl.Label>
                        <VStack
                            space={2}
                        >
                            <Button
                                isLoading={loadLocation}
                                endIcon={<FontAwesome6 name="magnifying-glass-location" size={24} color="white" />}
                                onPress={getCurrentLocation}
                            >
                                Get Current Geo-Location
                            </Button>
                            {
                                (location || errorMsg) && (
                                    <Input
                                        multiline
                                        value={location ? JSON.stringify(location) : errorMsg}
                                        color={"white"}
                                        fontSize={20}
                                    />
                                )
                            }
                        </VStack>
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
                (
                    propertyImages.status === "started" ||
                    addProduct.status === "started"
                ) && (
                    <Loader_1 />
                )
            }
        </Center>
    );
};

export default RegisterProperty;
