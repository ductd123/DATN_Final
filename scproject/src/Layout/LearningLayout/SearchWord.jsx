import { EyeTwoTone, PlayCircleTwoTone, SearchOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';

const SearchWord = ({ searchText, files }) => {
    const [listFile, setListFile] = useState(files);
    return (<div className="searchWord">
        <div className="searchWord-header flex-center">
            <SearchOutlined style={{ fontSize: '1.25rem' }} />
            <div className="searchWord-header-text">Kết quả tìm kiếm cho: </div>
            <span className="searchWord-header-value">"{searchText}"</span>
        </div>
        <div className='searchWord-container'>
            {listFile.map((file, i) => {
                return (
                    <div key={i} className='searchWord-item'>
                        {file.type == 1 ?

                            <div className='searchWord-container-show flex-center' >
                                <img src={file.preview} alt={file.preview} />
                            </div>
                            :
                            <div className='searchWord-container-show flex-center'>
                                <PlayCircleTwoTone />
                            </div>
                        }
                        <div>
                            <p style={{ fontWeight: '500' }}>{file.name}</p>
                            <p style={{ fontSize: '12px' }}>Tác giả: {file.name}</p>
                            <p style={{ fontSize: '12px' }}>Ngày đăng: {file.size}</p>
                        </div>
                        <button>
                            <EyeTwoTone/>
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
    );
}

export default SearchWord;