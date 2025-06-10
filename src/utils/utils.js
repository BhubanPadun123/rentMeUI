export const timeFormate = (firestoreTimestamp) => {
    const date = new Date(firestoreTimestamp.seconds * 1000);
    const formatted = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear()).slice(2)}, ${String(date.getHours()).padStart(2, '0')}hh-${String(date.getMinutes()).padStart(2, '0')}mm-${String(date.getSeconds()).padStart(2, '0')}ss`
    return formatted
}

export const bookingStatus=(code)=>{
    switch(code){
        case "1":
            return "Booking in review"
        case "2":
            return "Booking Confirmed By Owner"
        case "3":
            return "Booking Deniel By Owner"
        case "4":
            return "Allow for Boarding"
        default:
            return ""

    }
}
export const platformFeeTermAndConfition = "A non-refundable platform fee is charged per booking to cover service, support, and maintenance costs."
export const termAndCondition = `By registering, you agree to our Terms & Privacy Policy.
You must provide accurate and up-to-date information.
Your personal data will be kept secure and confidential.
We do not use your data for marketing or share it without consent.`