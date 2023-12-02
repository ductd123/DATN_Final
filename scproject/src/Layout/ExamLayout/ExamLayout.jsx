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
    const [listQuestions, setListQuestions] = useState([]);
    const [value, setValue] = useState(1);
    const [valueOption, setValueOptions] = useState([]);
    const [takingExam, setTakingExam] = useState(false);
    const [confirmExam1, setConfirmExam1] = useState(false);
    const [confirmExam2, setConfirmExam2] = useState(false);
    const onChangeRadio = (e) => {
        setValue(e.target.value)
    }
    const openConfirmExam = () => {
        setConfirmExam1(true);
    }
    const onConfirmExam1 = () => {
        setConfirmExam1(false);
        setConfirmExam2(true);
    }
    const onConfirmExam2 = () => {
        setConfirmExam2(false);
        setTakingExam(true);
        setValue(1);
        setListQuestions(q);
    }
    const cancleExam = () => {
        setValue(1);
        setConfirmExam1(false);
        setConfirmExam2(false);
    }
    return (<div className="main-layout">
        <Nav />
        <div className="main-layout__container">
            <div className="main-layout__side-bar">
                <div className="main-layout__header-bar">
                    <HeaderBar />
                </div>
                <div className="main-layout__content">
                    <MenuTakingExam setConfirmExam1={setConfirmExam1} setValueOptions={setValueOptions} />
                </div>
            </div>
            <div className="main-layout__children flex-center">
                <ExamContainer
                    confirmExam1={confirmExam1}
                    confirmExam2={confirmExam2}
                    cancleExam={cancleExam}
                    onConfirmExam1={onConfirmExam1}
                    onConfirmExam2={onConfirmExam2}
                    onChangeRadio={onChangeRadio}
                    value={value}
                    listQuestions={listQuestions}
                    takingExam={takingExam}
                    valueOption={valueOption}
                />
            </div>
        </div>
    </div>);
}

export default Examlayout;