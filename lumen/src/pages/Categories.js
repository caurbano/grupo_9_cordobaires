
const Categories = () => {

    return(
        <div className="categories">
            <h2>CATEGORÍAS</h2>

            <section className="cat-panels">
                <article className="c-panels">
                    <h3>Total de categorías</h3>
                    <p className="info">Cantidad total:</p>
                    <p className="number">3</p> 
                </article>

                <article className="c-panels">
                    <h3>Productos por categoría</h3>
                    <p className="info">Cantidad:</p>
                    <div className='flex-div'>
                        <h4>Techo:</h4>
                        <p className="cant">X</p>
                    </div>

                    <div className='flex-div'>
                    <h4>Pared:</h4>
                    <p className="cant">X</p>
                    </div>

                    <div className='flex-div'>
                    <h4>Pie:</h4>
                    <p className="cant">X</p>
                    </div>
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