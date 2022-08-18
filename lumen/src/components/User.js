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
        <div className='p-items'>
        <li key= {user.id}>
            <p>{ user.first_name }</p>
        </li>
        </div>
    )
}

export default User;