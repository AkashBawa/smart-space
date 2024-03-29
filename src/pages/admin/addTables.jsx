import { useEffect, useState } from "react";
import fireStoreService from "./../../utils/fireStore";
import TableConstants from "./../../constants/firebaseCollection";

const AddTables = () => {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [locationId, setlocationId] = useState("");
  const [hasPowerOutlet, setPowerOutlet] = useState("");
  const [hasComputer, setComputer] = useState("");
  const [hasProjector, setProjector] = useState("");
  const [hasMonitor, setMonitor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floor, setFloor] = useState("");
  const currentTime = new Date();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const currectLocations = await fireStoreService.getAllDataFromCollection(
      TableConstants.LOCATION
    );
    console.log(currectLocations);
    const newLocations = [];
    currectLocations.forEach((location) => {
      newLocations.push({ ...location.data(), locationId: location.id });
    });
    setLocations(newLocations);
  };

  const addTable = async () => {
    console.log("add location");
    console.log(name, locationId, hasPowerOutlet, capacity);
    console.log(hasComputer, hasMonitor, hasPowerOutlet, hasProjector);
    const newTable = {
      name,
      locationId,
      hasPowerOutlet,
      hasComputer,
      hasMonitor,
      hasProjector,
      capacity: parseInt(capacity),
      updateTime: currentTime,
      floor: parseInt(floor)
      
    };
    const table = await fireStoreService.addDataToCollection(
      TableConstants.TABLE,
      newTable
    );
    console.log(table);

    // setCapacity("");
    // setName("");
    // setPowerOutlet("");
    // setlocationId("");
  };
  return (
    <div className="AddTables">
      <span> Add tables</span>

      <form>
        <label>Name</label>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label>Location</label>
        <select
          placeholder="setLocationId"
          value={locationId}
          onChange={(e) => {
            setlocationId(e.target.value);
          }}
        >
          <option disabled defaultValue>
            Choose One
          </option>
          {locations.map((location, index) => {
            return (
              <option key={`loc-${index}`} value={location.locationId}>
                {location.name}
              </option>
            );
          })}
        </select>

        <label>Has power outlet</label>
        <select
          name="outlet"
          id="powerOutlet"
          value={hasPowerOutlet}
          onChange={(e) => {
            setPowerOutlet(e.target.value === "true");
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Has computer</label>
        <select
          name="computer"
          id="computer"
          value={hasComputer}
          onChange={(e) => {
            setComputer(e.target.value === "true");
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Projector</label>
        <select
          name="projector"
          id="projector"
          value={hasProjector}
          onChange={(e) => {
            setProjector(e.target.value === "true");
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Has monitor</label>
        <select
          name="monitor"
          id="monitor"
          value={hasMonitor}
          onChange={(e) => {
            setMonitor(e.target.value === "true");
          }}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Total Capacity</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => {
            setCapacity(e.target.value);
          }}
          placeholder="capacity"
          min={1}
        />

        <label>floor</label>
        <input
          type="number"
          value={floor}
          onChange={(e) => {
            setFloor(e.target.value);
          }}
          placeholder="floor"
          min={0}
        />
      </form>

      <button onClick={addTable}> Add Tables </button>
    </div>
  );
};

export default AddTables;
