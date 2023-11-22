import { FileAddOutlined, FileImageOutlined, FileWordOutlined, HistoryOutlined, UploadOutlined, } from '@ant-design/icons';
import { Menu } from 'antd';
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
const itemabc = [
    getItem('Học tập theo chữ cái', 'sub1', <FileWordOutlined style={{ fontSize: '1.25rem' }} />, [
        getItem('A', "A",),
        getItem('B', "B",),
    ]),
    getItem('Học tập theo chủ đề', 'sub2', <FileImageOutlined style={{ fontSize: '1.25rem' }} />, [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3',),
    ]),
    getItem('Đóng góp tài liệu học tập', 'sub4', <FileAddOutlined style={{ fontSize: '1.25rem' }} />, [
        getItem('Đóng góp video cá nhân', 'Upload', <UploadOutlined style={{ fontSize: '1rem' }} />),
        getItem('Lịch sử đóng góp', 'History', <HistoryOutlined style={{ fontSize: '1rem' }} />),
    ]),
];
const MenuStudyAI = ({ onUploadVideo, openPanelHistory }) => {
    const [search, setSearch] = useState(false);
    const [items, setItems] = useState(itemabc);
    const handleOpenSearch = () => {
        setSearch(true);
    }

    const handleCloseSearch = () => {
        setSearch(false);
    }
    const onClick = (e) => {
        console.log("click" , e);
        switch (e.key) {
            case 'History':
                openPanelHistory();
                break;
            case 'Upload':
                onUploadVideo();
                break;
            default:
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