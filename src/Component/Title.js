
import { useHistory } from 'react-router-dom';

function Title(props) {
    const history = useHistory();
    return (
        <div style={{ marginBottom: '30px' }}>
            <div className="head-page">
                <nav className="row justify-content-center align-self-center align-items-center" id="topmenu">
                    <div className="col-12 row justify-content-start">
                        <div className="row col-12">
                            <a style={{ marginLeft: '5rem' }} onClick={(e) => {
                                e.preventDefault();
                                history.push('/');
                            }}>
                                <img src="/static/images/logo.png" alt="" id="logo" />
                            </a>
                            <div className="col row justify-content-center align-items-center" >
                                <h2 style={{ color: '#fad37e', paddingRight: '8rem' }} >KHOA KỸ THUẬT PHẦN MỀM</h2>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className=" col-12 row justify-content-center align-self-center align-items-center" style={{ height: '49px', backgroundColor: '#fff', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)' }}>
                    <div className="col-9 row justify-content-center align-items-center">
                        <div className="col-12 row justify-content-center align-items-center">
                            <h5>Demo nhận dạng người nổi tiếng ở Việt Nam</h5>
                        </div>
                    </div>
                </div>
                <div id="banner" className="row col-12 justify-content-center align-items-center">
                    <div>
                        <img src="/static/images/banner.png" alt="" className="responsive" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title;