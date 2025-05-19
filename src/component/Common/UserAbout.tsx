import React from "react";
import {
    Modal,
    FormControl,
    Input,
    Button,
    HStack,
    Avatar,
    VStack,
    Text
} from "native-base"
import {
    getLocalData,
    removedLocalValue
} from "@/utils/localStorage";
import { useNavigation } from "@react-navigation/native";

function UserAbout() {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = React.useState(false);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const handleLogout = async () => {
        await removedLocalValue("currentUser")
        await removedLocalValue("token")
        setModalVisible(false)
        navigation.navigate("Login" as never)
    }

    return <>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Bhuban Padun</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Name</FormControl.Label>
                        <Input ref={initialRef} readOnly />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input readOnly />
                    </FormControl>
                    <VStack>
                        <Text>

                        </Text>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button color={'primary.100'} onPress={()=> {
                            setModalVisible(false)
                            navigation.navigate('Signup' as never)
                        }} >
                            SignIn
                        </Button>
                        <Button onPress={handleLogout} >
                            Logout
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
        <HStack
            p={0}
        >
            <Button onPress={() => {
                setModalVisible(!modalVisible);
            }}>
                <Avatar source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} />
            </Button>
        </HStack>
    </>;
}


export default UserAbout