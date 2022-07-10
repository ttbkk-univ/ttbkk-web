import React, { useState } from 'react';

import GoogleLogin, { GoogleLoginResponse } from 'react-google-login';

function Login() {
  const onLoginResult = (response: any) => {
    console.log(response);
  };
  return (
    <div className="App">
      <header className="App-header">
        <GoogleLogin
          clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttonText="구글 로그인"
          onSuccess={onLoginResult}
          onFailure={onLoginResult}
        />
      </header>
    </div>
  );
}

export default Login;
