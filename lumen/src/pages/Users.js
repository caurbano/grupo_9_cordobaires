import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

const Users = () => {

    const [usersList, setUsersList] = useState({});
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/users`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUsersList(data)
        })
        .catch(error => 
            console.log(error)
        )
            
    }, []);

    const [detail, setDeltail] = useState(false);

    const viewDetail = (event) => {
        event.preventDefault();
        setDeltail(!detail);
    }

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
                    <NavLink to={'/userlist'} className='adm-link'>Lista</NavLink>
                </article>
            </section>

            {usersList && usersList.users &&
            <section className="users-info">
                <article className="u-info">
                        <h3>Último usuario creado</h3>
                        <h4>{ usersList.users[usersList.count - 1].name }</h4>
                        <img src={ 'img/users/' + usersList.users[usersList.count - 1].img } alt='Último usuario'/>
                        <button onClick={viewDetail}>Ver detalle</button> 
                </article>

                { detail?
                <article className="u-info">
                        <h4>{ usersList.users[usersList.count - 1].name }</h4>
                        <p>{ usersList.users[usersList.count - 1].email }</p>
                        {/* VER INFO DISPONIBLE */}
                        <p>{ usersList.users[usersList.count - 1].phone }</p>
                </article> : <></>
                }
            </section>
            }
        </div>
    )
}

export default Users;