import React, { useState } from 'react';

import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';
/**
 * 구글 로그인
 * @returns
 */
function GoogleLoginButton() {
  const onLoginResult = (response: any) => {
    //response의 type을 결정할 필요가 있어보임..
    console.log(response);
  };
  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="구글 로그인"
          //우선 성공과 실패를 하나의 이벤트로 연결함.
          onSuccess={onLoginResult}
          onFailure={onLoginResult}
        />
      </header>
    </div>
  );
}

export default GoogleLoginButton;
