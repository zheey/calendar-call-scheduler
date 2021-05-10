import React from "react";

const Avatar = ({ image = "" }) => (
  <div className="avatar">
    <img src={image} alt="profile" />
  </div>
);

export default Avatar;
