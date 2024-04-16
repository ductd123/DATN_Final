import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import defaultvideo from "../../assets/image/defaultvideo.png";
import { Button, Empty, Modal, Pagination, Carousel, Select } from "antd";
import ButtonSystem from "../../Component/button/ButtonSystem";
import { filterOption } from "../../Component/LearningMenu/LearningMenu";
import { apiLearning } from "../../Services/apiLearning";

const PAGE_SIZE = 12;
const CustomSlider = styled(Carousel)`
  &.ant-carousel {
    width: 100%;
  }
`;

const SearchWord = ({ searchText, files }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFileDetail, setShowFileDetail] = useState(false);
  const videoRef = useRef(null);
  const [fileIndex, setFileIndex] = useState(0);
  const [topicItems, setTopicItems] = useState([]);
  const [valueTopic, setValueTopic] = useState();

  const [isOpenSelectTopic, setIsOpenSelectTopic] = useState(false);

  // video
  const slider = useRef(null);
  const [autoplayEnabled, setAutoplay] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoCurrent, setVideoCurrent] = useState();

  useEffect(() => {
    if (showFileDetail) {
      setAutoplay(true);
      setVideoCurrent(
        files[fileIndex]?.vocabularyVideoResList[0].videoLocation
      );
      setCurrentVideoIndex(0);
    }
  }, [showFileDetail, fileIndex, files]);

  const handleNextVideo = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < files[fileIndex]?.vocabularyVideoResList?.length) {
      setCurrentVideoIndex(nextIndex);
      setAutoplay(true);
      setVideoCurrent(
        files[fileIndex]?.vocabularyVideoResList[nextIndex].videoLocation
      );
    }
  };

  const handlePreviousVideo = () => {
    const previousIndex = currentVideoIndex - 1;
    if (previousIndex >= 0) {
      setCurrentVideoIndex(previousIndex);
      setAutoplay(true);
      setVideoCurrent(
        files[fileIndex]?.vocabularyVideoResList[previousIndex].videoLocation
      );
    }
  };

  //  next files
  const handleNext = () => {
    setFileIndex((prevIndex) => Math.min(prevIndex + 1, files?.length - 1));
  };

  const handlePrevious = () => {
    setFileIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // CHia page
  useEffect(() => {
    const totalPages =
      files?.length > PAGE_SIZE ? Math.ceil(files?.length / PAGE_SIZE) : 1;
    setCurrentPage(Math.min(currentPage, totalPages));
  }, [files, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = () => {
    setShowFileDetail(true);
  };

  const onCloseDetail = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setAutoplay(false);
    setVideoCurrent(null);
    setShowFileDetail(false);
  };

  return (
    <div className="searchWord">
      <div className="searchWord-header flex-center">
        <SearchOutlined style={{ fontSize: "1.25rem" }} />
        <div className="searchWord-header-text">Kết quả tìm kiếm cho: </div>
        <span className="searchWord-header-value">"{searchText}"</span>
      </div>
      <div className="">
        <div className="flex gap-4 flex-wrap">
          {files && files?.length ? (
            files
              ?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              ?.map((item, i) => {
                return (
                  <div key={i} style={{ height: "max-content" }}>
                    <div
                      key={i}
                      className="searchWord-item "
                      style={{
                        backgroundImage: `url(${
                          item?.vocabularyImageResList[0]?.imageLocation !== ""
                            ? item?.vocabularyImageResList[0]?.imageLocation
                            : defaultvideo
                        })`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="searchWord-item-detail">
                        <p
                          style={{
                            fontWeight: "600",
                            fontSize: "28px",
                            marginLeft: "10px",
                          }}
                        >
                          {item?.content}
                        </p>
                      </div>
                      <button
                        className="searchWord-item-play"
                        onClick={() => {
                          handleViewDetail(item);
                          setFileIndex(i + (currentPage - 1) * PAGE_SIZE);
                        }}
                      >
                        Bấm để xem!!!
                      </button>
                    </div>
                  </div>
                );
              })
          ) : (
            <Empty
              style={{ width: "100%" }}
              description={`Không có dữ liệu cho "${searchText}".`}
            />
          )}
          {files?.length > PAGE_SIZE && (
            <div className="flex justify-center w-full pb-3">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={files?.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        open={showFileDetail}
        // footer={
        //   <div className="">
        //     <ButtonSystem
        //       className="flex items-center"
        //       type="primary"
        //       onClick={async () => {
        //         setIsOpenSelectTopic(true);
        //         const response = await apiLearning.getTopic();
        //         const items = response.data?.map((element) => ({
        //           id: element.topicId,
        //           value: element.topicId,
        //           label: element.content,
        //         }));
        //         setTopicItems(items);
        //       }}
        //     >
        //       Thêm vào chủ đề
        //     </ButtonSystem>
        //   </div>
        // }

        footer={null}
        onCancel={onCloseDetail}
        style={{ top: 20 }}
        title={
          <div className="text-[32px] font-bold">
            {files[fileIndex]?.content}
          </div>
        }
        width={1300}
        key={files[fileIndex]?.content}
        centered
      >
        <div className="w-full px-4  ">
          <div className="w-full ">
            <div className="grid grid-cols-3 gap-4">
              {/* image */}
              <div className="col-span-1 flex items-center justify-center">
                <CustomSlider ref={slider} className="w-full" dots={false}>
                  {files[fileIndex]?.vocabularyImageResList?.map(
                    (item, index) => (
                      <div>
                        {item.imageLocation ? (
                          <img
                            src={item.imageLocation}
                            alt="Uploaded"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          <div className="text-xl text-center">
                            Chưa có hình ảnh minh hoạ
                          </div>
                        )}
                      </div>
                    )
                  )}
                </CustomSlider>
              </div>
              {/* video */}
              <div className="col-span-2">
                {videoCurrent ? (
                  <video
                    key={videoCurrent}
                    controls
                    ref={videoRef}
                    autoPlay={autoplayEnabled}
                    className="w-full"
                    onEnded={() => setAutoplay(false)}
                  >
                    <source src={videoCurrent} type="video/mp4" />
                  </video>
                ) : (
                  <div className="text-xl text-center">
                    Chưa có video minh hoạ
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex px-4 justify-between">
          <div className="flex w-1/3 justify-center">
            <Button
              style={{
                display:
                  files[fileIndex]?.vocabularyImageResList?.length < 2
                    ? "none"
                    : "block",
              }}
              icon={<LeftOutlined />}
              onClick={() => slider.current.prev()}
            />
            <Button
              style={{
                display:
                  files[fileIndex]?.vocabularyImageResList?.length < 2
                    ? "none"
                    : "block",
              }}
              icon={<RightOutlined />}
              onClick={() => slider.current.next()}
            />
          </div>
          <div className="flex w-2/3 justify-center mt-4">
            <Button
              style={{ display: currentVideoIndex === 0 ? "none" : "block" }}
              icon={<LeftOutlined />}
              onClick={handlePreviousVideo}
            />
            <Button
              style={{
                display:
                  currentVideoIndex ===
                  files[fileIndex]?.vocabularyVideoResList?.length - 1
                    ? "none"
                    : "block",
              }}
              icon={<RightOutlined />}
              onClick={handleNextVideo}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4 gap-3">
          <ButtonSystem disabled={fileIndex === 0} onClick={handlePrevious}>
            Previous (Lùi lại)
          </ButtonSystem>
          <ButtonSystem
            disabled={fileIndex === files?.length - 1}
            onClick={handleNext}
          >
            Next (Kế tiếp)
          </ButtonSystem>
        </div>
      </Modal>

      <Modal
        title="Lựa chọn topic muốn thêm từ"
        open={isOpenSelectTopic}
        okText="Xác nhận"
        cancelText="Huỷ bỏ"
        centered
        onOk={() => {
          //  Thực hiện thêm từ đó vào
        }}
        onCancel={() => setIsOpenSelectTopic(false)}
      >
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
          }}
          filterOption={filterOption}
        />
      </Modal>
    </div>
  );
};

export default SearchWord;
