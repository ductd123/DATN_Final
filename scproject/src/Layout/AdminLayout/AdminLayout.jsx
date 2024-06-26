import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  AuditOutlined,
  EyeTwoTone,
  HistoryOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Empty,
  FloatButton,
  Input,
  Modal,
  Select,
  Slider,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { HeaderBar, Nav } from "../../Component";
import LoadingComponent from "../../Component/Common/Loading/Loading";
import MenuAdmin from "../../Component/MenuAdmin/MenuAdmin";
import { apiLearning, apiUploadFile } from "../../Services/apiLearning";
import blank from "../../assets/image/AvtBlank.jpg";
import defaultvideo from "../../assets/image/defaultvideo.png";

import { useUser } from "../../hooks/useUser";
import "./AdminLayout.scss";

const optionStatus = [
  {
    label: "Đang chờ phê duyệt",
    value: 100,
  },
  {
    label: "Đã phê duyệt",
    value: 200,
  },
  {
    label: "Từ chối",
    value: 300,
  },
];

export function isImage(url) {
  const extension = url?.split(".").pop().toLowerCase();

  return ["jpg", "jpeg", "png", "bmp", "gif"].includes(extension);
}

const AdminLayout = () => {
  const { user } = useUser();
  const [listAccept, setListAccept] = useState({});
  const [simpleMenu, setSimpleMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoTNV, setVideoTNV] = useState(false);
  const [preview, setPreview] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [history, setHistory] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const videoRef = useRef(null);
  const [dataTable, setDataTable] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [vocabOption, setVocabOption] = useState();
  const [topicInit, setTopicInit] = useState();
  const [filter, setFilter] = useState({
    page: 1,
    size: 999999,
    vocabulary: "",
    volunteerEmail: "",
    topic: "",
    status: 100,
    ascending: true,
    orderBy: "",
    // createdFrom: "",
    // createdTo: "",
  });

  const [showFeedback, setShowFeedBack] = useState(false);
  const [idDataCollection, setIdDataCollection] = useState(false);
  const [typeCollection, setTypeCollection] = useState("");
  const [valueFeedback, setValueFeedback] = useState("");
  const [score, setScore] = useState(1);

  const onChangeScore = (newValue) => {
    setScore(newValue);
  };

  const columns = [
    {
      title: "Chủ đề",
      dataIndex: "topicContent",
      key: "topicContent",
      width: "20%",
      render: (a) => <span style={{ fontWeight: 500 }}>{a}</span>,
    },
    {
      title: "Từ vựng",
      dataIndex: "vocabularyContent",
      key: "vocabularyContent",
      sorter: (a, b) => a.vocab - b.vocab,
      width: "10%",
      render: (a) => <span style={{ fontWeight: 500 }}>{a}</span>,
    },
    {
      title: "Người đăng",
      dataIndex: "editor",
      key: "editor",
      width: "20%",
    },
    {
      title: "Ngày đăng",
      dataIndex: "created",
      key: "created",
      width: "20%",
      render: (text) => (
        <span>
          {new Date(text).getHours()}:{new Date(text).getMinutes()}{" "}
          {new Date(text).getDate()}/{new Date(text).getMonth() + 1}/
          {new Date(text).getFullYear()}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status) =>
        status === 100 ? (
          <div style={{ display: "table" }}>
            <div style={{ display: "table-cell", verticalAlign: "top" }}>
              <div
                className="dot-status"
                style={{ border: `1px solid gray`, backgroundColor: "gray" }}
              ></div>
            </div>
            <div
              style={{ display: "table-cell", verticalAlign: "top" }}
              className="inline-block"
              data-tooltip="true"
            >
              Đang chờ xét duyệt
            </div>
          </div>
        ) : status === 200 ? (
          <div style={{ display: "table" }}>
            <div style={{ display: "table-cell", verticalAlign: "top" }}>
              <div
                className="dot-status"
                style={{
                  border: `1px solid #00db00`,
                  backgroundColor: "#00db00",
                }}
              ></div>
            </div>
            <div
              style={{ display: "table-cell", verticalAlign: "top" }}
              className="inline-block"
              data-tooltip="true"
            >
              Đã xét duyệt
            </div>
          </div>
        ) : (
          <div style={{ display: "table" }}>
            <div style={{ display: "table-cell", verticalAlign: "top" }}>
              <div
                className="dot-status"
                style={{ border: `1px solid red`, backgroundColor: "red" }}
              ></div>
            </div>
            <div
              style={{ display: "table-cell", verticalAlign: "top" }}
              className="inline-block"
              data-tooltip="true"
            >
              Từ chối
            </div>
          </div>
        ),
    },
    {
      title: "Xem lại",
      dataIndex: "dataLocation",
      key: "dataLocation",
      width: "20%",
      render: (text) => (
        <Button
          key={text}
          onClick={() => xemLaiData(text)}
          icon={<EyeTwoTone style={{ fontSize: "1.25rem" }} />}
        ></Button>
      ),
    },
  ];

  useEffect(() => {
    initPendingData();
    // getTableData();
    getTopic();
    setShowPending(true);
  }, []);

  const initPendingData = async () => {
    let response = await apiUploadFile.getPendingData();
    setListAccept(response.data);
  };

  const getTopic = async () => {
    setLoading(true);
    try {
      setLoading(false);
      let response = await apiLearning.getTopic();
      const items = [];
      response.data.forEach((element, index) => {
        items.push({
          id: element.topicId,
          value: element.topicId,
          label: element.content,
          text: element.content,
        });
      });
      setTopicInit(items);
    } catch (error) {
      setLoading(false);
    }
  };

  const getHistory = async () => {
    setLoading(true);
    try {
      let response = await apiUploadFile.getPendingData();
      setHistory(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTableData = async () => {
    setLoading(true);
    try {
      setLoading(false);
      let response = await apiLearning.getTableSearchData(filter);
      if (response.data.length === 0) {
        message.warning("Không có nội dung cần tìm");
        setDataTable([]);
      } else {
        setDataTable(response.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const approvedData = async (body) => {
    try {
      setLoading(false);
      await apiUploadFile.approvedData(body);
      message.success("Đã chấp nhận dữ liệu thành công");
      initPendingData();
      getHistory();
      setShowFeedBack(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Kết nối không ổn định, vui lòng thử lại.");
      setShowFeedBack(false);
    }
  };

  const rejectData = async (body) => {
    setLoading(true);
    try {
      setLoading(false);

      await apiUploadFile.rejectData(body);
      message.success("Đã từ chối dữ liệu thành công");
      initPendingData();
      setShowFeedBack(false);
    } catch (error) {
      setLoading(false);
      message.error("Kết nối không ổn định, vui lòng thử lại.");
      setShowFeedBack(false);
    }
  };
  const xemLaiData = (link) => {
    let item = {
      content: "",
      id: link,
      dataLocation: link,
    };
    setPreview(item);
    setShowPreview(true);
  };
  const onPreviewHistory = (item) => {
    setShowPreview(true);
    setPreview(item);
  };
  const onChangeFilter = (property, value) => {
    setFilter({
      ...filter,
      [property]: value,
    });
  };

  const onChooseTopic = async (e, option) => {
    if (e) {
      setLoading(true);
      onChangeFilter("topic", option?.text);
      let response = await apiLearning.getTuDien(e);
      const items = [];
      if (response.data?.length) {
        response.data?.forEach((element, index) => {
          items.push({
            id: element.vocabularyId,
            value: element.content,
            label: element.content,
          });
        });
      }

      setVocabOption(items);
      setLoading(false);
    } else {
      setVocabOption([]);
    }
  };

  return (
    <div className="main-layout">
      <LoadingComponent loading={loading} />
      <Nav />
      {showPending ? (
        <Tooltip
          title="Thống kê nội dung đã phê duyệt"
          placement="left"
          trigger="hover"
          color="#4096ff"
        >
          <FloatButton
            style={{
              right: 34,
            }}
            type="primary"
            icon={<AuditOutlined />}
            onClick={() => {
              setShowPending(false);
              setSimpleMenu(true);
              setDataTable([]);
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip
          title="Xem danh sách cần phê duyệt"
          placement="left"
          trigger="hover"
          color="#4096ff"
        >
          <FloatButton
            style={{
              right: 34,
            }}
            type="primary"
            icon={<HistoryOutlined />}
            onClick={() => {
              setShowPending(true);
              setDataTable([]);
            }}
          />
        </Tooltip>
      )}
      <div className="main-layout__container">
        <div
          className="main-layout__side-bar"
          style={simpleMenu ? { width: "50px" } : {}}
        >
          <div className="main-layout__header-bar">
            <HeaderBar disableSearch={true} />
          </div>
          <div className="main-layout__content">
            <Button
              className="setupMenu-button"
              icon={
                simpleMenu ? (
                  <ArrowRightOutlined style={{ color: "blue" }} />
                ) : (
                  <ArrowLeftOutlined style={{ color: "blue" }} />
                )
              }
              onClick={() => setSimpleMenu(!simpleMenu)}
              style={simpleMenu ? { left: "80px" } : { left: "320px" }}
            />
            <MenuAdmin
              getHistory={getHistory}
              history={history}
              setVideoTNV={setVideoTNV}
            />
          </div>
        </div>
        {showPending ? (
          <div className="main-layout__children flex-center">
            <div className="contact">
              <div className="contact-panel__header">
                <div className="list-contact__selection">
                  <AuditOutlined />
                  <div className="list-contact__content">
                    Danh sách cần phê duyệt
                  </div>
                </div>
              </div>
              <div className="contact-panel__details">
                <div className="list-contact__length">
                  Số lượng yêu cầu: {listAccept?.length || 0}
                </div>
                <div className="list-contact__all">
                  {listAccept?.length ? (
                    listAccept.map((item, index) => (
                      <>
                        <div
                          className="card-wrapper"
                          key={index}
                          style={{
                            flexDirection: "column",
                            paddingLeft: "15px",
                          }}
                        >
                          <div className="conversation__content">
                            {isImage(item.dataLocation) ? (
                              <img
                                src={item.dataLocation || blank}
                                alt=""
                                className="w-14 h-14 rounded-full mr-4"
                              />
                            ) : (
                              <img
                                src={blank}
                                alt=""
                                className="w-14 h-14 rounded-full mr-4"
                              />
                            )}

                            <div
                              className="conversation__main"
                              style={{ width: "400px" }}
                            >
                              <h4
                                className="conversation__name"
                                style={{ fontWeight: 600 }}
                              >
                                Nội dung: {item?.vocabularyContent}
                                {/* {isImage(item.dataLocation) ? (
                                  <img
                                    src={item?.dataLocation}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      marginTop: "30px",
                                    }}
                                  />
                                ) : (
                                  <video
                                    ref={videoRef}
                                    controls
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      marginTop: "30px",
                                    }}
                                  >
                                    <source
                                      src={item?.dataLocation}
                                      type="video/mp4"
                                    />
                                  </video>
                                )} */}
                              </h4>
                              <h4 className="conversation__name">
                                Người đăng: {item.volunteerEmail}
                              </h4>
                            </div>
                            <div className="contact_button">
                              <Button
                                className="contact_button-deny"
                                key={`xemlai ${item.id}`}
                                onClick={() => onPreviewHistory(item)}
                              >
                                Xem lại
                              </Button>
                              <Button
                                className="contact_button-deny"
                                key={`tuchoi ${item.id}`}
                                onClick={() => {
                                  setTypeCollection("Reject");
                                  setShowFeedBack(true);
                                  setIdDataCollection(item.dataCollectionId);
                                }}
                              >
                                Từ chối
                              </Button>
                              <Button
                                className="contact_button-accept"
                                key={`chapnhan ${item.id}`}
                                onClick={() => {
                                  setTypeCollection("Approve");
                                  setShowFeedBack(true);
                                  setIdDataCollection(item.dataCollectionId);
                                }}
                              >
                                Đồng ý
                              </Button>
                            </div>
                          </div>
                        </div>
                        <hr
                          style={{
                            height: "1px",
                            backgroundColor: "rgb(221, 221, 221)",
                            marginLeft: "65px",
                          }}
                        ></hr>
                      </>
                    ))
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        paddingLeft: "15px",
                      }}
                    >
                      <Empty description="Không có yêu cầu phê duyệt nào." />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="contact" style={{ height: "100%" }}>
            <div className="contact-panel__header">
              <div className="list-contact__selection">
                <VideoCameraAddOutlined />
                <div className="list-contact__content">
                  Nội dung cần phê duyệt
                </div>
              </div>
              <div
                style={{
                  padding: 20,
                  overflow: "auto",
                  height: "calc(100vh - 44px)",
                }}
              >
                <Button
                  type="primary"
                  style={{ fontWeight: 500, marginBottom: 10 }}
                  onClick={() => {
                    getTableData();
                    setShowFilter(false);
                  }}
                >
                  Tìm kiếm
                </Button>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <Select
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Chọn chủ đề"
                    options={topicInit}
                    onChange={onChooseTopic}
                  />
                  <Select
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Chọn từ vựng"
                    options={vocabOption}
                    onChange={(e) => onChangeFilter("vocabulary", e)}
                  />
                  <Input
                    allowClear
                    placeholder="Tìm theo người đăng"
                    onChange={(e) =>
                      onChangeFilter("volunteerEmail", e.target.value)
                    }
                  />
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    allowClear
                    format="DD/MM/YYYY"
                    placeholder="Thời gian đăng từ"
                    onChange={(e) => {
                      const year = e?.$y;
                      const month = (e?.$M + 1).toString().padStart(2, "0");
                      const day = (e?.$D).toString().padStart(2, "0");

                      onChangeFilter("createTo", `${year}-${month}-${day}`);
                    }}
                  />
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    allowClear
                    format="DD/MM/YYYY"
                    placeholder="Thời gian đăng đến"
                    onChange={(e) => {
                      const year = e?.$y || 2000;
                      const month = (e?.$M + 1).toString().padStart(2, "0");
                      const day = (e?.$D || "01").toString().padStart(2, "0");

                      onChangeFilter("createFrom", `${year}-${month}-${day}`);
                    }}
                  />
                  <Select
                    allowClear
                    style={{ width: 200 }}
                    placeholder="Trạng thái"
                    options={optionStatus}
                    value={filter.status}
                    onChange={(e) => onChangeFilter("status", e)}
                  />
                </div>

                {/* Table */}
                {dataTable.length ? (
                  <Table dataSource={dataTable} columns={columns} />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={showFilter}
        onCancel={() => setShowFilter(false)}
        onOk={() => {
          getTableData();
          setShowFilter(false);
        }}
        okText={"Tìm kiếm"}
        cancelText="Hủy bỏ"
        title="Tìm kiếm nội dung"
      >
        <div className="filter">
          <div style={{ minWidth: "100px", display: "inline-grid", gap: 4 }}>
            <span style={{ fontWeight: 500 }}>Chọn chủ đề</span>
            <Select options={topicInit} onChange={onChooseTopic} />
          </div>
          <div style={{ minWidth: "100px", display: "inline-grid", gap: 4 }}>
            <span style={{ fontWeight: 500 }}>Chọn từ vựng</span>
            <Select />
          </div>
          <div style={{ minWidth: "100px", display: "inline-grid", gap: 4 }}>
            <span style={{ fontWeight: 500 }}>Người đăng</span>
            <Input placeholder="nhập Email người đăng" />
          </div>
          <div style={{ minWidth: "100px", display: "inline-grid", gap: 4 }}>
            <span style={{ fontWeight: 500 }}>Thời gian đăng: Từ</span>
          </div>
          <div style={{ minWidth: "100px", display: "inline-grid", gap: 4 }}>
            <span style={{ fontWeight: 500 }}>Đến:</span>
          </div>
          {/* <div style={{ minWidth: '100px', display: 'inline-grid', gap: 4 }}>
                        <span style={{ fontWeight: 500 }}>Trạng thái</span>
                        <Select options={statusEnum} onChange={(e)=>onChangeFilter('status', e)} />
                    </div> */}
        </div>
      </Modal>
      <Modal
        open={showPreview}
        footer={[]}
        onCancel={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
          setShowPreview(false);
        }}
        style={{ top: 20 }}
        title={preview?.content}
        key={preview?.id}
        width={800}
        centered
      >
        {isImage(preview.dataLocation) ? (
          <div className="w-full  flex justify-center items-cente">
            <img
              alt=""
              src={preview?.dataLocation}
              style={{
                width: "60%",
                height: "auto",
                marginTop: "30px",
              }}
            />
          </div>
        ) : (
          <div className="w-full  flex justify-center items-center">
            <video ref={videoRef} controls style={{ height: 600 }}>
              <source src={preview?.dataLocation} type="video/mp4" />
            </video>
          </div>
        )}
      </Modal>

      {/* Feeback */}
      <Modal
        open={showFeedback}
        onCancel={() => {
          setShowFeedBack(false);
        }}
        maskClosable={false}
        onOk={() => {
          if (typeCollection === "Approve") {
            approvedData({
              dataCollectionId: idDataCollection,
              feedBack: valueFeedback,
              score: score,
            });
          } else {
            rejectData({
              dataCollectionId: idDataCollection,
              feedBack: valueFeedback,
              score: score,
            });
          }
        }}
        okText="Xác nhận"
        cancelText="Huỷ"
        destroyOnClose
        width={600}
        closeIcon={null}
      >
        <Input.TextArea
          placeholder="Nhận xét"
          rows={4}
          onChange={(e) => setValueFeedback(e.target.value)}
        />
        <div className="mt-4">Thang điểm</div>
        <Select
          className="w-1/2"
          placeholder="Lựa chọn điểm đánh giá"
          options={[
            { label: "1", value: 1 },
            { label: "2", value: 2 },
            { label: "3", value: 3 },
            { label: "4", value: 4 },
            { label: "5", value: 5 },
            { label: "6", value: 6 },
            { label: "7", value: 7 },
            { label: "8", value: 8 },
            { label: "9", value: 9 },
            { label: "10", value: 10 },
          ]}
          onChange={onChangeScore}
        />
      </Modal>
    </div>
  );
};

export default AdminLayout;
