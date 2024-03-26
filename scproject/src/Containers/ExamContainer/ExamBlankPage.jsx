import { CheckCircleTwoTone } from "@ant-design/icons";
import imgBlank from "../../assets/image/examBlank.png";

const ExamBlankPage = () => {
  return (
    <div className="exam-blank">
      <div className="exam-blank-title">Tính năng dành cho người dùng</div>
      <div className="exam-blank-more">
        WeTalk cung cấp tính năng kiểm tra nhằm giúp người dùng luyện tập vốn từ
        vựng ngôn ngữ ký hiệu nhanh chóng.
      </div>
      <div className="flex mt-4">
        <div className="exam-blank-container-left">
          <div className="exam-blank-container-left-item">
            <CheckCircleTwoTone
              style={{
                fontSize: "1.2rem",
                marginRight: "5px",
                position: "relative",
                top: "5px",
              }}
            />
            <div className="exam-blank-container-left-item-content">
              <p className="exam-blank-container-left-item-content-title">
                Giao diện thân thiện
              </p>
              <p className="exam-blank-container-left-item-content-detail">
                Giao diện câu hỏi và câu trả lời dễ nhìn, dễ hiểu, dễ thao tác
                với mọi đối tượng người dùng.
              </p>
            </div>
          </div>
          <div className="exam-blank-container-left-item">
            <CheckCircleTwoTone
              style={{
                fontSize: "1.2rem",
                marginRight: "5px",
                position: "relative",
                top: "5px",
              }}
            />
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
            <CheckCircleTwoTone
              style={{
                fontSize: "1.2rem",
                marginRight: "5px",
                position: "relative",
                top: "5px",
              }}
            />
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
            <CheckCircleTwoTone
              style={{
                fontSize: "1.2rem",
                marginRight: "5px",
                position: "relative",
                top: "5px",
              }}
            />
            <div className="exam-blank-container-left-item-content">
              <p className="exam-blank-container-left-item-content-title">
                Bảo mật kết quả
              </p>
              <p className="exam-blank-container-left-item-content-detail">
                Bài thi chỉ mang tính chất luyện tập, rèn luyện vốn từ. Vì vậy
                sau khi thi chỉ có thể xem lại kết quả 1 lần duy nhất.
              </p>
            </div>
          </div>
          <div className="exam-blank-container-left-item">
            <CheckCircleTwoTone
              style={{
                fontSize: "1.2rem",
                marginRight: "5px",
                position: "relative",
                top: "5px",
              }}
            />
            <div className="exam-blank-container-left-item-content">
              <p className="exam-blank-container-left-item-content-title">
                Thư viện câu hỏi mở
              </p>
              <p className="exam-blank-container-left-item-content-detail">
                Luôn Luôn sẵn sàng tiếp nhận các câu hỏi tạo bởi người dùng và
                thêm vào thư viện câu hỏi chung.
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
};

export default ExamBlankPage;
