import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import apiChat from "../../Services/apiChat";
import apiUser from "../../Services/apiUser";
import "./Contact.scss";
import ListContact from "./ListContact";

export default function Contact() {
  const location = useLocation();
  const pathName = location.pathname;
  const [loading, setLoading] = useState();
  const [listRequest, setListRequest] = useState();
  const [listFriends, setListFriends] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchListAddFri();
    fetchListFri();
  }, []);

  // API danh sách lời mời đã gửi
  const {
    data: listSendingFr,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["listSendingFr"],
    queryFn: async () => {
      const res = await apiUser.listSendingFr();
      return res.data;
    },
  });

  const fetchListAddFri = async () => {
    setLoading(true);
    try {
      let response = await apiUser.listRequestAddFr();
      setTimeout(() => {
        setListRequest(response.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchListFri = async () => {
    setLoading(true);
    try {
      let response = await apiUser.getListFriends();
      setTimeout(() => {
        setListFriends(response.data);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onCancelFriends = async (id, type) => {
    setLoading(true);
    try {
      let response = await apiUser.cancelRequestAddFr(id);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      fetchListAddFri();
      fetchListFri();
      refetch();
      if (response.code === 200) {
        if (type === "cancelFr") {
          message.success("Huỷ kết bạn thành công");
        } else if (type === "cancelRequest") {
          message.success("Huỷ lời mời kết bạn thành công");
        } else {
          message.success("Huỷ lời chấp nhận kết bạn thành công");
        }
      }
      return response;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onAcceptFriends = async (id) => {
    setLoading(true);
    try {
      let response = await apiUser.acceptRequestAddFr(id);
      setTimeout(() => {
        setLoading(false);
        message.success("Xác nhận kết bạn thành công");
      }, 500);
      fetchListAddFri();
      fetchListFri();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Xác nhận huỷ thành công");
    }
  };

  const handleRouterChat = async (item) => {
    try {
      const response = await apiChat.getConversationIdByUserId(item.userId);
      if (response.data) {
        setTimeout(() => {
          navigate(`/room/${item.userId}/${response.data.conversationId}`);
        }, 500);
      }
    } catch (error) {
      message.error("Có lỗi xảy ra.");
    }
  };

  const fakeData = [
    { name: "Eva", avt: "https://picsum.photos/201" },
    { name: "Mia", avt: "https://picsum.photos/202" },
    { name: "Bob", avt: "https://picsum.photos/203" },
    { name: "Katie", avt: "https://picsum.photos/204" },
    { name: "Liam", avt: "https://picsum.photos/205" },
    { name: "David", avt: "https://picsum.photos/206" },
    { name: "Quinn", avt: "https://picsum.photos/207" },
    { name: "Parker", avt: "https://picsum.photos/208" },
    { name: "Ivy", avt: "https://picsum.photos/209" },
    { name: "Jack", avt: "https://picsum.photos/210" },
    { name: "Ryan", avt: "https://picsum.photos/211" },
    { name: "Sophia", avt: "https://picsum.photos/220" },
    { name: "Thomas", avt: "https://picsum.photos/230" },
    { name: "Noah", avt: "https://picsum.photos/240" },
    { name: "Alice", avt: "https://picsum.photos/250" },
    { name: "Henry", avt: "https://picsum.photos/260" },
    { name: "Charlie", avt: "https://picsum.photos/270" },
    { name: "Olivia", avt: "https://picsum.photos/280" },
    { name: "Grace", avt: "https://picsum.photos/290" },
    { name: "Frank", avt: "https://picsum.photos/300" },
  ];

  const sortedData = fakeData
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <LoadingComponent loading={loading} />
      {pathName === "/friend" || pathName === "/contact" ? (
        <ListContact
          type="friend"
          data={listFriends}
          handleRouterChat={handleRouterChat}
          onCancelFriends={onCancelFriends}
        />
      ) : pathName === "/group" ? (
        <ListContact type="group" data={sortedData} />
      ) : (
        <ListContact
          type="request"
          listRequest={listRequest}
          listSendingFr={listSendingFr}
          onCancelFriends={onCancelFriends}
          onAcceptFriends={onAcceptFriends}
          refetch={refetch}
        />
      )}
    </>
  );
}
