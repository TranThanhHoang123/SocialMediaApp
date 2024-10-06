// src/components/Notification/NotificationButton.js
import React from 'react';

const NotificationButton = () => {
  return (
    <button
      id="dropdownNotificationButton"
      className="relative inline-flex items-center justify-center h-10 w-10 text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400 rounded-full bg-gray-200 dark:bg-gray-700"
      type="button"
      aria-label="Notification Button"
    >
      <svg
        className="w-6 h-6"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 14 20"
      >
        <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
      </svg>

      {/* Red notification dot */}
      <span className="absolute top-0 end-0 block size-2.5 rounded-full ring-2 ring-white bg-gray-400 dark:ring-neutral-900"></span>
    </button>
  );
};

export default NotificationButton;
