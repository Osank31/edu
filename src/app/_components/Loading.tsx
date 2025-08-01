import React from 'react';

const Loading: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full animate-spin" />
        <span className="mt-4 text-gray-600">Loading...</span>
    </div>
);

export default Loading;
