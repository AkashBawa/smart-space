import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUps = (props) => {

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    useEffect(() => {
        debugger;
        console.log(props.data)
    }, [])
    // props.data.description
    const [data, setDate] = useState([
        {property: "No. of people", value: 4},
        {property: "No. of people", value: 4}
    ]);
    const backToHome = () => {
        navigate('/home')
    }

    return (
        <div className="popups overlay">
            <div className="modalContent">
                {
                    props.data.heading && (
                        <h2 className="headers">
                            {props.data.heading}
                        </h2>
                    )
                }
                
                {
                    props.data.details && (
                        <h2 className="details">
                            {
                                props.data.details
                            }
                        </h2>
                    )
                }
                
                {
                    props.data.description &&   <div className="description">
                    <table>
                        <tbody>
                            {
                                props.data.description.map((row) => {
                                    return <tr>
                                        <td>{row.property}</td>
                                        <td>{row.value}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                }
                
                <div>
                    <button onClick={backToHome}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PopUps