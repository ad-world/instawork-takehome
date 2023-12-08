import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import UserContext from './context/UserContext';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const userContext = useContext(UserContext);
  const isAuthenticated = userContext.user !== null;

  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RequireAuth><ListPage/></RequireAuth>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/add" element={<RequireAuth><AddPage/></RequireAuth>}></Route>
        <Route path="/edit/:id" element={<RequireAuth><EditPage /></RequireAuth>}></Route>
        <Route path="/*" element={<RequireAuth><NotFound/></RequireAuth>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
