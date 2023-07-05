import React from 'react'

const Booking2 = (props) => {

    const goBack = () => {
        props.changePage(1)
    }
return(
    <div className='booking2'>
        <p>Booking2</p>
        <button onClick={goBack}>Go back</button>

    </div>
)
}

 export default Booking2