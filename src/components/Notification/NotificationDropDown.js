// src/Notification/NotificationDropDown.js
import React from 'react';

const NotificationDropDown = ({ items, closeDropDown }) => {
  return (
    <div
      id="dropdownNotification"
      className="z-20 w-80 max-w-md bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
      aria-labelledby="dropdownNotificationButton"
    >
      <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
        Notifications
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {items.map((item, index) => (
          <a
            href={item.link}
            key={index}
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeDropDown} // Gọi hàm khi nhấp vào
          >
            <div className="flex-shrink-0">
              <img className="rounded-full w-11 h-11" src={item.avatarUrl} alt={item.name} />
              <div className={`absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 ${item.notificationClass} border border-white rounded-full dark:border-gray-800`}>
                {item.notificationIcon}
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                {item.message}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                {item.time}
              </div>
            </div>
          </a>
        ))}
      </div>
      <a
        href="#"
        className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
      >
        <div className="inline-flex items-center">
          <svg
            className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 14"
          >
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          View all
        </div>
      </a>
    </div>
  );
};

export default NotificationDropDown;
