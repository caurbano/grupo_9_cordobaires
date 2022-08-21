import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Products = () => {

    const [productsList, setProductsList] = useState({});
    const [lastProduct, setLastProduct] = useState({})
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            setProductsList(data);
            fetch(`http://localhost:3030/api/products/${data.count}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setLastProduct(data);
            })
            .catch(error => 
                console.log(error)
            );
        })
        .catch(error => 
            console.log(error)
        );
            
    }, []);


    const [detail, setDetail] = useState(false);

    const viewDetail = (event) => {
        event.preventDefault();
        setDetail(!detail);
    }

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
                    <NavLink to={`/productlist`} className='adm-link' >Lista</NavLink>
                </article>
            </section>

            { productsList && productsList.products && 
            <section className="products-info">
                <article className="p-info">
                        <h3>Último producto creado</h3>
                        <h4>{ productsList.products[productsList.count - 1].name }</h4>
                        <img src={'img/products/'+ productsList.products[productsList.count - 1].img}  alt='Último producto'/>
                        <button onClick={ viewDetail }>Ver detalle</button>  
                </article>
                { detail?
                <article className="p-info">
                        <h4>{ lastProduct.name }</h4>
                        <p> ID: { lastProduct.id }</p>
                        <p> Lámpara de { lastProduct.category }</p>
                        <p> { lastProduct.description }</p>
                        <p> ${ lastProduct.price }</p>
                        <p> Stock disponible: { lastProduct.stock }</p>
                        <p> Color: { lastProduct.color }</p>
                </article> : <></>
                }
            </section>
            }
        </div>
    )
}

export default Products;