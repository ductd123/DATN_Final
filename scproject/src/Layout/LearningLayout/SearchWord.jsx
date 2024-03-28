import { SearchOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import defaultvideo from "../../assets/image/defaultvideo.png";
import { Empty, Modal, Pagination } from "antd";

const PAGE_SIZE = 10;
const SearchWord = ({ searchText, files }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fileShow, setFileShow] = useState({});
  const [showFileDetail, setShowFileDetail] = useState(false);
  const videoRef = useRef(null);

  // CHia page
  useEffect(() => {
    const totalPages =
      files?.length > PAGE_SIZE ? Math.ceil(files?.length / PAGE_SIZE) : 1;
    setCurrentPage(Math.min(currentPage, totalPages));
  }, [files, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (file) => {
    setShowFileDetail(true);
    setFileShow(file);
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
          {files?.length ? (
            files
              ?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              ?.map((item, i) => {
                return (
                  <div key={i} style={{ height: "max-content" }}>
                    {item.type === 1 ? (
                      <div
                        key={i}
                        className="searchWord-item"
                        style={{
                          backgroundImage: `url(${item.preview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
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
                            {item.content}
                          </p>
                        </div>
                        <button
                          className="searchWord-item-play"
                          onClick={() => handleViewDetail(item)}
                        >
                          Bấm để xem!!!
                        </button>
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="searchWord-item"
                        style={{
                          backgroundImage: `url(${defaultvideo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
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
                            {item.content}
                          </p>
                        </div>
                        <button
                          className="searchWord-item-play"
                          onClick={() => handleViewDetail(item)}
                        >
                          Bấm để xem!!!
                        </button>
                      </div>
                    )}
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
        title={fileShow.content}
        key={fileShow.preview}
        width={1100}
        centered
      >
        {fileShow.type === 1 ? (
          <img
            src={fileShow.preview}
            alt="Uploaded"
            style={{ width: "100%", height: "auto", marginTop: "30px" }}
          />
        ) : (
          <div className="justify-center flex w-full items-center">
            <video ref={videoRef} controls autoPlay className="w-full">
              <source src={fileShow.preview} type="video/mp4" />
            </video>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchWord;
