import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import defaultvideo from "../../assets/image/defaultvideo.png";
import { Button, Empty, Modal, Pagination } from "antd";

const PAGE_SIZE = 12;
const SearchWord = ({ searchText, files }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFileDetail, setShowFileDetail] = useState(false);
  const videoRef = useRef(null);
  const [fileIndex, setFileIndex] = useState(0);
  const [isSingleColumn, setIsSingleColumn] = useState(false);

  const handleNext = () => {
    setFileIndex((prevIndex) => Math.min(prevIndex + 1, files?.length - 1));
  };

  const handlePrevious = () => {
    setFileIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    setIsSingleColumn(
      files[fileIndex]?.imageLocation === "" ||
        files[fileIndex]?.videoLocation === ""
    );
  }, [fileIndex, files]);

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
                      className="searchWord-item w-1/2"
                      style={{
                        backgroundImage: `url(${
                          item.imageLocation !== ""
                            ? item.imageLocation
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
        width={1100}
        key={files[fileIndex]?.content}
        centered
      >
        <div className="w-full flex gap-4">
          {isSingleColumn ? (
            <div className="w-full">
              {files[fileIndex]?.imageLocation !== "" && (
                <img
                  src={files[fileIndex]?.imageLocation}
                  alt="Uploaded"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              {files[fileIndex]?.videoLocation !== "" && (
                <div className="justify-center flex w-full items-center">
                  <video ref={videoRef} controls autoPlay className="w-full">
                    <source
                      src={files[fileIndex]?.videoLocation}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="w-1/3 flex justify-center items-center">
                {files[fileIndex]?.imageLocation !== "" && (
                  <img
                    src={files[fileIndex]?.imageLocation}
                    alt="Uploaded"
                    className="object-contain"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </div>
              <div className="w-2/3">
                {files[fileIndex]?.videoLocation !== "" && (
                  <div className="justify-center flex w-full items-center">
                    <video ref={videoRef} controls autoPlay className="w-full">
                      <source
                        src={files[fileIndex]?.videoLocation}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button disabled={fileIndex === 0} onClick={handlePrevious}>
            Previous (Lùi lại)
          </Button>
          <Button
            disabled={fileIndex === files?.length - 1}
            onClick={handleNext}
          >
            Next (Kế tiếp)
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SearchWord;
