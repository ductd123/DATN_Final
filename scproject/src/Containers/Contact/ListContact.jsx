import { Empty, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ButtonSystem from "../../Component/button/ButtonSystem";
import blank from "../../assets/image/AvtBlank.jpg";

import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Users } from "react-feather";

const ListContact = ({
  type,
  data,
  handleRouterChat,
  onCancelFriends,
  onAcceptFriends,
  listRequest,
  listSendingFr,
  refetch,
}) => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Sắp xếp theo vần
    const sorted = data?.length
      ? data?.sort((a, b) => a.name.localeCompare(b.name))
      : [];

    // Đưa các tên theo vần vào 1 nhóm
    const groupedData = sorted?.reduce((acc, item) => {
      // Lấy ký tự đầu tiên tạo từ điển rồi đưa danh sách theo tên vào
      // dang { A: []}
      const firstLetter = item.name.charAt(0).toUpperCase();
      acc[firstLetter] = acc[firstLetter] || [];
      acc[firstLetter].push(item);
      return acc;
    }, {});

    setSortedData(groupedData);
  }, [data]);

  // Huỷ kết bạn
  const handleDeleteFr = (item) => {
    Modal.confirm({
      title: `Xác nhận huỷ kết bạn ?`,
      icon: <ExclamationCircleFilled />,
      content: (
        <div>
          Bạn có muốn huỷ kết bạn với{" "}
          <span className="font-bold text-base">{item.name}</span>
        </div>
      ),
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk() {
        onCancelFriends(item.userId, "cancelFr");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const renderContent = () => {
    if (type === "friend") {
      return (
        <div className="contact">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <i className="fa-regular fa-user fa-lg"></i>
              <div className="list-contact__content">Danh sách bạn bè</div>
            </div>
          </div>
          <div className="contact-panel__details">
            <div className="list-contact__length">
              Bạn bè ({Object.entries(sortedData).length})
            </div>
            {/* Tìm kiếm */}

            <div className=" bg-white">
              {Object.entries(sortedData).map(([letter, groupItems]) => (
                <div key={letter}>
                  <div className="p-4">{letter}</div>
                  {groupItems.map((item, index) => (
                    <div key={index}>
                      <button
                        className="conversation__container relative group"
                        style={{
                          flexDirection: "column",
                          paddingLeft: "15px",
                          width: "100%",
                        }}
                      >
                        <div className="conversation__content flex gap-3">
                          <img
                            src={item.avatarLocation || blank}
                            alt=""
                            className="conversation__img"
                            onClick={() => handleRouterChat(item)}
                          />

                          <div className="conversation__main">
                            <h4 className="conversation__name">{item.name}</h4>
                          </div>
                        </div>

                        <div
                          className="conversation_setting absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
                          onClick={() => handleDeleteFr(item)}
                        >
                          <DeleteFilled />
                        </div>
                      </button>

                      <hr
                        style={{
                          height: "1px",
                          backgroundColor: "rgb(221, 221, 221)",
                          marginLeft: "65px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (type === "request") {
      return (
        <div className="contact w-full">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <i className="fa-regular fa-envelope-open"></i>
              <div className="list-contact__content">Lời mời kết bạn</div>
            </div>
          </div>
          <div className="contact-panel__details">
            <div className="list-contact__all">
              <div className="list-contact__length p-4">
                Lời mời đã nhận ({listRequest?.length || 0})
              </div>

              <div className="flex gap-3 items-center pl-4 w-full">
                {listRequest?.length &&
                  listRequest?.map((item, index) => (
                    <div className="p-4 bg-white rounded-sm w-1/4">
                      <div className="flex gap-3 mb-3">
                        <img
                          src={item.avatarLocation || blank}
                          alt=""
                          className=" w-12 h-12 rounded-full"
                        />

                        <div className="">
                          <h4 className="">{item.name}</h4>
                          <div className="text-sm font-normal text-slate-400">
                            Bạn đã gửi lời mời
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <ButtonSystem
                          type="secondary"
                          className="w-full"
                          onClick={() => {
                            onCancelFriends(item.userId, "cancelPending");
                          }}
                        >
                          Từ chối
                        </ButtonSystem>
                        <ButtonSystem
                          type="primary"
                          className="w-full"
                          onClick={() => {
                            onAcceptFriends(item.userId);
                          }}
                        >
                          Xác nhận
                        </ButtonSystem>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="font-semibold p-4">
                Lời mời đã gửi ({listRequest?.length || 0})
              </div>
              <div className="flex gap-3 items-center pl-4 w-full">
                {listSendingFr?.length &&
                  listSendingFr?.map((item, index) => (
                    <div className="p-4 bg-white rounded-sm w-1/4">
                      <div className="flex gap-3 mb-3">
                        <img
                          src={item.avatarLocation || blank}
                          alt=""
                          className=" w-12 h-12 rounded-full"
                        />

                        <div className="">
                          <h4 className="">{item.name}</h4>
                          <div className="text-sm font-normal text-slate-400">
                            Bạn đã gửi lời mời
                          </div>
                        </div>
                      </div>
                      <ButtonSystem
                        type="secondary"
                        className="w-full"
                        onClick={() =>
                          onCancelFriends(item.userId, "cancelRequest")
                        }
                      >
                        Thu hồi lời mời
                      </ButtonSystem>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="contact">
        <div className="contact-panel__header">
          <div className="list-contact__selection">
            <Users />
            <div className="list-contact__content">Danh sách nhóm</div>
          </div>
        </div>
        <div className="contact-panel__details">
          <div className="list-contact__length">Nhóm ({data.length})</div>
          <div className="list-contact__all">
            {data?.map((item, index) => (
              <>
                <div
                  className="conversation__container"
                  key={index}
                  style={{ flexDirection: "column", paddingLeft: "15px" }}
                >
                  <Link
                    to={`/room/${item.id}`}
                    className="conversation__content"
                  >
                    {item.avt ? (
                      <img
                        src={item.avt}
                        alt=""
                        className="conversation__img"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-slate-400 rounded-full">
                        U
                      </div>
                    )}
                    <div className="conversation__main">
                      <h4 className="conversation__name">{item.name}</h4>
                      <h4
                        className="conversation__member"
                        style={{ fontSize: "13px", color: "#8b8b8b" }}
                      >
                        {data.length} thành viên
                      </h4>
                    </div>
                  </Link>
                  ....
                </div>

                <hr
                  style={{
                    height: "1px",
                    backgroundColor: "rgb(221, 221, 221)",
                    marginLeft: "65px",
                  }}
                ></hr>
              </>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const handleClick = (item) => {
    if (type === "group") {
      // Xử lý chuyển hướng sang trang nhóm
    } else {
      handleRouterChat(item);
    }
  };

  return (
    <div className="list-contact">
      {data?.length || listRequest?.length || listSendingFr?.length ? (
        renderContent()
      ) : (
        <div className="flex justify-center mt-20">
          <Empty />
        </div>
      )}
    </div>
  );
};

export default ListContact;
