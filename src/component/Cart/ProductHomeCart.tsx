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


export default function ProductCartHome() {
    const navigation = useNavigation()
    const handleClickCart=()=>{
        navigation.navigate("Products" as never);
    }
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
            onPointerDown={()=>{
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
                May 15, 2023
            </Text>
            <Heading size="md" className="mb-4">
                The Power of Positive Thinking
            </Heading>
            <Link href="https://gluestack.io/" isExternal>
                {/* Link content here */}
            </Link>
            <Text>Some short blog description...</Text>
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