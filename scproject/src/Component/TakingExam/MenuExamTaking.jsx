import { BoldOutlined, BookOutlined, ExclamationCircleOutlined, FileAddOutlined, FileImageOutlined, FileWordOutlined, FolderAddOutlined, HistoryOutlined, SearchOutlined, UploadOutlined, } from '@ant-design/icons';
import { Button, Modal, Space, Menu } from 'antd';
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

const MenuTakingExam = ({ openConfirmExam, takingExam }) => {
    const [search, setSearch] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const [items, setItems] = useState([
        getItem('Kiểm tra theo bảng chữ cái', 'examABC', <BookOutlined style={{ fontSize: '1.25rem' }} />, [
            getItem('Theo chữ cái', "chucai",),
            getItem('Theo chữ số', "chuso",),
            getItem('Theo dấu', "dau",),
        ]),
        getItem('Kiểm tra theo chủ đề', 'exam123', <BookOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Tạo câu hỏi', 'addQA', <FolderAddOutlined style={{ fontSize: '1.25rem' }} />),
    ]);

    const openConfirmExam = () => {
        setConfirmExam1(true);
        
    }

    const handleCloseSearch = () => {
        setSearch(false);
    }
    const onClick = (e) => {
        console.log(e);
        switch (e.key) {
            case 'examABC':
                if (takingExam) {
                    modal.confirm({
                        title: 'Cảnh báo',
                        icon: <ExclamationCircleOutlined />,
                        content: 'Bạn đang trong 1 bài kiểm tra. Bạn muốn thoát ra và lựa chọn 1 bài kiểm tra khác?',
                        okText: 'Xác nhận',
                        cancelText: 'Làm tiếp',
                        onOk: () => openConfirmExam(),
                    });
                }
                else {
                    openConfirmExam();
                }
                break;
            case 'exam123':
                if (takingExam) {
                    modal.confirm({
                        title: 'Cảnh báo',
                        icon: <ExclamationCircleOutlined />,
                        content: 'Bạn đang trong 1 bài kiểm tra. Bạn muốn thoát ra và lựa chọn 1 bài kiểm tra khác?',
                        okText: 'Xác nhận',
                        cancelText: 'Làm tiếp',
                        onOk: () => openConfirmExam(),
                    });
                }
                else {
                    openConfirmExam();
                }
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
            {contextHolder}
        </div>
    );
}

export default MenuTakingExam;