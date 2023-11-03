import React from "react";
import "./Contact.scss";
import { useLocation } from "react-router-dom";
import { Users } from "react-feather";
export default function Contact() {
  const location = useLocation();
  const pathName = location.pathname;
  const fakeData = [
    { name: "Eva", avt: "https://picsum.photos/200" },
    { name: "Mia", avt: "https://picsum.photos/200" },
    { name: "Bob", avt: "https://picsum.photos/200" },
    { name: "Katie", avt: "https://picsum.photos/200" },
    { name: "Liam", avt: "https://picsum.photos/200" },
    { name: "David", avt: "https://picsum.photos/200" },
    { name: "Quinn", avt: "https://picsum.photos/200" },
    { name: "Parker", avt: "https://picsum.photos/200" },
    { name: "Ivy", avt: "https://picsum.photos/200" },
    { name: "Jack", avt: "https://picsum.photos/200" },
    { name: "Ryan", avt: "https://picsum.photos/200" },
    { name: "Sophia", avt: "https://picsum.photos/200" },
    { name: "Thomas", avt: "https://picsum.photos/200" },
    { name: "Noah", avt: "https://picsum.photos/200" },
    { name: "Alice", avt: "https://picsum.photos/200" },
    { name: "Henry", avt: "https://picsum.photos/200" },
    { name: "Charlie", avt: "https://picsum.photos/200" },
    { name: "Olivia", avt: "https://picsum.photos/200" },
    { name: "Grace", avt: "https://picsum.photos/200" },
    { name: "Frank", avt: "https://picsum.photos/200" },
  ];
  const sortedData = fakeData.slice().sort((a, b) => a.name.localeCompare(b.name));


  return (
    <div className="contact">
      <div className="contact-panel__header">
        {pathName === "/friend" ?
          <div className="list-contact__selection">
            <i className="fa-regular fa-user fa-lg"></i>
            <div className="list-contact__content">Danh sách bạn bè</div>
          </div> :
          pathName === "/group" ?
            <div className="list-contact__selection">
              <Users />
              <div className="list-contact__content">Danh sách nhóm

              </div>
            </div> :
            <div className="list-contact__selection">
              <i className="fa-regular fa-envelope-open"></i>
              <div className="list-contact__content">Lời mời kết bạn</div>
            </div>
        }
      </div>
      <div className="contact-panel__details">
        {pathName === "/friend" ?
          <>
            <div className="list-contact__length">
              Bạn bè ({sortedData.length})
            </div>
            <div className="list-contact__all">
              {
                sortedData.map((item, index) => (<><div className="conversation__container" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                  <div className="conversation__content">
                    <img
                      src={item.avt}
                      alt=""
                      className="conversation__img"
                    />
                    <div className="conversation__main">
                      <h4 className="conversation__name">{item.name}</h4>
                    </div>
                  </div>

                </div>
                  <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>

                ))
              }
            </div>
          </> :
          pathName === "/group" ?
            <>
              <div className="list-contact__length">
                Nhóm ({sortedData.length})
              </div>
              <div className="list-contact__all">
                {
                  sortedData.map((item, index) => (<><div className="conversation__container" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                    <div className="conversation__content">
                      <img
                        src={item.avt}
                        alt=""
                        className="conversation__img"
                      />
                      <div className="conversation__main">
                        <h4 className="conversation__name">{item.name}</h4>
                        <h4 className="conversation__member" style={{ fontSize: '13px', color: '#8b8b8b' }}>{sortedData.length} thành viên</h4>
                      </div>
                    </div>

                  </div>
                    <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>

                  ))
                }
              </div>
            </> :
            <>
              <div className="list-contact__length">
                Lời mời đã nhận ({sortedData.length})
              </div>
              <div className="card-invitation-list">
                {
                  sortedData.slice(0,5).map((item, index) => (<><div className="card-wrapper" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
                    <div className="conversation__content">
                      <img
                        src={item.avt}
                        alt=""
                        className="conversation__img"
                      />
                      <div className="conversation__main">
                        <h4 className="conversation__name">{item.name}</h4>
                      </div>
                      <div className="contact_button">
                      <button className="contact_button-deny">Từ chối</button>
                      <button className="contact_button-accept">Đồng ý</button>
                    </div>
                    </div>
                    
                  </div>
                    <hr style={{ height: '1px', backgroundColor: 'rgb(221, 221, 221)', marginLeft: '65px' }}></hr></>
                  ))
                }
              </div>
            </>
        }
      </div>
    </div>
  );
}
