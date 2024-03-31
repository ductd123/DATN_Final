import React, { useEffect, useRef, useState } from "react";
import "./HeaderBar.scss";
import { useSelector } from "react-redux";
import { Button, Empty, Input, Modal, message } from "antd";
import apiUser from "../../Services/apiUser";
import { CommentOutlined, SearchOutlined } from "@ant-design/icons";
import LoadingComponent from "../Common/Loading/Loading";
import logoHeader from "../../assets/image/logo.png";
import blank from "../../assets/image/AvtBlank.jpg";
import ButtonSystem from "../button/ButtonSystem";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import apiChat from "../../Services/apiChat";

export default function HeaderBar({ disableSearch, setIsRefetchSending }) {
  const navigate = useNavigate();
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

  const handleRouterChat = async (item) => {
    try {
      const response = await apiChat.getConversationIdByUserId(item.userId);
      if (response.data) {
        setTimeout(() => {
          navigate(`/room/${item.userId}/${response.data.conversationId}`);
        }, 500);
        setShowInfo(false);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra.");
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
          <div className="flex flex-col">
            <span className="nav-userInfo-header-name ">
              {userInfo?.name || "Chưa có thông tin"}
            </span>
            <div
              className="cursor-pointer"
              onClick={() => handleRouterChat(userInfo)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#0866FF"
                  d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94c8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57C504 110.34 396.59 8 256.55 8m149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62"
                />
              </svg>
            </div>
          </div>
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
