import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='logo'>
                <img src='LUMEN-logo.png' alt='logo'/>
            </div>
            <ul className='mobile'>
                <li>
                    <NavLink to={'/'} className='text-light rounded py-2 px-1 w-100' activeClassName='active'><FaIcons.FaHome className='me-2'/></NavLink>
                </li>
                <li>
                    <NavLink to={'/products'} className='text-light rounded py-2 px-1 w-100' activeClassName='active'><FaIcons.FaShoppingBag className='me-2'/></NavLink>
                </li>
                <li>
                    <NavLink to={'/users'} className='text-light rounded py-2 px-1 w-100' activeClassName='active'><FaIcons.FaUserFriends className='me-2'/></NavLink>
                </li>
                <li>
                    <NavLink to={'/categories'} className='text-light rounded py-2 px-1 w-100' activeClassName='active'><FaIcons.FaSlidersH className='me-2'/></NavLink>
                </li>
                <li>
                    <NavLink to={'/statistics'} className='text-light rounded py-2 px-1 w-100' activeClassName='active'><FaIcons.FaChartBar className='me-2'/></NavLink>
                </li>
            </ul>
            
            <ul className='desk'>
                <li>
                    <NavLink to={'/'} className='text-light rounded py-2 px-3 w-100 d-inline-block' activeClassName='active'><FaIcons.FaHome className='me-2'/>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to={'/products'} className='text-light rounded py-2 px-3 w-100 d-inline-block' activeClassName='active'><FaIcons.FaShoppingBag className='me-2'/>Productos</NavLink>
                </li>
                <li>
                    <NavLink to={'/users'} className='text-light rounded py-2 px-3 w-100 d-inline-block' activeClassName='active'><FaIcons.FaUserFriends className='me-2'/>Usuarios</NavLink>
                </li>
                <li>
                    <NavLink to={'/categories'} className='text-light rounded py-2 px-3 w-100 d-inline-block' activeClassName='active'><FaIcons.FaSlidersH className='me-2'/>Categorías</NavLink>
                </li>
                <li>
                    <NavLink to={'/statistics'} className='text-light rounded py-2 px-3 w-100 d-inline-block' activeClassName='active'><FaIcons.FaChartBar className='me-2'/>Estadísticas</NavLink>
                </li>
            </ul>
            
        </div>
    )
}

export default Sidebar;