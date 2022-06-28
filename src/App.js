import logo from './logo.svg';
import './App.css';
import {Button } from 'react-bootstrap'
import Header from './admin/Header'
import {
  BrowserRouter,
  Routes,
  Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import UpdateProduct from './admin/UpdateProduct'
import AddProduct from './admin/AddProduct'
import Protected from './admin/Protected';
import ProductList from './admin/ProductList';

import Store from './client/Store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        {/*<h1>Doceria Front-End</h1>*/}      
          <Routes>
              <Route path="/login" element={<Protected Cmp={Login} />} />
              <Route path="/register" element={<Protected Cmp={Register} />} />
              <Route path="/admin" element={<Protected Cmp={ProductList} />} />
              <Route path="/update/:id" element={<Protected Cmp={UpdateProduct} />} />
              <Route path="/add" element={<Protected Cmp={AddProduct} />} />

              <Route path="/" element={<Store />} />
          </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
