import { useEffect, useState } from 'react';

const Categories = () => {

    const [data, setData] = useState({});
    const [cant, setCant] = useState(0);
    
    useEffect(() => {
        
        fetch(`http://localhost:3030/api/products`)
        .then(res => res.json())
        .then(dataApi => {
            //console.log(dataApi);
            const { countByCategory } = dataApi;
            setData(countByCategory);

            let aux = 0;
            for (const key in countByCategory) {
                aux++;
            }
            setCant(aux);
        })
        .catch(error => 
            console.log(error)
        )
            
    }, []);

    return(
        <div className="categories">
            <h2>CATEGORÍAS</h2>

            <section className="cat-panels">
                <article className="c-panels">
                    <h3>Total de categorías</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">{cant}</p> 
                </article>

                <article className="c-panels">
                    <h3>Productos por categoría</h3>
                    <p className="info">Cantidad:</p>
                    {Object.keys(data).map((element) => 
                        <div className='flex-div'>
                            <h4>{element.toLocaleUpperCase()}:</h4>
                            <p className="cant"> {data[element]} </p>
                        </div>
                    )}
                </article>
            </section>

            <section className="cat-info">
                <article>
                    <h3>Listado de productos</h3> 
                    <p className="info">Ver por categoría:</p>
                    <div className="buttons">
                        <button>Lámparas de techo</button>
                        <button>Lámparas de pared</button>
                        <button>Lámparas de pie</button>
                    </div>
                </article>
            </section>

            

        </div>
    )
}

export default Categories;