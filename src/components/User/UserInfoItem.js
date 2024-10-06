// src/components/User/UserInfoItem.js
import {React,useState} from 'react';
const UserInfoItem = ({ id,profilePicture}) => {
  const [userId, setUserId] = useState(id);
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <img src={profilePicture} alt="User Avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};

export default UserInfoItem;