import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "../../../../../env";
import { useAuth } from "../../../../../hooks/useAuth"; //env 소스는 '우와'에게 문의 바람.
/**
 * 구글 로그인
 * credentialResponse : 로그인 ID 토큰을 받아옴.
 */
function GoogleLoginButton(): React.ReactElement {
  const { setGoogleUser } = useAuth();
  return (
    <div id="singleButton">
      <GoogleOAuthProvider clientId={env.google.clientId}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            if (!credentialResponse.credential) {
              throw new Error("No credential error");
            }
            setGoogleUser(credentialResponse.credential);
          }}
          onError={() => {
            console.error("Login Error");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
export default GoogleLoginButton;
