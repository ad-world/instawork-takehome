import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ListPage from './pages/ListPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage/>}></Route>
        <Route path="/add" element={<AddPage/>}></Route>
        <Route path="/edit/:id" element={<EditPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
