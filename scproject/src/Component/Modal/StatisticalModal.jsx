import { useQuery } from "@tanstack/react-query";
import { Modal, Select } from "antd";
import React, { useState } from "react";
import { apiLearning } from "../../Services/apiLearning";

const StatisticalModal = (props) => {
  const { showStatistical, setShowStatistical, listTopic } = props;
  const [valueTopic, setValueTopic] = useState();
  const [numberVocal, setNumberVocal] = useState();
  const [topicName, setTopicName] = useState();
  const [showNumberVocal, setShowNumberVocal] = useState(false);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const { data: lengthAllVocabulary } = useQuery({
    queryKey: ["listVocabulary"],
    queryFn: async () => {
      const response = await apiLearning.getAllVocalizations();
      return response.data?.length;
    },
    enabled: showStatistical,
  });

  const { data: optionTopic } = useQuery({
    queryKey: ["optionTopic"],
    queryFn: async () => {
      const response = await apiLearning.getTopic();
      return response.data?.map((element) => ({
        id: element.topicId,
        value: element.topicId,
        label: element.content,
      }));
    },
    enabled: showStatistical,
  });

  return (
    <>
      <Modal
        open={showStatistical}
        onCancel={() => setShowStatistical(false)}
        title="Thống kê"
        footer={null}
        width={1000}
      >
        <div className="uppercase font-semibold text-xl flex justify-between">
          <div className="font-bold ">Chủ đề & Từ vựng</div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <div
            className="w-64 h-32 p-3 bg-white rounded-xl mt-6"
            style={{
              border: "3px solid #f6f6f6",
            }}
          >
            <div className="flex justify-between mb-5 text-sm text-gray-500">
              <div>Tổng</div>
              <div className="font-bold">Chủ đề</div>
            </div>
            <div className="flex items-center justify-between ">
              <div
                className="font-bold flex items-center cursor-pointer text-[34px]"
                aria-hidden="true"
              >
                {listTopic.length}
              </div>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#EAECF4",
                  height: "30px",
                  width: "30px",
                }}
              ></div>
            </div>
          </div>

          <div
            className="w-64 h-32 p-3 bg-white rounded-xl mt-6"
            style={{
              border: "3px solid #f6f6f6",
            }}
          >
            <div className="flex justify-between mb-5 text-sm text-gray-500">
              <div>Tổng</div>
              <div className="font-bold">Từ vựng</div>
            </div>
            <div className="flex items-center justify-between ">
              <div
                className="font-bold flex items-center cursor-pointer text-[34px]"
                aria-hidden="true"
              >
                {lengthAllVocabulary}
              </div>
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: "#EAECF4",
                  height: "30px",
                  width: "30px",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="text-xl font-bold">Theo chủ đề</div>
        <div className="mt-4">
          <Select
            showSearch
            placeholder="Chọn chủ đề"
            suffixIcon={null}
            style={{ width: "100%" }}
            mode=""
            options={optionTopic}
            value={valueTopic}
            onChange={async (e, option) => {
              setShowNumberVocal(true);
              setValueTopic(e);
              setTopicName(option.label);
              const res = await apiLearning.getTuDien(e);
              if (res.data) {
                setNumberVocal(res.data?.length);
              } else {
                setNumberVocal(0);
              }
            }}
            filterOption={filterOption}
          />
        </div>
        {showNumberVocal && (
          <div className="flex gap-4 items-center justify-center pb-10">
            <div
              className="w-64 h-32 p-3 bg-white rounded-xl mt-6"
              style={{
                border: "3px solid #f6f6f6",
              }}
            >
              <div className="flex  mb-5 text-sm text-gray-500">
                <div className="font-bold">Chủ đề</div>
              </div>
              <div className="flex items-center justify-between ">
                <div
                  className="font-bold flex items-center cursor-pointer text-[14px]"
                  aria-hidden="true"
                >
                  {topicName}
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#EAECF4",
                    height: "30px",
                    width: "30px",
                  }}
                ></div>
              </div>
            </div>

            <div
              className="w-64 h-32 p-3 bg-white rounded-xl mt-6"
              style={{
                border: "3px solid #f6f6f6",
              }}
            >
              <div className="flex justify-between mb-5 text-sm text-gray-500">
                <div>Tổng</div>
                <div className="font-bold">Từ vựng</div>
              </div>
              <div className="flex items-center justify-between ">
                <div
                  className="font-bold flex items-center cursor-pointer text-[34px]"
                  aria-hidden="true"
                >
                  {numberVocal}
                </div>
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "#EAECF4",
                    height: "30px",
                    width: "30px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default StatisticalModal;
