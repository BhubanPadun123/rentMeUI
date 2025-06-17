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
import Button from "../components/Button/Button";
import Icons from "../utils/Icons";
import tabsImages from "../utils/TabsImages";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons
} from "@expo/vector-icons"
import DropdownSelect from "../components/SingleSelect";
import { showTopMessage } from "../utils/ErrorHandler";

export default function UpdateVendorStock() {
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState(null)
    const [product, setPropduct] = useState([])
    const [openPopover, setPopover] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
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
    }, [updateVendorProductStatus,deleteVendorProductStatus])
    useEffect(() => {
        if (vendorStackStatus === "success") {
            setPropduct(vendorStackResponse)
        }
    }, [
        vendorStackStatus
    ])
    useEffect(()=>{
        if(deleteVendorProductStatus === "success"){
            showTopMessage("Property deleted successfully","success")
        }
    },[deleteVendorProductStatus])
    useEffect(()=>{
        if(updateVendorProductStatus === "success"){
            setPopover(false)
            setTimeout(()=>{
                showTopMessage("Property updated successfully","success")
            },5000)
        }
    },[updateVendorProductStatus])

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

    function hanldeDeleteProduct(id){
        if(!id) return
        dispatch(deleteVendorProduct(id))
    }
    function handleUpdateProperty(){
        // console.log(productData,"<<<"),
        // console.log(selectedProduct,"<<<")
        if(!selectedProduct || !productData) return
        const data = {
            productId:selectedProduct._id,
            data:{
                availableStatus:productData.availableStatus,
                postAt:selectedProduct.postAt,
                productTitle:productData.productTitle,
                productType:selectedProduct.productType,
                propertyOccupancy:selectedProduct.propertyOccupancy,
                vendorRef:selectedProduct.vendorRef,
                metaData:JSON.stringify(productData.metaData)
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
        return (
            <View style={styles.card}>
                <ImageSlider
                    images={images}
                />
                <Text style={{ fontSize: 20, color: colors.color_primary, textAlign: 'center' }}>{item && item.productTitle}</Text>
                <Button
                    text={"Update"}
                    onPress={() => handleUpdate(item)}
                    icon={<MaterialCommunityIcons name="update" size={24} color="white" />}
                />
                <Button
                    text={"Delete"}
                    icon={<MaterialIcons name="delete" size={24} color="red" />}
                    onPress={()=> hanldeDeleteProduct(item._id)}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
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
                                    text={"Update"}
                                    icon={<MaterialCommunityIcons name="update" size={24} color="white" />}
                                    onPress={handleUpdateProperty}
                                />
                                <Button
                                    text={"Cancel"}
                                    icon={<AntDesign name="closecircle" size={24} color="white" />}
                                    onPress={()=> setPopover(false)}
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
