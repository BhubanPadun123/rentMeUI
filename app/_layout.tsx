import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "@/src/component/Signup";
import OTP_Verification from '@/src/component/OtpVerification';
import Login from '@/src/component/Login';
import Home from '@/src/component/Home';
import CContainer from '@/src/component/CConatiner';
import { Provider } from "react-redux"
import Store from '@/src/Redux/Srore';
import ResetPassword from '@/src/component/ResetPassword';
import RegisterProperty from '@/src/component/AddProduct/add';
import ViewProduct from '@/src/component/Cart/ViewRoom';
import ProfileScreen from '@/src/component/Profile';
import { getLocalData } from '@/utils/localStorage';
import { AppProvider } from '@/src/component/AppContex';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <NativeBaseProvider>
        <AppProvider>
          <CContainer
            navItem={
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name='OTP_Verification' component={OTP_Verification} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='reset_password' component={ResetPassword} options={{ headerShown: false }} />
                <Stack.Screen name='AddProperty' component={RegisterProperty} options={{ headerShown: false }} />
                <Stack.Screen name='Products' component={ViewProduct} options={{ headerShown: true, contentStyle: { backgroundColor: "ped" } }} />
                <Stack.Screen name='Profile' component={ProfileScreen} options={{ headerShown: false }} />
              </Stack.Navigator>
            }
            loginNav={
              <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
              </Stack.Navigator>
            }
          />
        </AppProvider>
      </NativeBaseProvider>
    </Provider>
  );
}
