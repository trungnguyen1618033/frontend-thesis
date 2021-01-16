import Title from './Title';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const Loading = () => (
    <div className="post loading">
        <h5>Loading...</h5>
    </div>
)

function Celeb(props) {
    const [searchText, setSearchText] = useState();
    const [searchColumn, setSearchColumn] = useState();

    let todos = useSelector(state => state)

    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            searchColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: stt => <p> {parseInt(stt) + 1}</p>
        },
        {
            title: 'Họ Tên',
            dataIndex: 'ten',
            key: 'ten',
            ...getColumnSearchProps('ten'),
        },
        {
            title: 'Thông Tin',
            dataIndex: 'link',
            key: 'link',
            render: text => <a target='_blank' href={text} >Link</a>
        },
        {
            title: 'Hình Đại Diện',
            dataIndex: 'path',
            key: 'path',
            render: path => {
                return (
                    <div>
                        <img style={{ maxHeight: 120 }} src={path} ></img>
                    </div>);
            },
        },
    ];
    const history = useHistory();
    return (
        <div>
            <Title />
            <div className="row col-12">
                <div className="row col justify-content-center align-items-center" style={{ height: '7rem' }}>
                    <div className="col d-flex justify-content-around">
                        <button type="submit" className="btn btn-outline-primary btn-lg" onClick={(e) => {
                            e.preventDefault();
                            history.push('/predict');
                        }} >Demo</button>
                        <button type="submit" className="btn btn-outline-primary btn-lg" onClick={(e) => {
                            e.preventDefault();
                            history.push('/search');
                        }} >Search</button>
                        <button type="submit" className="btn btn-outline-primary btn-lg" onClick={(e) => {
                            e.preventDefault();
                            history.push('/new');
                        }} >Add Celeb</button>
                    </div>
                </div>
            </div>
            <div id="image_celeb" className="text-center">
                <img src="/static/images/image.jpg" alt="" className="img-fluid" />
            </div>
            <div id="list" className="container justify-content-center align-items-center" style={{ paddingTop: '2rem' }}>
                <h3 style={{ textAlign: 'center' }}>Danh sách người nổi tiếng ở Việt Nam</h3>
            </div>
            <div className="row justify-content-center align-items-center">
                <div className="col-8">
                    <LazyLoad key={todos} placeholder={<Loading />}>
                        <Table columns={columns} dataSource={todos} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30'] }} bordered />
                    </LazyLoad>
                </div>
            </div>
        </div >

    );

}

export default Celeb;