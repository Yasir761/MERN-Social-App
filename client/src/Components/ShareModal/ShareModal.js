import { useState } from 'react';
import PostShare from '../PostShare/PostShare';

function ShareModal({ modalOpened, setModalOpened }) {
    return (
        <>
            {modalOpened && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-3/5">
                        <button
                            onClick={() => setModalOpened(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                        >
                            &times;
                        </button>

                        <PostShare />
                    </div>
                </div>
            )}
        </>
    );
}

export default ShareModal;
