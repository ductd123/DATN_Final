import { EyeTwoTone, PlayCircleTwoTone, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import defaultvideo from '../../assets/image/defaultvideo.png'
import { Empty, Modal } from 'antd';
const SearchWord = ({ searchText, files }) => {
    const [listFile, setListFile] = useState(files);
    const [fileShow, setFileShow] = useState({});
    const [showFileDetail, setShowFileDetail] = useState(false);
    const videoRef = useRef(null);
    const handleViewDetail = (file) => {
        setShowFileDetail(true);
        setFileShow(file);
    }
    const onCloseDetail = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        console.log(videoRef);
        setShowFileDetail(false);
    }
    return (
        <div className="searchWord">
            <div className="searchWord-header flex-center">
                <SearchOutlined style={{ fontSize: '1.25rem' }} />
                <div className="searchWord-header-text">Kết quả tìm kiếm cho: </div>
                <span className="searchWord-header-value">"{searchText}"</span>
            </div>
            <div className='searchWord-container'>
                {files.length !== 0 ? files.map((item, i) => {
                    return (
                        <div key={i} style={{ height: 'max-content' }}>
                            {item.type == 1 ?
                                <div key={i} className='searchWord-item' style={{ backgroundImage: `url(${item.preview})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                                    <div className='searchWord-item-detail'>
                                        <p style={{ fontWeight: '600', fontSize: '28px', marginLeft: '10px' }}>{item.content}</p>
                                    </div>
                                    <button className='searchWord-item-play' onClick={() => handleViewDetail(item)}>
                                        Bấm để xem!!!
                                    </button>
                                </div>
                                :
                                <div key={i} className='searchWord-item' style={{ backgroundImage: `url(${defaultvideo})`, backgroundSize: 'cover', backgroundPosition: 'center', }}>
                                    <div className='searchWord-item-detail'>
                                        <p style={{ fontWeight: '600', fontSize: '28px', marginLeft: '10px' }}>{item.content}</p>
                                    </div>
                                    <button className='searchWord-item-play' onClick={() => handleViewDetail(item)}>
                                        Bấm để xem!!!
                                    </button>
                                </div>
                            }

                        </div>

                    );
                }) : <Empty style={{ width: '100%' }} description={`Không có dữ liệu cho "${searchText}".`} />
                }
            </div>
            <Modal
                open={showFileDetail}
                footer={[]}
                onCancel={onCloseDetail}
                style={{ top: 20 }}
                title={fileShow.content}
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