import {
    Box,
    Card,
    Heading,
    HStack,
    Image,
    Link,
    Text,
    View,
} from "native-base"
import {
    AntDesign,
    MaterialCommunityIcons
} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { productType } from "@/src/Redux/actionTypes/dataType"
import { formatDateTime } from "@/utils/helper"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from "../AppContex"



type RootStackParamList = {
    Products: productType,
}
type ProductsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;
type PropTypes={
    callingType:"home" | "vendor" | "confirm" | "customer",
    product:productType
}

export default function ProductCartHome(props: PropTypes) {
    const navigation = useNavigation<ProductsNavigationProp>()
    const {
        productTitle,
        productType,
        postAt,
        propertyOccupancy,
        metaData
    } = props.product
    const {
        updateUserCallingType
    } = useAppContext()


    const handleClickCart = () => {
        updateUserCallingType(props.callingType)
        navigation.navigate("Products",{...props.product});
    }
    const {
        date,
        time
    } = formatDateTime(postAt)
    return (
        <Card
            alignItems="center"
            backgroundColor="white"
            padding={1}
            width="48%"        // 👈 make it almost half the screen
            marginBottom={10}  // 👈 add bottom space between rows
            height={'container'}
            // onPointerEnter={()=>{
            //     handleClickCart()
            // }}
            onPointerDown={() => {
                handleClickCart()
            }}
        >
            <Image
                source={{
                    uri: 'https://gluestack.github.io/public-blog-video-assets/yoga.png',
                }}
                alt="image"
                style={{
                    minHeight: 100,
                    width: '100%',  // 👈 make image fill card width
                    resizeMode: 'cover',
                }}
            />
            <Text className="text-sm font-normal mb-2 text-typography-700">
                {
                    `${date} - ${time}`
                }
            </Text>
            <Heading size="md" className="mb-4">
                {productTitle}
            </Heading>
            <Link href="https://gluestack.io/" isExternal>
                {/* Link content here */}
            </Link>
            <Text>{metaData.description}</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 4,
                padding: 0,
                backgroundColor: "gray",
                width: "100%"
            }}>
                <View p={0}>
                    <AntDesign name="like2" size={24} color="green" />
                    <Text>01</Text>
                </View>
                <View p={0}>
                    <AntDesign name="dislike2" size={24} color="red" />
                    <Text>01</Text>
                </View>
                <View p={0}>
                    <MaterialCommunityIcons name="robot-love" size={24} color="yellow" />
                    <Text>01</Text>
                </View>
                <View p={0}>
                    <AntDesign name="sharealt" size={24} color="white" />
                    <Text>01</Text>
                </View>
            </View>
        </Card>
    );
}