export function formatDate(timestamp) {
    const date = new Date(timestamp);

    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const yy = String(date.getFullYear()).slice(-2);

    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${dd}-${mm}-${yy} : ${hh}-${min}-${ss}`;
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

export const baseUrl = "https://homekart-fyazhphmembuhnag.centralindia-01.azurewebsites.net"
//"http://192.168.67.166:8080"
//"https://homekart-fyazhphmembuhnag.centralindia-01.azurewebsites.net"
export const apiPath = {
    "auth":"api/auth",
    "product":"api/product",
    "manage":"api/manage",
    "customer":"/api/customer"
}

export const privillages = {
    "customer":["read"],
    "owner":["read","write","update"],
    "admin":["read","write","update","delete","all"]
}