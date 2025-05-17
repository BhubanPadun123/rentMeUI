import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { ScrollView, useTheme } from "native-base";
import { Header } from "./Header";
import { Footer } from "./Footer";
import FilterDrawer from "./AddProduct/FilterProduct";

interface propsType {
    navItem: React.ReactNode;
}
type stateProps={
    openFilter:boolean;
    rentFilterAmount:number;
    occupancyList:string[];
    occupancy:string[];
    propertyTypes:string[];
    propertyType:string[]
}

export default function CContainer(props: propsType) {
    const { colors } = useTheme();
    const [state,setState] = React.useState<stateProps>({
        openFilter:false,
        rentFilterAmount:5,
        occupancyList:['Student(Male)','Student(Femal)','Working(Male)','Working(Femal)','All'],
        occupancy:[],
        propertyTypes:['resident','commercial'],
        propertyType:[]
    })

    const handleCloseFilter=()=>{
        setState((prevState)=>({
            ...prevState,
            openFilter:!state.openFilter
        }))
    }
    const handleClickFilter=()=>{
        setState((prevState)=>({
            ...prevState,
            openFilter:!state.openFilter
        }))
    }
    const handleChangeFilterRent=(e:number)=>{
        setState((prevState)=>({
            ...prevState,
            rentFilterAmount:e
        }))
    }
    const onSelectOccupancy=(e:string[])=>{
        setState((prevState)=>({
            ...prevState,
            occupancy:e
        }))
    }
    const onSelectPropertyType=(e:string[])=>{
        setState((prevState)=>({
            ...prevState,
            propertyType:e
        }))
    }
    return (
        <View style={styles.container}>
            <Header 
               handleClickFilter={handleClickFilter}
            />

            {/* Fixed Background */}
            <ImageBackground
                source={require("@/assets/images/bg_3.jpg")}
                resizeMode="cover"
                style={styles.imageBackground}
            >
                {/* Scrollable Foreground Content */}
                <ScrollView 
                   height={Dimensions.get('screen').height}
                   mb={20}
                >
                    {props.navItem}
                </ScrollView>
            </ImageBackground>

            <Footer />
            <FilterDrawer 
                visible={state.openFilter} 
                onClose={handleCloseFilter} 
                filterRentAmount={state.rentFilterAmount}
                handleChangeFilterRent={handleChangeFilterRent}
                occupancyList={state.occupancyList}
                occupancy={state.occupancy}
                onSelectOccupancy={onSelectOccupancy}
                propertyTypes={state.propertyTypes}
                propertytype={state.propertyType}
                onSelectPropertyType={onSelectPropertyType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
    },
});
