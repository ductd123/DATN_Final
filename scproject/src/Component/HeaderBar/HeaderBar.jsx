import React, { useState } from "react";
import "./HeaderBar.scss";
import { Search } from "react-feather";
import { useSelector } from "react-redux";
import { Select } from "antd";
import apiUser from "../../Services/apiUser";

let timeout;
let currentValue;
// const fetch = (value, callback) => {
//   if (timeout) {
//     clearTimeout(timeout);
//     timeout = null;
//   }
//   currentValue = value;
//   const fake = () => {
//     const str = qs.stringify({
//       code: 'utf-8',
//       q: value,
//     });
//     jsonp(`https://suggest.taobao.com/sug?${str}`)
//       .then((response) => response.json())
//       .then((d) => {
//         if (currentValue === value) {
//           const { result } = d;
//           const data = result.map((item) => ({
//             value: item[0],
//             text: item[0],
//           }));
//           callback(data);
//         }
//       });
//   };
//   if (value) {
//     timeout = setTimeout(fake, 300);
//   } else {
//     callback([]);
//   }
// };

export default function HeaderBar() {
  const reduxUserData = useSelector((state) => state.userData);
  const { data } = reduxUserData;
  const [resultSearch, setResultSearch] = useState([]);
  const [value, setValue] = useState();
  const handleSearch = async (newValue) => {
    let data ={
      page: 1,
      size: 10,
      text: value,
      ascending: true,
    }
    let response = await apiUser.searchUser(data);
    const items = [];
    setTimeout(() => {
      console.log(response);
      // const data = response.map((item) => ({
      //   value: item[0],
      //   text: item[0],
      // }));
    }, 500);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="header-bar">
      <h4 className="header-bar__name">WeTalk - {data.name}</h4>
      <form className="header-bar__form">
        {/* <input className="header-bar__input" placeholder="Search..." /> */}

        <Select
          showSearch
          value={value}
          placeholder='Tìm kiếm bạn bè...'
          defaultActiveFirstOption={false}
          suffixIcon={null}
          style={{ width: '90%' }}
          filterOption={false}
          notFoundContent={null}
          onChange={handleChange}
          onSearch={handleSearch}
          options={(resultSearch || []).map((d) => ({
            value: d.value,
            label: d.text,
          }))}
        />
        {/* <button onClick={handleSearch} className="header-bar__btn">
          <Search className="header-bar__icon" />
        </button> */}
      </form>
    </div>
  );
}
