import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { env } from '../../../../../env'; //env 소스는 '우와'에게 문의 바람.
/**
 * 구글 로그인
 * credentialResponse : 로그인 ID 토큰을 받아옴.
 */
function GoogleLoginButton(): React.ReactElement {
  return (
    <div id="singleButton">
      <GoogleOAuthProvider clientId={env.google.login}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log('Login');
          }}
          onError={() => {
            console.log('Login Error');
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
export default GoogleLoginButton;
