import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { spaceType as SpaceTypeConstant } from './../../../constants/booking';
import Popup from './../../../components/popup';

import { setNotification } from './../../../redux/user';

const BookingS1 = (props) => {

    const existingBooking = props.existingBooking;
    const bookingId = props.bookingId;
    const dispatch = useDispatch();

    const [people, setPeople] = useState(1);
    const [bookingDate, setbookingDate] = useState('');
    const [spaceType, setspaceType] = useState();
    const [building, setbuilding] = useState();
    const [level, setlevel] = useState();
    const [showPopUp, setPopUp] = useState(true); 

    useEffect(() => {
        const spaceTypeSelect = document.getElementById('spaceType');
        const buildingSelect = document.getElementById('building');
        const selectedLevel = document.getElementById('level');

        // Disable the building select initially
        buildingSelect.disabled = true;
        selectedLevel.disabled = true;

        // Show "Select Space Type First" as the default option in the building select
        // const defaultOption = document.createElement('option');
        // defaultOption.text = 'Select Space Type First';
        // defaultOption.disabled = true;
        // defaultOption.selected = true;
        // buildingSelect.add(defaultOption, 0);

        spaceTypeSelect.addEventListener('change', handleSpaceTypeChange);

        return () => {
            spaceTypeSelect.removeEventListener('change', handleSpaceTypeChange);
        };
    }, []);

    useEffect(() => {
        console.log('existingBooking', existingBooking);
        if (existingBooking) {
            setPeople(existingBooking.people);
            setbookingDate(existingBooking.date);
            setspaceType(existingBooking.spaceType);
            setbuilding(existingBooking.locationId);
            setlevel(existingBooking.level);

            const buildingSelect = document.getElementById('building');
            buildingSelect.disabled = false;
            buildingSelect.options.length = 1;

            const currentSelection = SpaceTypeConstant.find((element => element.name == existingBooking.spaceType));
            currentSelection.building.forEach((b) => {
                addBuildingOption(buildingSelect, `${b.name}`, b.id);
            });

            const selectedLevel = document.getElementById('level');
            selectedLevel.disabled = false;
            selectedLevel.options.length = 1;
            currentSelection.building[0].levels.forEach((level) => {
                addBuildingOption(selectedLevel, `level ${level}`, level);
            })
        }
    }, [existingBooking]);

    const submit = () => {
        if (!people || !bookingDate || !spaceType || !building || !level) {
            dispatch(setNotification({
                type: 'error',
                message: `Please choose all Value`
            }))
            return;
        }
        const finalValues = {
            people: parseInt(people),
            bookingDate,
            spaceType,
            building,
            level
        }
        console.log(finalValues)
        props.changePage(2, finalValues);
    };

    const handleSpaceTypeChange = () => {
        const spaceTypeSelect = document.getElementById('spaceType');
        const buildingSelect = document.getElementById('building');
        const selectedLevel = document.getElementById('level');

        // Enable the building select when a space type is selected
        buildingSelect.disabled = false;
        selectedLevel.disabled = false;

        // Clear existing building options
        buildingSelect.options.length = 1;
        selectedLevel.options.length = 1;

        // Add building options based on the selected space type
        const selectedSpaceType = spaceTypeSelect.value;

        const currentSelection = SpaceTypeConstant.find((element => element.name == selectedSpaceType));
        currentSelection.building.forEach((b) => {
            addBuildingOption(buildingSelect, `${b.name}`, b.id);
        })

        currentSelection.building[0].levels.forEach((level) => {
            addBuildingOption(selectedLevel, `level ${level}`, level);
        })

        // document.getElementById('accommodate').placeholder = `${currentSelection.accommodate} Person`;
        // document.getElementById('computer').placeholder = currentSelection.computer ? 'Yes': 'None' ;
        // document.getElementById('power').placeholder =  currentSelection.accommodate ? 'Yes': 'None' ;;
        // document.getElementById('projector').placeholder =  currentSelection.projector ? 'Yes': 'None' ;;
        // document.getElementById('screen').placeholder =  currentSelection.screen ? 'Yes': 'None' ;;

    };

    const handleBuildingChange = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const addBuildingOption = (selectElement, optionText, fireBaseId = "") => {
        const option = document.createElement('option');
        option.text = optionText;
        option.value = fireBaseId
        selectElement.add(option);
    };

    return (
        <div>
            {/* {
                showPopUp && <Popup />
            } */}
            <div id="stepOne">
                <section id="booking1">
                    <h2>Basic Information</h2>
                    <label htmlFor="people">No. of People</label>
                    <input type="number" id="people" min="1" max="8" value={people} onChange={(e) => { setPeople(e.target.value) }} />
                    <label htmlFor="bookDate">Booking Date</label>
                    <input type="date" value={bookingDate} id="bookDate" onChange={(e) => { setbookingDate(e.target.value) }} />
                </section>
                <section id="booking2">
                    <h2>Space Information</h2>
                    <label htmlFor="spaceType">Space Type</label>
                    <select name="spaceType" id="spaceType" defaultValue={'default'}
                        value={spaceType} onChange={(e) => { setspaceType(e.target.value) }}
                    >
                        <option disabled value={'default'}>Choose Space Type</option>
                        <option value="singleSpace">Single Space</option>
                        <option value="doubleSpace">Double Space</option>
                        <option value="group4">Group of Four</option>
                        <option value="group8">Group of Eight</option>
                        <option value="closedSpace">Closed Space</option>
                        <option value="theater">Theater</option>
                        <option value="comLab">Computer Lab</option>
                    </select>
                    <label htmlFor="building">Building</label>
                    <select value={building} defaultValue={'default'} onChange={(e) => { handleBuildingChange(e); setbuilding(e.target.value) }} name="building" id="building">
                        <option disabled value={'default'}>Choose  Building</option>

                    </select>
                    <label htmlFor="level">Level</label>
                    <select name="level" id="level" defaultValue={'default'} value={level} onChange={(e) => { setlevel(e.target.value) }}>
                        <option disabled value={'default'}>Choose  Level</option>
                        {/* <option value="l1">Level 1</option>
                        <option value="l2">Level 2</option>
                        <option value="l3">Level 3</option> */}
                    </select>
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