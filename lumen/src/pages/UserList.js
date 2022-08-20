import { useEffect, useState } from 'react';
import User from '../components/User';

// ARMAR LISTADO DE USUARIOS
const UserList = () => {
    const [data, setData] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(0);
    const [cantButton, setCantButton] = useState([]);
    const cantUsersForPage = 10;
    
    useEffect(() => {
        fetch(`http://localhost:3030/api/users`)
        .then(res => res.json())
        .then(dataApi => {
            const { count }  = dataApi;
            const { users } = dataApi;
            setData(users);

            const max = ((count / cantUsersForPage) >> 0) + (count % cantUsersForPage ? 1 : 0);
            console.log('max: ',max);
            let arrayaux = [];
            for (let i = 0; i < max; i++) {
                arrayaux.push(i+1);
                //setCantButton(...cantButton,i+1);
            }
            setCantButton(arrayaux);

            setPage(1);
        })
        .catch(error => 
            console.log(error)
        )
    }, []);
        
        
    useEffect(() => {
            const array =data.slice((cantUsersForPage*(page -1)), (cantUsersForPage* page));
            setUsersList(array);
    }, [page]);
        
    const onButton = (event) => {
        event.preventDefault();
        setPage(event.target.value);
    }

    return(
        <div className='u-list'>
            <h2>Lista de usuarios</h2>
            <ul>
                { usersList && usersList.map(element => 
                <User url = { 'http://localhost:3030' + element.detail } key= {element.id}/>)}
            </ul>
        

            <section className='buttons'>
                { cantButton.length > 1 && cantButton.map(element => 
                    <button value={element} onClick={onButton}>{element}</button>
                )}
            </section>

        </div>
    )
}

export default UserList;