import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { ScrollView, useTheme } from "native-base";
import { Header } from "./Header";
import { Footer } from "./Footer";
import FilterDrawer from "./AddProduct/FilterProduct";
import { useAppContext } from "./AppContex";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Reducer";
import { KeepDataInLocal } from "@/utils/localStorage";

interface propsType {
    navItem: React.ReactNode;
    loginNav:React.ReactNode
}
type stateProps = {
    openFilter: boolean;
    rentFilterAmount: number;
    occupancyList: string[];
    occupancy: string[];
    propertyTypes: string[];
    propertyType: string[];
    routeName: string
}

export default function CContainer(props: propsType) {
    const { colors } = useTheme();
    let {
        routeName,
        currentUser,
        updateCurrentUser
    } = useAppContext()

    const [state, setState] = React.useState<stateProps>({
        openFilter: false,
        rentFilterAmount: 5,
        occupancyList: ['Student(Male)', 'Student(Femal)', 'Working(Male)', 'Working(Femal)', 'All'],
        occupancy: [],
        propertyTypes: ['resident', 'commercial'],
        propertyType: [],
        routeName: ""
    })
    
    const {
        login
    } = useSelector((state:RootState)=> state.user)

    React.useEffect(()=>{
        if(login.status === "success"){
            if(login.data?.userData){
                updateCurrentUser(login.data.userData)
                KeepDataInLocal("currentUser",JSON.stringify(login.data.userData))
            }
        }
    },[login.status])
    React.useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            routeName: routeName
        }))
    }, [routeName])

    const handleCloseFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !state.openFilter
        }))
    }
    const handleClickFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !state.openFilter
        }))
    }
    const handleChangeFilterRent = (e: number) => {
        setState((prevState) => ({
            ...prevState,
            rentFilterAmount: e
        }))
    }
    const onSelectOccupancy = (e: string[]) => {
        setState((prevState) => ({
            ...prevState,
            occupancy: e
        }))
    }
    const onSelectPropertyType = (e: string[]) => {
        setState((prevState) => ({
            ...prevState,
            propertyType: e
        }))
    }
    const updateRouteName = (name: string) => {
        routeName = name
    }
    const checkRoterName=(name:string):boolean=>{
        let isAllow:boolean = true
        switch(name){
            case "Login":
                isAllow=false
                break;
            case "Signup":
                isAllow = false
                break;
            default:
                isAllow = true
        }
        return isAllow
    }

    return (
        <View style={styles.container}>
            {
                checkRoterName(state.routeName) && (
                    <Header
                        handleClickFilter={handleClickFilter}
                        updateRouteName={updateRouteName}
                    />
                )
            }

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
                    {currentUser ? props.navItem : props.loginNav}
                </ScrollView>
            </ImageBackground>
            {
                checkRoterName(state.routeName) && (
                    <Footer
                        updateRouteName={updateRouteName}
                    />
                )
            }
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
