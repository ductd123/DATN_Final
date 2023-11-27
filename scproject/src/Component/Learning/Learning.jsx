import { FileAddOutlined, FileImageOutlined, FileWordOutlined, HistoryOutlined, SearchOutlined, UploadOutlined, } from '@ant-design/icons';
import { Input, Menu } from 'antd';
import React, { useState } from 'react'
import './StudyAI.scss';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const MenuStudyAI = ({ onUploadVideo, openPanelHistory, handleClickMenu, handleSearch, openSearchWord}) => {
    const [search, setSearch] = useState(false);
    const [items, setItems] = useState([
        getItem('Học tập theo bảng chữ cái', 'sub1', <FileWordOutlined style={{ fontSize: '1.25rem' }} />, [
            getItem('Theo chữ cái', "chucai",),
            getItem('Theo chữ số', "chuso",),
            getItem('Theo dấu', "dau",),
        ]),
        getItem('Học tập theo chủ đề', 'sub2', <FileImageOutlined style={{ fontSize: '1.25rem' }} />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3',),
        ]),
        getItem('Từ điển ngôn ngữ ký hiệu', 'sub4', <FileAddOutlined style={{ fontSize: '1.25rem' }} />, [
            getItem(<Input onChange={(e)=>handleSearch(e)} placeholder="Nhập từ ngữ muốn tìm?" />, 'Search', <SearchOutlined style={{ fontSize: '1rem' }} />),
            getItem('Bổ sung từ điển ký hiệu', 'Upload', <UploadOutlined style={{ fontSize: '1rem' }} />),
            getItem('Lịch sử đóng góp', 'History', <HistoryOutlined style={{ fontSize: '1rem' }} />),
        ]),
    ]);
    
    const handleOpenSearch = () => {
        setSearch(true);
    }

    const handleCloseSearch = () => {
        setSearch(false);
    }
    const onClick = (e) => {
        console.log("click");
        switch (e.key) {
            case 'History':
                openPanelHistory();
                break;
            case 'Upload':
                onUploadVideo();
                break;
            case 'Search':
                openSearchWord();
                break;
            default:
                handleClickMenu();
                break;
        }
    };

    return (
        <div className='AI-menu-study'>
            <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                    paddingLeft: 0,
                }}
                mode="inline"
                items={items}
            />
        </div>
    );
}

export default MenuStudyAI;