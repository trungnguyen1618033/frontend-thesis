import React from "react";
import { Button, Progress } from "antd";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadCeleb } from '../redux/actions';
import { useEffect } from 'react';

function Last(props) {

    const history = useHistory();

    let dispatch = useDispatch();
    let todos = useSelector(state => state)
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('http://0.0.0.0:5000/')
            .then(response => response.json())
            .then(results => dispatch(loadCeleb(results)));
    }, []);
    return (
        <div style={{ border: '1px solid #f0f0f0', padding: '50px 24px 56px', display: 'grid', justifyContent: 'center' }}>
            <Progress
                style={{ marginBottom: 20 }}
                type="circle"
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={100}
            />
            <Button type="primary" onClick={(e) => {
                e.preventDefault();
                history.push('/predict');
            }}>Done</Button>

        </div>
    );
}

export default Last;