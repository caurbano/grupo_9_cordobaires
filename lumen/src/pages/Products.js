import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//import useCustomFetch from '../hooks/useCustomFetch';

const Products = () => {

    const [productList, setProductList] = useState();

    //setProductList(useCustomFetch(`http://localhost:3030/api/products`));
    
    useEffect(() => {

        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProductList(data);
        })
        .catch(error => {
        })

    }, []);


    return(
        productList?
        (<div className="products">
            <h2>PRODUCTOS</h2>

            <section className="sale-panels">
                <article className="p-panels">
                    <h3>Total de productos</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">{ productList.count }</p> 
                </article>

                <article className="p-panels">
                    <h3>Último creado</h3>
                    <p className="info">{ productList.propducts[productList.count-1] }</p>
                    <p className="number">10/08/2022</p>  
                </article>

                <article className="p-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/product/gallery'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
        </div>) : 
        (<div className="products">Loading ...</div>)
    )
}

export default Products;