import { useState } from "react";
import { Button, HeaderBar, MenuTakingExam, Nav } from "../../Component";
import ExamContainer from "../../Containers/ExamContainer/ExamContainer";
import { Modal, Radio, Space } from "antd";
const q = {
    id: '204',
    question: 'Đây là gì?',
    image: `https://picsum.photos/`,
    answers: [
        { value: 'a', check: true },
        { value: 'b', check: false },
        { value: 'c', check: false },
        { value: 'd', check: false },
    ],
    correctAnswerIndex: 1,
};
const Examlayout = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [value, setValue] = useState(1);
    const [confirmExam, setConfirmExam] = useState(false);
    const handleAnswerSelected = (index, isCorrect) => {
        console.log(`Answer ${index + 1} selected. Correct: ${isCorrect}`);
        setSelectedAnswers([...selectedAnswers, { index, isCorrect }]);
    };
    const onChangeRadio = (e) => {
        setValue(e.target.value)
    }
    const openConfirmExam = () => {
        setConfirmExam(true);
    }
    const onConfirmExam = () => {
        setConfirmExam(false);
        setValue(1);
    }
    const cancleStudy = () => {
        setValue(1);
        setConfirmExam(false)
    }
    return (<div className="main-layout">
        <Nav />
        <div className="main-layout__container">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar />
                </div>
                <div className="main-layout__content">
                    <MenuTakingExam openConfirmExam={openConfirmExam} />
                </div>
            </div>
            <div className="main-layout__children flex-center">
                <ExamContainer
                    question={q.question}
                    image={`${q.image}${q.id}`}
                    video={q.video}
                    answers={q.answers}
                    correctAnswerIndex={q.correctAnswerIndex}
                    onAnswerSelected={(isCorrect) => handleAnswerSelected(1, isCorrect)}
                />
                <Modal
                    open={confirmExam}
                    // footer={[
                    //     <Button key="back" onClick={() => setConfirmExam(false)}>
                    //         Hủy bỏ
                    //     </Button>,
                    //     <Button
                    //         type="primary"
                    //         // onClick={'onOpenExam'}
                    //     >
                    //         Bắt đầu thi
                    //     </Button>,
                    // ]}
                    onCancel={cancleStudy}
                    onOk={onConfirmExam}
                    title="Lựa chọn mức độ câu hỏi"
                >
                    <p className="ant-upload-text" style={{ margin: '25px 0 10px 0', fontSize: '16px', fontWeight: 500 }}>Bạn sẽ trả lời liên tục 10 câu hỏi liên quan đến chủ đề đã chọn với mức độ :</p>
                    <Radio.Group onChange={onChangeRadio} value={value}>
                        <Space direction="vertical">
                            <Radio value={1}>Dễ</Radio>
                            <Radio value={2}>Trung bình</Radio>
                            <Radio value={3}>Khó</Radio>
                            <Radio value={4}>Từ dễ đến khó</Radio>
                        </Space>
                    </Radio.Group>
                </Modal>
            </div>
        </div>
    </div>);
}

export default Examlayout;