import React, { useState } from "react";
import "./ExamCOntainer.scss";
import { useLocation } from "react-router-dom";
import imgBlank from "../../assets/image/examBlank.png"
import { CheckCircleTwoTone } from "@ant-design/icons";
const questions = {
    id: '004',
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

export default function ExamContainer({ question, image, video, answers, correctAnswerIndex, onAnswerSelected }) {
    const location = useLocation();
    const pathName = location.pathname;
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
        //   onAnswerSelected(index === correctAnswerIndex);
    };
    return (
        // <div style={styles.questionContainer}>
        //     <h3>{question}</h3>
        //     {image && <img src={image} alt="Question" style={styles.media} />}
        //     {video && (
        //         <video controls width="100%" height="auto" style={styles.media}>
        //             <source src={video} type="video/mp4" />
        //             Your browser does not support the video tag.
        //         </video>
        //     )}
        //     <div>
        //         {answers.map((answer, index) => (
        //             <div key={index} style={styles.answerContainer}>
        //                 <input
        //                     type="radio"
        //                     id={`answer${index}`}
        //                     name="answers"
        //                     checked={selectedAnswer === index}
        //                     onChange={() => handleAnswerSelect(index)}
        //                 />
        //                 <label htmlFor={`answer${index}`} style={styles.answerLabel}>
        //                     {answer.value}
        //                 </label>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className="exam-blank">
            <div className="exam-blank-title">Tính năng dành cho người dùng</div>
            <div className="exam-blank-more">WeTalk cung cấp các tính năng nhằm giúp người dùng luyện tập vốn từ vựng ngôn ngữ ký hiệu nhanh chóng.</div>
            <div className="exam-blank-container">
                <div className="exam-blank-container-left">
                    <div className="exam-blank-container-left-item">
                        <CheckCircleTwoTone style={{ fontSize: '1.2rem', marginRight:'5px', position:'relative', top: '5px' }} />
                        <div className="exam-blank-container-left-item-content">
                            <p className="exam-blank-container-left-item-content-title">
                                Giao diện thân thiện
                            </p>
                            <p className="exam-blank-container-left-item-content-detail">
                                Giao diện câu hỏi và câu trả lời dễ nhìn, dễ hiểu, dễ thao tác với mọi đối tượng người dùng.
                            </p>
                        </div>
                    </div>
                    <div className="exam-blank-container-left-item">
                        <CheckCircleTwoTone style={{ fontSize: '1.2rem', marginRight:'5px', position:'relative', top: '5px' }} />
                        <div className="exam-blank-container-left-item-content">
                            <p className="exam-blank-container-left-item-content-title">
                                Tự do chủ đề
                            </p>
                            <p className="exam-blank-container-left-item-content-detail">
                                Người dùng có thể tự do lựa chọn chủ đề câu hỏi cho mình.
                            </p>
                        </div>
                    </div>
                    <div className="exam-blank-container-left-item">
                        <CheckCircleTwoTone style={{ fontSize: '1.2rem', marginRight:'5px', position:'relative', top: '5px' }} />
                        <div className="exam-blank-container-left-item-content">
                            <p className="exam-blank-container-left-item-content-title">
                                Đa phương tiện
                            </p>
                            <p className="exam-blank-container-left-item-content-detail">
                                Câu hỏi có cả ở dạng ảnh và video, linh hoạt tùy nội dung.
                            </p>
                        </div>
                    </div>
                    <div className="exam-blank-container-left-item">
                        <CheckCircleTwoTone style={{ fontSize: '1.2rem', marginRight:'5px', position:'relative', top: '5px' }} />
                        <div className="exam-blank-container-left-item-content">
                            <p className="exam-blank-container-left-item-content-title">
                                Bảo mật kết quả
                            </p>
                            <p className="exam-blank-container-left-item-content-detail">
                                Bài thi chỉ mang tính chất luyện tập, rèn luyện vốn từ. Vì vậy sau khi thi chỉ có thể xem lại kết quả 1 lần duy nhất.
                            </p>
                        </div>
                    </div>
                    <div className="exam-blank-container-left-item">
                        <CheckCircleTwoTone style={{ fontSize: '1.2rem', marginRight:'5px', position:'relative', top: '5px' }} />
                        <div className="exam-blank-container-left-item-content">
                            <p className="exam-blank-container-left-item-content-title">
                                Thư viện câu hỏi mở
                            </p>
                            <p className="exam-blank-container-left-item-content-detail">
                                Luôn Luôn sẵn sàng tiếp nhận các câu hỏi tạo bởi người dùng và thêm vào thư viện câu hỏi chung.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="exam-blank-container-right">
                    <img src={imgBlank}></img>
                </div>
            </div>
        </div>
    );
}
const styles = {
    questionContainer: {
        maxWidth: '600px',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
    },
    media: {
        maxWidth: '100%',
        height: 'auto',
        marginBottom: '10px',
    },
    answerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    },
    answerLabel: {
        marginLeft: '8px',
    },
};
