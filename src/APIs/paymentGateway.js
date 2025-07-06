import RazorpayCheckout from "react-native-razorpay";


export const paymentGatway=(options)=>{
    return new Promise(async(resolved,rejected)=>{
        try {
            RazorpayCheckout.open({
                description:"hello",
                image:"https://res.cloudinary.com/dli3rzw0s/image/upload/v1749196361/upload_yas78d.jpg",
                currency:'INR',
                key:"rzp_test_A9zfKiKyFSOTCk",
                amount:"5000",
                name:"HomeKert",
                prefill:{
                    email:"bhubanpadun15m37@gmail.com",
                    contact:"0398220065",
                    name:"Bhuban Padun"
                },
                theme:{
                    color:"#F37254"
                }
            }).then((data)=>{
                resolved(data)
            }).catch((err)=>{
                rejected(err)
            })
        } catch (error) {
            rejected(error)
        }
    })
}