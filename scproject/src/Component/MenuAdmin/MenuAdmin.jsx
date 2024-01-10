import { AuditOutlined, BookOutlined, CloudUploadOutlined, ExclamationCircleOutlined, FolderAddOutlined, HistoryOutlined, InboxOutlined, PlusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Modal, Menu, Drawer, message, Space, Select, Radio, Button, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import './MenuAdmin.scss';
import { apiLearning, apiUploadFile } from '../../Services/apiLearning';
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import Input from '../Common/Input/Input';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const MenuAdmin = ({ }) => {
    const [modal, contextHolder] = Modal.useModal();
    const [showPanelHistory, setShowPanelHistory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showCreateQuestions, setshowCreateQuestions] = useState(false);
    const [showAddTopic, setshowAddTopic] = useState(false);
    const [showAddWord, setShowAddWord] = useState(false);
    const [valueText, setValueText] = useState(["", "", "", ""]);
    const [linkFile, setLinkFile] = useState('');
    const [file, setFile] = useState('');
    const [contentTopic, setContentTopic] = useState('');
    const [contentWord, setContentWord] = useState('');
    const [contentQuestion, setContentQuestion] = useState();
    const [topicChose, setTopicChose] = useState();
    const [topicInit, setTopicInit] = useState([]);
    const [valueChecked, setValueChecked] = useState(0);
    const [isImage, setIsImage] = useState(true);
    const items = [
        getItem('Thêm chủ đề từ vựng', 'addTopic', <PlusCircleOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Thêm từ điển ký hiệu', 'addWord', <CloudUploadOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Tạo câu hỏi kiểm tra', 'addQuestion', <CloudUploadOutlined style={{ fontSize: '1.25rem' }} />),
        getItem('Lịch sử đăng tải', 'history', <HistoryOutlined style={{ fontSize: '1.25rem' }} />),
    ];

    useEffect(() => {
        getTopic();
    }, [])

    const handleCreateQuestion = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        apiUploadFile.uploadFile(formData)
            .then(response => {
                const imageData = isImage ? response : '';
                const videoData = isImage ? '' : response;
                const data = {
                    content: "",
                    explanation: "",
                    imageLocation: imageData,
                    videoLocation: videoData,
                    topic_id: topicChose,
                    answerDTOS: [
                        {
                            content: valueText[0],
                            imageLocation: "",
                            videoLocation: "",
                            correct: valueChecked === 0,
                        },

                        {
                            content: valueText[1],
                            imageLocation: "",
                            videoLocation: "",
                            correct: valueChecked === 1,
                        },
                        {
                            content: valueText[2],
                            imageLocation: "",
                            videoLocation: "",
                            correct: valueChecked === 2,
                        },
                        {
                            content: valueText[3],
                            imageLocation: "",
                            videoLocation: "",
                            correct: valueChecked === 3,
                        },
                    ]
                };
                return apiLearning.addQuestion(data);
            })
            .then(() => {
                setLoading(false);
                setshowCreateQuestions(false);
                message.success(`Tạo câu hỏi thành công.`);
            })
            .catch(error => {
                setLoading(false);
                setshowCreateQuestions(false);
                console.error('Error creating question:', error);
                message.error('Tạo câu hỏi thất bại. Vui lòng thử lại!!!');
            });
    };

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        let response = await apiUploadFile.uploadFile(file)
    }

    const handleOkWord = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        apiUploadFile.uploadFile(formData)
            .then(response => {
                const imageData = isImage ? response : '';
                const videoData = isImage ? '' : response;
                const data = {
                    content: contentWord,
                    imageLocation: imageData,
                    videoLocation: videoData,
                    topic_id: topicChose,
                };
                return apiLearning.themTuDien(data);
            })
            .then(() => {
                setLoading(false);
                setShowAddWord(false);
                message.success(`Thêm từ điển lên thành công.`);
            })
            .catch(error => {
                setLoading(false);
                setShowAddWord(false);
                message.error(`Thêm từ điển thất bại. Vui lòng thử lại!!!`);
            });
    };
    const getTopic = async () => {
        let response = await apiLearning.getTopic();
        const items = [];
        response.data.forEach((element, index) => {
            items.push({
                id: element.id,
                value: element.id,
                label: element.content,
            })
        });
        setTopicInit(items);
    }
    const onCloseAddQuestion = () => {
        setshowCreateQuestions(false);
        setContentQuestion('');
        setValueChecked(0);
        setValueText(['', '', '', '']);
        setTopicChose({});
    }

    const onChange = (e) => {
        setValueChecked(e.target.value);
    };
    const beforeUpload = (file) => {
        setIsImage(file.type.includes('image'))
        console.log(file);
        setFile(file);
        return false;
    };
    const onCloseAdd = () => {
        setshowAddTopic(false);
        setShowAddWord(false);
        setshowCreateQuestions(false);
        setContentTopic('');
        setContentWord('');
        setContentQuestion('');
        setFile();
        setLinkFile('');
        setTopicChose();
        setValueChecked(0);
        setValueText(['', '', '', '']);
    };
    const addTopic = async () => {
        setLoading(true);
        let data = {
            content: contentTopic,
            imageLocation: '',
            videoLocation: '',
        }
        await apiLearning.addTopic(data);
        try {
            setTimeout(() => {
                setLoading(false);
                setshowAddTopic(false);
                getTopic();
                message.success(`Thêm chủ đề ${data.content} thành công.`);
            }, 500);
        }
        catch (error) {
            setLoading(false);
            setshowAddTopic(true);
            message.error(`Thêm chủ đề ${data.content} thất bại. Vui lòng thử lại!!!`);
        }

    }
    const onClick = (e) => {
        console.log(e);
        switch (e.key) {
            case 'addTopic':
                setshowAddTopic(true);
                break;
            case 'addQuestion':
                setshowCreateQuestions(true);
                break;
            case 'addWord':
                setShowAddWord(true);
                break;
            case 'history':
                setShowPanelHistory(true);
                break;
            default:
                // window.director(`./${e.key}`)
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
            <Drawer title="Lịch sử đăng tải" placement="right" onClose={() => setShowPanelHistory(false)} open={showPanelHistory}>
                {/* {files.map((item, i) => {
                    return (
                        <ImageCard file={item} key={i}></ImageCard>
                    );
                })} */}
            </Drawer>
            <Modal
                open={showCreateQuestions}
                title="Tạo câu hỏi kiểm tra"
                onOk={handleCreateQuestion}
                onCancel={onCloseAdd}
                onClose={onCloseAdd}
                okText="Tải lên"
                cancelText="Hủy bỏ"
                style={{ top: 20 }}
                className="radio-create-question"
            >
                <p className="ant-upload-text" style={{ margin: '10px 0 10px 0', fontWeight: "500" }}>Câu hỏi</p>
                <TextArea
                    style={{
                        width: "100%",
                    }}
                    value={contentQuestion}
                    onChange={(e) => {
                        setContentQuestion(e.target.value);
                    }}
                    placeholder="Nhập câu hỏi ở đây."
                />
                <div style={{ height: '8px' }} />
                <Upload showUploadList={false} beforeUpload={beforeUpload}>
                    <Button type='primary' icon={<UploadOutlined />} >Chọn File</Button>
                </Upload>
                <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>File: {file?.name}</p>
                <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>Đáp án: </p>
                <p className="ant-upload-text" style={{ margin: '10px 0', color: '#a3a3a3' }}>Lưu ý: tích vào đáp án đúng.</p>
                <Radio.Group onChange={onChange} value={valueChecked}>
                    <Space direction="vertical">
                        <Radio value={0}>
                            <Input
                                style={{
                                    width: "100%",
                                    marginLeft: 10,
                                }}
                                value={valueText[0]}
                                onChange={(e) => {
                                    const updatedValueText = [...valueText];
                                    updatedValueText[0] = e.target.value;
                                    setValueText(updatedValueText);
                                }}
                            />
                        </Radio>
                        <Radio value={1}>
                            <Input
                                style={{
                                    width: "100%",
                                    marginLeft: 10,
                                }}
                                value={valueText[1]}
                                onChange={(e) => {
                                    const updatedValueText = [...valueText];
                                    updatedValueText[1] = e.target.value;
                                    setValueText(updatedValueText);
                                }}
                            />
                        </Radio>

                    </Space>
                    <Space direction="vertical">
                        <Radio value={2}>
                            <Input
                                style={{
                                    width: "100%",
                                    marginLeft: 10,
                                }}
                                value={valueText[2]}
                                onChange={(e) => {
                                    const updatedValueText = [...valueText];
                                    updatedValueText[2] = e.target.value;
                                    setValueText(updatedValueText);
                                }}
                            />
                        </Radio>
                        <Radio value={3}>
                            <Input
                                style={{
                                    width: "100%",
                                    marginLeft: 10,
                                }}
                                value={valueText[3]}
                                onChange={(e) => {
                                    const updatedValueText = [...valueText];
                                    updatedValueText[3] = e.target.value;
                                    setValueText(updatedValueText);
                                }}
                            />
                        </Radio>
                    </Space>
                </Radio.Group>
                <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>Chủ đề liên quan:</p>
                <Select
                    style={{ width: '100%' }}
                    options={topicInit}
                    onChange={(e) => { setTopicChose(e) }}
                />
            </Modal>
            <Drawer
                title="Thêm chủ đề"
                placement="right"
                onClose={onCloseAdd}
                open={showAddTopic}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                footer={
                    <Space>
                        <Button className='ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-default' onClick={onCloseAdd}>Hủy bỏ</Button>
                        <Button loading={loading} onClick={addTopic} className="ant-btn css-dev-only-do-not-override-xu9wm8 ant-btn-primary" type="primary">
                            Xác nhận
                        </Button>
                    </Space>
                }
            >
                <p className="ant-upload-text" style={{ margin: '0 0 10px 0' }}>Nhập chủ đề muốn thêm:</p>
                <Input value={contentTopic} onChange={(e) => setContentTopic(e.target.value)} />
            </Drawer>
            <Modal
                open={showAddWord}
                title="Bổ sung thư viện ngôn ngữ ký hiệu"
                onOk={handleOkWord}
                onCancel={onCloseAdd}
                footer={[
                    <Button key="back" onClick={onCloseAdd}>
                        Hủy bỏ
                    </Button>,
                    <Button
                        key="link"
                        type="primary"
                        loading={loading}
                        onClick={handleOkWord}
                    >
                        Tải lên
                    </Button>,
                ]}
            >
                <p className="ant-upload-text" style={{ margin: '25px 0 10px 0' }}>Ngôn ngữ văn bản:</p>
                <TextArea placeholder="Lưu ý viết đúng chính tả và viết thường" value={contentWord} autoSize onChange={(e) => setContentWord(e.target.value)} />
                <p className="ant-upload-text" style={{ margin: '10px 0 10px 0' }}>Ngôn ngữ ký hiệu:</p>
                <Upload showUploadList={false} beforeUpload={beforeUpload}>
                    <Button type='primary' icon={<UploadOutlined />} >Chọn File</Button>
                </Upload>
                <p className="ant-upload-text" style={{ margin: '10px 0', fontWeight: "500" }}>File: {file?.name}</p>
                <p className="ant-upload-text" style={{ margin: '10px 0 10px 0' }}>Chủ đề liên quan:</p>
                <Select
                    mode=""
                    style={{ width: '100%' }}
                    options={topicInit}
                    onChange={(e) => { setTopicChose(e) }}
                ></Select>
            </Modal>
            {contextHolder}
        </div>
    );
}

export default MenuAdmin;