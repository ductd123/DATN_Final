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

const MenuTakingExam = ({ setConfirmExam1, setValueOptions }) => {
    const BangChuCai = ['A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'];
    const BangChuSo = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const dau = ['Dấu sắc', 'Dấu huyền', 'Dấu hỏi', 'Dấu Ngã', 'Dấu nặng']
    const [search, setSearch] = useState(false);
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
                openConfirmExam();
                break;
            case 'exam123':
                openConfirmExam();
                break;
            case 'dau':
                setValueOptions(dau);
                openConfirmExam();
                break;
            case 'chucai':
                setValueOptions(BangChuCai);
                openConfirmExam();
                break;
            case 'chuso':
                setValueOptions(BangChuSo);
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