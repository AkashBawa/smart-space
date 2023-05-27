import axios from 'axios';

const URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async (number) => {
    const { data } = await axios.get(URL+ '/' + number);
    return data;
}