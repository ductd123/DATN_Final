import React, { useEffect, useRef, useState } from "react";
import {
  FileAddOutlined,
  FileImageOutlined,
  FileWordOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Menu, Select, message } from "antd";
import { apiLearning } from "../../Services/apiLearning";
import LoadingComponent from "../Common/Loading/Loading";
import "./StudyAI.scss";

const BangChuCai = [
  "A",
  "Ă",
  "Â",
  "B",
  "C",
  "D",
  "Đ",
  "E",
  "Ê",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ô",
  "Ơ",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "Ư",
  "V",
  "X",
  "Y",
];

const BangChuSo = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const dau = ["Dấu sắc", "Dấu huyền", "Dấu hỏi", "Dấu Ngã", "Dấu nặng"];

const MenuStudyAI = ({
  onUploadVideo,
  openPanelHistory,
  handleClickMenu,
  handleSearch,
  openSearchWord,
  setValueOptions,
  listTopic,
  setIdTopic,
  fetchData,
  setSearchText,
}) => {
  const [topicItems, setTopicItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddTopic, setOpenAddTopic] = useState(false);
  const webcamRef = useRef(null);
  const [valueTopic, setValueTopic] = useState();
  const [valueVocabulary, setValueVocabulary] = useState();
  const [items, setItems] = useState([]);

  const fetchDataAndSetItems = async () => {
    setLoading(true);
    try {
      const response = await apiLearning.getTopic();
      const items = response.data?.map((element) => ({
        id: element.topicId,
        value: element.topicId,
        label: element.content,
      }));
      setTopicItems(items);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(`Kết nối không ổn định. Vui lòng thử lại!!!`);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const setLabelForSelect = (e) => {
    setIdTopic(e);
    setSearchText(topicItems.find((i) => i.value === e)?.label);
  };

  const onClick = (e) => {
    switch (e.key) {
      case "History":
        openPanelHistory();
        break;
      case "Upload":
        onUploadVideo();
        break;
      case "Search":
        openSearchWord();
        break;
      case "dau":
        setValueOptions(dau);
        handleClickMenu();
        break;
      case "chucai":
        setValueOptions(BangChuCai);
        handleClickMenu();
        setValueTopic(null);
        setValueVocabulary(null);
        break;
      case "chuso":
        setValueOptions(BangChuSo);
        handleClickMenu();
        setValueTopic(null);
        setValueVocabulary(null);
        break;
      case "AddTopic":
        setOpenAddTopic(true);
        break;
      case "SearchTopic":
        break;
      default:
        handleSearch(e.key);
        break;
    }
  };

  const initializeMenuItems = () => {
    const menuItems = [
      {
        key: "sub1",
        icon: <FileWordOutlined style={{ fontSize: "1.25rem" }} />,
        children: [
          { key: "chucai", label: "Theo chữ cái" },
          { key: "chuso", label: "Theo chữ số" },
        ],
        label: "Học tập theo bảng chữ cái",
        type: "subMenu",
      },
      {
        key: "sub2",
        icon: <FileImageOutlined style={{ fontSize: "1.25rem" }} />,
        children: [
          {
            key: "SearchTopic",
            label: (
              <Select
                showSearch
                placeholder="Chọn chủ đề"
                suffixIcon={null}
                style={{ width: "100%" }}
                mode=""
                options={topicItems}
                value={valueTopic}
                onChange={(e) => {
                  setValueTopic(e);
                  setLabelForSelect(e);
                  setValueVocabulary(null);
                }}
                filterOption={filterOption}
              />
            ),
          },
        ],
        label: "Học tập theo chủ đề",
        type: "subMenu",
      },
      {
        key: "sub4",
        icon: <FileAddOutlined style={{ fontSize: "1.25rem" }} />,
        children: [
          {
            key: "Search",
            label: (
              <Input
                value={valueVocabulary}
                onChange={(e) => {
                  setValueVocabulary(e.target.value);
                  setValueTopic(null);
                  handleSearch(e.target.value);
                }}
                placeholder="Nhập từ ngữ muốn tìm?"
              />
            ),
            icon: <SearchOutlined style={{ fontSize: "1rem" }} />,
          },
        ],
        label: "Học tập theo từ ngữ",
        type: "subMenu",
      },
    ];
    setItems(menuItems);
  };

  useEffect(() => {
    fetchDataAndSetItems();
  }, []);

  useEffect(() => {
    initializeMenuItems();
  }, [topicItems, valueTopic, valueVocabulary]);

  return (
    <div className="AI-menu-study">
      <LoadingComponent loading={loading} />

      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          paddingLeft: 0,
        }}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default MenuStudyAI;
