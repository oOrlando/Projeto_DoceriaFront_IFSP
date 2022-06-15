import logo from './logo.svg';
import './App.css';
import {Button } from 'react-bootstrap'
import Header from './Header'
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import UpdateProduct from './UpdateProduct'
import AddProduct from './AddProduct'
import Protected from './Protected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        {/*<h1>Doceria Front-End</h1>*/}  
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/update" element={<UpdateProduct />} />
              <Route path="/add" element={
              <Protected/>
              /*<AddProduct/>*/
              } />
          </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
