import loader from './../public/loading/loading_for_dark_bg.gif';
import { useEffect } from 'react';

const Loaders = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className="loader overlay">
            <div className="modalContent">
                <img src={loader} alt="" />
            </div>
        </div>
    )
}

export default Loaders