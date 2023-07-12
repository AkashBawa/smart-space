import React, { useEffect, useState } from 'react';
import fireStore from '../../../utils/fireStore';

const Booking2 = (props) => {

    /* Calculating the map height based on the screen width and aspect ration */
    const [computers, setComputers] = useState();
    const [powerOutlet, setPowerOutlets] = useState();
    const [monitor, setMonitor] = useState(0);
    const [projector, setProjector] = useState();
    const [bookingTime, setBookingTime] = useState([]);
    const [currentTables, setCurrentTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null);

    const [timeSlotes, setTimeSlotes] = useState ([
        {startTime: 8, display: '8am - 9am'},
        {startTime: 9, display: '9am - 10am'},
        {startTime: 10, display: '10am - 11am'},
        {startTime: 11, display: '11am - 12pm'},
        {startTime: 12, display: '12pm - 1pm'},
        {startTime: 13, display: '1pm - 2pm'},
        {startTime: 14, display: '2pm - 3pm'},
        {startTime: 15, display: '3pm - 4pm'},
        {startTime: 16, display: '4pm - 5pm'},
        {startTime: 17, display: '5pm - 6pm'},
        {startTime: 18, display: '6pm - 7pm'},
        {startTime: 19, display: '7pm - 8pm'},
    ]);

    useEffect(() => {
        window.addEventListener('resize', function () {
            var div = document.querySelector('.booking-content');
            if(div) {
                div.style.height = div.offsetWidth * (6 / 16) + 'px';
            }
           
            // Calculate the height based on the width and aspect ratio
        });

    }, [])

    useEffect(() => {
        if(monitor > 0) {
            let newTables = currentTables;
            // for(let i = 0; i < currentTables.length; i++) {
            //     if(currentTables[i].comp)
            // }
        }
    }, [monitor])


    useEffect(() => {
        console.log("projector");
        console.log(projector)
        let newTables = currentTables;
        for(let i = 0; i < newTables.length; i++) {
            if(projector == true) {
                if(!newTables[i].hasProjector) {
                    newTables[i].disabled = true;
                } else {
                    newTables[i].disabled = false;
                }
            } else {
                newTables[i].disabled = false;
            }
        }
        console.log(newTables)
        setCurrentTables(newTables);
        
    }, [projector])

    useEffect(() => {

    }, [powerOutlet])

    useEffect(() => {

    }, [computers])



    useEffect(() => {
        fetchTables();
    }, [])

    window.dispatchEvent(new Event('resize'));

    const changeNameToInt = (tables) => {
        for(let i = 0; i < tables.length; i++) {
            tables[i].name = parseInt(tables[i].name)
        }
        tables.sort((a, b) => {
            return a.name - b.name
        })
        console.log(tables)
        setCurrentTables(tables)
    }


    const fetchTables = async () => {
    
        let query = [
            {
                "propertyName" : "locationId",
                "operation" : "==",
                "value" : props.userOptions.building
            }
        ];

        if(props.userOptions.level != null && props.userOptions.level != undefined) {
            query.push({
                "propertyName" : "floor",
                "operation" : "==",
                "value" : parseInt(props.userOptions.level)
            })
        }

        const tables = await fireStore.getByQuery('tables',  query);
        const newArray = []
        if (tables) {
            tables.forEach((table) => {
                newArray.push({ tableId: table.id, ...table.data(), disabled: false })
            })
            changeNameToInt(newArray)
        }   
    }

    const applyFilter = () => {

    }

    const spaceSelected = (e, id) => {
        setSelectedTable(id)
    }

    const changeComputers = (e) => {
        setComputers(e.target.value)
    }

    const navigateToPage1 = () => {
        props.changePage(1)
    }

    const changeBookingTime = (e, startTIme) => {
        
        const previousIndex = bookingTime.indexOf(startTIme);
        if(previousIndex != -1) {
            bookingTime.splice(previousIndex);
            e.currentTarget.classList.toggle('selectedTime')
        } else {
            if(bookingTime.length < 3) {
                e.currentTarget.classList.toggle('selectedTime')
                const newArray = bookingTime;
                newArray.push(startTIme);
                setBookingTime(newArray);  
                // console.log(newArray);
            }
        }
    }

    const bookingSubmit = async () => {
        const obj = {
            userId: "1234",
            tableId: selectedTable,
            date: props.userOptions.bookingDate,
            hours: bookingTime,
            status: 'created',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const saveData = await fireStore.addDataToCollection('booking', obj);
    }



    return (
        <div className='booking2'>
            <p>Booking2</p>
            <div className="option" id="step2">
                <p>Step 2</p>
            </div>
            <div id="secondBooking">
                <h2>Available Options</h2>
                <section id="filters">
                    <article>
                        <h3>Equipment</h3>
                        <h4>Additional needs</h4>
                    </article>
                    <div id="filterSection">

                        <form>
                            <label htmlFor="filter1">Computers</label>
                            <div className="bookingFilter" id="filter1">
                                <input type="radio" id="c1" name="radioComputer" value={1} checked={computers == 1} onChange={changeComputers}  />
                                <label htmlFor="c1">1</label>
                                <input type="radio" id="c2" name="radioComputer" value={2} checked={computers == 2} onChange={changeComputers} />
                                <label htmlFor="c2">2</label>
                                <input type="radio" id="c4" name="radioComputer" value={4} checked={computers == 4} onChange={changeComputers} />
                                <label htmlFor="c4">4</label>
                                <input type="radio" id="c8" name="radioComputer" value={8} checked={computers == 8} onChange={changeComputers} />
                                <label htmlFor="c8">8</label>
                            </div>
                        </form>
                        <form>
                            <label htmlFor="filter2">Power Outlet</label>
                            <section className="bookingFilter" id="filter2">
                                <label className="switch" htmlFor='powerOutlet'>
                                    <input type="checkbox" id='powerOutlet' value={powerOutlet} onChange={(e) => { setPowerOutlets(e.target.value)}} />
                                    {/* <span className="slider round"></span> */}
                                </label>
                            </section>
                        </form>
                        <form>
                            <label htmlFor="filter3">Monitor</label>
                            <section className="bookingFilter" id="filter3">
                                <label className="switch">
                                    <input type="checkbox" value={monitor} onChange={(e) => {setMonitor(e.target.value)}} />
                                    <span className="slider round"></span>
                                </label>
                            </section>
                        </form>
                        <form>
                            <label htmlFor="filter4">Projector</label>
                            <section className="bookingFilter" id="filter4">
                                <label className="switch">
                                    <input type="checkbox" value={projector} onChange={(e) => { 
                                        console.log(e.target.checked);
                                        setProjector(e.target.checked)}} />
                                    <span className="slider round"></span>
                                </label>
                            </section>
                        </form>
                    </div>
                </section>

                <section id="timing">
                    <article>
                        <h3>Booking Time</h3>
                        <h4>Maximum 3 Hours</h4>
                    </article>
                    <div>
                        {
                            timeSlotes && timeSlotes.map((time,index) => {
                                return (
                                    <p className='timeSelected' key={`time${index}`} onClick={ (e) => {changeBookingTime(e, time.startTime)}}>
                                        {time.display}
                                    </p>
                                )
                            })
                        }
                        {/* <p className="timeSelect">8am - 9am</p>
                        <p className="timeSelect">9am - 10am</p>
                        <p className="timeSelect">10am - 11am</p>
                        <p className="timeSelect">11am - 12pm</p>
                        <p className="timeSelect">12pm - 1pm</p>
                        <p className="timeSelect">1pm - 2pm</p>
                        <p className="timeSelect">2pm - 3pm</p>
                        <p className="timeSelect">3pm - 4pm</p>
                        <p className="timeSelect">4pm - 5pm</p>
                        <p className="timeSelect">5pm - 6pm</p>
                        <p className="timeSelect">6pm - 7pm</p>
                        <p className="timeSelect">7pm - 8pm</p> */}

                    </div>
                </section>


            </div>
            <div className="map">
                <h2>Please select the space</h2>
                <div className="booking-content">
                    {
                        currentTables && currentTables.map((table) => {
                            return (
                                <p 
                                    className={"n"+table.capacity + " " + `${selectedTable === table.tableId ? "selected" : ""}` + " " + `${table.disabled == true ? "disabled" : "notDisabled"}`}
                                    id={'s'+ table.name} 
                                    key={table.id}
                                    onClick={(e) => { spaceSelected(e, table.tableId,) }}

                                >
                                   abc {table.disabled}
                                </p>
                            )
                        })
                    }
                    {/* <p className="n2" id="s1"></p>
                    <p className="n2" id="s2"></p>
                    <p className="n2" id="s3"></p>
                    <p className="n2" id="s4"></p>
                    <p className="n4" id="s5"></p>
                    <p className="n4" id="s6"></p>
                    <p className="n4" id="s7"></p>
                    <p className="n4" id="s8"></p>
                    <p className="n4" id="s9"></p>
                    <p className="n4" id="s10"></p>
                    <p className="n4" id="s11"></p>
                    <p className="n1" id="s12"></p>
                    <p className="n1" id="s13"></p>
                    <p className="n1" id="s14"></p>
                    <p className="n1" id="s15"></p>
                    <p className="n4" id="s16"></p>
                    <p className="n4" id="s17"></p>
                    <p className="n4" id="s18"></p>
                    <p className="n1" id="s19"></p>
                    <p className="n1" id="s20"></p>
                    <p className="n1" id="s21"></p>
                    <p className="n1" id="s22"></p>
                    <p className="n1" id="s23"></p>
                    <p className="n1" id="s24"></p>
                    <p className="n1" id="s25"></p>
                    <p className="n1" id="s26"></p>
                    <p className="n1" id="s27"></p>
                    <p className="n1" id="s28"></p>
                    <p className="n1" id="s29"></p>
                    <p className="n1" id="s30"></p>
                    <p className="n1" id="s31"></p>
                    <p className="n1" id="s32"></p>
                    <p className="n1" id="s33"></p>
                    <p className="n1" id="s34"></p>
                    <p className="n1" id="s35"></p>
                    <p className="n8" id="s36"></p>
                    <p className="n8" id="s37"></p>
                    <p className="n4" id="s38"></p>
                    <p className="n4" id="s39"></p>
                    <p className="n4" id="s40"></p>
                    <p className="n4" id="s41"></p>
                    <p className="n4" id="s42"></p>
                    <p className="n8" id="s43"></p>
                    <p className="n4" id="s44"></p>
                    <p className="n4" id="s45"></p>
                    <p className="n4" id="s46"></p>
                    <p className="n4" id="s47"></p>
                    <p className="n16" id="s48"></p>
                    <p className="n4" id="s49"></p>
                    <p className="n4" id="s50"></p>
                    <p className="n4" id="s51"></p>
                    <p className="n8" id="s52"></p>
                    <p className="n4" id="s53"></p>
                    <p className="n4" id="s54"></p>
                    <p className="n4" id="s55"></p>
                    <p className="n4" id="s56"></p>
                    <p className="n4" id="s57"></p>
                    <p className="n4" id="s58"></p>
                    <p className="n4" id="s59"></p>
                    <p className="n4" id="s60"></p>
                    <p className="n4" id="s61"></p>
                    <p className="n4" id="s62"></p>
                    <p className="n4" id="s63"></p> */}

                </div>

                <section className="buttons">
                    <button id="cancel2" onClick={navigateToPage1}>Cancel</button>
                    <button id="next2" onClick={bookingSubmit}>Submit</button>
                </section>

            </div>
        </div>
    )
}

export default Booking2;