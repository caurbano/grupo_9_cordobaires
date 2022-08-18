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
                <p>{ product.name }</p>
                <p>{ product.description }</p>
                <img src=  { 'img/products/' + product.images.url[0] } />
            </li>
        </div>
    )
}

export default Product;