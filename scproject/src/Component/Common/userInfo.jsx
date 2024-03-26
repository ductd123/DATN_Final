import bg from "../../assets/image/wallhaven-o5762l_2560x1440.png";
import blank from "../../assets/image/AvtBlank.jpg";

const UserInfo = ({ userData }) => {
  const dateTimeString = userData?.birthDay;
  const dateTimeObject = new Date(dateTimeString);
  const year = dateTimeObject.getFullYear();
  const month = dateTimeObject.getMonth() + 1;
  const day = dateTimeObject.getDate();
  return (
    <>
      <div className="nav-userInfo-background">
        <img alt="" style={{ width: "100%" }} src={bg}></img>
      </div>
      <div className="nav-userInfo-header">
        <img
          alt=""
          src={userData?.avatarLocation || blank}
          className="nav-userInfo-header-avt"
        ></img>
        <span className="nav-userInfo-header-name">
          {userData?.name || "Chưa có tài khoản"}
        </span>
      </div>
      <div
        style={{
          height: "8px",
          backgroundColor: "#efefef",
          borderRadius: "4px",
        }}
      ></div>
      <div className="nav-userInfo-detail">
        {/* <span className="nav-userInfo-detail-header">Thông tin cá nhân</span> */}
        <div className="nav-userInfo-detail-items">
          <span className="nav-userInfo-detail-items-title">Giới tính</span>
          <span className="nav-userInfo-detail-items-content">
            {userData?.gender === "MALE" ? "Nam" : "Nữ" || "Chưa có thông tin"}
          </span>
        </div>
        <div className="nav-userInfo-detail-items">
          <span className="nav-userInfo-detail-items-title">Ngày sinh</span>
          <span className="nav-userInfo-detail-items-content">
            {`${day}/${month}/${year}` || "Chưa có thông tin"}
          </span>
        </div>
        <div className="nav-userInfo-detail-items">
          <span className="nav-userInfo-detail-items-title">Điện thoại</span>
          <span className="nav-userInfo-detail-items-content">
            {userData?.phoneNumber || "Chưa có thông tin"}
          </span>
        </div>
        <div className="nav-userInfo-detail-items">
          <span className="nav-userInfo-detail-items-title">Email</span>
          <span className="nav-userInfo-detail-items-content">
            {userData?.email || "Chưa có thông tin"}
          </span>
        </div>
        <div className="nav-userInfo-detail-items">
          <span className="nav-userInfo-detail-items-title">Địa chỉ</span>
          <span className="nav-userInfo-detail-items-content">
            {userData?.address || "Chưa có thông tin"}
          </span>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
