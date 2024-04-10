import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import defaultvideo from "../../assets/image/defaultvideo.png";
import { Button, Empty, Modal, Pagination, Carousel } from "antd";
import ButtonSystem from "../../Component/button/ButtonSystem";

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
    setShowFileDetail(false);
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const slider = useRef(null);
  const slider1 = useRef(null);

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
                          item?.vocabularyMediumRes[0]?.imageLocation !== ""
                            ? item?.vocabularyMediumRes[0]?.imageLocation
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
        footer={[]}
        onCancel={onCloseDetail}
        style={{ top: 20 }}
        title={files[fileIndex]?.content}
        width={1300}
        key={files[fileIndex]?.content}
        centered
      >
        <div className="w-full px-4 ">
          <div className="w-full flex gap-6">
            <div className="relative w-1/3 flex justify-center items-center">
              <CustomSlider ref={slider} className="w-full" dots={false}>
                {files[fileIndex]?.vocabularyMediumRes?.map((item, index) => (
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
                ))}
              </CustomSlider>
              <div className="absolute bottom-10 flex">
                <Button
                  style={{
                    display:
                      files[fileIndex]?.vocabularyMediumRes?.length < 2
                        ? "none"
                        : "block",
                  }}
                  icon={<LeftOutlined />}
                  onClick={() => slider.current.prev()}
                />
                <Button
                  style={{
                    display:
                      files[fileIndex]?.vocabularyMediumRes?.length < 2
                        ? "none"
                        : "block",
                  }}
                  icon={<RightOutlined />}
                  onClick={() => slider.current.next()}
                />
              </div>
            </div>
            <div className="relative w-2/3">
              <Carousel ref={slider1} className="w-full" dots={false}>
                {files[fileIndex]?.vocabularyMediumRes?.map((item, index) => (
                  <>
                    {item.videoLocation ? (
                      <video controls autoPlay className="w-full">
                        <source src={item.videoLocation} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="text-xl text-center">
                        Chưa có video minh hoạ
                      </div>
                    )}
                  </>
                ))}
              </Carousel>
              <div className="absolute -top-8 left-1/2 flex">
                <Button
                  style={{
                    display:
                      files[fileIndex]?.vocabularyMediumRes?.length < 2
                        ? "none"
                        : "block",
                  }}
                  icon={<LeftOutlined />}
                  onClick={() => slider1.current.prev()}
                />
                <Button
                  style={{
                    display:
                      files[fileIndex]?.vocabularyMediumRes?.length < 2
                        ? "none"
                        : "block",
                  }}
                  icon={<RightOutlined />}
                  onClick={() => slider1.current.next()}
                />
              </div>
            </div>
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
    </div>
  );
};

export default SearchWord;
