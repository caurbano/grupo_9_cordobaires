import { NavLink } from 'react-router-dom'
// import { Pie } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';

const Categories = () => {
    const data = {
        labels: ['Techo', 'Pared', 'Pie'],
        datasets:[{
            data: [8, 4, 3],
            backgroundColor: ['blue', 'yellow', 'green']
        }]
    };

    const options = {
        responsive: true
    }

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
                        <h4>Lámpara de Techo:</h4>
                        <p className="cant">X productos</p>
                    </div>

                    <div className='flex-div'>
                    <h4>Lámpara de Pared:</h4>
                    <p className="cant">X productos</p>
                    </div>

                    <div className='flex-div'>
                    <h4>Lámpara de Pie:</h4>
                    <p className="cant">X productos</p>
                    </div>
                </article>

                <article className="c-panels">
                    <h3>Listado de productos</h3> 
                    <p className="info">Ver todas las cateforías:</p>
                    <NavLink to={'/http:localhost:3030/product/gallery'} className='adm-link'>Lista</NavLink>
                </article>
            </section>
            {/* <section className="graphics">
                <Doughnut data={data} options={options} />
            </section> */}

        </div>
    )
}

export default Categories;