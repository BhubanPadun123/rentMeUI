import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import FlashMessage from "react-native-flash-message";
import Fonts from "./src/styles/Fonts";
import Navigation from "./src/components/Navigation";
import { MenuProvider } from "react-native-popup-menu";
import Store from "./src/Redux/Store";
import { Provider } from "react-redux"
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query"
import * as Notifications from "expo-notifications"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Optional: Configure global query options
            staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
            cacheTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes
        },
    },
});

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,  
      shouldPlaySound: true, 
      shouldSetBadge: true,
    }),
})

export default function App() {

    //font
    const [fontsLoaded] = useFonts(Fonts);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <Provider store={Store} >
            <QueryClientProvider client={queryClient}>
                <MenuProvider>
                    <NavigationContainer>
                        <Navigation />
                        <FlashMessage position="top" />
                    </NavigationContainer>
                </MenuProvider>
            </QueryClientProvider>
        </Provider>
    );
}
