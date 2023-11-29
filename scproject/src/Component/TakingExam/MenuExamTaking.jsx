import { BoldOutlined, BookOutlined, FileAddOutlined, FileImageOutlined, FileWordOutlined, FolderAddOutlined, HistoryOutlined, SearchOutlined, UploadOutlined, } from '@ant-design/icons';
import { Input, Menu } from 'antd';
import React, { useState } from 'react'
import './ExamTakingMenu.scss';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const MenuTakingExam = ({ openConfirmExam }) => {
    const [search, setSearch] = useState(false);
    const [items, setItems] = useState([
        getItem('Kiểm tra theo bảng chữ cái', 'examABC', <BookOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Kiểm tra theo chủ đề', 'exam123', <BookOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Tạo câu hỏi', 'addQA', <FolderAddOutlined style={{ fontSize: '1.25rem' }} />),
    ]);

    const handleOpenSearch = () => {
        setSearch(true);
    }

    const handleCloseSearch = () => {
        setSearch(false);
    }
    const onClick = (e) => {
        switch (e.key) {
            case 'examABC':
                openConfirmExam();
                break;
            case 'exam123':
                openConfirmExam();
                break;
            case 'addQA':
                break;
            default:
                break;
        }
    };

    return (
        <div className='AI-menu-taking'>
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

export default MenuTakingExam;