import React, { createContext, useContext } from "react";
import { user } from "../Redux/actionTypes/dataType";

type AppContextType = {
    userName: string;
    updateRouteName: (name: string) => void;
    routeName: string;
    currentUser: user | null;
    updateCurrentUser:(data:user | null)=>void;
    callingType:"home" | "vendor" | "confirm" | "customer" | "";
    updateUserCallingType:(val: "home" | "vendor" | "confirm" | "customer" | "")=> void
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [routeName, setRouteName] = React.useState<string>("")
    const [currentUser,setCurrentUser] = React.useState<user | null>(null)
    const [callingType,setCallingType] = React.useState<"home" | "vendor" | "confirm" | "customer" | "">("")
    const updateRouteName = (name: string) => {
        setRouteName(name)
    };
    const updateCurrentUser=(data:user | null)=>{
        setCurrentUser(data)
    }
    const updateUserCallingType=(val:"home" | "vendor" | "confirm" | "customer" | "")=>{
        setCallingType(val)
    }

    return (
        <AppContext.Provider value={{
            userName: "Bhuban",
            updateRouteName,
            routeName,
            currentUser,
            updateCurrentUser,
            callingType,
            updateUserCallingType
        }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useAppContext must be used within AppProvider");
    return context;
};
