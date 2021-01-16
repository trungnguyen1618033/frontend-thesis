import React, { useState } from "react";
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';


function First(props) {
    const [name, setName] = useState();
    function onChange(event) {
        sendData(event.target.value);
        setName(event.target.value);
    }

    function onBlur(event) {
        sendData(event.target.value);
        // console.log('blur', name);
        setName(event.target.value);
    }

    const sendData = (value) => {
        props.parentCallback(value);
    };

    return (

        <div className="justify-content-center" style={{ border: '1px solid #f0f0f0', padding: '50px 24px 56px' }}>
            <div>
                <div className="justify-content-center" style={{ textAlign: 'center' }}>
                    <b style={{ fontSize: '24px' }}>Nhập tên người mới</b>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Input className="col-md-5 col-sm-12" value={props.data} placeholder="Tên người mới" prefix={<UserOutlined />} onChange={onChange} onBlur={onBlur} />
                <br />
            </div>
        </div>


    );
}

export default First;