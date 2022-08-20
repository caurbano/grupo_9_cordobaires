import { useEffect, useState } from 'react';
import Product from '../components/Product';

const ProductList = () => {
    const [data, setData] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [page, setPage] = useState(0);
    const [cantButton, setCantButton] = useState([]);
    const cantProductsForPage = 6;
    
    useEffect(() => {
        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(dataApi => {
            const { count }  = dataApi;
            const { products } = dataApi;
            setData(products);

            const max = ((count / cantProductsForPage) >> 0) + (count % cantProductsForPage ? 1 : 0);
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
            const array =data.slice((cantProductsForPage*(page -1)), (cantProductsForPage* page));
            setProductsList(array);
    }, [page]);
        
    const onButton = (event) => {
        event.preventDefault();
        setPage(event.target.value);
    }
        
    return(
        <div className='p-list'>

            <h2>Lista de productos</h2>
            <ul >
                { productsList && productsList.map(element => 
                    <Product url = { 'http://localhost:3030' + element.detail } key= {element.id}/>
                )}
            </ul>

            <section className='buttons'>
                { cantButton.length>1 && cantButton.map(element => 
                    <button value={element} onClick={onButton}>{element}</button>
                )}
            </section>
 
        </div>
    )
}

export default ProductList;