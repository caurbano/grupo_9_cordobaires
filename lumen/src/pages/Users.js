import { NavLink } from 'react-router-dom'

const Users = () => {
    return(
        <div className="users">
            <h2>USUARIOS</h2>

            <section className="user-panels">
                <article className="u-panels">
                    <h3>Total de usuarios</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">15</p> 
                </article>

                <article className="u-panels">
                    <h3>Último creado</h3>
                    <p className="info">User X</p>
                    <p className="number">10/08/2022</p>  
                </article>

                <article className="u-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/admin/user/list'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
        </div>
    )
}

export default Users;