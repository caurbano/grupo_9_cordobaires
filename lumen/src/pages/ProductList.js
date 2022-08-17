import { useEffect, useState } from 'react';
import Product from '../components/Product';

const ProductList = () => {
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
        <div>
            <h2>Lista de productos</h2>
            <ul>
                { productsList && productsList.products && productsList.products.map(element => 
                <Product url = { 'http://localhost:3030' + element.detail } />)}
            </ul>
        </div>
    )
}

export default ProductList;