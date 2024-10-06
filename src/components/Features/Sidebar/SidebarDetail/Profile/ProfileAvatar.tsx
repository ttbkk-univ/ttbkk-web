import React from "react";
import { Avatar } from "@mui/material";
import { User } from "../../../../../hooks/useAuth";

type Props = {
  user: User;
};
function ProfileAvatar({ user }: Props): React.ReactElement {
  return (
    <div style={{ padding: "0 0.5rem", display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "1rem" }}>
        <Avatar src={user.image} />
      </div>
      <div>{user.name}</div>
    </div>
  );
}

export default ProfileAvatar;
