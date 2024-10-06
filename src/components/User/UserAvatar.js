// src/components/User/UserAvatar.js
import React, { useState } from 'react';
const UserAvatar = ({id,profilePicture}) => {
  const {userID,setUserID} = useState(id);
  
  return (
    <div className="relative inline-block">
      <img
        className="relative inline-block h-10 w-10 cursor-pointer rounded-full object-cover object-center"
        src={profilePicture}
        alt="Avatar"
      />
      <span className="absolute top-0 end-0 block size-2.5 rounded-full ring-2 ring-white bg-gray-400 dark:ring-neutral-900"></span>
    </div>
  );
};

export default UserAvatar;