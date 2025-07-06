import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    View,
} from "react-native";
import { colors, sizes } from "../styles/Theme";
import CardSmall from "./CardSmall";
import {
    Card,
    Tab,
    Button,
    ListItem,
    Divider,
    Chip
} from "@rneui/themed"
import { formatDate } from "../utils/utils";

const windowWidth = Dimensions.get("window").width;

const ProductCart = ({ category, isSelected, onPress }) => {
    const [filterCode, setFilterCode] = React.useState(0)
    const metaData = category.hasOwnProperty('metaData') ? JSON.parse(category.metaData) : null
    const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : null
    const addressInfo = metaData && metaData.hasOwnProperty('addressInfo') ? metaData.addressInfo : null
    const availableItems = metaData && metaData.hasOwnProperty('availableItems') ? metaData.availableItems : null
    const deposite = metaData && metaData.hasOwnProperty('deposite') ? metaData.deposite : null
    const description = metaData && metaData.hasOwnProperty('description') ? metaData.description : null
    const rent = metaData && metaData.hasOwnProperty('rent') ? metaData.rent : null
    const total = metaData && metaData.hasOwnProperty('total') ? metaData.total : null
    const propertyOccupancy = category && category.hasOwnProperty('propertyOccupancy') ? category.propertyOccupancy : null
    const postAt = category && category.hasOwnProperty('postAt') ? category.postAt : null
    const localTime = postAt ? formatDate(postAt) : null

    let addressData = ""
    if (Object.entries(addressInfo).length > 0) {
        Object.entries(addressInfo).map((item) => {
            addressData = item[1] && addressData + ` ${item[1]} ,`
        })
    }
    let availableData = ""
    if (availableItems && Array.isArray(availableItems)) {
        availableItems.map((item) => {
            availableData = availableData + `${item} ,`
        })
    }

    return (
        <Card containerStyle={{
            padding: 0,
            width: sizes.width / 2,
            minHeight: 150
        }}>
            <View style={{
                position: "relative",
                alignItems: "center",
                maxHeight: 150
            }}>
                <Image
                    source={{ uri: images && images[0] && images[0] }}
                    style={styles.category_image}
                    resizeMode='stretch'
                />
            </View>
            <Card.Divider />
            <Card.Title style={{ color: colors.color_primary, padding: 0 }}>{category.productTitle}</Card.Title>
            <View style={{
                // height: 35,
                backgroundColor: '#aba196',
                width: "100%",
                flexDirection:'column',
                padding:4,
                justifyContent:'space-between'
            }}>
                {
                    rent && (
                        <Text style={styles.text}>
                            {
                                `Rent/Month : ${rent} only`
                            }
                        </Text>
                    )
                }
                {
                    deposite && (
                        <Text style={styles.text}>{`Deposite Amount: ${deposite} only`}</Text>
                    )
                }
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.color_primary,
        fontSize: 10,
        textAlign: 'left',
        paddingVertical: 4
    },
    category_image: {
        height: '100%',
        width: "100%"
    },
    content_container: {
        flex: 1,
        gap: 2,
        paddingBottom: 4
    }
});

export default ProductCart;
