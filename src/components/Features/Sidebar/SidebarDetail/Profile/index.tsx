import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import Login from "../Login";
import { useAuth } from "../../../../../hooks/useAuth";

function Profile(): React.ReactElement {
  const { user, logout } = useAuth();

  if (!user || user.isExpired) {
    return <Login />;
  }

  return (
    <div
      style={{
        top: 3,
        cursor: "pointer",
        backgroundColor: "burlywood",
        padding: "0.25rem 0.25rem 0.25rem 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ProfileAvatar user={user} />
      <div style={{ cursor: "pointer" }} onClick={logout}>
        로그아웃
      </div>
    </div>
  );
}

export default Profile;
