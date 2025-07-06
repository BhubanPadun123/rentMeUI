import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageSlider from "../components/ImagesViewer";
import {
    getVendorStockAction,
    updateVendorProductAction,
    deleteVendorProduct
} from "../Redux/action/product";
import Loader from "../components/Loader";
import { colors } from "../styles/Theme";
import Icons from "../utils/Icons";
import tabsImages from "../utils/TabsImages";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons
} from "@expo/vector-icons"
import DropdownSelect from "../components/SingleSelect";
import { showTopMessage } from "../utils/ErrorHandler";
import {
    Tab,
    Button,
    Card,
    Dialog
} from "@rneui/themed"
import { ListItem } from "@rneui/base";

export default function UpdateVendorStock() {
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState(null)
    const [product, setPropduct] = useState([])
    const [openPopover, setPopover] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [filterCode, setFilterCode] = useState(0)
    const [expandId, setExpandId] = useState(null)
    const [openDialog, setOpenDialog] = useState(false)
    const [productData, setProductData] = useState({
        propertyOccupancy: [],
        productTitle: "",
        productType: "",
        availableStatus: "",
        metaData: {

        }
    })

    const {
        vendorStackError,
        vendorStackResponse,
        vendorStackStatus,

        deleteVendorProductError,
        deleteVendorProductResponse,
        deleteVendorProductStatus,

        updateVendorProductError,
        updateVendorProductResponse,
        updateVendorProductStatus
    } = useSelector((state) => state.product)

    useEffect(() => {
        fetchUserData()
    }, [updateVendorProductStatus, deleteVendorProductStatus])
    useEffect(() => {
        if (vendorStackStatus === "success") {
            setPropduct(vendorStackResponse)
        }
    }, [
        vendorStackStatus
    ])
    useEffect(() => {
        if (deleteVendorProductStatus === "success") {
            showTopMessage("Property deleted successfully", "success")
        }
    }, [deleteVendorProductStatus])
    useEffect(() => {
        if (updateVendorProductStatus === "success") {
            setPopover(false)
            setTimeout(() => {
                showTopMessage("Property updated successfully", "success")
            }, 5000)
        }
    }, [updateVendorProductStatus])

    async function fetchUserData() {
        const user = await AsyncStorage.getItem("currentUser")
        if (user) {
            const userData = JSON.parse(user)
            setUserInfo(userData)
            if (userData && userData.hasOwnProperty('_id')) {
                dispatch(getVendorStockAction(userData._id))
            }
        }
    }

    function hanldeDeleteProduct(id) {
        if (!id) return
        dispatch(deleteVendorProduct(id))
    }
    function handleUpdateProperty() {
        // console.log(productData,"<<<"),
        // console.log(selectedProduct,"<<<")
        if (!selectedProduct || !productData) return
        const data = {
            productId: selectedProduct._id,
            data: {
                availableStatus: productData.availableStatus,
                postAt: selectedProduct.postAt,
                productTitle: productData.productTitle,
                productType: selectedProduct.productType,
                propertyOccupancy: selectedProduct.propertyOccupancy,
                vendorRef: selectedProduct.vendorRef,
                metaData: JSON.stringify(productData.metaData)
            }
        }
        dispatch(updateVendorProductAction(data))
    }

    function handleUpdate(item) {
        setSelectedProduct(item)
        setPopover(true)
        const {
            propertyOccupancy,
            productType,
            productTitle,
            availableStatus,
            metaData
        } = item

        setProductData({
            productTitle: productTitle,
            productType: productType,
            propertyOccupancy: propertyOccupancy,
            availableStatus: availableStatus,
            metaData: JSON.parse(metaData)
        })
    }

    function RenderProduct({ item }) {
        const metaData = item && item.hasOwnProperty('metaData') ? JSON.parse(item.metaData) : null
        const images = metaData && metaData.hasOwnProperty('images') ? JSON.parse(metaData.images) : []
        const total = metaData && metaData.hasOwnProperty('total') ? metaData.total : null
        if (filterCode === 1) {
            if (total != 0) return null
        }
        if (filterCode === 2) {
            if (total == 0) return null
        }
        return (
            <Card containerStyle={{
                padding: 0
            }}>
                <ImageSlider
                    images={images}
                />
                <Card.Title style={{ color: colors.color_primary, textAlign: 'center' }}>{item && item.productTitle}</Card.Title>
                <Card.FeaturedSubtitle style={{ color: colors.color_secondary, textAlign: 'center' }}>{`Posted At: ${item.postAt}`}</Card.FeaturedSubtitle>
                <Card.Divider />
                <ListItem.Accordion
                    content={
                        <ListItem.Content>
                            <ListItem.Title>See Stock Details</ListItem.Title>
                            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                        </ListItem.Content>
                    }
                    isExpanded={expandId === item._id}
                    onPress={() => {
                        setExpandId(expandId ? null : item._id)
                    }}
                >
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title>Total Available Property : {total}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem style={{ width: "100%",justifyContent:'center' }}>
                        <Button
                            title={"Update"}
                            onPress={() => handleUpdate(item)}
                            icon={<MaterialCommunityIcons name="update" size={24} color="red" />}
                            style={{ width: "100%" }}
                            size='lg'
                            type='outline'
                        />
                        <Button
                            title={"Delete"}
                            icon={<MaterialIcons name="delete" size={24} color="red" />}
                            onPress={() => hanldeDeleteProduct(item._id)}
                            style={{ width: "100%" }}
                            size='lg'
                            type='outline'
                        />
                    </ListItem>
                </ListItem.Accordion>
            </Card>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: 4
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>
                    Select Product for Edit
                </Text>
                <Button
                    icon={<SimpleLineIcons name="menu" size={24} color="black" />}
                    size='md'
                    type='outline'
                    onPress={() => setOpenDialog(!openDialog)}
                />
                <Dialog
                    isVisible={openDialog}
                    onBackdropPress={() => setOpenDialog(false)}
                >
                    <ListItem onPress={() => {
                        setFilterCode(0)
                        setOpenDialog(false)
                    }}>
                        <ListItem.CheckBox checked={filterCode === 0} />
                        <ListItem.Title>All Product</ListItem.Title>
                    </ListItem>
                    <ListItem onPress={() => {
                        setFilterCode(1)
                        setOpenDialog(false)
                    }}>
                        <ListItem.CheckBox checked={filterCode === 1} />
                        <ListItem.Title>Empty Product</ListItem.Title>
                    </ListItem>
                    <ListItem onPress={() => {
                        setFilterCode(2)
                        setOpenDialog(false)
                    }}>
                        <ListItem.CheckBox checked={filterCode === 2} />
                        <ListItem.Title>Available Product</ListItem.Title>
                    </ListItem>
                </Dialog>
            </View>
            {/* <Tab
                variant="primary"
                indicatorStyle={{
                    padding: 0,
                    margin: 0,
                }}
                value={filterCode}
                onChange={(e) => setFilterCode(e)}
            >
                <Tab.Item
                    dense={true}
                    titleStyle={{
                        fontSize: 8,
                        padding: 0,
                        margin: 0,
                    }}
                    title={"All Property"}
                />
                <Tab.Item
                    dense={true}
                    titleStyle={{
                        fontSize: 8,
                        padding: 0,
                        margin: 0,
                    }}
                    title={"Empty Stock"}
                />
                <Tab.Item
                    dense={true}
                    titleStyle={{
                        fontSize: 8,
                        padding: 0,
                        margin: 0,
                    }}
                    title={"Available Stock"}
                />
            </Tab> */}
            {
                product && product.length > 0 ? (
                    <FlatList
                        data={product}
                        keyExtractor={(item) => item._id}
                        renderItem={RenderProduct}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={{
                            fontSize: 20,
                            color: colors.color_secondary,
                            fontWeight: 'bold'
                        }}>
                            Stock Empty!
                        </Text>
                    </View>
                )
            }
            <Modal
                visible={openPopover}
            >
                <ScrollView>
                    <View style={{
                        padding: 4,
                        backgroundColor: colors.color_gray,
                        borderRadius: 10,
                        marginHorizontal: 10,
                        alignItems: 'flex-end',
                        marginTop: 10
                    }}>
                        <TouchableOpacity onPress={() => setPopover(!openPopover)}>
                            <AntDesign name="closecircle" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                        selectedProduct && productData && (
                            <View style={{
                                marginTop: 10,
                                paddingHorizontal: 20,
                                gap: 8
                            }}>
                                <TextInput style={styles.input}
                                    value={productData.productTitle}
                                    placeholder="Property Title"
                                    onChangeText={(e) => {
                                        setProductData((prevState) => ({
                                            ...prevState,
                                            productTitle: e
                                        }))
                                    }}
                                />
                                {
                                    productData.metaData && productData.metaData.hasOwnProperty('description') && (
                                        <TextInput style={styles.input}
                                            value={productData.metaData.description}
                                            placeholder="Enter some lines from property description."
                                            onChangeText={(e) => {
                                                setProductData((prevState) => ({
                                                    ...prevState,
                                                    metaData: {
                                                        ...prevState.metaData,
                                                        description: e
                                                    }
                                                }))
                                            }}
                                            multiline
                                        />
                                    )
                                }
                                {
                                    productData.metaData && productData.metaData.hasOwnProperty('deposite') && (
                                        <TextInput style={styles.input}
                                            value={productData.metaData.deposite}
                                            placeholder="Demposite Amount"
                                            onChangeText={(e) => {
                                                setProductData((prevState) => ({
                                                    ...prevState,
                                                    metaData: {
                                                        ...prevState.metaData,
                                                        deposite: e
                                                    }
                                                }))
                                            }}
                                            multiline
                                        />
                                    )
                                }
                                {
                                    productData.metaData && productData.metaData.hasOwnProperty('rent') && (
                                        <TextInput style={styles.input}
                                            value={productData.metaData.rent}
                                            placeholder="Rent Amount/Month"
                                            onChangeText={(e) => {
                                                setProductData((prevState) => ({
                                                    ...prevState,
                                                    metaData: {
                                                        ...prevState.metaData,
                                                        rent: e
                                                    }
                                                }))
                                            }}
                                        />
                                    )
                                }
                                {
                                    productData.metaData && productData.metaData.hasOwnProperty('total') && (
                                        <TextInput style={styles.input}
                                            value={productData.metaData.total}
                                            placeholder="Total Number of Property"
                                            onChangeText={(e) => {
                                                setProductData((prevState) => ({
                                                    ...prevState,
                                                    metaData: {
                                                        ...prevState.metaData,
                                                        total: e
                                                    }
                                                }))
                                            }}
                                        />
                                    )
                                }
                                <DropdownSelect
                                    options={
                                        [
                                            { label: "Yes", value: true },
                                            { label: "No", value: "false" }
                                        ]
                                    }
                                    placeholder="Select available status"
                                    selectedValue={productData.availableStatus}
                                    onValueChange={(e) => {
                                        setProductData((prevStatus) => ({
                                            ...prevStatus,
                                            availableStatus: e
                                        }))
                                    }}
                                />
                                <Button
                                    title={"Update"}
                                    icon={<MaterialCommunityIcons name="update" size={24} color="pink" />}
                                    onPress={handleUpdateProperty}
                                    uppercase={true}
                                    size='lg'
                                    type='outline'
                                />
                                <Button
                                    title={"Cancel"}
                                    icon={<AntDesign name="closecircle" size={24} color="pink" />}
                                    onPress={() => setPopover(false)}
                                    color={'secondary'}
                                    uppercase={true}
                                    size='lg'
                                    type='outline'
                                />
                            </View>
                        )
                    }
                </ScrollView>
            </Modal>
            {
                (
                    vendorStackStatus === "started" ||
                    deleteVendorProductStatus === "started" ||
                    updateVendorProductStatus === "started"
                ) && (
                    <Loader />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 0
    },
    emptyContainer: {
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderColor: colors.color_primary,
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 8,
        marginVertical: 4,
        overflow: 'hidden',
        padding: 8,
        gap: 4
    },
    popoverContainer: {
        backgroundColor: colors.color_light_gray,
    },
    input: {
        // borderWidth: 1,
        // borderColor: colors.color_primary,
        backgroundColor: colors.color_light_gray,
        color: colors.color_secondary,
        borderRadius: 12,
        // textAlign: 'center',
        fontWeight: 'bold',
        padding: 16
    }
});
