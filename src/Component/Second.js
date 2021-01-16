import React, { useState } from "react";
import { Upload, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

function Second(props) {

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [previewTitle, setPreviewTitle] = useState();
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {

        setFileList(props.file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        sendData(fileList);
    }

    const onFinish = values => {
        // setLink(values.url);
        console.log(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const sendData = (value) => {
        props.parentCallback(value);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    console.log(props.load)
    return (
        <div style={{ border: '1px solid #f0f0f0', padding: '50px 24px 56px' }}>
            <div className="justify-content-center" style={{ textAlign: 'center' }}>
                <b style={{ fontSize: '24px' }}>Tải danh sách ảnh lên</b>
                <p>Bạn có thể tải ảnh  lên</p>
            </div>
            <Spin className="justify-content-center" size="large" spinning={props.load} >
                <p>Bạn có thể tải ảnh  lên</p>
            </Spin>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
                visible={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
}

export default Second;