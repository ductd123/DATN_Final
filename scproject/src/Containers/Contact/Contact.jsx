import React from "react";
import "./Contact.scss";
import { useLocation } from "react-router-dom";
import { Users } from "react-feather";
import { render } from "react-dom";
export default function Contact() {
  const location = useLocation();
  const pathName = location.pathname;
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
  const sortedData = fakeData.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (<>
    {pathName === "/friend" ?
      <div className="contact">
        <div className="contact-panel__header">
          <div className="list-contact__selection">
            <i className="fa-regular fa-user fa-lg"></i>
            <div className="list-contact__content">Danh sách bạn bè</div>
          </div>
        </div>
        <div className="contact-panel__details">
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
        </div>
      </div> :
      pathName === "/group" ?
        <div className="contact">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <Users />
              <div className="list-contact__content">Danh sách nhóm

              </div>
            </div>
          </div>
          <div className="contact-panel__details">
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
          </div>
        </div> :
        <div className="contact">
          <div className="contact-panel__header">
            <div className="list-contact__selection">
              <i className="fa-regular fa-envelope-open"></i>
              <div className="list-contact__content">Lời mời kết bạn</div>
            </div>
          </div>
          <div className="contact-panel__details">
            <div className="list-contact__length">
              Lời mời đã nhận ({sortedData.length})
            </div>
            <div className="card-invitation-list">
              {
                sortedData.slice(0, 5).map((item, index) => (<><div className="card-wrapper" key={index} style={{ flexDirection: 'column', paddingLeft: '15px' }}>
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
          </div>
        </div>
    }
  </>
  );
}
