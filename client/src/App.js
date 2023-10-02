import Home from './Pages/Home/Home';
import Topbar from './Components/TopBar/Topbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Single from './Pages/Single/Single';
import Write from './Pages/Write/Write';
import Settings from './Pages/Settings/Settings';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './Context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={user?<Home/>:<Register />}></Route>
        <Route path="/login" element={user?<Home/>:<Login />}></Route>
        <Route path="/write" element={user?<Write />:<Register/>}></Route>
        <Route path="/settings" element={user?<Settings />:<Register/>}></Route>
        <Route path="/post/:postId" element={<Single />}></Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/write" element={<Write />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/post/:postId" element={<Single />}></Route>
      </Routes> */}
    </>
  );
}

export default App;
