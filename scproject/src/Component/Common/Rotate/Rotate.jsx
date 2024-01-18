import { RotateRightOutlined } from "@ant-design/icons";

const Rotate = () => {
    return (<div className='loading-container' style={{ display: 'flex', opacity:0.8 }}>
        <RotateRightOutlined rotate={90} className='loading-component' style={{ fontSize: '5rem', color: '#1677ff' }} ></RotateRightOutlined>
        <span className='loading-component' style={{ fontSize: '1.5rem', color: '#1677ff', fontWeight: 600 }} >Xoay ngang màn hình để có trải nghiệm tốt nhất!</span>
    </div>
    );
}

export default Rotate;