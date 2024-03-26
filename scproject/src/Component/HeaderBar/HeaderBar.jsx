import React, { useEffect, useRef, useState } from "react";
import "./HeaderBar.scss";
import { useSelector } from "react-redux";
import { Button, Empty, Input, Modal, message } from "antd";
import apiUser from "../../Services/apiUser";
import { SearchOutlined } from "@ant-design/icons";
import LoadingComponent from "../Common/Loading/Loading";
import logoHeader from "../../assets/image/logo.png";
import blank from "../../assets/image/AvtBlank.jpg";
import ButtonSystem from "../button/ButtonSystem";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function HeaderBar({ disableSearch, setIsRefetchSending }) {
  const location = useLocation();
  const pathName = location.pathname;
  const userData = useSelector((state) => state.userData.userData);
  const [resultSearch, setResultSearch] = useState();
  const [value, setValue] = useState("");
  const [headerName, setHeaderName] = useState("");
  const [showInfo, setShowInfo] = useState();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [showResultSearch, setShowResultSearch] = useState(false);

  const headerBarRef = useRef(null);

  // APi lấy danh sách đã gửi kết bạn
  const { data: listSendingFr } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const res = await apiUser.listSendingFr();
      return res.data;
    },
    enabled:
      pathName === "/friend" ||
      pathName === "/add-request" ||
      pathName === "/contact",
  });

  const { data: listFriend } = useQuery({
    queryKey: ["getListFriends"],
    queryFn: async () => {
      const res = await apiUser.getListFriends();
      return res.data;
    },
    enabled:
      pathName === "/friend" ||
      pathName === "/add-request" ||
      pathName === "/contact",
  });

  const isSendingFr = listSendingFr?.some(
    (e) => e?.userId === userInfo?.userId
  );
  const isFriend = listFriend?.some((e) => e?.userId === userInfo?.userId);

  const handleClickOutside = (event) => {
    if (headerBarRef.current && !headerBarRef.current.contains(event.target)) {
      setShowResultSearch(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the header bar
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHeaderName(userData?.name);
  }, [userData]);

  const onSearch = async () => {
    let data = {
      page: 1,
      size: 10,
      text: value,
      ascending: true,
    };
    if (value) {
      setLoading(true);
      try {
        let response = await apiUser.searchUser(data);
        setTimeout(() => {
          setLoading(false);
          const data = response.data?.map((item) => ({
            email: item.email,
            name: item.name,
            id: item.userId,
            avatarLocation: item.avatarLocation,
          }));
          setResultSearch(data);
          setShowResultSearch(true);
        }, 500);
      } catch (error) {
        console.log(error);
        message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.");
        setLoading(false);
      }
    }
  };
  const handleChangeValue = (newValue) => {
    setValue(newValue);
    setResultSearch();
  };

  const onSelectUser = async (d) => {
    setLoading(true);
    try {
      let response = await apiUser.getUserById(d.id);

      setShowInfo(true);
      setTimeout(() => {
        setUserInfo(response.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ Admin.");
      setLoading(false);
    }
  };

  const requestAddFriend = async (id) => {
    setLoading(true);
    try {
      let response = await apiUser.requestAddFr(id);
      setShowInfo(true);
      setTimeout(() => {
        setShowInfo(false);
        setLoading(false);
        setShowResultSearch(false);
        message.success("Gửi lời mời kết bạn thành công.");
        setUserInfo(response);
      }, 500);
      setIsRefetchSending(true);
    } catch (error) {
      console.log(error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau");
      setLoading(false);
    }
  };

  return (
    <div className="header-bar" ref={headerBarRef}>
      <LoadingComponent loading={loading} />
      {resultSearch?.length !== 0 && showResultSearch && (
        <div className="search">
          {(resultSearch || []).map((d) => (
            <div
              onClick={() => onSelectUser(d)}
              className="search-result flex-center "
            >
              <div className="search-result-header">{d.name}</div>
              <img
                alt=""
                className="search-result-img"
                src={d.avatarLocation || blank}
              ></img>
            </div>
          ))}
        </div>
      )}
      {resultSearch?.length === 0 && (
        <div className="search">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Không có dữ liệu"
          />
        </div>
      )}
      <h4 className="header-bar__name flex-center">
        <img
          alt=""
          style={{ width: "24px", marginRight: "4px" }}
          src={logoHeader}
        />
        - {headerName}
      </h4>
      {!disableSearch && (
        <form onSubmit={(e) => e.preventDefault()} className="header-bar__form">
          {/* <input className="header-bar__input" placeholder="Search..." /> */}
          <Input
            placeholder="Tìm kiếm bạn bè..."
            onChange={(e) => {
              handleChangeValue(e.target.value);
            }}
            onFocus={() => setShowResultSearch(true)}
            style={{ width: "90%" }}
          />
          <Button
            onClick={onSearch}
            type="primary"
            className="header-bar__btn"
            icon={<SearchOutlined style={{ fontSize: "1.25rem" }} />}
          />
        </form>
      )}
      <Modal
        open={showInfo}
        onCancel={() => setShowInfo(false)}
        footer={
          <div className="flex items-center gap-3 justify-end">
            <ButtonSystem onClick={() => setShowInfo(false)}>Đóng</ButtonSystem>
            {!isFriend ? (
              <ButtonSystem
                type="primary"
                disabled={isSendingFr}
                onClick={() => requestAddFriend(userInfo.userId)}
              >
                {isSendingFr ? "Đã gửi lời mời kết bạn" : "Gửi lời mời kết bạn"}
              </ButtonSystem>
            ) : (
              <ButtonSystem type="primary" disabled>
                Bạn bè
              </ButtonSystem>
            )}
          </div>
        }
        title="Thông tin"
        style={{ top: 20 }}
      >
        <div className="nav-userInfo-background">
          <img
            style={{ width: "100%" }}
            alt=""
            src={"https://picsum.photos/204"}
          ></img>
        </div>
        <div className="nav-userInfo-header">
          <img
            alt=""
            src={userInfo?.avatarLocation || "https://picsum.photos/204"}
            className="nav-userInfo-header-avt"
          ></img>
          <span className="nav-userInfo-header-name">
            {userInfo?.name || "Chưa có thông tin"}
          </span>
        </div>
        <div
          style={{
            height: "8px",
            backgroundColor: "#efefef",
            borderRadius: "4px",
          }}
        ></div>
        <div className="nav-userInfo-detail">
          <span className="nav-userInfo-detail-header">Thông tin cá nhân</span>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Giới tính</span>
            <span className="nav-userInfo-detail-items-content">
              {userInfo?.gender === "MALE"
                ? "Nam"
                : "Nữ" || "Chưa có thông tin"}
            </span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Điện thoại</span>
            <span className="nav-userInfo-detail-items-content">
              {userInfo?.phoneNumber || "Chưa có thông tin"}
            </span>
          </div>
          <div className="nav-userInfo-detail-items">
            <span className="nav-userInfo-detail-items-title">Email</span>
            <span className="nav-userInfo-detail-items-content">
              {userInfo?.email || "Chưa có thông tin"}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
