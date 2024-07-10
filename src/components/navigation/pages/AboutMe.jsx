import { Col, Container, Row } from "react-bootstrap";

export default function AboutMe() {
  return (
    <div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-4">
              <h1 className="mt-3">About Me</h1>
            </div>
            <div className="text-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit
                amet quam vehicula elementum sed sit amet dui.
              </p>
              <p>
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Vivamus suscipit tortor eget felis porttitor volutpat.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
