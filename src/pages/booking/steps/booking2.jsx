import React, { useEffect, useState } from 'react';
import fireStore from '../../../utils/fireStore';

const Booking2 = (props) => {

    /* Calculating the map height based on the screen width and aspect ration */
    useEffect(() => {
        window.addEventListener('resize', function () {
            var div = document.querySelector('.booking-content');
            div.style.height = div.offsetWidth * (6 / 16) + 'px';
            // Calculate the height based on the width and aspect ratio
        });

    }, [])

    // Trigger the resize event initially to set the initial height
    window.dispatchEvent(new Event('resize'));



    const [currentTables, setCurrentTables] = useState([])
    const onclick = function () {
        console.log("Click")
    }

    useEffect(() => {
        console.log("inside use effect")
        fetchTables();
    }, [])

    const fetchTables = async () => {
        const tables = await fireStore.getAllDataFromCollection('tables');
        console.log(tables)
        const newArray = []
        tables.forEach((table) => {
            // console.log(table.data())
            newArray.push({ tableId: table.id, ...table.data() })
        })
        console.log(newArray)
        setCurrentTables(tables);

    }


    const navigateToPage1 = () => {
        props.changePage(1)
    }

    return (
        <div className='booking2'>
            <button onClick={onclick}>Click me</button>
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

                        <form action="get">
                            <label htmlFor="filter1">Computers</label>
                            <div className="bookingFilter" id="filter1">
                                <input type="radio" id="c1" name="radioComputer" />
                                <label htmlFor="c1">1</label>
                                <input type="radio" id="c2" name="radioComputer" />
                                <label htmlFor="c2">2</label>
                                <input type="radio" id="c4" name="radioComputer" />
                                <label htmlFor="c4">4</label>
                                <input type="radio" id="c8" name="radioComputer" />
                                <label htmlFor="c8">8</label>
                            </div>
                        </form>
                        <form action="get">
                            <label htmlFor="filter2">Power Outlet</label>
                            <section className="bookingFilter" id="filter2">
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                            </section>
                        </form>
                        <form action="get">
                            <label htmlFor="filter3">Monitor</label>
                            <section className="bookingFilter" id="filter3">
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
                                </label>
                            </section>
                        </form>
                        <form action="get">
                            <label htmlFor="filter4">Projector</label>
                            <section className="bookingFilter" id="filter4">
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
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
                        <p className="timeSelect">8am - 9am</p>
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
                        <p className="timeSelect">7pm - 8pm</p>

                    </div>
                </section>

            </div>
            <div className="map">
                <h2>Please select the space</h2>
                <div className="booking-content">
                    <p className="n2" id="s1"></p>
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
                    <p className="n4" id="s63"></p>

                </div>

                <section className="buttons">
                    <button id="cancel2" onClick={navigateToPage1}>Cancel</button>
                    <button id="next2">Next</button>
                </section>

            </div>
        </div>
    )
}

export default Booking2;