import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    View,
} from "react-native";
import { colors } from "../styles/Theme";
import CardSmall from "./CardSmall";
import {
    Card,
    Tab,
    Button,
    ListItem,
    Divider
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
        <Card>
            <Card.Title style={{ color: colors.color_primary }}>{category.productTitle}</Card.Title>
            <Card.Title>Posted At:{localTime}</Card.Title>
            <Card.Divider />
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
            <Card.FeaturedTitle>
                <Tab
                    value={filterCode}
                    variant="primary"
                    indicatorStyle={{
                        padding: 0,
                        margin: 0,
                    }}
                    onChange={(e) => setFilterCode(e)}
                >
                    <Tab.Item
                        title={"Description"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 2,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"is available?"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 2,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"Property type?"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 2,
                            margin: 0
                        }}
                    />
                    <Tab.Item
                        title={"Rent Info"}
                        dense={true}
                        titleStyle={{
                            fontSize: 8,
                            padding: 0,
                            margin: 0
                        }}
                    />
                </Tab>
            </Card.FeaturedTitle>
            <Card.FeaturedSubtitle>
                {
                    filterCode === 0 && (
                        <View style={styles.content_container}>
                            <Text style={styles.text}>{description}</Text>
                            <Text style={styles.text}>{`Property is located at ${addressData}`}</Text>
                            <Text style={styles.text}>{`This property hold importain aminities of, ${availableData}`}</Text>
                        </View>
                    )
                }
                {
                    filterCode === 1 && (
                        <View style={styles.content_container}>
                            {
                                total == 0 ? (
                                    <Text style={styles.text}>
                                        Property is fully occupied – no availability at the moment.
                                    </Text>
                                ) : (
                                    <Text style={styles.text}>
                                        {total} Properties are available for onboarding – rooms are open for booking.
                                        Click View button for explore the property and booking.
                                    </Text>
                                )
                            }
                        </View>
                    )
                }
                {
                    filterCode === 2 && (
                        <View style={[styles.content_container,{justifyContent:'center'}]}>
                            {
                                propertyOccupancy && Array.isArray(propertyOccupancy) && propertyOccupancy.length &&
                                propertyOccupancy.map((item, index) => (
                                    <ListItem key={index + item}
                                        pad={0}
                                        containerStyle={{
                                            padding: 0,
                                            margin: 0,
                                            width:"100%",
                                        }}
                                    >
                                        <ListItem.Title style={styles.text}>{index+1} .</ListItem.Title>
                                        <ListItem.Title style={styles.text}>{item}</ListItem.Title>
                                    </ListItem>
                                ))
                            }
                        </View>
                    )
                }
                {
                    filterCode === 3 && (
                        <View style={styles.content_container}>
                            {
                                deposite && (
                                    <View style={styles.content_container}>
                                        <Text style={styles.text}>Deposite Amount Rs({deposite}) only</Text>
                                        <Text style={styles.text}>A one-time refundable security deposit collected before moving in.</Text>
                                        <Text style={styles.text}>Upfront amount required to secure the property – refundable upon checkout.</Text>
                                        <Text style={styles.text}>Security deposit paid in advance to cover potential damages or unpaid dues.</Text>
                                        {
                                            rent && (
                                                <>
                                                  <Divider/>
                                                  <Text style={styles.text}>Rent/Month Rs({rent}) only</Text>
                                                  <Text style={styles.text}>Monthly rental charge payable by the tenant.</Text>
                                                  <Text style={styles.text}>Recurring rent amount to be paid each month.</Text>
                                                  <Text style={styles.text}>Fixed monthly cost for staying at the property.</Text>
                                                </>
                                            )
                                        }
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </Card.FeaturedSubtitle>
            <Button
                title={"View"}
                type='outline'
                size='sm'
                onPress={onPress}
                style={{marginTop:4}}
            />
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
