import "./styles.css";
import axios from "axios";
export default function App() {
  const handleVerify = async () => {
    const product = "enhanced_kyc" // use the actual verification u would like to use in the platform and not this, also try to use something with some facial checks
    const { data } = await axios({
      method: "get",
      url: "https://bf00-102-91-47-100.ngrok-free.app/user/verify/token", //use the actual server url please
      params: {
        type: product
      },
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWRpYW5jZSIsImVtYWlsIjoicmFkaWFuY2VnZW9yZ2VAZ21haWwuY29tIiwicGhvbmVOdW1lYnIiOiIwODEzODU0NDAzNiIsImZ1bGxOYW1lIjoicmFkaWFuY2Ugb2JpIiwiaWF0IjoxNjg3MTk2ODk5fQ.zEu2EzWTHkBUjk6D_y9lQsykmcGT5r6Ir158ROM-foc`
      }
    });
    const { token, callback_url } = data;
    console.log("calling...");
    window.SmileIdentity({
      token,
      product, 
      callback_url, // u will get this from the backend
      environment: "sandbox", //remember to change this when u going production
      partner_details: {
        partner_id: "2410",
        name: `Anywaka`,
        // logo_url: `${your_app_logo_url}`,
        policy_url: `https://bf00-102-91-47-100.ngrok-free.app/`, // note that this url goes nowhere, put an actual policy url
        theme_color: "blue" //use anywaka's own color
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
