import React, { useContext, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import UserAvatar from "../User/UserAvatar";
import DropDown from "../DropDown/DropDown";
import NavbarItems from "./NavbarItems";
import NotificationButton from "../Notification/NotificationButton";
import NotificationDropDown from "../Notification/NotificationDropDown";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavbarHome = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const NotificationItems = [
    {
      link: "#",
      avatarUrl: "/docs/images/people/profile-picture-1.jpg",
      name: "Jese Leos",
      message:
        'New message from <strong>Jese Leos</strong>: "Hey, what\'s up? All set for the presentation?"',
      time: "a few moments ago",
      notificationClass: "bg-blue-600",
      notificationIcon: (
        <svg
          className="w-2 h-2 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
          <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
        </svg>
      ),
    },
  ];

  const NavbarMainItems = [
    { title: "Home", link: "/" },
    { title: "Profile", link: "/profile" },
    { title: "Group", link: "/group" },
    { title: "Friend", link: "/friend" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  // Lấy userProfile từ localStorage
  const userProfile = JSON.parse(localStorage.getItem("user_profile"));

  return (
    <nav className="">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 w-3/10 rtl:space-x-reverse">
          <img src={Logo} className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SocialMedia
          </span>
        </div>

        <div className="hidden md:flex justify-center w-4/10">
          <NavbarItems items={NavbarMainItems} />
        </div>

        <div className="flex items-center justify-end space-x-3 w-3/10 rtl:space-x-reverse">
          <div className="relative">
            <div onClick={toggleNotificationDropdown}>
              <NotificationButton />
            </div>
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2">
                <NotificationDropDown
                  items={NotificationItems}
                  closeDropDown={toggleNotificationDropdown}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <div onClick={toggleDropdown}>
              <UserAvatar
                profilePicture={
                  userProfile?.profile?.profile_picture || "default-avatar-url"
                }
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2">
                <ul
                    role="menu"
                    className="absolute right-0 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none"
                    >
                    <li
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                            >
                                <Link to="/profile">
                                    <p className="text-slate-800 font-medium ml-2">Profile</p>
                                </Link>
                    </li>
                    <li
                        role="menuitem"
                        className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                        <Link to="/settings">
                            <p className="text-slate-800 font-medium ml-2">Settings</p>
                        </Link>
                    </li>
                    <li
                            role="menuitem"
                            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                        >
                        <div onClick={logout}>
                            <p className="text-slate-800 font-medium ml-2">Logout</p>
                        </div> 
                    </li>    
                </ul>
            </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHome;
