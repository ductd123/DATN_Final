import { EyeTwoTone, PlayCircleTwoTone, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import defaultvideo from '../../assets/image/defaultvideo.png'
import { Modal } from 'antd';
const SearchWord = ({ searchText, files }) => {
    const [listFile, setListFile] = useState(files);
    const [fileShow, setFileShow] = useState({});
    const [showFileDetail, setShowFileDetail] = useState(false);
    const videoRef = useRef(null);
    const handleViewDetail = (file) => {
        setShowFileDetail(true);
        setFileShow(file);
    }
    const onCloseDetail =()=>{
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        console.log(videoRef);
        setShowFileDetail(false);
    }
    return (<div className="searchWord">
        <div className="searchWord-header flex-center">
            <SearchOutlined style={{ fontSize: '1.25rem' }} />
            <div className="searchWord-header-text">Kết quả tìm kiếm cho: </div>
            <span className="searchWord-header-value">"{searchText}"</span>
        </div>
        <div className='searchWord-container'>
            {listFile.map((item, i) => {
                return (
                    <div key={i} style={{ height: 'max-content' }}>
                        {item.type == 1 ?
                            <div key={i} className='searchWord-item' style={{ backgroundImage: `url(${item.preview})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                                <div className='searchWord-item-detail'>
                                    <p style={{ fontWeight: '600', fontSize: '28px ' }}>{item.name}</p>
                                    <p style={{ fontSize: '14px' }}>Tác giả: {item.name}</p>
                                    <p style={{ fontSize: '14px' }}>Ngày đăng: {item.size}</p>
                                </div>
                                <button className='searchWord-item-play' onClick={() => handleViewDetail(item)}>
                                    Bấm để xem!!!
                                </button>
                            </div>
                            :
                            <div key={i} className='searchWord-item' style={{ backgroundImage: `url(${defaultvideo})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                                <div className='searchWord-item-detail'>
                                    <p style={{ fontWeight: '600', fontSize: '28px ' }}>{item.name}</p>
                                    <p style={{ fontSize: '14px' }}>Tác giả: {item.name}</p>
                                    <p style={{ fontSize: '14px' }}>Ngày đăng: {item.size}</p>
                                </div>
                                <button className='searchWord-item-play' onClick={() => handleViewDetail(item)}>
                                    Bấm để xem!!!
                                </button>
                            </div>
                        }

                    </div>

                );
            })}
        </div>
        <Modal
            open={showFileDetail}
            footer={[]}
            onCancel={onCloseDetail}
            style={{ top: 20 }}
            title={fileShow.name}
            key={fileShow.preview}
        >
            {fileShow.type == 1 ?
                <img src={fileShow.preview} alt="Uploaded" style={{ width: '100%', height: 'auto', marginTop: '30px', }} />
                :
                <video ref={videoRef} controls style={{ width: '100%', height: 'auto', marginTop: '30px', }}>
                    <source src={fileShow.preview} type="video/mp4" />
                </video>
            }
        </Modal>
    </div>
    );
}

export default SearchWord;