import { useEffect, useState } from 'react';

const Product = ({url}) => {
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
        <li key= {product.id}>
            <h2>{ product.name }</h2>
            {/* <p>{ product. }</p>
            <p>{ product. }</p> */}
        </li>
    )
}

export default Product;