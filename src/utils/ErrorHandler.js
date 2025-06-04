import { showMessage } from "react-native-flash-message";

export default function (errorCode) {
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz e-posta adresi";

        case "auth/email-already-in-use":
            return "Email already register with other user!";

        case "auth/user-not-found":
            return "Kullanıcı bulunamadı";

        case "auth/wrong-password":
            return "Parola geçersiz";

        case "auth/weak-password":
            return "Parola çok zayıf";

        case "auth/admin-restricted-operation":
            return "Form data should not be empty!";

        case "auth/missing-password":
            return "Please Provide Password";
        case "auth/missing-email":
            return "Please Provide Email Address!";
        default:
            return errorCode;
    }
}

export function showTopMessage(messageText, messageType) {
    showMessage({
        message: messageText,
        type: messageType,
    });
}
