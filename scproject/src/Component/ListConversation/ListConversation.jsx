import React, { useEffect } from "react";
import HeaderList from "../Common/HeaderList/HeaderList";
import "./ListConversation.scss";
import { useQuery } from "@tanstack/react-query";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import apiChat from "../../Services/apiChat";
import blank from "../../assets/image/AvtBlank.jpg";
import { useUser } from "../../hooks/useUser";

export default function ListConversation() {
  const navigate = useNavigate();
  const { user } = useUser();

  const {
    data: listConversations,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["getListConversations"],
    queryFn: async () => {
      if (!user) return; // Return early if user is not available

      try {
        const res = await apiChat.getListChat();
        const flattenedArray = res.data
          .flatMap((item) =>
            item.grouAttachConvResList.map((val) => ({
              conversationId: item.conversationId,
              ...val,
            }))
          )
          .filter((e) => e.contactId !== user.userId);

        return flattenedArray;
      } catch (error) {
        // Xử lý lỗi khi gọi API
        message.error("Có lỗi xảy ra khi tải danh sách cuộc trò chuyện.");
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [user]);

  const handleRouterChat = async (item) => {
    try {
      setTimeout(() => {
        navigate(`/room/${item?.contactId}/${item?.conversationId}`);
      }, 500);
    } catch (error) {
      message.error("Có lỗi xảy ra.");
    }
  };

  function compareTime(createdTime) {
    // Chuyển đổi createdTime từ chuỗi thành đối tượng Date
    const createdDate = new Date(createdTime);

    // Thời gian hiện tại
    const currentDate = new Date();

    // Tính khoảng thời gian giữa createdTime và thời gian hiện tại
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const secondsDiff = Math.floor(timeDiff / 1000);

    if (secondsDiff >= 86400) {
      // 86400 giây trong một ngày
      const daysDiff = Math.floor(secondsDiff / 86400);
      return `${daysDiff} ngày trước`;
    } else if (secondsDiff >= 3600) {
      // 3600 giây trong một giờ
      const hoursDiff = Math.floor(secondsDiff / 3600);
      return `${hoursDiff} giờ trước`;
    } else if (secondsDiff >= 60) {
      const minutesDiff = Math.floor(secondsDiff / 60);
      return `${minutesDiff} phút trước`;
    } else {
      return "vài giây trước";
    }
  }

  return (
    <Spin spinning={isFetching}>
      <div className="conversation">
        <HeaderList title="Các cuộc trò chuyện" />
        {listConversations?.map((item, i) => {
          return (
            <button
              onClick={() => handleRouterChat(item)}
              className="conversation__link"
              key={i}
            >
              <div className="conversation__container" key={i}>
                <div className="conversation__content">
                  <img
                    src={item?.avatarLocation || blank}
                    alt=""
                    className=" w-14 h-14 rounded-full"
                  />

                  <div className="flex flex-col items-start ml-2 ">
                    <h4 className="">{item?.contactName}</h4>
                    <div className="text-start text-xs text-neutral-400 flex gap-x-2">
                      {item?.lastMessageRes?.content}
                      <span className="">
                        {" - "}
                        {item?.lastMessageRes?.content &&
                          compareTime(item?.lastActivity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Spin>
  );
}
