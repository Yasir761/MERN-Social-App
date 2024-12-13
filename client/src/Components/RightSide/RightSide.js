import React, { useState } from 'react';
import Home from '../../Img/home.png';
// import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import Noti from '../../Img/noti.png';
// import Comment from '../../Img/comment.png';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex justify-between items-center">
                {/* <Link to="../home">
                    <img src={Home} alt="Home" className="w-6 h-6" />
                </Link> */}

                {/* <SettingsOutlinedIcon className="text-gray-500" /> */}
                {/* <img src={Noti} alt="Notification" className="w-6 h-6" /> */}
                {/* <img src={Comment} alt="Comment" className="w-6 h-6" /> */}
            </div>

            <TrendCard />

            <button
                className="w-full py-2 bg-blue-500 text-white rounded-full text-center mt-4 hover:bg-blue-600"
                onClick={() => setModalOpened(true)}
            >
                Share
            </button>

            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
    );
};

export default RightSide;
