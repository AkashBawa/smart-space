import loader from './../public/loading/loading_for_dark_bg.gif';

const Loaders = (props) => {

    return (
        <div className="loader overlay">
            <div className="modalContent">
                <img src={loader} alt="" />
            </div>
        </div>
    )
}

export default Loaders