import { EyeTwoTone } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React from 'react';
const rejectStatus = () => {
    return (
        <div>
            <div style={{ display: 'table-cell', verticalAlign: 'top' }}><div className='dot-status' style={{ border: `1px solid red`, backgroundColor: 'red' }}></div></div>
        </div>
    )
}
const TableData = ({ data, xemLaiData }) => {
    const columns = [
        {
            title: 'Chủ đề',
            dataIndex: 'topic',
            width: '10%',
        },
        {
            title: 'Từ vựng',
            dataIndex: 'vocab',
            sorter: (a, b) => a.age - b.age,
            width: '10%'
        },
        {
            title: 'Người đăng',
            dataIndex: 'author',
            width: '20%',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'created',
            width: '20%',
            render: (text) => <span>{new Date(text).getHours()}:{new Date(text).getMinutes()} {new Date(text).getDate()}/{new Date(text).getMonth() + 1}/{new Date(text).getFullYear()}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '20%',
            render: (status) => status == '0' ? <div style={{ display: 'table' }}>
                <div style={{ display: 'table-cell', verticalAlign: 'top' }}><div className='dot-status' style={{ border: `1px solid gray`, backgroundColor: 'gray' }}></div></div>
                <div style={{ display: 'table-cell', verticalAlign: 'top' }} className="inline-block" data-tooltip="true" >Đang chờ xét duyệt</div>
            </div>
                : status == '1' ? <div style={{ display: 'table' }}>
                    <div style={{ display: 'table-cell', verticalAlign: 'top' }}><div className='dot-status' style={{ border: `1px solid red`, backgroundColor: 'red' }}></div></div>
                    <div style={{ display: 'table-cell', verticalAlign: 'top' }} className="inline-block" data-tooltip="true" >Từ chối</div>
                </div>
                    : <div style={{ display: 'table' }}>
                        <div style={{ display: 'table-cell', verticalAlign: 'top' }}><div className='dot-status' style={{ border: `1px solid grean`, backgroundColor: 'green' }}></div></div>
                        <div style={{ display: 'table-cell', verticalAlign: 'top' }} className="inline-block" data-tooltip="true" >Đã xét duyệt</div>
                    </div>
        },
        {
            title: 'Xem lại',
            dataIndex: 'dataLocation',
            key: 'dataLocation',
            width: '20%',
            render: (text) => <Button key={text} onClick={() => xemLaiData(text)} icon={<EyeTwoTone style={{ fontSize: '1.25rem' }} />} ></Button>,
        },

    ];
    return (
        <div>
            <Table dataSource={data} columns={columns} />
        </div>
    );
}

export default TableData;