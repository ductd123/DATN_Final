import { HashLoader } from 'react-spinners'
const LoadingComponent = ({ loading }) => {
    return (
        <div className='loading-container' style={loading ? { display: 'flex' } : { display: 'none' }}>
            <HashLoader className='loading-component' color="#002afc" loading={true} />
        </div>
    );
}

export default LoadingComponent;