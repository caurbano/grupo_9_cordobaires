import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarNav from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from '../src/pages/Home';
import Products from './pages/Products';
import Users from './pages/Users';
import Categories from './pages/Categories';
import Statistics from './pages/Statistics';
import ProductList from './pages/ProductList';
import UserList from './pages/UserList';
import './App.scss';

function App() {
  return (
    <Router>
      <div className='flex'>
      <Sidebar />
        <div className='content w-100'>
        <NavbarNav />
          <Routes>
            <Route path='/' exact={true} element={<Home/>}/>
            <Route path='/products' exact={true} element={<Products/>}/>
            <Route path='/users' exact={true} element={<Users/>}/>
            <Route path='/categories' exact={true} element={<Categories/>}/>
            <Route path='/statistics' exact={true} element={<Statistics/>}/>
            <Route path='/productlist' exact={true} element={<ProductList/>}/>
            <Route path='/userlist' exact={true} element={<UserList/>}/>
          </Routes>
        </div>
      </div>
     
    </Router>
  );
}

export default App;
