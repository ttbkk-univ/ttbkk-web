import React from 'react';

import GoogleLogin from 'react-google-login';
/**
 * 구글 로그인
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
          clientId="567251896725-4o4alg3r60d68oldrgenodf97i0thmfb.apps.googleusercontent.com" //{process.env.REACT_APP_CLIENT_ID}
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
