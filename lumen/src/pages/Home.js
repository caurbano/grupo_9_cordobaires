import React from "react";
import { Container, Row, Col } from "reactstrap";
const Home = () => {
    return(
        <div className="home">
            <Container className="content">
                {/* <Row> */}
                    <article>
                        <h2>Bienvenido, Admin!</h2>
                        <p>Revisa la última información</p>
                    </article>
                {/* </Row> */}
                    

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

