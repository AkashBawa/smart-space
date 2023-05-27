import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Users from './components/User';
import About from './components/About';
import {fetchUsers} from './api/axios';
import { Link, Route, BrowserRouter as Router, Routes as Switch } from 'react-router-dom'
import { useState } from 'react';


function App() {

  const [query, setQuery] = useState('');
  const [user, setUser] = useState({});

  const search = async (event) => {
    if(event.key == "Enter") {
       const data = await fetchUsers(query);
       setUser(data);
    }
  }

  return (
    <div className="App">
              
      <Router>
        <Switch>
          <Route path='/about' Component={About}></Route>
          <Route path='/users' Component={Users}></Route>
          <Route path='/' Component={Home}></Route>
        </Switch>
      </Router>
      <input type='text' className='search' placeholder='Search...' value={query} onChange={(e) => {setQuery(e.target.value)}} onKeyDown={(e) => {
        search(e);
      }} />
      {
        user && (
          <div>
              {user.name}
          </div>
        )
      }
    </div>
  );
}

export default App;
