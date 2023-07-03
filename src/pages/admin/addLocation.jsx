import { useState } from "react";
import fireStoreService from './../../utils/fireStore';

const AddLocation = () => {

    const [name, setName] = useState('');
    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');

    const addLocation = async () => {
        const data = await fireStoreService.addDataToCollection('locations', {name, longitude, latitude});
        console.log(data)
    }
    
    return (
      <div className="addLocation">
            <span>AddLocation</span>
            <form>
                <input placeholder="name" onChange={(e) => { setName(e.target.value)}}/>
                <input placeholder="longitude" onChange={(e) => { setlongitude(e.target.value)}}/>
                <input placeholder="latitude" onChange={(e) => { setlatitude(e.target.value)}}/>
            </form>
            <button onClick={addLocation}> Add Location </button>
      </div>
    );
  }
  
  export default AddLocation;
  