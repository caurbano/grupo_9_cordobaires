
import { NavLink } from 'react-router-dom'
import BarChart from '../components/BarChart';

const Statistics = () => {
    return(
        <div className="statistics">
            <h2>ESTADÍSTICAS - Productos</h2>
            <section className="statis-panels">
                <article className="s-panels">
                    <h3>Total vendidos</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">536</p> 
                </article>

                <article className="s-panels">
                    <h3>Opciones de admin:</h3> 
                    <ul>
                        <li>
                            <NavLink to={'/'} className='adm-link'>Creación</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} className='adm-link'>Edición</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/'} className='adm-link'>Eliminación</NavLink>
                        </li>
                    </ul>
                </article>
            </section>
            <section>
                <article className="s-body">
                    <BarChart />
                </article>

            </section>
        </div>
    )
}

export default Statistics;