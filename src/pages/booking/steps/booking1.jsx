const BookingS1 = (props) => {

    const submit = () => {
        props.changePage(2);
    }

    return <div className="NewBooking">
        <h1>Booking</h1>
        <div class="option" id="step1">
            <p>Step 1</p>
        </div>

        <div id="stepOne">
            <section id="booking1">
                <h2>Basic Information</h2>
                <label for="people">No. of People</label>
                <input type="number" id="people" min="1" max="8" />
                <label for="bookDate">Date</label>
                <input type="date" id="bookDate" />
            </section>
            <section id="booking2">
                <h2>Space Information</h2>
                <label for="building">Building</label>
                <select name="building" id="building">
                    <option value="Library Building">Library Building</option>
                    <option value="A">A Building</option>
                    <option value="B">B Building</option>
                    <option value="T">T Building</option>
                </select>
                <label for="level">Level</label>
                <select name="level" id="level">
                    <option value="l1">Level 1</option>
                    <option value="l2">Level 2</option>
                    <option value="l3">Level 3</option>
                </select>
            </section>
            <section class="buttons">
                <button id="cancel1">Cancel</button>
                <button id="next1" onClick={submit}>Next</button>
            </section>

        </div>
    </div>
}

export default BookingS1;