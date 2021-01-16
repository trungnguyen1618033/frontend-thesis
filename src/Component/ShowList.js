
import React from "react";
import 'antd/dist/antd.css';
import { Table } from 'antd';

const columns = [
    {
        title: 'STT',
        dataIndex: 'num_face',
        key: 'num_face',
        render: num_face => <p> {num_face + 1}</p>

    },
    {
        title: 'Họ Tên',
        dataIndex: 'labels',
        key: 'labels',
    },
    {
        title: 'Face',
        dataIndex: 'base64',
        key: 'base64',
        render: image => {
            return (
                <div>
                    <img style={{ maxHeight: 100, maxHeight: 100 }} src={image} ></img>
                </div>);
        },
    },
    {
        title: 'Thông Tin',
        dataIndex: 'link',
        key: 'link',
        render: text => <a target='_blank' href={text} >Link</a>
    },


];

function ShowList(props) {
    return (
        <div className="col-md-6 col-sm-12">
            <div>
                <svg id="loader" className="" viewBox="0 0 32 32" width={32} height={32} display={props.load == false && "none"} >
                    <circle id="spinner" cx={16} cy={16} r={14} fill="none" />
                </svg>
                <div className="col-12 justify-content-center align-items-center" style={{ textAlign: 'center', marginBottom: '66px' }}>
                    <b style={{ fontSize: '24px' }}>Kết quả nhận diện</b>
                </div>
            </div>
            <div className="col-12 row justify-content-center align-items-center">
                <div className="col-12">
                    <Table columns={columns} dataSource={props.data} pagination={{ defaultPageSize: 1, showSizeChanger: true, pageSizeOptions: ['1', '2', '4', '8'] }} bordered />
                </div>
            </div>
        </div >

    );

}
export default ShowList;