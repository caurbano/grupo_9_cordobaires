import { useEffect, useState } from 'react';
import User from '../components/User';

// ARMAR LISTADO DE USUARIOS
const UserList = () => {
    const [productsList, setProductsList] = useState({});
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(data => 
            setProductsList(data)
        )
        .catch(error => 
            console.log(error)
        )
            
    }, []);
    return(
        <div className='p-list'>
            <h2>Lista de usuarios</h2>
            <ol>
                { productsList && productsList.products && productsList.products.map(element => 
                <User url = { 'http://localhost:3030' + element.detail } />)}
            </ol>
        </div>
    )
}

export default UserList;