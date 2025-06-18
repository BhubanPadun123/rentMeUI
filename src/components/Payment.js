import React from "react";
import { WebView } from "react-native-webview";

export default function RazorpayWeb({
  amount = 10000,
  onPaymentSuccess,
  onPaymentFailed,
  customerData,
}) {
  const htmlContent = `
    <html>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = {
            key: "rzp_test_A9zfKiKyFSOTCk",
            amount: "${amount}",
            currency: "INR",
            name: "HomeKart",
            description: "Room Booking",
            image: "${customerData.profileUrl ? customerData.profileUrl : "https://res.cloudinary.com/dli3rzw0s/image/upload/v1749196361/upload_yas78d.jpg"}",
            handler: function (response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ status: 'success', ...response }));
            },
            prefill: {
              name: "${customerData.name}",
              email: "${customerData.email}",
              contact: "${customerData.phone}",
              productId:"${customerData.productId}",
              orderId:"${customerData.orderId}"
            },
            theme: {
              color: "#F37254"
            },
            modal: {
              ondismiss: function () {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  status: 'dismissed',
                  message: 'Payment popup closed by user'
                }));
              }
            }
          };

          var rzp = new Razorpay(options);

          rzp.on('payment.failed', function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              status: 'failed',
              error: response.error
            }));
          });

          rzp.open();
        </script>
      </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      onMessage={(event) => {
        try {
          const data = JSON.parse(event.nativeEvent.data);
          if (data.status === 'success') {
            onPaymentSuccess?.(data);
          } else {
            onPaymentFailed?.(data);
          }
        } catch (err) {
          onPaymentFailed?.({ status: 'error', message: 'Invalid response from payment gateway', error: err });
        }
      }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        onPaymentFailed?.({ status: 'error', message: 'WebView error', error: nativeEvent });
      }}
      onHttpError={({ nativeEvent }) => {
        onPaymentFailed?.({
          status: 'error',
          message: 'WebView HTTP error',
          statusCode: nativeEvent.statusCode,
          description: nativeEvent.description,
        });
      }}
    />
  );
}
