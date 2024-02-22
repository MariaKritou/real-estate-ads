import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Properties  from './pages/properties/Properties';
import AddProperty from './pages/addProperty/AddProperty';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';

function App() {

  return (
    <>
      <Header />
        <Container className="content">
          <Routes>
            <Route path="/" element={<Properties />} />
            <Route path="/add" element={<AddProperty />} />
          </Routes>
        </Container>
      <ToastContainer />
    </>
  );
}

export default App;
