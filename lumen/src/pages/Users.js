import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

const Users = () => {

    const [usersList, setUsersList] = useState({});
    const [lastUser, setLastUser] = useState({});
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/users`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            // setUsersList(data)
            setUsersList(data);
            fetch(`http://localhost:3030/api/users/${data.count}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLastUser(data);
            })
            .catch(error => 
                console.log(error)
            );
        })
        .catch(error => 
            console.log(error)
        )
            
    }, []);

    const [detail, setDetail] = useState(false);

    const viewDetail = (event) => {
        event.preventDefault();
        setDetail(!detail);
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
                        <img src={ 'img/users/' + lastUser.img } alt='Último usuario'/>
                        <button onClick={viewDetail}>Ver detalle</button> 
                </article>

                { detail?
                <article className="u-info">
                        <h4>{ lastUser.first_name + ' ' + lastUser.last_name }</h4>
                        <p>Email: { lastUser.email }</p>
                        <p>Telefono: { lastUser.phone }</p>
                        <p>Fecha de creación: { lastUser.created_at }</p>
                        <p>Estado de cuenta: { lastUser.state? 'Habilitado':'Deshabilitado' }</p>
                </article> : <></>
                }
            </section>
            }
        </div>
    )
}

export default Users;