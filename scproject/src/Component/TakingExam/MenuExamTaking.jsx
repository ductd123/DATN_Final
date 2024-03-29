import {
  BookOutlined,
  ExclamationCircleOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Modal, Menu } from "antd";
import React, { useState } from "react";
import "./ExamTakingMenu.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuTakingExam = ({
  openConfirmExam,
  takingExam,
  setShowSelectTopic,
  setTakingExam,
}) => {
  const [modal, contextHolder] = Modal.useModal();
  const [items, setItems] = useState([
    // getItem(
    //   "Kiểm tra theo bảng chữ cái và số",
    //   "examABC",
    //   <BookOutlined style={{ fontSize: "1.25rem" }} />
    // ),
    getItem(
      "Kiểm tra theo chủ đề",
      "exam_topic",
      <BookOutlined style={{ fontSize: "1.25rem" }} />
    ),
  ]);
  const onClick = (e) => {
    switch (e.key) {
      case "examABC":
        if (takingExam) {
          modal.confirm({
            title: "Cảnh báo",
            icon: <ExclamationCircleOutlined />,
            content:
              "Bạn đang trong 1 bài kiểm tra. Bạn muốn thoát ra và lựa chọn 1 bài kiểm tra khác?",
            okText: "Xác nhận",
            cancelText: "Làm tiếp",
            onOk: () => openConfirmExam(),
          });
        } else {
          openConfirmExam();
        }
        break;
      case "exam_topic":
        if (takingExam) {
          modal.confirm({
            title: "Cảnh báo",
            icon: <ExclamationCircleOutlined />,
            content:
              "Bạn đang trong 1 bài kiểm tra. Bạn muốn thoát ra và lựa chọn 1 bài kiểm tra khác?",
            okText: "Xác nhận",
            cancelText: "Làm tiếp",
            onOk: () => setTakingExam(false),
          });
        } else {
          setShowSelectTopic(true);
        }
        break;
      default:
        window.director(`./${e.key}`);
        break;
    }
  };

  return (
    <div className="AI-menu-taking">
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          paddingLeft: 0,
        }}
        mode="inline"
        items={items}
      />
      {contextHolder}
    </div>
  );
};

export default MenuTakingExam;
