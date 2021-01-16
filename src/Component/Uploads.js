import React, { useState } from "react";
import { Form, Button, Select } from 'antd';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ShowListSearch from "./ShowListSearch";
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import axios from 'axios';

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

const { Option } = Select;

function Uploads(props) {

    let todos = useSelector(state => state)
    const [form] = Form.useForm();
    const [results, setResults] = useState([]);
    const [submint, setSutmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clean, setClean] = useState(false);
    const [search, setSearch] = useState();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [previewTitle, setPreviewTitle] = useState();
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList }) => {
        if (submint == true)
            setSutmit(false);
        setFileList(fileList);
    }


    function onChange(value) {
        setSearch(value);
        if (submint == true)
            setSutmit(false);
    }

    function onBlur(value) {
        console.log(`selected ${value}`);
    }

    const onFinish = values => {
        console.log(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const handleButtonSubmit = () => {

        if (fileList.length == 0) {
            window.alert("Vui lòng tải thêm ảnh !");
            return;
        }
        if (search == null) {
            window.alert("Vui lòng chọn người cần tìm kiếm !");
            return;
        }

        const formData = new FormData();

        for (var i = 0; i < fileList.length; i++) {
            formData.append('files[]', fileList[i].originFileObj);
        }

        formData.append('name', search);

        setSutmit(true);
        setLoading(true);
        setClean(true);

        axios({
            method: 'post',
            url: 'http://0.0.0.0:5000/search',
            data: formData,
        })
            .then(function (response) {
                //handle success
                if (response.data.length > 0) {
                    const temp = []
                    for (var i = 0; i < response.data.length; i++) {
                        for (var j = 0; j < fileList.length; j++) {
                            console.log(fileList[i].name);
                            if (response.data[i].image == fileList[j].name) {
                                temp.push({ image: fileList[j], base64: response.data[i].base64 });
                            }
                        };
                    }
                    setResults(temp);
                    // setResults(response.data);
                    // console.log('result', results); // array
                }
                else
                    window.alert("Không phát hiện người cần tìm trong hình!");
                setLoading(false);
                setClean(false);
            });

    };

    const handleButtonClean = () => {
        form.resetFields();
        setResults(null);
        setSutmit(false);
        setFileList([]);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    console.log(results);
    return (
        <div className="container-fluid" style={{ height: '100%' }}>
            <div className="row ">
                <div className="col-md-6 col-sm-12 justify-content-center align-items-center" >
                    {/* Image */}
                    <div className="justify-content-center">
                        {/* Title */}
                        <div className="justify-content-center" style={{ textAlign: 'center' }}>
                            <b style={{ fontSize: '24px' }}>Tải danh sách ảnh lên</b>
                            <p>Bạn có thể tải ảnh    lên</p>
                        </div>
                        <div style={{ border: '1px solid #f0f0f0', padding: '50px 24px 56px' }}>
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


                        {/* Controller */}
                        <div className="row justify-content-center align-items-center">
                            <div className="col-8">
                                <label htmlFor="basic-url">Tên người cần tìm:</label>
                                <div className="input-group mb-3">
                                    <Form style={{ width: '100%' }}
                                        form={form}
                                        name="control-hooks"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}>
                                        <Form.Item name="link" >
                                            <LazyLoad key={todos.stt} placeholder={<Loading />}>
                                                <Select
                                                    mode=""
                                                    showSearch
                                                    style={{ width: '100 %' }}
                                                    placeholder="Tìm kiếm"
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                >
                                                    {todos.map(todo => {
                                                        return <Option value={todo.ten}> {todo.ten}
                                                            {/* <Image style={{ maxWidth: 100, maxHeight: 100 }} src={todo.path}></Image> */}
                                                        </Option>
                                                    })};
                                            </Select>
                                            </LazyLoad>
                                        </Form.Item>
                                        <Form.Item >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button disabled={submint == true} id="btn-submit" onClick={handleButtonSubmit} type="primary" htmlType="submit">
                                                    Nhận dạng</Button>
                                                <Button disabled={clean == true} onClick={handleButtonClean} type="primary" htmlType="button">
                                                    Làm mới</Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowListSearch image={fileList} data={results} load={loading}></ShowListSearch>
            </div>
        </div >
    )
}
export default Uploads;