import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUps = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log(props)
    }, [])
    // props.description
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
                <h2 className="headers">
                    Congratulations
                </h2>
                
                <h2 className="details">
                    You have successfully booked the study space
                </h2>
                <div className="description">
                    <table>
                        <tbody>
                            {
                                data.map((row) => {
                                    return <tr>
                                        <td>{row.property}</td>
                                        <td>{row.value}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

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