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
        <div className='p-items'>
            <li key= {product.id}>
                <h4>{ product.name }</h4>
                <p>Lámpara de { product.category }</p>
                {product.images && product.images.url[0] && 
                    <img src= { 'img/products/' + product.images.url[0] } />
                }
                <p>${ product.price }</p>
                <p>stock: { product.stock } un.</p>
                <p>color: { product.color } </p>
            </li>
        </div>
    )
}

export default Product;