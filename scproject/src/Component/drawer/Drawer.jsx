// BasicDrawer.js
import React from "react";
import { Button, Drawer } from "antd";
import styled from "styled-components";
import ButtonSystem from "../button/ButtonSystem";
import {
  CloseCircleOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";

const CustomDrawer = styled(Drawer)`
  .ant-drawer-header {
    padding: 24px 24px 12px 24px;
  }
  .ant-drawer-footer {
    padding: 12px 24px;
  }
`;

const BasicDrawer = (props) => {
  const { open, children, onClose, titleName, onOk } = props;

  return (
    <CustomDrawer
      width={640}
      extra={
        <Button
          icon={<CloseOutlined style={{ fontSize: 20, color: "black" }} />}
          className="hover:opacity-60 "
          onClick={onClose}
          styles={{ padding: 0 }}
        ></Button>
      }
      title={
        <>
          <div className="flex items-center gap-4">
            <EditOutlined />
            <div className="title-16-semiBold text-neutral1100">
              {titleName}
            </div>
          </div>
        </>
      }
      footer={
        <div className="justify-end flex gap-4">
          <ButtonSystem
            type="secondary"
            styles={{ width: "120px" }}
            onClick={onClose}
          >
            Huỷ
          </ButtonSystem>
          <ButtonSystem
            type="primary"
            styles={{ width: "120px" }}
            onClick={onOk}
          >
            Xác nhận
          </ButtonSystem>
        </div>
      }
      placement="right"
      closeIcon={null}
      open={open}
      {...props}
    >
      {children}
    </CustomDrawer>
  );
};

export default BasicDrawer;
