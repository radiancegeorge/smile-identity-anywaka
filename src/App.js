import "./styles.css";
import axios from "axios";
import { useCallback, useEffect, useRef } from "react";
export default function App() {
  const btnRef = useRef(null)
  const queryParamRegex = /(?<=\?|&)([^&=]+)=([^&]+)/g;

  useEffect(() => {
    btnRef.current.click()
    btnRef.current.disabled = true;
  }, []);

  const handleVerify = useCallback(async () => {

    const p = window.location.href.match(queryParamRegex);
    console.log(p)
    // build params into an object
    const params = {};
     p.forEach(item => {
      const data = item.split("=");
      params[data[0]] = data[1];
    })

    
    const { data } = await axios({
      method: "get",
      url: params.serverUrl ?? "https://efcf-102-91-49-97.ngrok-free.app/user/verify/token", //server url to retrieve token
      params: {
        type: params.product
      },
      headers: {
        Authorization: `Bearer ${params.token}` // normal auth header
      }
    });
    const { token } = data;
    window.SmileIdentity({
      token,
      product: params.product,
      callback_url: params.callbackUrl ?? `https://efcf-102-91-49-97.ngrok-free.app/user/verify/`, //callback url on verification
      environment: params.env ?? "sandbox", // sandbox or live
      partner_details: { //org details
        partner_id: `2410`,
        name: `Anywaka`,
        logo_url: params.logoUrl?? `https://demo.app.anywaka.org/purpleLogo.png`,
        policy_url: params.policyUrl ?? `https://bf00-102-91-47-100.ngrok-free.app/`,
        theme_color: params.themeColor ?? "blue"
      },
      onSuccess: () => {
        window.postMessage( "success", "*")
      },
      onClose: () => {
        window.postMessage("closed" , "*")
      },
      onError: () => {
        window.postMessage("error", "*")
      }
    });
    console.log("done calling...");
  }, []);
  return (
    <div className="App">
      <button ref={btnRef} onClick={handleVerify} style={{display: "none"}}>Verify</button>
    </div>
  );
}
