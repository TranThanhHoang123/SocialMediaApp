// PostItemDropDown.js
import React, { useState } from 'react';

const PostItemDropDown = ({ onModify, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleModify = () => {
        onModify(); // Gọi hàm sửa đổi
        setIsOpen(false); // Đóng dropdown
    };

    const handleDelete = () => {
        onDelete(); // Gọi hàm xóa
        setIsOpen(false); // Đóng dropdown
    };
    const items = [{
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        ,
        name: 'Update',
        onClick: handleModify
    }, {
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        ,
        name: 'Delete',
        onClick: handleDelete
    },
    ]
    return (
        <div className="relative inline-block text-left">
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="hover:bg-gray-50 rounded-full p-1"
                type="button"
                onClick={toggleDropdown}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7"
                        r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="17" r="1" />
                </svg>
            </button>
            <div id="dropdown"
                className={`z-10 ${isOpen ? 'block' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 absolute right-0 mt-2`}>
                <ul className="py-2" aria-labelledby="dropdownDefaultButton">
                    {items.map((item, index) => (
                        <li key={index}
                            className="flex items-center gap-3 px-2 py-2 hover:bg-gray-100 text-gray-900"
                        >
                            {item.icon}
                            <button onClick={item.onClick}>
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostItemDropDown;