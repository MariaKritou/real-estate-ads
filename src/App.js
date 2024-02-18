import './App.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { Properties } from './pages/properties/Properties';
import { AddProperties } from './pages/addProperty/AddProperty';

function App() {

  return (
    <>
      <div className="app-container">
        <Container maxWidth={false} className='content'>
          <Grid container>
            <Grid item xs={12}>
              <div className='contentPaper'>
                {/* <Header /> */}
                <Routes>
                  <Route path='/' element={<Properties />} />
                  <Route path='/add' element={<AddProperties />} />
                </Routes>
              </div>
            </Grid>
          </Grid>
        </Container>
        <div className="footer">
          {/* <Footer /> */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
