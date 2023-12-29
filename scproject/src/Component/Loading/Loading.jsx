import { PropagateLoader } from 'react-spinners'
const LoadingComponent = ({ loading }) => {
    return (
        <div className='loading-container' style={loading ? { display: 'flex' } : { display: 'none' }}>
            <PropagateLoader className='loading-component' color="#002afc" loading={true} />
        </div>
    );
}

export default LoadingComponent;