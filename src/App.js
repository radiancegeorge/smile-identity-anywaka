import "./styles.css";
import axios from "axios";
export default function App() {
  const handleVerify = async () => {
    const { data } = await axios({
      method: "get",
      url: "https://bf00-102-91-47-100.ngrok-free.app/user/verify/token",
      params: {
        type: "enhanced_kyc"
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWRpYW5jZSIsImVtYWlsIjoicmFkaWFuY2VnZW9yZ2VAZ21haWwuY29tIiwicGhvbmVOdW1lYnIiOiIwODEzODU0NDAzNiIsImZ1bGxOYW1lIjoicmFkaWFuY2Ugb2JpIiwiaWF0IjoxNjg3MTg5OTIxfQ.pfTNfUNaos-_3nPHbMpsskcyUFYfNHZlY70zegF_9YE`
      }
    });
    const { token } = data;
    console.log("calling...");
    window.SmileIdentity({
      token,
      product: "enhanced_kyc",
      callback_url: `https://bf00-102-91-47-100.ngrok-free.app/user/verify/`,
      environment: "sandbox",
      partner_details: {
        partner_id: `2410`,
        name: `Anywaka`,
        // logo_url: `${your_app_logo_url}`,
        policy_url: `https://bf00-102-91-47-100.ngrok-free.app/`,
        theme_color: "blue"
      },
      onSuccess: console.log,
      onClose: console.log.bind(this, "closed"),
      onError: console.log
    });
    console.log("done calling...");
  };
  return (
    <div className="App">
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
