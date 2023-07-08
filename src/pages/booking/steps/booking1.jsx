import React, { useEffect } from 'react';

const BookingS1 = (props) => {
    const submit = () => {
        props.changePage(2);
    };

    useEffect(() => {
        const spaceTypeSelect = document.getElementById('spaceType');
        const buildingSelect = document.getElementById('building');
        const selectedLevel = document.getElementById('level');

        // Disable the building select initially
        buildingSelect.disabled = true;
        selectedLevel.disabled = true;

        // Show "Select Space Type First" as the default option in the building select
        const defaultOption = document.createElement('option');
        defaultOption.text = 'Select Space Type First';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        buildingSelect.add(defaultOption, 0);

        spaceTypeSelect.addEventListener('change', handleSpaceTypeChange);

        return () => {
            spaceTypeSelect.removeEventListener('change', handleSpaceTypeChange);
        };
    }, []);


    const handleSpaceTypeChange = () => {
        const spaceTypeSelect = document.getElementById('spaceType');
        const buildingSelect = document.getElementById('building');
        const selectedLevel = document.getElementById('level');

        // Enable the building select when a space type is selected
        buildingSelect.disabled = false;
        selectedLevel.disabled = false;

        // Clear existing building options
        buildingSelect.options.length = 0;
        selectedLevel.options.length = 0;

        // Add building options based on the selected space type
        const selectedSpaceType = spaceTypeSelect.value;

        if (selectedSpaceType === 'singleSpace') {
            addBuildingOption(buildingSelect, 'Library Building');
            addBuildingOption(selectedLevel, 'level 1');
            addBuildingOption(selectedLevel, 'level 2');
            addBuildingOption(selectedLevel, 'level 3');

            document.getElementById('accommodate').placeholder = '1 Person';
            document.getElementById('computer').placeholder = 'None';
            document.getElementById('power').placeholder = 'None';
            document.getElementById('projector').placeholder = 'None';
            document.getElementById('screen').placeholder = 'None';
        } else if (selectedSpaceType === 'doubleSpace') {
            addBuildingOption(buildingSelect, 'Library Building');
            addBuildingOption(selectedLevel, 'level 1');
            addBuildingOption(selectedLevel, 'level 2');
            addBuildingOption(selectedLevel, 'level 3');

            document.getElementById('accommodate').placeholder = '2 People';
            document.getElementById('computer').placeholder = 'None';
            document.getElementById('power').placeholder = 'Yes';
            document.getElementById('projector').placeholder = 'None';
            document.getElementById('screen').placeholder = 'None';
        } else if (selectedSpaceType === 'group4') {
            addBuildingOption(buildingSelect, 'Library Building');
            addBuildingOption(selectedLevel, 'level 1');
            addBuildingOption(selectedLevel, 'level 2');
            addBuildingOption(selectedLevel, 'level 3');

            document.getElementById('accommodate').placeholder = '4 People';
            document.getElementById('computer').placeholder = 'Four';
            document.getElementById('power').placeholder = 'Yes';
            document.getElementById('projector').placeholder = 'None';
            document.getElementById('screen').placeholder = 'Yes';
        } else if (selectedSpaceType === 'group8') {
            addBuildingOption(buildingSelect, 'Library Building');
            addBuildingOption(selectedLevel, 'level 1');
            addBuildingOption(selectedLevel, 'level 2');
            addBuildingOption(selectedLevel, 'level 3');


        } else if (selectedSpaceType === 'closedSpace') {
            addBuildingOption(buildingSelect, 'Library Building');
            addBuildingOption(selectedLevel, 'level 2');

            document.getElementById('accommodate').placeholder = '8 People';
            document.getElementById('computer').placeholder = 'Eight';
            document.getElementById('power').placeholder = 'Yes';
            document.getElementById('projector').placeholder = 'None';
            document.getElementById('screen').placeholder = 'One Big White Board';
        } else if (selectedSpaceType === 'theater') {
            addBuildingOption(buildingSelect, 'A Building');
            addBuildingOption(buildingSelect, 'B Building');
            addBuildingOption(selectedLevel, 'level 3');

            document.getElementById('accommodate').placeholder = '20 People';
            document.getElementById('computer').placeholder = 'None';
            document.getElementById('power').placeholder = 'Yes';
            document.getElementById('projector').placeholder = 'Yes';
            document.getElementById('screen').placeholder = 'Yes';
        } else if (selectedSpaceType === 'comLab') {
            addBuildingOption(buildingSelect, 'T Building');
            addBuildingOption(selectedLevel, 'level 1');

            document.getElementById('accommodate').placeholder = '40 People';
            document.getElementById('computer').placeholder = 'None';
            document.getElementById('power').placeholder = 'Yes';
            document.getElementById('projector').placeholder = 'Yes';
            document.getElementById('screen').placeholder = 'Yes';
        }
    };

    const addBuildingOption = (selectElement, optionText) => {
        const option = document.createElement('option');
        option.text = optionText;
        selectElement.add(option);
    };

    return (
        <div className="NewBooking">
            <h1>New Booking</h1>
            <div className="option" id="step1">
                <p>Step 1</p>
            </div>

            <div id="stepOne">
                <section id="booking1">
                    <h2>Basic Information</h2>
                    <label htmlFor="people">No. of People</label>
                    <input type="number" id="people" min="1" max="8" />
                    <label htmlFor="bookDate">Booking Date</label>
                    <input type="date" id="bookDate" />
                </section>
                <section id="booking2">
                    <h2>Space Information</h2>
                    <label htmlFor="spaceType">Space Type</label>
                    <select name="spaceType" id="spaceType">
                        <option value="singleSpace">Single Space</option>
                        <option value="doubleSpace">Double Space</option>
                        <option value="group4">Group of Four</option>
                        <option value="group8">Group of Eight</option>
                        <option value="closedSpace">Closed Space</option>
                        <option value="theater">Theater</option>
                        <option value="comLab">Computer Lab</option>
                    </select>
                    <label htmlFor="building">Building</label>
                    <select name="building" id="building">
                        {/* <option value="" disabled selected>Select your option</option> */}

                    </select>
                    <label htmlFor="level">Level</label>
                    <select name="level" id="level">
                        <option value="l1">Level 1</option>
                        <option value="l2">Level 2</option>
                        <option value="l3">Level 3</option>
                    </select>
                </section>
                <section className="spaceInformation">
                    <fieldset>
                        <legend>Selected Space Default Components</legend>
                        <div id="spaceInformation">
                            <label htmlFor="accommodate">Accommodates upto</label>
                            <input type="text" id="accommodate" placeholder="4 People" disabled />
                            <label htmlFor="computer">Computer Avaliability</label>
                            <input type="text" id="computer" placeholder="4" disabled />
                            <label htmlFor="power">Power Outlet Avaliability</label>
                            <input type="text" id="power" placeholder="No" disabled />
                            <label htmlFor="projector">Projector Avaliability</label>
                            <input type="text" id="projector" placeholder="No" disabled />
                            <label htmlFor="screen">Big Screen Avaliability</label>
                            <input type="text" id="screen" placeholder="No" disabled />
                            <label htmlFor="prefere">Kindly Select Your Prefered Equipment on The Next Step</label>
                        </div>

                    </fieldset>
                </section>

                <section className="buttons">
                    <button id="cancel1">Cancel</button>
                    <button id="next1" onClick={submit}>Next</button>
                </section>
            </div>
        </div>
    );
};

export default BookingS1;