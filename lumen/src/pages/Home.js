import React from "react";
import { Container } from "reactstrap";
import LineChart from "../components/LineChart";
const Home = () => {
    return(
        <div className="home">
            <Container className="content">
                <article>
                    <h2>Bienvenido, Admin!</h2>
                    <p>Revisa la última información</p>
                </article>
            </Container>

            <Container className="body">
                <article>
                    <h3>Ingresos mensuales - Año 2022</h3>
                    <p>Expresado en $AR (Ej.: 40 = $40.000)</p>
                </article>
            </Container>

            <Container>
                <LineChart />
            </Container>

            <Container className="report">
                <article>
                    <button>Descargar reporte</button>
                </article>
            </Container>
        </div>
    )
}

export default Home;

