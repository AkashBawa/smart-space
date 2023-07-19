import React, { useEffect, useState } from 'react';
import fireStore from '../../../utils/fireStore';
import { useNavigate } from "react-router-dom";
import localStorage from '../../../utils/localStorage';

// logoImages;
import singleLogo from './../../../Images/icon_png_map/ICON2-23.png';
import TwoLogo from './../../../Images/icon_png_map/ICON2-21.png';
import FourLogo from './../../../Images/icon_png_map/ICON2-22.png';
import MultipleLogo from './../../../Images/icon_png_map/ICON2-25.png'

const Booking2 = (props) => {

    /* Calculating the map height based on the screen width and aspect ration */
    const navigator = useNavigate();
    const [computers, setComputers] = useState(null);
    const [powerOutlet, setPowerOutlets] = useState(false);
    const [monitor, setMonitor] = useState(false);
    const [projector, setProjector] = useState(false);
    const [bookingTime, setBookingTime] = useState([]);
    const [currentTables, setCurrentTables] = useState([])
    const [selectedTable, setSelectedTable] = useState(null);
    const [previousBooking, setPreviousBooking] = useState([]);

    const existingBooking = props.existingBooking;

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

    const checkPowerOutlet = (currentTable) => {

        if(powerOutlet == true && currentTable.hasPowerOutlet  && currentTable.hasPowerOutlet == true) {
            return true;
        } else if ( powerOutlet == false ) {
            return true;
        } else {
            return false;
        }
    }

    const checkMonitor = (currentTable) => {

        if(monitor && currentTable.hasComputer  && currentTable.hasComputer == true) {
            return true;
        } else if ( monitor == false ) {
            return true
        } else {
            return false;
        }
    }

    const checkProjector = (currentTable) => {

        if(projector && currentTable.hasProjector  && currentTable.hasProjector == true) {
            return true;
        } else if ( projector == false ) {
            return true
        } else {
            return false;
        }
    }

    const checkCapacity = (currentTable) => {
        const capacity = props.userOptions.people;
        if(currentTable.capacity && currentTable.capacity == capacity ) {
            return true;
        } else {
            return false;
        }
    }

    const getPreviousBooking = async () => {
        console.log("get previous booking")
        const toDayDate = props.userOptions.bookingDate;
        console.log(toDayDate);

        const query = {
            propertyName: 'date',
            operation: "==",
            value: toDayDate
        }

        const currentBooking = await fireStore.getByQuery("bookings", [query]);
        const newArray = [];
        if(currentBooking) {
            currentBooking.forEach((booking) => {
                console.log(booking.data())
                newArray.push({id: booking.id, ...booking.data()})
            })
            setPreviousBooking(newArray);
        } else {
            console.log("No booking found")
        }   
        return newArray;
    }

    const checkPreviousBooking = (table, prevBooking) => {
        console.log("check previous booking")
        // debugger;
        for(let i = 0; i < prevBooking.length; i++) {

            const previousBook = prevBooking[i];
            if(previousBook.tableId == table.tableId) {

                if(previousBook.hours && previousBook.hours.length > 0 && bookingTime && bookingTime.length > 0) {

                    const currentLow = bookingTime[0];
                    const currentHigh = bookingTime[bookingTime.length - 1];

                    const preHours = previousBook.hours;
                    const previousLow = preHours[0];
                    const previousHigh = preHours[preHours.length - 1];

                    if( (currentLow < previousLow && currentHigh < previousLow) || ( currentLow > previousHigh && currentHigh > previousHigh )) {
                        return true
                    } else {
                        return false;
                    }
                }  else {
                    return true
                }
                
            }
        }
        return true;
    }

    const applyFilter = (tables, previousBookingDirect = []) => {
        const prevBooking = previousBooking.length > 0 ?  previousBooking : previousBookingDirect;
        let newTables = tables ? [...tables] : [...currentTables];
        for(let i = 0; i < newTables.length; i++) { 

            // Check previous booking
            const isAvailable = checkPreviousBooking(newTables[i], prevBooking);
            // console.log("is available ", newTables[i].tableId, )
            // const isBooked =
            // check capacity
            const isCapacityMatch = checkCapacity(newTables[i]);

            // check Power Outlet
            const isPowerOutlet = checkPowerOutlet(newTables[i]);
            
            // Check monitor
            const isMonitor = checkMonitor(newTables[i]);

            // Check Projector
            const projector = checkProjector(newTables[i]);

            // Check computers

            


            if(isPowerOutlet && isMonitor && projector && isCapacityMatch && isAvailable) {
                newTables[i].disabled = false
            } else {
                newTables[i].disabled = true 
            }
        }
        setCurrentTables(newTables);
        
    }

    useEffect (() => {
       applyFilter()

    }, [powerOutlet, monitor, projector, bookingTime, computers ])



    useEffect(() => {
        fetchTables();
        
    }, [])

    useEffect(() => {
        console.log('existingBooking', existingBooking);
        if (existingBooking) {
            setComputers(existingBooking.computers);
            setPowerOutlets(existingBooking.powerOutlet);
            setMonitor(existingBooking.monitor);
            setProjector(existingBooking.projector);
            setSelectedTable(existingBooking.tableId);
            if (existingBooking.hours) {
                setBookingTime(existingBooking.hours);
                existingBooking.hours.forEach(h => {
                    const elm = document.getElementById(`time-${h}`);
                    if (!elm.classList.contains('selectedTime')) {
                        elm.classList.add('selectedTime');
                    }
                    
                })
            }
        }
    }, [existingBooking]);

    window.dispatchEvent(new Event('resize'));

    const changeNameToInt = (tables, previousBooking = []) => {
        for(let i = 0; i < tables.length; i++) {
            tables[i].name = parseInt(tables[i].name)
        }
        tables.sort((a, b) => {
            return a.name - b.name
        })
        console.log(tables)
        setCurrentTables(tables);
        applyFilter(tables, previousBooking);
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
            const previousBooking = await getPreviousBooking();
            changeNameToInt(newArray, previousBooking)
        }   
    }

    const spaceSelected = (e, id, index) => {
        if(bookingTime.length == 0) {
            return alert("Please choose the time slot")
        }
        if(currentTables[index] && currentTables[index].disabled && currentTables[index].disabled == true) {
            return;
        }
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
        const newArray = [...bookingTime];
        if(previousIndex != -1) {
            newArray.splice(previousIndex);
            e.currentTarget.classList.toggle('selectedTime');
            setBookingTime(newArray);
        } else {
            if(bookingTime.length < 3) {
                if(newArray.length == 0 || (startTIme == newArray[0] - 1 || startTIme == newArray[newArray.length - 1] + 1)) {
                    e.currentTarget.classList.toggle('selectedTime')
                    newArray.push(startTIme);
                    newArray.sort((a, b) => a-b)
                    setBookingTime(newArray); 
                }
            }
        }
    }

    const bookingSubmit = async () => {
        console.log('props', props);
        if (validateSubmit()) {
            const userId = localStorage.getItem('userId');
            const obj = {
                userId: userId ? userId : 'abcd',
                tableId: selectedTable,
                date: props.userOptions.bookingDate,
                locationId:  props.userOptions.building,
                level: props.userOptions.level,
                people: props.userOptions.people,
                spaceType: props.userOptions.spaceType,
                hours: bookingTime,
                computers: computers,
                powerOutlet: powerOutlet,
                monitor: monitor,
                projector: projector,
                status: 'Booked',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            console.log('obj', obj);
            if (props.existingBooking) {
                const saveData = await fireStore.updateSingleData('bookings', props.bookingId, obj);
            } else {
                const saveData = await fireStore.addDataToCollection('bookings', obj);
            }
            
            // navigator("/home");
            navigator("/booking-list-demo");
        }
    }

    const validateSubmit = () => {
        if (!bookingTime) {
            alert('Please select Booking Time');
            return false;
        } 
        if (!selectedTable) {
            alert('Please select the Space');
            return false;
        }
        return true;
    }

    return (
        <div>
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
                                    <input type="checkbox" id='powerOutlet' checked={powerOutlet} value={powerOutlet} onChange={(e) => { setPowerOutlets(e.target.checked)}} />
                                    <span className="slider round"></span>
                                </label>
                            </section>
                        </form>
                        <form>
                            <label htmlFor="filter3">Monitor</label>
                            <section className="bookingFilter" id="filter3">
                                <label className="switch">
                                    <input type="checkbox" checked={monitor} value={monitor} onChange={(e) => {setMonitor(e.target.checked)}} />
                                    <span className="slider round"></span>
                                </label>
                            </section>
                        </form>
                        <form>
                            <label htmlFor="filter4">Projector</label>
                            <section className="bookingFilter" id="filter4">
                                <label className="switch">
                                    <input type="checkbox" checked={projector} value={projector} onChange={(e) => { 
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
                                    <p className='timeSelected' id={`time-${time.startTime}`} key={`time${index}`} onClick={ (e) => {changeBookingTime(e, time.startTime)}}>
                                        {time.display}
                                    </p>
                                )
                            })
                        }

                    </div>
                </section>

            </div>
            <div className="map">
                <h2>Please select the space</h2>
                <div className="booking-content">
                    {
                        currentTables && currentTables.map((table, index) => {
                            return (
                                <p 
                                    className={"n"+table.capacity + " " + `${selectedTable === table.tableId ? "selected" : ""}` + " " + `${table.disabled == true ? "disabled" : "notDisabled"}`}
                                    id={'s'+ table.name} 
                                    key={table.id}
                                    onClick={(e) => {  spaceSelected(e, table.tableId, index) }}
                                >
                                    {
                                        table.capacity == 1 ? <img src={singleLogo}/> : (
                                            table.capacity == 2 ? <img src={TwoLogo}/>: (
                                                table.capacity == 4 ? <img src={FourLogo}/> : <img src={MultipleLogo}/>
                                            )
                                            
                                            )
                                    }
                                    
                                </p>
                            )
                        })
                    }
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