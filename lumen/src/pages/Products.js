// import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import useCustomFetch from '../hooks/useCustomFetch';

const Products = () => {

    // const [productsList, setProductsList] = useState();
    // const { data, hasError } = useCustomFetch(`http://localhost:3030/api/products`);
    // useEffect(() => {
    //     setProductsList(data);
    // }, [])

    return(
        <div className="products">
            <h2>PRODUCTOS</h2>

            <section className="products-panels">
                <article className="p-panels">
                    <h3>Total de productos</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">16</p> 
                </article>

                <article className="p-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/product/gallery'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
            <section className="products-info">
                <article className="p-info">
                        <h3>Último producto creado</h3>
                        <h4>AURORA</h4>
                        <p className="number">10/08/2022</p>
                        <img src='lastProduct.jpg' alt='Último producto'/>  
                </article>
            </section>
        </div>
    )
}

export default Products;