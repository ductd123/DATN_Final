import { FileAddOutlined, FileImageOutlined, FileWordOutlined, HistoryOutlined, PlusCircleOutlined, SearchOutlined, UploadOutlined, } from '@ant-design/icons';
import { Drawer, Input, Menu, Select, Space, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import './StudyAI.scss';
import Button from '../Common/Button/Button';
import { apiLearning } from '../../Services/apiLearning';
import LoadingComponent from '../Common/Loading/Loading';
import Webcam from 'react-webcam';
import { apiLogin } from '../../Services';
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
const MenuStudyAI = ({ onUploadVideo, openPanelHistory, handleClickMenu, handleSearch, openSearchWord, setValueOptions, listTopic, setIdTopic, fetchData, setSearchText }) => {
    const [topicItems, setTopicItems] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [openAddTopic, setOpenAddTopic] = useState(false);
    const webcamRef = useRef(null);
    useEffect(() => {
        fetchData1()
    }, []);
    useEffect(() => {
        setItems([
            getItem('Học tập theo bảng chữ cái', 'sub1', <FileWordOutlined style={{ fontSize: '1.25rem' }} />, [
                getItem('Theo chữ cái', "chucai"),
                getItem('Theo chữ số', "chuso"),
                // getItem('Theo dấu', "dau"),
            ]),
            getItem('Học tập theo chủ đề', 'sub2', <FileImageOutlined style={{ fontSize: '1.25rem' }} />,
                [getItem(<Select placeholder="Chọn chủ đề" suffixIcon={null} style={{ width: '100%' }} mode="" options={topicItems} onChange={(e) => { setLabelForSelect(e) }} />, 'SearchTopic')]
            ),
            getItem('Học tập theo từ ngữ', 'sub4', <FileAddOutlined style={{ fontSize: '1.25rem' }} />, [
                getItem(<Input onChange={(e) => handleSearch(e.target.value)} placeholder="Nhập từ ngữ muốn tìm?" />, 'Search', <SearchOutlined style={{ fontSize: '1rem' }} />),
            ]),
        ]);
    }, [topicItems]);

    const [items, setItems] = useState();


    const fetchData1 = async () => {
        const items = [];
        setLoading(true);
        try {
            let response = await apiLearning.getTopic();
            setTimeout(() => {
                response.data?.forEach((element, index) => {
                    items.push({
                        id: element.id,
                        value: element.id,
                        label: element.content,
                    })
                });
                setLoading(false);
                setTopicItems(items);
            }, 500);
        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                message.error(`Kết nối không ổn định. Vui lòng thử lại!!!`);
            }, 3000);
        }
    }


    const setLabelForSelect = (e) => {
        setIdTopic(e);
        setSearchText(topicItems.find(i => i.value == e)?.label);
    }
    const onClick = (e) => {
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
            case 'SearchTopic':
                break;
            default:
                handleSearch(e.key);
                break;
        }
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
    };

    return (
        <div className='AI-menu-study'>
            <LoadingComponent loading={loading} />
            {/* <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Chụp ảnh</button> */}
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