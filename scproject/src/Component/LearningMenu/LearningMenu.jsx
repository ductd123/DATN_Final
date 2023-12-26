import { FileAddOutlined, FileImageOutlined, FileWordOutlined, HistoryOutlined, PlayCircleOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined, } from '@ant-design/icons';
import { Drawer, Input, Menu, Space, message } from 'antd';
import React, { useEffect, useState } from 'react'
import './StudyAI.scss';
import Button from '../Common/Button/Button';
import { apiLearning } from '../../Services/apiLearning';
import LoadingComponent from '../Loading/Loading';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const BangChuCai = ['A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'];
const BangChuSo = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const dau = ['Dấu sắc', 'Dấu huyền', 'Dấu hỏi', 'Dấu Ngã', 'Dấu nặng']
const MenuStudyAI = ({ onUploadVideo, openPanelHistory, handleClickMenu, handleSearch, openSearchWord, setValueOptions, listTopic }) => {
    const [topicItems, setTopicItems] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [openAddTopic, setOpenAddTopic] = useState(false);
    useEffect(() => {
        setLoading(true);
        const newTopicItems = listTopic.map(element => getItem(element.label, element.label));
        setTopicItems(newTopicItems);
        setLoading(false);
    }, [listTopic]);

    useEffect(() => {
        setItems([
            getItem('Học tập theo bảng chữ cái', 'sub1', <FileWordOutlined style={{ fontSize: '1.25rem' }} />, [
                getItem('Theo chữ cái', "chucai"),
                getItem('Theo chữ số', "chuso"),
                getItem('Theo dấu', "dau"),
            ]),
            getItem('Học tập theo chủ đề', 'sub2', <FileImageOutlined style={{ fontSize: '1.25rem' }} />, [...topicItems]),
            getItem('Từ điển ngôn ngữ ký hiệu', 'sub4', <FileAddOutlined style={{ fontSize: '1.25rem' }} />, [
                getItem(<Input onChange={(e) => handleSearch(e.target.value)} placeholder="Nhập từ ngữ muốn tìm?" />, 'Search', <SearchOutlined style={{ fontSize: '1rem' }} />),
                getItem('Bổ sung từ điển ký hiệu', 'Upload', <UploadOutlined style={{ fontSize: '1rem' }} />),
                getItem('Thêm chủ đề', 'AddTopic', <PlusCircleOutlined style={{ fontSize: '1rem' }} />),
                getItem('Lịch sử đóng góp', 'History', <HistoryOutlined style={{ fontSize: '1rem' }} />),
            ]),
        ]);
    }, [topicItems]);
    const [search, setSearch] = useState(false);

    const [items, setItems] = useState();

    const onCloseAddTopic = () => {
        setOpenAddTopic(false);
        setContent('');
    };
    const addTopic = async () => {
        setLoading(true);
        let data = {
            content: content,
            imageLocation: '',
            videoLocation: '',
        }
        let response = await apiLearning.addTopic(data);
        if (response.code === 200) {
            setTimeout(() => {
                setLoading(false);
                setOpenAddTopic(false);
                message.success(`Thêm chủ đề ${data.content} thành công.`);
            }, 3000);
        }
        else {
            setTimeout(() => {
                setLoading(false);
                setOpenAddTopic(true);
                message.error(`Thêm chủ đề ${data.content} thất bại. Vui lòng thử lại!!!`);
            }, 3000);
        }
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
            case 'dau':
                setValueOptions(dau);
                handleClickMenu();
                break;
            case 'chucai':
                setValueOptions(BangChuCai);
                handleClickMenu();
                break;
            case 'chuso':
                setValueOptions(BangChuSo);
                handleClickMenu();
                break;
            case 'AddTopic':
                setOpenAddTopic(true)
                break;
            default:
                handleSearch(e.key);
                break;
        }
    };

    return (
        <div className='AI-menu-study'>
            <LoadingComponent loading={loading}/>
            <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                    paddingLeft: 0,
                }}
                mode="inline"
                items={items}
            />
            <Drawer
                title="Thêm chủ đề"
                placement="right"
                onClose={onCloseAddTopic}
                open={openAddTopic}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                footer={
                    <Space>
                        <Button className='ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-default' onClick={onCloseAddTopic}>Hủy bỏ</Button>
                        <Button loading={loading} onClick={addTopic} className="ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-primary" type="primary">
                            Xác nhận
                        </Button>
                    </Space>
                }
            >
                <p className="ant-upload-text" style={{ margin: '0 0 10px 0' }}>Nhập chủ đề muốn thêm:</p>
                <Input autoSize value={content} onChange={(e) => setContent(e.target.value)} />
            </Drawer>
        </div>
    );
}

export default MenuStudyAI;