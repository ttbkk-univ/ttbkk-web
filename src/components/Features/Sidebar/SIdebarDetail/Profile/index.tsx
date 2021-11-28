import React from 'react';
import ProfileAvatar from './ProfileAvatar';

function Profile(): React.ReactElement {
  return (
    <div
      style={{ position: 'fixed', top: 3, left: 255, cursor: 'pointer' }}
      onClick={(): void => alert('로그인 기능은 추후 개발 예정입니다')}
    >
      <ProfileAvatar />
    </div>
  );
}

export default Profile;
