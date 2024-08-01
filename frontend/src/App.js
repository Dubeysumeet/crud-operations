import './App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ListUsers from './components/ListUsers';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function Navigation() {
  const location = useLocation();
  return (
    <nav>
      <ul>
        {location.pathname !== '/' && (
          <li>
            <Link to="/" className="nav-button">List Users</Link>
          </li>
        )}
        <li>
          <Link to="user/create" className="nav-button">Create User</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="gradient-header ">
        CRUD Operations
      </h1>
<main  className="Container">

      <BrowserRouter>
        <Navigation className=""/>
        <Routes>
          <Route index element={<ListUsers />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>

      </main>
    </div>
  );
}

export default App;