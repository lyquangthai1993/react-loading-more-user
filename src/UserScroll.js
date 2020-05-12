import React from "react";

export function UserScroll({ user }) {
  return (
    <div className="box">
      <p>{user.email}</p>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <img src={user.avatar} alt="avatar" />
    </div>
  );
}
