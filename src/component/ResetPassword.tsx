import React, { useEffect, useState } from 'react';
import { VStack,Pressable, Box, Heading, Input, Button, FormControl, WarningOutlineIcon, useToast } from 'native-base';
import {
    AntDesign,
    Entypo
} from "@expo/vector-icons"
import {
    validateConfirmPassword,
    validateEmail,
    validatePassword
} from '@/utils/helper';
import { forgetPasswordType } from '../Redux/actionTypes/dataType';
import { RootState } from '../Redux/Reducer';
import { AppDispatch } from '../Redux/Srore';
import { useSelector,useDispatch } from 'react-redux';
import Loader_1 from './Loader/PrimaryLoader';
import { ForgetPasswordAction,ResetForgetPasswordResponse } from '../Redux/actions/user';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigation()
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('')
    const [isHidePass, setHidePass] = useState(true)
    const [isHideCPass, setHideCPass] = useState(true)
    const toast = useToast();

    const {
        status,
        data,
        error
    } = useSelector((state:RootState)=> state.user.forgetPassword)
    useEffect(()=>{
        dispatch(ResetForgetPasswordResponse())
        return()=>{
            dispatch(ResetForgetPasswordResponse())
        }
    },[])
    useEffect(()=>{
        if(status==="success"){
            toast.show({title:"Password reset successfully!!"})
            navigation.goBack()
        }
        if(status==="failed"){
            toast.show({title:error?.message ? error?.message : "Something went wrong!!"})
        }
    },[status])

    const handleReset = () => {
        if (!newPassword || !confirmPassword) {
            toast.show({ title: "Both fields are required" });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.show({ title: "Passwords do not match" });
            return;
        }
        const checkEmail = validateEmail(email)
        const checkPassword = validatePassword(newPassword)
        const checkCPassword = validateConfirmPassword(confirmPassword,newPassword)
        if(checkCPassword){
            toast.show({title:checkCPassword})
            return
        }
        if(checkPassword){
            toast.show({title:checkPassword})
        }
        if(!checkEmail){
            toast.show({title:"User Email invalid!!!"})
        }
        const data:forgetPasswordType={
            userEmail:email,
            password:newPassword
        }
        dispatch(ForgetPasswordAction(data))
    };

    return (
        <Box flex={1} px={5} py={10} safeArea>
            <VStack space={6} mt={5}>
                <Heading textAlign="center" color={"white"}>Reset Password</Heading>
                <FormControl isRequired>
                    <FormControl.Label>User Email Address</FormControl.Label>
                    <Input
                        type="text"
                        placeholder="Enter Email Address"
                        value={email}
                        onChangeText={setEmail}
                        color={"white"}
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormControl.Label>New Password</FormControl.Label>
                    <Input
                        type={isHidePass ? "password" : "text"}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        color={'white'}
                        InputRightElement={
                            <Pressable onPress={() => setHidePass(!isHidePass)}>
                                {
                                    isHidePass ? <AntDesign style={{ padding: 2 }} name="eye" size={24} color="gray" /> : <Entypo style={{ padding: 2 }} name="eye-with-line" size={24} color="gray" />
                                }
                            </Pressable>
                        }
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input
                        type={isHideCPass ? "password" : "text"}
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        color={'white'}
                        InputRightElement={
                            <Pressable onPress={() => setHideCPass(!isHideCPass)}>
                                {
                                    isHideCPass ? <AntDesign style={{ padding: 2 }} name="eye" size={24} color="gray" /> : <Entypo style={{ padding: 2 }} name="eye-with-line" size={24} color="gray" />
                                }
                            </Pressable>
                        }
                    />
                    {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Passwords do not match
                        </FormControl.ErrorMessage>
                    )}
                </FormControl>

                <Button onPress={handleReset} mt={4} colorScheme="primary">
                    Reset Password
                </Button>
                {
                    status === "started" && (
                        <Loader_1/>
                    )
                }
            </VStack>
        </Box>
    );
};

export default ResetPassword;
