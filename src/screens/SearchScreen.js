import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import CardMedium from "../components/CardMedium";
import SearchBar from "../components/SearchBar";
import { getDatabase, ref, child, get } from "firebase/database";
import { colors, sizes } from "../styles/Theme";
import { filterServicesByCategory } from "../utils/CategoryUtils";
import categories from "../utils/Categories";
import Category from "../components/Category";
import { showTopMessage } from "../utils/ErrorHandler";
import parseContentData from "../utils/ParseContentData";
import userImages from "../utils/UserImageUtils"
import { getFirstProducts } from "../APIs/product";
import ProductCart from "../components/ProductCart";
import Button from "../components/Button/Button";
import { paymentGatway } from "../APIs/paymentGateway";

export default function SearchScreen({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([])
    const [serviceList, setServiceList] = useState([]);
    const [filteredServiceList, setFilteredServiceList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const category = route.params?.category
    const type = route.params?.type
    const placegolderName = SearchPlaceholderName(type)

    console.log(placegolderName)

    function getFirstProduct() {
        setLoading(true)
        getFirstProducts().then((res) => {
            setLoading(false)
            setProduct(res.data)
        }).catch((err) => {
            setLoading(false)
            showTopMessage("Error occured to get propetys!", "danger")
        })
    }
    useEffect(() => {
        if (!type) return
        switch (type) {
            case "product":
                getFirstProduct();
                break;
            default:
                return
        }
    }, [type])

    const goToProductDatils = (category) => {
        navigation.navigate("ServiceDetailScreen",{item:category})
    };

    //Render to flatlist
    const renderService = ({ item }) => (
        <CardMedium
            image_source={userImages[item.id]}
            service={item}
            key={item.id}
            onSelect={() => handleServiceSelect(item)}
        />
    );

    const renderCategory = ({ item }) => (
        <ProductCart
            category={item}
            isSelected={selectedCategory === item.title}
            onPress={() => goToProductDatils(item)}
            key={item.title}
        />
    );

    //Navigate to detail
    const handleServiceSelect = (item) => {
        navigation.navigate("ServiceDetailScreen", { item });
    };

    //Search function
    const handleSearch = (text) => {
        const searchedText = text.toLowerCase();

        const filteredList = serviceList.filter((service) => {
            const skillsMatch = service.skills.some((skill) =>
                skill.toLowerCase().includes(searchedText)
            );

            const expertAreaMatch = service.expert_area
                .toLowerCase()
                .includes(searchedText);

            return skillsMatch || expertAreaMatch;
        });

        setFilteredServiceList(filteredList);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                    color={colors.color_primary}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.search_container}>
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder_text={placegolderName ? placegolderName.toUpperCase() : ""}
                        />
                    </View>
                    {
                        type && type === "product" && product.length > 0 && (
                            <View style={styles.category_container}>
                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    snapToInterval={sizes.width}
                                    decelerationRate={"normal"}
                                    data={product}
                                    keyExtractor={(category) => category.title}
                                    renderItem={renderCategory}
                                />
                            </View>
                        )
                    }
                    {/* <View style={styles.category_container}>
                        <FlatList
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={sizes.width}
                            decelerationRate={"fast"}
                            data={categories}
                            keyExtractor={(category) => category.name}
                            renderItem={renderCategory}
                        />
                    </View> */}

                    {/* <View style={styles.list_container}>
                        <FlatList
                            horizontal={false}
                            data={filteredServiceList}
                            renderItem={renderService}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={{ paddingBottom: 330 }} //scroll viewdan dolayı flatlist gömülüyordu
                        />
                    </View> */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search_container: {
        marginTop: 10,
        marginBottom: 12,
        marginHorizontal: 24,
    },
    category_container: {
        marginHorizontal: 4,
        marginBottom:100
    },
    list_container: {
        marginBottom: 32,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});


function SearchPlaceholderName(name) {
    switch (name) {
        case "catagoryClick":
            return "Search Catagory"
        case "cardClick":
            return "Search Product"

        default:
            return name
    }
}