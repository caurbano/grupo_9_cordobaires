import { useEffect, useState } from 'react';
// ARMAR USUARIO
const User = ({url}) => {
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProduct(data)
        })
        .catch(error => 
            console.log(error)
        )
            
    }, [url]);
    return(
        <div className='p-items'>
        <li key= {product.id}>
            <p>{ product.name }</p>
            {/* <p>{ product. }</p>
            <p>{ product. }</p> */}
        </li>
        </div>
    )
}

export default User;