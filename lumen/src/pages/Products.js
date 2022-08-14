import { NavLink } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';

const Products = () => {

    const listProducts = useCustomFetch(`http://localhost:3030/api/products`);

    console.log(listProducts);

    return(
        <div className="products">
            <h2>PRODUCTOS</h2>

            <section className="sale-panels">
                <article className="p-panels">
                    <h3>Total de productos</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">16</p> 
                </article>

                <article className="p-panels">
                    <h3>Último creado</h3>
                    <p className="info">Producto X</p>
                    <p className="number">10/08/2022</p>  
                </article>

                <article className="p-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/http:localhost:3030/product/gallery'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
        </div>
    )
}

export default Products;