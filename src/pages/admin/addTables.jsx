import { useEffect, useState } from 'react';
import fireStoreService from './../../utils/fireStore';


const AddTables = () => {

  const [locations, setLocations] = useState([]);
  const [name, setName] = useState([]);
  const [locationId, setlocationId] = useState();
  const [hasPowerOutlet, setPowerOutlet] = useState();
  const [capacity, setCapacity] = useState();

  useEffect(  () => {
    
     fetchLocations(); 
  }, [])

  const fetchLocations = async () =>{
    const currectLocations = await fireStoreService.getAllDataFromCollection('locations');
    console.log(currectLocations);
    const newLocations = [];
    currectLocations.forEach((location) => {
      newLocations.push(location.data());
    });
    setLocations(newLocations)
  }

  const addTable = async () => {
    console.log("add location")
  }
    return (
      <div className="AddTables">
            <span> Add tables</span>

            <form>
                <input placeholder="name" onChange={(e) => { setName(e.target.value)}}/>
                <select placeholder='setLocationId'>
                  {locations.map((location) => {
                    return <option value={location.name}>{location.name}</option>
                  })}
                </select>
            </form>
            <button onClick={addTable}> Add Tables </button>
      </div>
    );
  }
  
  export default AddTables;
  