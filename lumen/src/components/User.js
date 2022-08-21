import { useEffect, useState } from 'react';
// ARMAR USUARIO
const User = ({url}) => {
    const [user, setUser] = useState({});
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUser(data)
        })
        .catch(error => 
            console.log(error)
        )
            
    }, [url]);
    return(
        <div className='u-items'>
            <li key= {user.id}>
                <h4>{ user.first_name + ' ' + user.last_name }</h4>
                <img src= { 'img/users/' + user.img } />
                <p>{ user.email }</p>
                <p>Tel. contacto: { user.phone }</p>
            </li>
        </div>
    )
}

export default User;