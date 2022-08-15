import { NavLink } from 'react-router-dom'

const Users = () => {
    return(
        <div className="users">
            <h2>USUARIOS</h2>

            <section className="users-panels">
                <article className="u-panels">
                    <h3>Total de usuarios</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">15</p> 
                </article>

                <article className="u-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/admin/user/list'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
            <section className="users-info">
                <article className="p-info">
                        <h3>Último usuario creado</h3>
                        <h4>Usuario 10</h4>
                        <p className="number">15/08/2022</p>
                        <img src='user.jpg' alt='Último producto'/>  
                </article>
            </section>
        </div>
    )
}

export default Users;