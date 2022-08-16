import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

const Users = () => {

    const [usersList, setUsersList] = useState({});
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/users`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsersList(data)
        })
        .catch(error => 
            console.log(error)
        )
            
    }, []);

    return(
        <div className="users">
            <h2>USUARIOS</h2>

            <section className="users-panels">
                {usersList &&
                <article className="u-panels">
                    <h3>Total de usuarios</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">{usersList.count}</p> 
                </article>
                }

                <article className="u-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/admin/user/list'} className='adm-link'>Lista</NavLink>
                </article>
            </section>

            {usersList && usersList.users &&
            <section className="users-info">
                <article className="p-info">
                        <h3>Último usuario creado</h3>
                        <h4>{ usersList.users[usersList.count - 1].name }</h4>
                        <p className="number">15/08/2022</p>
                        <img src='user.jpg' alt='Último producto'/>  
                </article>
            </section>
            }
        </div>
    )
}

export default Users;