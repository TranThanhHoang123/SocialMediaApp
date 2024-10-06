import React, { useEffect,useState } from 'react';

const MediaPreview = ({ media, selectedIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Escape') {
            onClose(); // Gọi hàm onClose khi nhấn Esc
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Dọn dẹp event listener khi component unmount
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [onClose]);
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : media.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < media.length - 1 ? prevIndex + 1 : 0));
    };

    const currentMedia = media[currentIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="w-3/4 h-3/4">
                {currentMedia.file.endsWith('.mp4') || currentMedia.file.endsWith('.mov') ? (
                    <video src={currentMedia.file} controls className="w-full h-full object-contain rounded-md" />
                ) : (
                    <img src={currentMedia.file} alt={`Post Media ${currentIndex}`} className="w-full h-full object-contain rounded-md" />
                )}
            </div>
            <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 p-6 bg-transparent rounded-full">
                <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"></path>
                </svg>            </button>
            <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 p-6 bg-transparent rounded-full">
                <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                </svg>
            </button>
            <button onClick={onClose} className="absolute top-0 right-0 m-4 p-4 bg-transparent rounded-full">
                <svg class="w-12 h-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2" />
                </svg>
            </button>
        </div>
    );
};

export default MediaPreview;