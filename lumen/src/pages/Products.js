import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [productsList, setProductsList] = useState({});
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProductsList(data)
        })
        .catch(error => 
            console.log(error)
        )
            
    }, []);


    return(
        <div className="products">
            <h2>PRODUCTOS</h2>

            <section className="products-panels">
                { productsList && 
                <article className="p-panels">
                    <h3>Total de productos</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">{productsList.count}</p> 
                </article>
                }

                <article className="p-panels">
                    <h3>Listado</h3> 
                    <p className="info">Ir al listado completo:</p>
                    <NavLink to={'/productlist'} className='adm-link'>Lista</NavLink>
                </article>
            </section>

            { productsList && productsList.products && 
            <section className="products-info">
                <article className="p-info">
                        <h3>Último producto creado</h3>
                        <h4>{ productsList.products[productsList.count - 1].name }</h4>
                        <img src={'img/products/'+ productsList.products[productsList.count - 1].img}  alt='Último producto'/>
                        <button>Ver detalle</button>  
                </article>
                
                <article className="p-info">
                        <h4>{ productsList.products[productsList.count - 1].name }</h4>
                        <p> ID: { productsList.products[productsList.count - 1].id }</p>
                        <p> Lámpara de { productsList.products[productsList.count - 1].category }</p>
                        <p> { productsList.products[productsList.count - 1].description }</p>
                        {/* VER INFO DISPONIBLE */}
                        <p> ${ productsList.products[productsList.count - 1].price }</p>
                        <p> Stock disponible: { productsList.products[productsList.count - 1].stock }</p>
                        <p> Color: { productsList.products[productsList.count - 1].color }</p>
                </article>
            </section>
            }
        </div>
    )
}

export default Products;