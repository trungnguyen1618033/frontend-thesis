import React, { useState } from "react";
import ShowList from "./ShowList";
import { Form, Input, Button } from 'antd';




function Upload(props) {

    const [form] = Form.useForm();
    const [number, setNumber] = useState({ file: '', imagePreviewUrl: '' });
    const [link, setLink] = useState();
    const [results, setResults] = useState([]);
    const [submint, setSutmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [clean, setClean] = useState(false);

    const onFinish = values => {
        // setLink(values.url);
        // console.log(values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };


    const handleButtonSubmit = () => {
        // POST request using fetch with async/await
        // console.log("base64", number.imagePreviewUrl);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "base64": number.imagePreviewUrl, "link": link })
        };
        console.log("base64", number.imagePreviewUrl);
        console.log("link", link);
        setSutmit(true);
        setLoading(true);
        setClean(true);
        const response = fetch('http://192.168.20.156:5000/predict', requestOptions).then(async response => {
            const data = await response.json();

            console.log(data);
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            if (data.length > 0) {
                setResults(data);
            }
            else
                window.alert("Không phát hiện người trong hình. Vui lòng bạn chọn hình khác!");
            setLoading(false);
            setClean(false);
        })
            .catch(error => {
                window.alert("Please select an image before submit.");
                setLoading(false);
                setSutmit(false);
                setClean(false);
            });
    };

    const handleButtonClean = () => {
        form.resetFields();
        setNumber({ file: '', imagePreviewUrl: '' });
        setLink('');
        setResults(null);
        setSutmit(false);
    };

    const handleOnBlur = (e) => {
        if ((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(e.target.value)) {
            console.log("1");
            setLink(e.target.value);
        }
        else if ((/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i).test(e.target.value)) {
            console.log("2");
            setNumber({ file: '', imagePreviewUrl: e.target.value });
        }
        else {
            window.alert("Vui lòng bạn nhập lại đường link hình ảnh!!");
        }
    }

    const _handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if (file) {
            reader.onload = function (e) {
                setNumber({
                    file: file,
                    imagePreviewUrl: reader.result
                });
            }

            reader.readAsDataURL(file)
        }

    };




    let { imagePreviewUrl } = number.imagePreviewUrl;
    let $imagePreview = null;
    if (number.imagePreviewUrl != '') {
        $imagePreview = (<img id="image-preview" src={number.imagePreviewUrl} />);
    }
    else if (link != '') {
        $imagePreview = (<img id="image-preview" src={link} />);

    } else {
        $imagePreview = (<div id="upload-caption" className="previewText">Kéo ảnh hoặc bấm vào để chọn ảnh</div>);
    }
    console.log(number);
    console.log("link", link);
    console.log(results);
    return (
        <div className="container-fluid" style={{ height: '100%' }}>
            <div className="row ">
                <div className="col-md-6 col-sm-12 justify-content-center align-items-center" >
                    {/* Image */}
                    <div className="justify-content-center">
                        {/* Title */}
                        <div className="justify-content-center" style={{ textAlign: 'center' }}>
                            <b style={{ fontSize: '24px' }}>Tải ảnh lên</b>
                            <p>Bạn có thể tải lên hoặc nhập đường dẫn ảnh</p>
                        </div>
                        <div className="row justify-content-center align-items-center" style={{ height: '20rem' }}>
                            <div className="panel" style={{ height: '16rem', width: '16rem', color: 'white' }}>
                                <input id="file-upload" className="hidden" type="file" accept="image/x-png,image/gif,image/jpeg" name="image" onChange={(e) => _handleImageChange(e)} />
                                <label htmlFor="file-upload" id="file-drag" className="upload-box" style={{ height: '100%', width: '100%', border: (link || number.file) && "none" }}>
                                    <div className="imgPreview">
                                        {$imagePreview}
                                    </div>
                                </label>
                            </div>
                        </div>
                        {/* Controller */}
                        <div className="row justify-content-center align-items-center">
                            <div className="col-8">
                                <label htmlFor="basic-url">Link ảnh</label>
                                <div className="input-group mb-3">
                                    <Form style={{ width: '100%' }}
                                        form={form}
                                        name="control-hooks"
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}>
                                        <Form.Item name="link" >
                                            <Input disabled={number.file != ''} style={{ width: '100%' }} name="url" placeholder="Nhập link ảnh" onBlur={(e) => handleOnBlur(e)} aria-describedby="basic-addon3" />
                                        </Form.Item>
                                        <Form.Item >
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Button disabled={submint == true || (number.file == null && link == null)} id="btn-submit" onClick={handleButtonSubmit} type="primary" htmlType="submit">
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
                <ShowList data={results} load={loading}></ShowList>
            </div>
        </div>
    )

}

export default Upload;