import { Steps, Button } from 'antd';
import { useState } from 'react';
import Second from './Second';
import First from './First';
import Last from './Last';
import axios from 'axios';


const { Step } = Steps;


const StepsSteps = (props) => {
    const [current, setCurrent] = useState(0);
    const [name, setName] = useState();
    const [fileList, setfileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);

    const callbackFirst = (childData) => {
        setName(childData);
    };

    const callbackSecond = (childData) => {
        setfileList(childData);
    };
    const steps = [
        {
            title: 'First',
            content: 'First-content',
            description: <First data={name} parentCallback={callbackFirst}></First>,
        },
        {
            title: 'Second',
            content: 'Second-content',
            description: <Second file={fileList} load={loading} parentCallback={callbackSecond}></Second>,
        },
        {
            title: 'Last',
            content: 'Last-content',
            description: <Last></Last>,
        },
    ];

    const next = () => {


        switch (current) {
            case 0:
                console.log(name);
                if (name == null || name == "") {
                    window.alert("Vui lòng nhập tên người mới!");
                    return;
                }
                console.log(name);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "name": name })
                };
                const response = fetch('http://0.0.0.0:5000/checkname', requestOptions).then(async response => {
                    const data = await response.json();

                    console.log(data);
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    else {
                        if (data.message == "Success")
                            setCurrent(current + 1);
                        else {
                            window.alert("Tên người hiện tại đã có, bạn vui lòng chọn lại!");
                        }
                    }
                })
                break;
            case 1:
                const formData = new FormData();
                if (fileList.length < 5)
                    window.alert("Bạn vui lòng chọn ít nhất 5 hình !");
                for (var i = 0; i < fileList.length; i++) {
                    formData.append('files[]', fileList[i].originFileObj);
                }
                setDisable(true);
                setLoading(true);
                formData.append('name', name);
                axios({
                    method: 'post',
                    url: 'http://0.0.0.0:5000/new',
                    data: formData,
                })
                    .then(function (response) {
                        //handle success
                        if (response.data.message == "Success") {
                            setCurrent(current + 1);
                        } else {
                            console.log(response.data.message);
                            window.alert(response.data.message);
                        }
                        setLoading(false);
                        setDisable(false);
                    });
                break;
            case 2:
                
                break;
            default:
                break;
        }
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    console.log(steps)
    return (
        <div className="container-fluid col-10">
            <Steps current={current} style={{ marginBottom: 24, marginTop: 24 }}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].description}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" disabled={disable} onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} disabled={disable || current == 2} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default StepsSteps