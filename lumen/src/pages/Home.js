import React from "react";
import { Container, Row, Col } from "reactstrap";
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
                    <p>Gráfico de ventas en la última semana o mes</p>
                    <p>Ingresos mensuales - Año 2022</p>
                </article>
            </Container>
            <Container>
                <LineChart />
            </Container>


            {/* <Container>
                <Row>
                    <Col xs="4" className="bg-primary">columna 1</Col>
                    <Col xs="4" className="bg-warning">columna 2</Col>
                    <Col xs="4" className="bg-danger">columna 2</Col>
                </Row>
            </Container> */}
        </div>
    )
}

export default Home;

