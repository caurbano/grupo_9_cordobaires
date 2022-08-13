import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className='logo'>
                <img src='LUMEN.png' alt='logo'/>
            </div>
            <ul>
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